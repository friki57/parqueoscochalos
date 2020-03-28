var ret = (passport)=> {

  const express = require('express');
  const rutas = express.Router();
  const path = require('path');
  const { get } = require('./../../Modelo/Rutas/index.js');
  const { post } = require('./../../Modelo/Rutas/index.js');
  const { vista } = require('./../../Modelo/Rutas/index.js');
  const http = require('./../../Modelo/Rutas/index.js');
  const bd = require('./../../Modelo/BD/bd.js');
  bd.iniciar();

  const confirmacion = require('./../../Modelo/ConfirmacionEmail/Funciones.js');
  //confirmacion('aranibarerick@gmail.com',bd,'-LvuQdVsxHMMVZC1L0L0');

  rutas.use((req,res,next) => {
    app = req.app;
    next();
  });

  var datos = {http};
  var ver = require('./../../Modelo/Autenticacion/verificar.js');

  var fs = require('fs');
  var Gets = fs.readdirSync('./src/Controlador/HTTP/Get');
  Gets.map((g)=>
  {
    require('./Get/'+g)(rutas,bd,ver,datos,http);
  });
  var fs = require('fs');
  var Post = fs.readdirSync('./src/Controlador/HTTP/Post');
  Post.map((g)=>
  {
    require('./Post/'+g)(rutas,bd,ver,datos,http,passport);
  });

//  console.log(get)

rutas.get('/f',(req,res)=>
{
  bd.cruds.crudCalle.buscar(
    {
      c1:
      {
        valor:'san mart',
        tipo: 'contieneString'
      }
    },
    (calles)=>
    {
      res.send(calles)
    });
});
rutas.get(get.inicio,(req,res)=>
{
  res.render(vista.inicio,{
    datos:
    {
      nombres:
      [
        'erick',
        'brian'
      ],
      perros:
      {
        grandes:
        [
          'rocky',
          'killer'
        ],
        pequeños:
        [
          'chinchin',
          'bruno'
        ]
      },
      SuperGeneradorFormularios3000:
      {
        titulo: "Pruba SuperGeneradorFormularios3000",
        method: 'post',
        action: '/probar',
        campos:
        [
          {
            name: 'Uno',
            placeholder: 'Uno',
            value: 'Uno',
            readonly: true,
            label: 'Uno: ',
            type: 'number'
          },
          {
            name: 'Dos',
            placeholder: 'Dos',
            value: 'Dos',
            readonly: false,
            label: 'Dos: '
          },
          {
            name: 'Tres',
            placeholder: 'Tres',
            value: 'Tres',
            label: 'Tres'
          },
          {
            name: 'select',
            label: 'combobox',
            type: 'combobox',
            contenido: [
              {
                valor: 1,
                contenido: 'uno'
              },
              {
                valor: 2,
                contenido: 'dos',
                selected: true
              },
              {
                valor: 3,
                contenido: 'tres'
              }
            ]
          }
        ]
      }
    }
  });
});
rutas.post(post.prueba, (req,res)=>
{
  res.json(
    {
      hola: "hola",
      nombre: "erick"
    }
  );
});

  return rutas;
}

module.exports = ret;
