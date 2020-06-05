module.exports = new bd();

function bd() {
  this.cruds;
  this.iniciar = ()=>
  {
    this.cruds = require('./../../Controlador/CRUDS/index.js');
    var conexion = require('./conexion');
    this.cruds.iniciar(conexion);
  }
}
