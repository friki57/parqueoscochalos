const firebase = require('firebase');
var firebaseConfig = {
   apiKey: "AIzaSyBbxdibL2gznSW9rxlkA86bTjzdRs4-XM0",
   authDomain: "prueba-57.firebaseapp.com",
   databaseURL: "https://prueba-57.firebaseio.com",
   projectId: "prueba-57",
   storageBucket: "prueba-57.appspot.com",
   messagingSenderId: "10299101309",
   appId: "1:10299101309:web:a92798ab31380ef3"
 };
firebase.initializeApp(firebaseConfig);
base = firebase.database();
//
// var tabla = 'doctor';
// base.ref(tabla).once('value',(res)=>
//   {
//     var datos = res.val();
//     var keys = Object.keys(datos);
//     var array = [];
//     for(var i=0; i<keys.length; i++)
//     {
//       datos[keys[i]].key = keys[i];
//       array.push(datos[keys[i]]);
//     }
//     datos = array;
//     console.log(datos);
//     //de acá datos ya solo es un simple array como cualquier otro y en su atributo key está el id del objeto.
//     //por ejemplo si quieres buscar según un id en especifico
//     var idABuscar = '2rj3l2k3jf2l23';
//     for (var i = 0; i < datos.length; i++) {
//       if(datos[i].key==idABuscar)
//       {
//         //Acá ya haces lo que quieres con ese
//       }
//     }
//     //o si quieres buscar todos los que sean de un mismo hospital
//     var arrayFiltrado = [];
//     var hospital = 'viedma';
//     for (var i = 0; i < datos.length; i++) {
//       if(datos[i].hospital==hospital)
//       {
//         arrayFiltrado.push(datos[i]);
//       }
//     }
//     datos = arrayFiltrado;
//     //ahora datos son solo los que tengan en su atributo hospital igual a viedma
//   });

module.exports = base;
