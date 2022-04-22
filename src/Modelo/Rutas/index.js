var json =
{
  get:
  {
    inicio: '/inicio'
  },
  post:
  {
    prueba: 'prueba'
  },
  vista:
  {
    inicio: "inicio"
  },
  ver:
  {
    
  }
}

var fs = require('fs');
var Rutas = fs.readdirSync('./src/Modelo/Rutas');
Rutas.map((ruta)=>
{
  if(ruta.toString().substr(0,4)=='ruta')
  {
    var rut = require('./'+ruta);
    json.get[ruta.split('.')[0]] = rut.get;
    json.post[ruta.split('.')[0]] = rut.post;
    json.vista[ruta.split('.')[0]] = rut.vista;
    json.ver[ruta.split('.')[0]] = rut.ver;
  }
});

module.exports = json;
