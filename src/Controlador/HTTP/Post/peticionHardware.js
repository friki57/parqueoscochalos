const tarifa = "1";
const tiempoDefecto = "10"
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
        const crypto = require('crypto');
        var hash = crypto.randomBytes(7).toString('hex');
        calle.espacios = calle.espacios - 1;
        var placas = calle.placas;
        placas = Object.values(placas);
        placas.push({placa:matricula, tiempo: tiempoDefecto, hora: new Date(), hash});
        calle.placas = Object.assign({}, placas);
        bd.cruds.crudCalle.modificar(idCalle,{"placas":calle.placas,"espacios":calle.espacios},()=>
        {console.log("llega:",req.params);});
        bd.cruds.crudUsuario.buscar({placa: {valor: matricula, tipo:"igual"}},(usuario)=>{
          var parqueo  =
          {
            calle:idCalle,
            costo:(tarifa*1),
            fecha:(new Date()).toString(),
            tiempo:tiempoDefecto,
            usuario:usuario[0].key,
            hash
          }
          console.log("Ingresando parqueo: ", parqueo)
          bd.cruds.crudParqueo.ingresar(parqueo,()=>{})
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
