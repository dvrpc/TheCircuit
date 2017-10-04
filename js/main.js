  var map;
  var MY_MAPTYPE_ID = 'Base Map';
  var streetViewService = new google.maps.StreetViewService();
  var geoJsonObject;
  
  var region = new google.maps.LatLng(40.08, -75.170669);
      
   $(document).ready(function() {
      //OPEN ABOUT DIALOG
        $('#aboutModal').modal();
      });
              
    function toggleLayer(dataLayer,id){
        if ($('#'+id).is(':checked')){
          //  data4.revertStyle();
             data4.forEach(function (feature) {
              if (feature.getProperty('CIRCUIT') === dataLayer) {
              data4.overrideStyle(feature, { strokeOpacity: 1,});
              }
            })
           data4b.revertStyle();
        }
        else {
            data4.forEach(function (feature) {
              if (feature.getProperty('CIRCUIT') === dataLayer) {
                data4.overrideStyle(feature, { strokeOpacity: .0,});
              }
            })
            data4b.forEach(function (feature) {
              if (feature.getProperty('CIRCUIT') === dataLayer) {
                data4b.overrideStyle(feature, {strokeOpacity: .0, clickable: false});
              }
            })
        }
        
    };  
        
  function initialize() {
  var stylez = [{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},
  {"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"on"}]},
  {"featureType":"administrative.neighborhood","elementType":"geometry","stylers":[{"visibility":"on"}]},
  {"featureType":"administrative.neighborhood","elementType":"geometry.fill","stylers":[{"lightness":"-47"},{"visibility":"on"},{"color":"#37b2bd"}]},
  {"featureType":"administrative.neighborhood","elementType":"geometry.stroke","stylers":[{"color":"#37b2bd"},{"visibility":"on"}]},
  {"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},
  {"featureType":"landscape","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"}]},
  {"featureType":"poi","elementType":"all","stylers":[{"saturation":-75},{"lightness":30},{"visibility":"on"}]},
  {"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},
  {"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},
  {"featureType":"road.highway","elementType":"all","stylers":[{"saturation":-140},{"visibility":"simplified"}]},
  {"featureType":"road.arterial","elementType":"all","stylers":[{"saturation":-140},{"lightness":30},{"visibility":"on"}]},
  {"featureType":"road.local","elementType":"all","stylers":[{"saturation":-140},{"lightness":40},{"visibility":"on"}]},
  {"featureType":"road.local","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"}]},
  {"featureType":"transit","elementType":"all","stylers":[{"saturation":-140},{"visibility":"simplified"}]},
  {"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},
  {"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#75cfd7"}]},
  {"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},
  {"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}
  ];

  // Create a simple map.
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    minZoom: 9, 
    center: {lat: 40.08, lng:-75.170669 },
    mapTypeId: MY_MAPTYPE_ID,  
    mapTypeControlOptions: {
    mapTypeIds: [MY_MAPTYPE_ID,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.HYBRID],
    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    panControl: false,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    },
   // draggableCursor: 'pointer', // every pixel is clickable.
    streetViewControl: true //my favorite feature in V3!
  });
      
        map.enableKeyDragZoom();          
       var styledMapOptions = {
        name: "Map",
        alt:"Show base map"
        }; 
  
        var jayzMapType = new google.maps.StyledMapType(stylez, styledMapOptions);
        map.mapTypes.set(MY_MAPTYPE_ID,jayzMapType);
 
   //   var bikeLayer = new google.maps.BicyclingLayer();
     //   bikeLayer.setMap(map);

    //County Bndy
         $.getJSON('data/cnty.js', function(d) {
            var data = new google.maps.Data({map: map, style:{
                clickable: false,
                zIndex:10,
                fillOpacity: .0,   
                strokeColor: '#a6a6a6',
                strokeOpacity: .75,
                strokeWeight: 3
                     }});
            data.addGeoJson(d);
         });

    var dataColors = {
      'Existing': '#8dc63f',
      'Planned': '#008192',
      'In Progress': '#fdae61'
    };
    
    function styles(feature) {
    return {
        strokeWeight: 3,
        strokeOpacity: .8,
        strokeColor: dataColors[feature.getProperty('CIRCUIT')],
    }
  }

    data4 = new google.maps.Data();
    $.getJSON('https://dvrpc-dvrpcgis.opendata.arcgis.com/datasets/c830cdb70f654c36bfd88eb7ed4bc424_0.geojson', function(d) {
    data4.addGeoJson(d, {idPropertyName: 'OBJECTID'});
    data4.setStyle(styles);
    data4.setMap(map);
    });

      data4b = new google.maps.Data();
      data4b.loadGeoJson('https://dvrpc-dvrpcgis.opendata.arcgis.com/datasets/c830cdb70f654c36bfd88eb7ed4bc424_0.geojson');
      data4b.setMap(map);
      data4b.setStyle(function (feature) {
        return {   
                zIndex: 300,
                strokeOpacity: .0, 
                strokeWeight: 8,
                clickable: true
          }
      });
  
      data4b.addListener('click', function(e) {
          data4b.revertStyle();
          data4b.overrideStyle(e.feature,{ 
              strokeOpacity: .7,   
              strokeColor: '#ff0000' ,
              strokeWeight: 5
      });
      });   
    
      data4b.addListener('click', function(e) {
          var content = '<b>Name: </b>'+e.feature.getProperty('NAME')+'<br>'
                   +'<b>Trail Status: </b>'+e.feature.getProperty('CIRCUIT');

        $('#info-bar').html(content);
      }); 
  
      
