
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
      // 0 = todo bien
      // 1 = ya esta parqueado
      // 2 = esta lleno
      var validacion = 0;
      if(calle.espacios >= calle.espaciosMaximo)
      {
        validacion = 2;
      }
      if((calle.placas.filter(a=>a.placa == matricula).length>0))
      {
        validacion = 1;
      }
      if(validacion == 0)
      {
        calle.espacios = calle.espacios - 1;
        var placas = calle.placas;
        placas = Object.values(placas);
        placas.push({placa:matricula, tiempo: 10, hora: new Date()});
        calle.placas = Object.assign({}, placas);
        bd.cruds.crudCalle.modificar(idCalle,{"placas":calle.placas,"espacios":calle.espacios},()=>
        {
          console.log("llega:",req.params);
        });
      }
      res.json(
        {
          validacion
        }
      );
    });
  });
}
