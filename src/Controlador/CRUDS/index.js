module.exports = new cruds();

function cruds() {

  this.iniciar = (conexion)=>
  {
    var fs = require('fs');
    var Cruds = fs.readdirSync('./src/Controlador/CRUDS');
    Cruds.map((crud)=>
    {
      if(crud.toString().substr(0,4)=='crud')
      {
        this[crud.split('.')[0]] = require('./'+crud);
        this[crud.split('.')[0]].conectar(conexion);
      //  console.log(crud.split('.')[0]);
      }
    });
  }
}
// var d = new cruds();
// d.iniciar();
