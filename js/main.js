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
              if (feature.getProperty('circuit') === dataLayer) {
              data4.overrideStyle(feature, { strokeOpacity: 1,});
              }
            })
           data4b.revertStyle();
        }
        else {
            data4.forEach(function (feature) {
              if (feature.getProperty('circuit') === dataLayer) {
                data4.overrideStyle(feature, { strokeOpacity: .0,});
              }
            })
            data4b.forEach(function (feature) {
              if (feature.getProperty('circuit') === dataLayer) {
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
    fullscreenControl: false,
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
         $.getJSON('https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_Boundaries/FeatureServer/1/query?where=DVRPC_REG%3D%27Yes%27&outFields=STATE%20+CO_NAME&geometryPrecision=5&outSR=4326&f=pgeojson', function(d) {
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
      'Existing': '#7EB238',
      'In Progress': '#fdae61',
      'Pipeline': '#AF46A4',
      'Planned': '#329aa7'
     
    };
    
    function styles(feature) {
    return {
        strokeWeight: 3,
        strokeOpacity: .8,
        strokeColor: dataColors[feature.getProperty('circuit')],
    }
  }

    data4 = new google.maps.Data();
    $.getJSON('https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/CircuitTrails/FeatureServer/0/query?where=1%3D1&outFields=*&geometryPrecision=5&outSR=4326&f=pgeojson', function(d) {
    data4.addGeoJson(d, {idPropertyName: 'objectid'});
    data4.setStyle(styles);
    data4.setMap(map);
    });
  
      data4.addListener('click', function(e) {
          data4.revertStyle();
          data4.overrideStyle(e.feature,{ 
              strokeOpacity: .7,   
              strokeColor: '#ff0000' ,
              strokeWeight: 5
      });
      });   
    
      data4.addListener('click', function(e) {
          
        if (e.feature.getProperty('surface') == null ){ var SURFACE = ''}
        else { var SURFACE = '<b>Surface: </b>'+e.feature.getProperty('surface')+'<br>'  ;}

        if (e.feature.getProperty('facility') == null ){ var FACILITY = ''}
        else { var FACILITY= '<b>Facility Type: </b>'+e.feature.getProperty('facility')+'<br>'  ;}

        if (e.feature.getProperty('circuit') == 'Existing' ){ var TypeColor = '#7EB238'}
        else if (e.feature.getProperty('circuit') == 'In Progress' ){ var TypeColor = '#fdae61'}
        else if (e.feature.getProperty('circuit') == 'Pipeline' ){ var TypeColor = '#AF46A4'}
        else { var TypeColor= '#329aa7'  ;}

        var content = '<div id="infoheader-text" style="background-color: '+TypeColor+'; color: #fff !important; border-color: #d0e1e1; padding: 0px ; border-radius: 5px;margin-top:2px"><p style="text-align:center;margin-top:5px;font-weight: bold;font-size:larger;">' + e.feature.getProperty('main_trail') + '</p></div>'     
    
                //  +'<b>Primary Trail Name: </b>'+e.feature.getProperty('MAIN_TRAIL')+'<br>'
                   +'<b>Description: </b>'+e.feature.getProperty('name')+'<br>'
                   +'<b>Length (mi): </b>'+ numeral(e.feature.getProperty('length')).format('0.00')+'<br>'
                      //  numeral(props.TTCost).format('($0,0.0)')
                   +'<b>Trail Status: </b>'+e.feature.getProperty('circuit')+'<br>'
                   + SURFACE
                   + FACILITY ;

        $('#info-bar').html(content);
      }); 
    
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
            data4.revertStyle();
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
