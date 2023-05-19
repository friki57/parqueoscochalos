var ret = (passport,io)=> {

  const express = require('express');
  const rutas = express.Router();
  const path = require('path');
  const { get } = require('./../../Modelo/Rutas/index.js');
  const { post } = require('./../../Modelo/Rutas/index.js');
  const { vista } = require('./../../Modelo/Rutas/index.js');
  const http = require('./../../Modelo/Rutas/index.js');
  const bd = require('./../../Modelo/BD/bd.js');
  bd.iniciar();

  const tarifa = 1;
  bd.cruds.crudCalle.leer((calles)=>
  {
    // var f1 = new Date(Date.now() + 5000);
    // var st = f1.toString();
    // st = new Date(st)
    // setInterval(()=>{
    //   var f2 = new Date();
    //   console.log(st,f2,st-f2)
    //   if(f2>f1) console.log("ya")
    // },1000);
  });

  var num = 0;
  io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets');
  });
  setInterval(()=>
  {
    num++;
    io.sockets.emit('dong', num.toString());
  },1000);
  bd.cruds.crudCalle.leerEnVivo((call)=>
  {
    io.sockets.emit('calles', call);
    console.log("Enviando calles")
  });
  setInterval(()=>
  {
    bd.cruds.crudCalle.leer((calles)=>
    {
      calles.map((c)=>{
        for (var p in c.placas) {
          if (c.placas.hasOwnProperty(p)) {
            var pl = c.placas[p];
            var final = (new Date(pl.hora)).getTime()+(pl.tiempo * 60000);
            var ahora = (new Date()).getTime();
            if(ahora>final)
            {
              var plac = Object.values(c.placas);
              console.log(plac, pl)
              plac = plac.filter(a=>a.placa!=pl.placa)
              //if(plac.length==0) plac = undefined;
              bd.cruds.crudCalle.modificar(c.key, {"placas": plac, "espacios": (c.espacios-1)}, ()=>{

              });
            }
            else
            {
            //  console.log(pl)
            }
          }
        }
      });
      io.sockets.emit('callesPorsegundo', calles);
    });
  },5000);

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
    console.log(g,g.substr(0,4));
    if(g.substr(0,4)=="ruta")
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
