
module.exports = (rutas, bd, ver, datos, http)=>
{
  rutas.get(http.get.rutaMapas.mapasInteractivos,ver[http.ver.rutaMapas.mapasInteractivos],(req,res)=>
  {
    bd.cruds.crudCalle.leer((calles)=>
    {
      datos.calles = calles;
      res.render('inicio',{datos,pagina:http.vista.rutaMapas.mapasInteractivos})
    });
  });
  rutas.get(http.get.rutaMapas.administracionCalles,ver[http.ver.rutaMapas.administracionCalles],(req,res)=>
  {
    res.render('inicio',{datos,pagina:http.vista.rutaMapas.administracionCalles})
  });
  rutas.get(http.get.rutaMapas.realizarDenuncia+"/:lat/:lon",ver[http.ver.rutaMapas.realizarDenuncia],(req,res)=>
  {
    res.render('inicio',{datos,pagina:http.vista.rutaMapas.mapasInteractivos })
  });
}