/* google.maps.event.addListener(map, 'zoom_changed', function()
  { 
    var zoomLevel = map.getZoom();
    
    if(zoomLevel <=12)
      data6.overrideStyle(strokeWeight:9);

    // === If Zoom Level > 8 use mapStyleZoomedOut 
    else
      data6.overrideStyle(strokeWeight:3);

  }); 
    google.maps.event.addListener(map,'zoom_changed',function(){
     data6.setStyle(function (feature) {
            return {   
                zIndex: 201,
                strokeColor: '#008192',
                clickable: true,
                strokeWeight: map.getZoom()>14?5:3
            };
        });
  }); */

        
        $("#zoomToRegion").click(function(){
            map.setCenter(new google.maps.LatLng(40.08, -75.170669));
            map.setZoom(9);
        });

        $("#zoomToStudy1").click(function(){
            map.setCenter(new google.maps.LatLng(40.336933676997319, -75.106870407001679));
            map.setZoom(10);
        });

        $("#zoomToStudy2").click(function(){
            map.setCenter(new google.maps.LatLng(39.973209680949878, -75.748451366853885));
            map.setZoom(10);
        });

        $("#zoomToStudy3").click(function(){
            map.setCenter(new google.maps.LatLng( 39.916606269175929,-75.398773932333029));
            map.setZoom(11);
        });

        $("#zoomToStudy4").click(function(){
            map.setCenter(new google.maps.LatLng(40.210850123794955, -75.367334983140267));
            map.setZoom(10);
        });

        $("#zoomToStudy5").click(function(){
            map.setCenter(new google.maps.LatLng(40.007663105527399, -75.13417520195253));
            map.setZoom(11);
        });

        $("#zoomToStudy6").click(function(){
            map.setCenter(new google.maps.LatLng(39.877816891219368 , -74.668206522675518));
            map.setZoom(10);
        });

        $("#zoomToStudy7").click(function(){
            map.setCenter(new google.maps.LatLng(39.803681644785684 , -74.959910690527067));
            map.setZoom(10);
        });

        $("#zoomToStudy8").click(function(){
            map.setCenter(new google.maps.LatLng(39.71707679705645, -75.141080460542355));
            map.setZoom(10);
        });

        $("#zoomToStudy9").click(function(){
            map.setCenter(new google.maps.LatLng(40.283472954035688,-74.701779040344604));
            map.setZoom(11);
        });

        google.maps.event.addListener(map, 'click', function() {
            data4b.revertStyle();
        });
        // Adjust LatLngBounds if larger area needed
        // bounds of the desired area
        var allowedBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(38.689713, -78.275104), // Southwest
            new google.maps.LatLng(41.463231, -72.336994)  // Northeast
        );
        var lastValidCenter = map.getCenter();

        google.maps.event.addListener(map, 'center_changed', function() {
            if (allowedBounds.contains(map.getCenter())) {
                // still within valid bounds, so save the last valid position
                lastValidCenter = map.getCenter();
                return; 
            }

            // not valid anymore => return to last valid position
            map.panTo(lastValidCenter);
        });
    }
        google.maps.event.addDomListener(window, 'load', initialize);

