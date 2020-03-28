function coordenadas(la,lo)
{
this.lat=la;
this.lon=lo;
}

var posicion = new coordenadas();
var map;
function iniciarMapa()
{
  if (!!navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
          posicion.lat= position.coords.latitude;
          posicion.lon=position.coords.longitude;
          mapboxgl.accessToken = 'pk.eyJ1IjoiZnJpa2k1NyIsImEiOiJjanZxOGtxMjgwaDhxNDRvOHl5NDVvZnQyIn0._cULjNb2IP5SLSBSm7Higw';
          map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          zoom: 14,
          center: [posicion.lon,posicion.lat],
          //center: [-122.49378204345702, 37.83368330777276],
          minZoom: 13,
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
          map.setCenter([-66.16376535943817,-17.372440167902013]);
          console.log("h")
        },function () {window.alert("No se permitió la ubicación");});
    }
}
var nombressssss= 0;
var capnombre = false;
function cargarGeoJson(GeoJson,id,disp,pago,texto)
{
  //ubicarcentro();
  var color= "#227733";
/*  console.log("disp", disp);
  console.log("pago", pago);*/
  if(disp==true)
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
      color="#331111";
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
