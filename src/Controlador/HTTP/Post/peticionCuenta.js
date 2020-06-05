
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
}
