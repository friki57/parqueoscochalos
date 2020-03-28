
module.exports = (rutas, bd, ver, datos, http)=>
{
  rutas.get(http.get.rutaInformacion.inicio,ver[http.ver.rutaInformacion.inicio],(req,res)=>
  {

    // Aca

    res.render('inicio',{datos,pagina:http.vista.rutaInformacion.inicio});
  });
  rutas.get(http.get.rutaInformacion.normativas,ver[http.ver.rutaInformacion.normativas],(req,res)=>
  {
    res.render('inicio',{datos,pagina:http.vista.rutaInformacion.normativas});
  });
  rutas.get(http.get.rutaInformacion.contacto,ver[http.ver.rutaInformacion.contacto],(req,res)=>
  {
    res.render('inicio',{datos,pagina:http.vista.rutaInformacion.contacto});
  });


  rutas.get(http.get.rutaAdministracion.Docente,ver[http.ver.rutaAdministracion.Docente],(req,res)=>
  {
    res.render('inicio',{datos,pagina:http.vista.rutaAdministracion.Docente});
  });
  //
  // npm i
  // npm i style-loader css-loader bootstrap react-bootstrap
}
