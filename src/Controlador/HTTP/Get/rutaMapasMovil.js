
module.exports = (rutas, bd, ver, datos, http)=>
{
  rutas.get(http.get.rutaMapasMovil.mapasInteractivos,ver[http.ver.rutaMapas.mapasInteractivos],(req,res)=>
  {
    bd.cruds.crudCalle.leer((calles)=>
    {
      res.json(calles);
    });
  });
  rutas.get(http.get.rutaMapasMovil.mapasInteractivos,ver[http.ver.rutaMapas.mapasInteractivos],(req,res)=>
  {
    bd.cruds.crudCalle.leer((calles)=>
    {
      res.json(calles);
    });
  });
}
