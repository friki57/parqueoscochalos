const tarifa = "1";
const fechas = require('./../Utiles/fechas');
module.exports = (rutas, bd, ver, datos, http, passport)=>
{
  rutas.post(http.post.rutaMovil.iniciarSesion,(req,res)=>
  {
    console.log(req.body)
    bd.cruds.crudUsuario.buscar({correo:{tipo: 'igual',valor: req.body.correo}}, (usuario)=>{
     if((usuario.length<=0)){
      res.json(req.body)
     }
     else
     {
       console.log('contra:',req.body.contra, usuario[0].contra)
       bcrypt.compare(req.body.contra, usuario[0].contra, function(err, resp) {
         if(err) console.log(err);
           if(resp==true)
           {
             res.json({if:1,datos:usuario[0]})
           }
           else {
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
}
