
module.exports = (rutas, bd, ver, datos, http, passport)=>
{
  rutas.post(http.post.rutaHardware.Sensor + ":calle/:matricula/",(req,res)=>
  {
    var idCalle = req.params.calle;
    var matricula = req.params.matricula;
    bd.cruds.crudCalle.buscar({key:{valor: idCalle, tipo: "igual"}},(calle)=>
    {
      //new Date(Date.now() + 5000);
      calle = calle[0];
      delete calle.key;
      calle.placas = (calle.placas==undefined || calle.placas==0)?[]:calle.placas;
      calle.espacios = calle.espacios - 1;
      var placas = calle.placas;
      placas = Object.values(placas);
      placas.push(matricula);

      if(!calle.placas.includes(matricula))
      {

      }
      if(calle.espacios >= calle.espaciosMaximo)
      {

      }
      calle.placas = Object.assign({}, placas);
      bd.cruds.crudCalle.modificar(idCalle,{"placas":calle.placas,"espacios":calle.espacios},()=>
      {
        console.log("llega:",req.params);
      });
      res.json(
        {
          hola: "hola",
          nombre: "erick"
        }
      );
    });
  });
}
