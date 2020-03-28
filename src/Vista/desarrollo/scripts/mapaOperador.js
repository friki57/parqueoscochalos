

//----------------------------Mapas   window
function coordenadas(la,lo)
{
this.lat=la;
this.lon=lo;
}
var base;
var ref;
var posicion = new coordenadas();
var keys2 = [];
var disp2;
$(document).ready(function () {
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
   //console.log(base);
   ref = base.ref('calle');
   ref.on('value', (data)=>
    {
      //console.log("valores", data.val());
        var calles = data.val();
        var keys = Object.keys(calles);
        var geojons = [];
        var nombres = [];
        var disp = [];

        for(var i=0; i<keys.length; i++)
        {
          var k = keys[i];
          nombres.push(k);
          geojons.push(calles[k].geojson);
          disp.push(calles[k].disp);
        }
      //  console.log("geojons",geojons)
        for(var i=0; i<geojons.length;i++)
        {
          var k = keys[i];
          if(geojons[i]!=null)
          agregarGeoJSON2(geojons[i],k);
        }
        for(var i=0; i<geojons.length; i++)
        {
          var k = keys[i];
          eliminarCapa(geojons[i],k);
        }
        alternarCapnombre();
        disp2 = disp;
        keys2 = keys;

    }
       , (err)=> {console.log(err);console.log("error")});

    });
/*function recibir(data)
{
  console.log(data.val());
    var calles = data.val();
    var keys = Object.keys(calles);
    var geojons = [];
    var nombres = [];
    for(var i=0; i<keys.length; i++)
    {
      var k = keys[i];
      nombres.push(k);
      geojons.push(calles[k].geojson);
    }
    for(var i=0; i<geojons;i++)
    {
      agregarGeoJSON2(geojons[i],k);
    }

}*/
var map;
if (!!navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
      function (position) {
          posicion.lon=-66.1681;
          posicion.lat=-17.4018;
          mapboxgl.accessToken = 'pk.eyJ1IjoiZnJpa2k1NyIsImEiOiJjanZxOGtxMjgwaDhxNDRvOHl5NDVvZnQyIn0._cULjNb2IP5SLSBSm7Higw';
          map = new mapboxgl.Map({
          container: 'mapa',
          style: 'mapbox://styles/mapbox/streets-v11',
          zoom: 13,
          center: [posicion.lon,posicion.lat],
          //center: [-122.49378204345702, 37.83368330777276],
          //minZoom: 14,
          //maxZoom: 18,
          doubleClickZoom: false

          });
    /*      map.addControl(new mapboxgl.GeolocateControl({
              positionOptions: {
                  enableHighAccuracy: true
              },
              trackUserLocation: true
          }));*/
        var con=0;
        map.on("dblclick",(mouse)=>{dobleclick(mouse);
        });
      }
      ,
      function () {window.alert("El navegador no soporta ubicación");}
    );
}

function dobleclick(mouse)
{
    //agregarMarcadorClic(mouse);
    //crearGeoJSON(mouse);
}
function crearGeoJSON(mouse)
{

  if(GeoJson.length<=0)
  {
    GeoJson.push(new coordenadas(mouse.lngLat.lat,mouse.lngLat.lng));
  }
  else {
    GeoJson.push(new coordenadas(mouse.lngLat.lat,mouse.lngLat.lng));
    console.log(GeoJson)
    agregarGeoJSON();
  }
}
var GeoJson = [];
var geojson = [];
var cant = 0;

//document.getElementById('almacenar').addEventListener("click",ingresar);
function ingresar()
{
  var calle = document.getElementById('calle').value
  var c1 = document.getElementById('c1').value
  var c2 = document.getElementById('c2').value
  var disp = document.getElementById('disp').checked
  var pago = document.getElementById('pago').checked
/*
  if(disp == "si")
  {
    disp = true;
  }
  else {
    disp = false;
  }
  if(pago == "si")
  {
    pago = true;
  }
  else {
    pago = false;
  }
*/
  var data =
  {
    calle: calle,
    c1: c1,
    c2: c2,
    geojson: geojson,
    disp: disp,
    pago: pago
  }
  ref.push(data);
  geojson=[];
  calle="";
}

// ---------------------------------añadir calles

var capnombre = false;

function agregarGeoJSON()
{
    console.log(map)
    cant++;
    //map.removeLayer('calle');
    map.addLayer({
    "id": "calle "+cant,
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
    },
    "paint": {
    "line-color": '#cc2255',
    "line-width": 8
    }
    });

//    map.setCenter([GeoJson[0].lon, GeoJson[0].lat]);
    geojson = GeoJson;
    console.log(GeoJson);
    GeoJson = [];
}

function agregarGeoJSON2(GeoJson,id)
{
    //console.log(map)
  //  cant++;
//    map.removeLayer(id);
var id2="";
if(capnombre==true)
{
  id2=id.toString().concat("1");

}
else {
  id2=id;

}
//console.log(id2);

if(GeoJson!=null)
{
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
  },
  "paint": {
  "line-color": '#112255',
  "line-width": 8
  }
  });

  //console.log([GeoJson[0].lon, GeoJson[0].lat]);
  //map.setCenter([GeoJson[0].lon, GeoJson[0].lat]);

  // map.on('click',id2.toString(),(e)=>
  // {
  //
  //   alternar(id2.toString(), disp2);
  // });
  map.on('click',id2.toString(),(e)=>
  {
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML("<div><form method = 'POST' action='/bajar/"+id2.toString()+"'><input class = 'btn btn-danger' type='submit' name='' value='Retiro auto'></form><br><form method = 'POST' action='/subir/"+id2.toString()+"'><input class = 'btn btn-success' type='submit' name='' value='Ingreso auto'></form></div>")
    .addTo(map);
  });
}

    //geojson = GeoJson;
    //GeoJson = [];
}
var capa = 1;
function eliminarCapa(GeoJson,id)
{
  if(map!=null)
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


function alternar(key,disp2) {
  var dis=0;
  console.log(keys2,key,keys2.includes(key))
  for (var i = 0; i < keys2.length; i++) {

    if(keys2[i] == key)
    {
      dis = i;
    }
  }
  console.log("key: ", key," disp2: ", disp2[dis]);
  if(disp2[dis]==false)
  {
    firebase.database().ref().child('/calle/' + key)
          .update({ disp : true });
  }
  else {
    firebase.database().ref().child('/calle/' + key)
          .update({ disp : false });
  }
}
