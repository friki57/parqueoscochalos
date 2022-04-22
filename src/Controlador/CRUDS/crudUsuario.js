module.exports = new crud();

function crud() {
  var tabla = "usuario";
  this.conectar = (conexion)=>
  {
    this.conexion = conexion;
  }
  this.ingresar = (datos, callback)=>
  {
    var key = this.conexion.ref(tabla).push(datos,(err)=>
    {
      if(!err)
      {
        callback(key.path.pieces_[1]);
      }
      else {
        console.log("Error ingresando en la tabla: " + tabla + " - ", err);
      }
    });
  }
  this.modificar = (id,datos, callback)=>
  {
    this.conexion.ref().child('/'+tabla+'/'+id).update(datos,(err)=>
    {
      if(!err)
      {
        callback();
      }
      else {
        console.log("Error ingresando en la tabla: " + tabla + " - ", err);
      }
    });
  }
  this.eliminar = (id, callback)=>
  {
    this.conexion.ref(tabla+'/'+id).remove((err, res)=>
    {
      if(!err)
      {
        callback();
        console.log("Eliminados los datos de la tabla "+tabla+":", id);
        return res;
      }
      else {
        console.log("Error al borrar datos de la tabla "+tabla+":", err);
      }
    });
  }
  this.leer = (callback)=>
  {
    this.conexion.ref(tabla).once('value',(res)=>
      {
        var datos = res.val();
        var keys = Object.keys(datos);
        var array = [];
        for(var i=0; i<keys.length; i++)
        {
          datos[keys[i]].key = keys[i];
          array.push(datos[keys[i]]);
        }
        datos = array;
        callback(datos);
      },
      (err)=>
      {
        console.log("Error al buscar datos de la tabla "+tabla+":", err);
      }
    );
  }
  this.buscar = (filtro,callback)=>
  {
    this.conexion.ref(tabla).once('value',(res)=>
      {
        var datos = res.val();
        if(datos!=null && datos!=undefined)
        {
          var keys = Object.keys(datos);
          var array = [];
          for(var i=0; i<keys.length; i++)
          {
            datos[keys[i]].key = keys[i];
            array.push(datos[keys[i]]);
          }
          datos = array;
          const buscar = require('./buscar.js');
          datos = buscar(datos, filtro);
          //console.log(datos);
          callback(datos);
        }
        else {
          callback([])
        }
      },
      (err)=>
      {
        console.log("Error al buscar datos de la tabla "+tabla+":", err);
      }
    );
  }
}
