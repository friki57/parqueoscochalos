
module.exports = (rutas, bd, ver, datos, http, passport)=>
{
  rutas.post('/bajar/:id',ver.verificarOperador,(req,res)=>
  {
    var id = req.params.id;
    bd.cruds.crudCalle.buscar({key:{valor: id,tipo:'igual'}},(calle)=>
    {
      calle = calle[0]
      if(calle.espacios == undefined)
      {
        calle.espacios = 0;
      }
      if(calle.espacios>=0)
      {
        calle.espacios = calle.espacios - 1;
      }
      if(calle.espacios<10)
      {
        calle.disp = true;
      }
      else {
        calle.disp = false;
      }
      console.log(calle,'bajar');
      bd.cruds.crudCalle.modificar(id,{espacios: calle.espacios,disp:calle.disp},()=>
      {
        res.redirect('back');
      });
    });
  });
  rutas.post('/subir/:id',(req,res)=>
  {
    var id = req.params.id;
    bd.cruds.crudCalle.buscar({key:{valor: id,tipo:'igual'}},(calle)=>
    {
      calle = calle[0]
      if(calle.espacios == undefined)
      {
        calle.espacios = 0;
      }
      if(calle.espacios<=9)
      {
        calle.espacios = calle.espacios + 1;
      }
      if(calle.espacios<10)
      {
        calle.disp = true;
      }
      else {
        calle.disp = false;
      }
      console.log(calle,'subir');
      bd.cruds.crudCalle.modificar(id,{espacios: calle.espacios,disp:calle.disp},()=>
      {
        res.redirect('back');
      });
    });
  });
  
}
