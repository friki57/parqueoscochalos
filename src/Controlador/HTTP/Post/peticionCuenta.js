const tarifa = "1";
const fechas = require('./../Utiles/fechas');
module.exports = (rutas, bd, ver, datos, http, passport)=>
{
  rutas.post(http.post.rutaCuenta.inicioSesion,passport.authenticate("iniciar sesion",
  {
    //successRedirect: '/Usuarios/Cuenta',
    failureRedirect: http.get.rutaCuenta.inicioSesion,
    failureFlash: true
  }), (req,res)=>
  {
      res.redirect(http.get.rutaCuenta.miCuenta);
  });
  rutas.post(http.post.rutaCuenta.crearCuenta,passport.authenticate("registrarse",
    {
      successRedirect: http.get.rutaInformacion.miCuenta,
      failureRedirect: http.get.rutaCuenta.inicioSesion,
      failureFlash: true
    })
  );
  rutas.post(http.post.rutaCuenta.verificarCuenta+'/:id',(req,res)=>
  {
    var id = req.params.id;
    bd.cruds.crudUsuario.buscar({key:{tipo:'igual',valor:id}},(usuario)=>
    {
      usuario = usuario[0];
      console.log('----------',req.body.hash,usuario.hash,req.body.hash==usuario.hash)
      if(req.body.hash==usuario.hash)
      {
        console.log('---------------------------------------',id)
        bd.cruds.crudUsuario.modificar(id,{hash:1},()=>
        {
          req.flash("confirmacion","Tu cuenta fue verificada correctamente. ¡Disfruta de Parqueos Cochalos!");
          console.log('--------------------------------',req.flash('confirmacion'))
          res.redirect(http.get.rutaCuenta.miCuenta);
        });
      }
      else
      {
        req.flash("error","Los códigos de verificación no coinciden");
        res.redirect(http.get.rutaCuenta.verificarCuenta);
      }
    });
  });
  rutas.post('/descargar',(req,res)=>
  {
    bd.cruds.crudCalle.buscar({calle:{valor: '',tipo: 'contieneString'}},(calles)=>
    {
      console.log(calles);
      const excel = require('./../reportes.js');
      res.download(excel(calles,'calles',['key','geojson']));
    });
  });
  rutas.post(http.post.rutaCuenta.reenviarConfirmacion,(req,res)=>
  {
    const confirmacion = require('./../../../Modelo/ConfirmacionEmail/Funciones.js');
    confirmacion(req.app.locals.usuario.correo,bd,req.app.locals.usuario.key);
    res.redirect('back');
  });
  rutas.post(http.post.rutaCuenta.adicionarTiempo+':tiempo',ver[http.ver.rutaCuenta.adicionarTiempo],(req,res)=>
  {
    const tiempo = req.params.tiempo;
    datos.usuario = req.user;
    bd.cruds.crudParqueo.buscar({usuario:{valor:datos.usuario.key,tipo:"igual"}},(parqueo)=>{
      parqueo = parqueo.filter(a=>
        {
          const final = (new Date(a.fecha)).getTime() + 1000 * 60 * a.tiempo;
          const ahora = (Date.now());
          if(ahora<final)
          {
            a.fecha = fechas((new Date(a.fecha)))
            a.fechaFinal = fechas(new Date(final))
            return a
          }
        }
      )
      if(parqueo.length>0)
      {
        parqueo = parqueo[0];
        bd.cruds.crudCalle.buscar({key: {valor:parqueo.calle, tipo:"igual"}},(calles)=>{
          calles = calles[0]
          const costo = tarifa * (tiempo/30);
          calles.placas = calles.placas.map((pl)=>{
            if(pl.hash == parqueo.hash){
              pl.tiempo = parseInt(pl.tiempo,10) + parseInt(tiempo,10);
            }

            return pl;
          })
          parqueo.tiempo = parseInt(parqueo.tiempo,10) + parseInt(tiempo,10);
          bd.cruds.crudCalle.modificar(calles.key,{"placas":calles.placas},()=>{});
          bd.cruds.crudParqueo.modificar(parqueo.key,{"tiempo":parqueo.tiempo},()=>{});
          bd.cruds.crudUsuario.modificar(req.user.key,{"saldo": (req.user.saldo-costo)},()=>{})
          res.redirect(http.get.rutaCuenta.adicionarTiempo)
        });
      }
      else {

        res.redirect(http.get.rutaCuenta.miCuenta)
      }
    });
  });

}
