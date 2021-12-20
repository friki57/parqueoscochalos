var base;
function coordenadas(la,lo)
{
  this.lat=la;
  this.lon=lo;
}
var posicion = new coordenadas();
var map;
$(document).ready(()=> {
  //iniciarMapa();iniciarBD();
  iniciarMapa();
  setTimeout(()=>
  {
    iniciarBD();
    document.getElementById('ubica').addEventListener('click',ubicarcentro);
  },300);
});


function iniciarMapa()
{

  console.log("************bbbbbbbbbbbbbbbbbbb***********************")
    navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log(position);
          posicion.lat= position.coords.latitude;
          posicion.lon= position.coords.longitude;
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
var id2="";
if(capnombre==true)
{
  id2=id.toString().concat("1");

}
else {
  id2=id;

}
  if(GeoJson!=null)
  {
    var flon = (GeoJson[0].lon + GeoJson[1].lon)/2;
    var flat = (GeoJson[0].lat + GeoJson[1].lat)/2;
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(texto)
    const marker1 = new mapboxgl.Marker({color:color})
      .setLngLat([flon,flat])
      .setPopup(popup)
      .addTo(map);
  }

if(false){
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

}
map.setCenter([GeoJson[0].lon, GeoJson[0].lat]);
}
var actual;
function ubicarcentro() {
  //map.setCenter([-66.16376535943817,-17.372440167902013]);
navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
  navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
        posicion.lat= position.coords.latitude;
        posicion.lon=position.coords.longitude;
        map.setCenter([posicion.lon,posicion.lat]);
        actual = new mapboxgl.Marker().setLngLat([posicion.lon,posicion.lat]).addTo(map);
  },()=>console.log("fallo la geolocalización"),{maximumAge:60000, timeout:5000, enableHighAccuracy:true});

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
  if(capnombre==true)
  {
  capnombre=false;
  }
  else {
  capnombre=true;
  }
}

var socket = io("http://83.229.39.60:4080");
//Codigo de base de datos y socket
function iniciarBD()
{
    //console.log(window.datos.calles)
    map.on('load', function() {
      recibirCalles(window.datos.calles);
      socket.on('calles', function(data) {
        //console.log("Llegaron calles")
        recibirCalles(data);
      });
    });
}

var keys;
var disp2;
var cambiarTiempos;
function recibirCalles(calles)
{
//   console.log("valores", data.val());
//   var calles = data.val();
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
   var idplacas = [];
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
         a.tiempoRestante = Math.floor((new Date(a.hora) - Date.now() + a.tiempo * 60 * 1000) / (1000));
         console.log(a.tiempoRestante)
         var colt = "bg-green-400";
         if(a.tiempoRestante <= 20 * 60)
         {
           colt = "bg-yellow-400";
         }
         if(a.tiempoRestante <= 10 * 60)
         {
           colt = "bg-red-500"
         }
         var tiempopl = ((a.tiempoRestante>60)?Math.floor((a.tiempoRestante/60).toString()):"menos de 1");
         idplacas.push({id:(calles[k].key),hora:a.hora,tiempo:a.tiempo})
         return "<tr><td><div class = 'p-1 font-semibold' style = 'background-color:#0B313F; color: #E79A32' >"+a.placa+"</div><td>"
         + "<td><div class = 'p-2 " + colt +"' > queda: <span class='"+ calles[k].key +"'>"+ tiempopl +"</span> minuto(s)</div></td>"
       });
       placas.push("<table>" + calles[k].placas.join("") + "</table>");
     }
     else {
       placas.push("")
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
    var texto= "".concat("<div id='popup",k,"'>",nomb[i]," entre ",c1[i]," y ", c2[i], ' <br></br> Número de espacios disponibles: ', espaciosMaximo[i] - espacios[i],
    "<br><strong>Las placas de los vehículos estacionados aquí son: </strong>", textoPlaca, "</div>");
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
  clearInterval(cambiarTiempos)
  cambiarTiempos = setInterval(()=>{
    //console.log("Tiempos",idplacas);
    idplacas.map((pl)=>{
      if(document.getElementsByClassName(pl.id).length>0)
      {
        pl.tiempoRestante = Math.floor((new Date(pl.hora) - Date.now() + pl.tiempo * 60 * 1000) / (1000));
        pl.tiempopl = ((pl.tiempoRestante>60)?Math.floor((pl.tiempoRestante/60).toString()):"menos de 1");
        //console.log(pl)
        document.getElementsByClassName(pl.id)[0].innerHTML = pl.tiempopl;
      }
    })
  },1000)
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
