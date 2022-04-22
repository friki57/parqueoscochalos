import mapa from './mapa.js'


var posicion = new coordenadas();
function cargarCalles()
{

}
var keys;
var disp2;
function recibirCalles(data)
{
//   console.log("valores", data.val());
   var calles = data.val();
   keys = Object.keys(calles);

   var geojons = [];
   var pago = [];
   var nombres = [];
   var nomb = [];
   var c1 =[];
   var c2= [];
   var disp=[];

   for(var i=0; i<keys.length; i++)
   {
     var k = keys[i];
     nombres.push(k);
     nomb.push(calles[k].calle);
     c1.push(calles[k].c1);
     c2.push(calles[k].c2);
     geojons.push(calles[k].geojson);
     disp.push(calles[k].disp);
     pago.push(calles[k].pago);
   }
   //console.log("geojons",geojons)
   for(var i=0; i<geojons.length;i++)
   {
     var k = keys[i];
    // console.log(geojons[i],k);
    var texto= "".concat(nomb[i]," entre ",c1[i]," y ", c2[i]);
     cargarGeoJson(geojons[i],k,disp[i],pago[i],texto);
   }
   for(var i=0; i<geojons.length; i++)
   {
     var k = keys[i];
     eliminarCapa(geojons[i],k);
   }
   for(var i=0; i<geojons.length; i++)
   {
      var k = keys[i];
      //comprobarCapa(geojons[i],k);
   }
   alternarCapnombre();

disp2=disp;
/*console.log("dis2",disp2)
console.log("dis",disp)*/

}
//setInterval(()=>{alternar(keys);},5000);

function alternar(keys) {
  if(keys!=null)
  {
    var alt = Math.floor((Math.random() * keys.length) + 1)
    var ke = keys[alt];
    /*console.log("modificado: ",ke);
    console.log(disp2[alt]);
    console.log("alt",alt)
    console.log("dis2",disp2)*/
    if(disp2[alt]==false)
    {
      firebase.database().ref().child('/calle/' + ke)
            .update({ disp : true });
    }
    else {
      firebase.database().ref().child('/calle/' + ke)
            .update({ disp : false });
    }
  }
}

/*
function alternarDisponibilidad()
{
  var ref = base.ref('calle');
  ref.once('value', (data)=> {actualizarDisponibilidad(data,ref);}
    , (err)=> {console.log(err);console.log("error")});

}
function actualizarDisponibilidad(data,ref)
{

  var calles = data.val();
  var keys = Object.keys(calles);
  var disp=[];

  for(var i=0; i<keys.length; i++)
  {
    var k = keys[i];
    //map.removeLayer(k);
    disp.push(calles[k].disp);
  }
  for(var i=0; i<disp.length;i++)
//var i=Math.random()*;
  {
    if(disp[i]==true)
    {
      var k = keys[i];
      //ref.update
      var da = firebase.database().ref
      ("calle/"+k).update(
        {
        //  c1: "no",
          disp: false
        }
      );
      //da.goOffline();
      firebase.database().goOffline()
    }
    else
    {
      var k = keys[i];
      //ref
      var da = firebase.database().ref
      ("calle/"+k).update(
        {
          disp: true
        }
      );
      //da.goOffline();
      firebase.database().goOffline()
    }
    console.log(disp);
  }

}
*/
