const tarifa = "1";
const fechas = require('./../Utiles/fechas');
module.exports = (rutas, bd, ver, datos, http, passport)=>
{
  rutas.post(http.post.rutaMovil.iniciarSesion,(req,res)=>
  {
    console.log(req.body)
    res.json(req.body)
  });
  rutas.get("/Movil/Prueba/" ,(req,res)=>
  {
    res.json({pru:"eba",num:9})
  });
}
