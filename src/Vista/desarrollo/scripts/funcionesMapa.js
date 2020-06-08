var base;
$(document).ready(()=> {
  //iniciarMapa();iniciarBD();
  iniciarMapa();
  iniciarBD();
  document.getElementById('ubica').addEventListener('click',ubicarcentro);
});

function coordenadas(la,lo)
{
  this.lat=la;
  this.lon=lo;
}
var posicion = new coordenadas();
var map;
function iniciarMapa()
{

  console.log("************bbbbbbbbbbbbbbbbbbb***********************")
    navigator.geolocation.getCurrentPosition(
        function (position) {
          posicion.lat= position.coords.latitude;
          posicion.lon=position.coords.longitude;
          mapboxgl.accessToken = 'pk.eyJ1IjoiZnJpa2k1NyIsImEiOiJjanZxOGtxMjgwaDhxNDRvOHl5NDVvZnQyIn0._cULjNb2IP5SLSBSm7Higw';
          map = new mapboxgl.Map({
          container: 'mapa',
          style: 'mapbox://styles/mapbox/streets-v11',
          zoom: 15,
          center: [posicion.lon,posicion.lat],
          //center: [-122.49378204345702, 37.83368330777276],
          //minZoom: 13,
          //maxZoom: 14,
          doubleClickZoom: false

          });
/*
          map.addControl(new mapboxgl.GeolocateControl({
              positionOptions: {
                  enableHighAccuracy: true
              },
              trackUserLocation: true
          }));*/
          //actual = new mapboxgl.Marker().setLngLat([posicion.lon,posicion.lat]).addTo(map);
          // map.setCenter([-66.16376535943817,-17.372440167902013]);
          // map.on("dblclick",(mouse)=>{
          //   var popup = new mapboxgl.Popup()
          //   .setLngLat([mouse.lngLat.lng,mouse.lngLat.lat])
          //   //.setLngLat([-66.16376535943817,-17.372440167902013])
          //   .setHTML('<a class = "btn btn-danger" href='+window.datos.http.get.rutaMapas.realizarDenuncia + '/' + mouse.lngLat.lng + '/' + mouse.lngLat.lat + '>Realizar denuncia</a>')
          //   .addTo(map);
          //   var popup2 = new mapboxgl.Popup({offset: 25}).setText('Construction on the Washington Monument began in 1848.');
          // });

        },function (err) {window.alert("No se permitió la ubicación"+err.message.toString()); console.log(err); setTimeout(()=>{iniciarMapa()},1000)});
}
var nombressssss= 0;
var capnombre = false;
function cargarGeoJson(GeoJson,id,disp,pago,texto,espMax,esp)
{
  //ubicarcentro();
  var color= "#227733";
/*  console.log("disp", disp);
  console.log("pago", pago);*/
  if(espMax>esp)
  {
    if(!pago==true)
    {
      color="#cc1122";
    }
    else {
      color="#22aa88";
    }
  }
  else {
    if(!pago==true)
    {
      color="#cc1122";
      //color="#331111";
    }
    else {
      //color="#661133";
      color= "#335599";
    }

  }

  /*console.log(id,[GeoJson[0].lon,GeoJson[0].lat],
  [GeoJson[1].lon,GeoJson[1].lat],color)*/
/*
if(GeoJson!=null)
{
//  nombressssss++;
//console.log(getLayer(id));
  if(map.getLayer(id)!=undefined)
  {
    console.log("entro");
    //eliminarCapa(id);
    map.removeLayer(id.toString());
    console.log("eliminando la capa: ", id);
    console.log(id);
  }
//  console.log(nombressssss);

}*/
var id2="";
if(capnombre==true)
{
  id2=id.toString().concat("1");

}
else {
  id2=id;

}
  if(GeoJson!=null)
  map.addLayer({
    "id": id2.toString(),
    "type": "line",
    "source": {
    "type": "geojson",
    "data": {
    "type": "Feature",
    "properties": {},
    "geometry": {
    "type": "LineString",
    "coordinates":  [
                      [GeoJson[0].lon,GeoJson[0].lat],
                      [GeoJson[1].lon,GeoJson[1].lat]
                  //   [-17.40123052219971, -66.16509592589807], [-17.399756270306867, -66.16644775924286], [-17.400022455550342, -66.16666554695834], [-17.402704762208103, -66.16514205223696], [-17.402827615008675, -66.16228818184796]
                    ]
                }
            }
        },
    "layout": {
    "line-join": "round",
    "line-cap": "round"
    // <div id = "cabecera">
    //   <button id="ubica">Ubicación</button>
    //   </div>
    },
    "paint": {
    "line-color": color,
    "line-width": 8
    }
    });

  map.on('click',id2.toString(),(e)=>
  {
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(texto)
    .addTo(map);
  });
//map.setCenter([GeoJson[0].lon, GeoJson[0].lat]);
}
var actual;
function ubicarcentro() {
  //map.setCenter([-66.16376535943817,-17.372440167902013]);
  navigator.geolocation.getCurrentPosition(
      function (position) {
        posicion.lat= position.coords.latitude;
        posicion.lon=position.coords.longitude;
        map.setCenter([posicion.lon,posicion.lat]);
        actual = new mapboxgl.Marker().setLngLat([posicion.lon,posicion.lat]).addTo(map);
  });

}
var capa = 1;
function eliminarCapa(GeoJson,id)
{
  if(capnombre==true)
  {
    if(GeoJson!=null)
    {
      if(map.getLayer(id)!=undefined)
      {
        //console.log("entro");
        map.removeLayer(id.toString());
        //console.log("eliminando la capa: ", id);
        capa++;
        //console.log(capa);
      }
      if (map.getSource(id)){
        map.removeSource(id);
      }
      //capnombre = false;
    }
  }
  else {
    if(GeoJson!=null)
    {
      if(map.getLayer(id.toString().concat("1"))!=undefined)
      {
        map.removeLayer(id.toString().concat("1"));
      //  console.log("eliminando la capa: ", id.toString().concat("1"));
        capa++;
        //console.log(capa);
      }
      if (map.getSource(id.toString().concat("1"))){
        map.removeSource(id.toString().concat("1"));
      }
      //capnombre = false;
    }
  }
}
function alternarCapnombre()
{
  console.log("capnombre: ",capnombre)
  if(capnombre==true)
  {
  capnombre=false;
  }
  else {
  capnombre=true;
  }
}



