const tarifa = "1";
const fechas = require('./../Utiles/fechas');
var bcrypt = require('bcryptjs');
module.exports = (rutas, bd, ver, datos, http, passport)=>
{
  rutas.post(http.post.rutaMovil.iniciarSesion,(req,res)=>
  {
    console.log(req.body)
    bd.cruds.crudUsuario.buscar({correo:{tipo: 'igual',valor: req.body.correo}}, (usuario)=>{
     if((usuario.length<=0)){
      req.body.mensaje = 'El correo '+ req.body.correo + ' no está registrado';
      res.json(req.body)
     }
     else
     {
       console.log('contra:',req.body.contra, usuario[0].contra)
       bcrypt.compare(req.body.contra, usuario[0].contra, function(err, resp) {
         if(err) console.log(err);
           if(resp==true)
           {
             usuario[0].mensaje =  "Bienvenido de nuevo " + usuario[0].nombre+" "+usuario[0].apellido
             res.json({if:1,datos:usuario[0]})
           }
           else {
             req.body.mensaje = 'Contraseña incorrecta';
             res.json(req.body)
           }
       });
     }
    });
  });
  rutas.get("/Movil/Prueba/" ,(req,res)=>
  {
    res.json({pru:"eba",num:9})
  });
  rutas.post('/aumentartiempo/:tiempo/:id/:saldo',ver[http.ver.rutaCuenta.adicionarTiempo],(req,res)=>
  {
    const tiempo = req.params.tiempo;
    var id = req.params.id;
    var saldo = req.params.saldo;
    //datos.usuario = req.user;
    bd.cruds.crudParqueo.buscar({usuario:{valor:id,tipo:"igual"}},(parqueo)=>{
      parqueo = parqueo.filter(a=>
        {
          const final = (new Date(a.fecha)).getTime() + 1000 * 60 * a.tiempo + 1000 * 60 * 60;
          const ahora = (Date.now() + 1000 * 60 * 60);
          if(ahora<final)
          {
            a.fecha = fechas(new Date((new Date(a.fecha)).getTime() + 1000 * 60 * 60))
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
          bd.cruds.crudUsuario.modificar(id,{"saldo": (saldo-costo)},()=>{})
          res.redirect(http.get.rutaCuenta.adicionarTiempo)
        });
      }
      else {

        res.redirect(http.get.rutaCuenta.miCuenta)
      }
    });
  });
}
