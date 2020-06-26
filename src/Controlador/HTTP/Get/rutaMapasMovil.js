
module.exports = (rutas, bd, ver, datos, http)=>
{
  rutas.get("/MapasMovil/" ,(req,res)=>
  {
    bd.cruds.crudCalle.leer((cal)=>{

      res.json(cal)
    })
  });
}
