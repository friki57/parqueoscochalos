
module.exports = (rutas, bd, ver, datos, http)=>
{
  rutas.get("/MapasMovil/" ,(req,res)=>
  {
    bd.cruds.crudCalle.leer((cal)=>{
      res.json(cal)
    })
  });
/*   rutas.get("/Saldo/:key" ,(req,res)=>
  {
    bd.cruds.crudUsuario.leer((cal)=>{
      res.json(cal)
    })
  }); */
const fechas = require('./../Utiles/fechas');
  rutas.get("/ParqueoActual/:id" ,(req,res)=>
  {
    // console.log(",,,,,,,,,,,,,,,, parqueoActual movil");
    var id = req.params.id;
    //datos.usuario = req.user;
    bd.cruds.crudParqueo.buscar({usuario:{valor:id,tipo:"igual"}},(parqueo)=>{
      parqueo = parqueo.filter(a=>
        {
          const seis = 1000 * 60 * 60 * 6; 
          const ahora = (Date.now() + seis);
          const final = (new Date(a.fecha)).getTime() + 1000 * 60 * a.tiempo + seis;
          if(ahora<final)
          {
            a.fecha = fechas(new Date((new Date(a.fecha)).getTime() + 1000 * 60 * 60 * 6))
            a.fechaFinal = fechas(new Date(final))
            a.tiempoRestante = final - (new Date).getTime() + seis;
            return a
          }
        }
      )
      if(parqueo.length>0)
      {
        parqueo = parqueo[0];
        bd.cruds.crudCalle.buscar({key: {valor:parqueo.calle, tipo:"igual"}},(calles)=>{
          calles = calles[0]
          parqueo.calle = [" ",calles.calle, " entre ", calles.c1, " y ", calles.c2].join("")
          console.log(parqueo)
          var parqueoActual = parqueo;
          res.json(parqueoActual)
        });
      }
      else {
        var parqueoActual = 0;
        res.json(parqueoActual)
      }
    });
  });


}