//Codigo de base de datos y socket
function iniciarBD()
{
  conectar();
  cargarCalles();
}
function conectar()
{
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
}
function cargarCalles()
{
  var ref = base.ref('calle');
  ref.on('value', (data)=> {recibirCalles(data);}
    , (err)=> {console.log(err);console.log("error")});

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
   var espacios=[];
   var placas=[];
   var espaciosMaximo=[];
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
     espaciosMaximo.push(calles[k].espaciosMaximo);
     if(calles[k].placas != undefined)
     {
       calles[k].placas = calles[k].placas.map((a)=>
       {
         a.tiempoRestante = 13 * 60;
         var colt = "bg-green-400";
         if(a.tiempoRestante <= 20 * 60)
         {
           colt = "bg-yellow-400";
         }
         if(a.tiempoRestante <= 10 * 60)
         {
           colt = "bg-red-500"
         }
         return "<tr><td><div class = 'p-1 font-semibold' style = 'background-color:#0B313F; color: #E79A32' >"+a.placa+"</div><td>"
         + "<td><div class = 'p-2 " + colt +"' > queda: "+((a.tiempoRestante>60)?(a.tiempoRestante/60).toString():"menos de 1")+" minuto(s)</div></td>"
       });
       placas.push("<table>" + calles[k].placas.join("") + "</table>");
     }
     if(calles[k].espacios != undefined)
      espacios.push(calles[k].espacios);
     else
      espacios.push(0);
   }
   //console.log("geojons",geojons)
   for(var i=0; i<geojons.length;i++)
   {
     var k = keys[i];
    // console.log(geojons[i],k);
    var textoPlaca = "No se encuentra ningún vehículo estaciondo en esta calle durante este momento";
    if(placas[i]!=undefined)
      textoPlaca = placas[i];
    var texto= "".concat(nomb[i]," entre ",c1[i]," y ", c2[i], ' \nNúmero de espacios disponibles: ', espaciosMaximo[i]-espacios[i],
    "<br><strong>Las placas de los vehículos estacionados aquí son: </strong>", textoPlaca);
     cargarGeoJson(geojons[i],k,disp[i],pago[i],texto,espaciosMaximo[i],espacios[i]);
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
