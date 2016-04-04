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
            dataLayer.setMap(map);
        }
        else {
            dataLayer.setMap(null);
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

	    data4 = new google.maps.Data();
	    data4.loadGeoJson('data/existing.js');
    	data4.setMap(map);
    	data4.setStyle(function (feature) {
		    return {   
                zIndex: 200,
                strokeColor: '#8dc63f',
               // strokeColor: '#8dc740',
			    strokeWeight: 3,
        		fill: true,
        		clickable: true
	        }
		});
	
        data4.addListener('click', function(e) {
    	    data4.revertStyle();
            data5.revertStyle();
            data6.revertStyle();
            data4.overrideStyle(e.feature,{ 
                strokeOpacity: .7,   
                strokeColor: '#ff0000' ,
                strokeWeight: 5
		    });
        });		
		
        data4.addListener('click', function(e) {
            var content = //'<h4 style="color:white;background-color:#8dc63f;padding:8px">'
                      //  +'<img style="margin:0px 0px 0px 0px" src="img/bikeped.png"/>'
                     //   + e.feature.getProperty('NAME')+'</h4>'
                      //   +'<b>Name: </b>'+e.feature.getProperty('NAME')
                         '<b>Name: </b>'+e.feature.getProperty('NAME')+'<br>'
                		 +'<b>Trail Status: </b>'+e.feature.getProperty('CIRCUIT');

	        $('#info-bar').html(content);
        });		
	
      data5 = new google.maps.Data();
    	data5.loadGeoJson('data/inprogress.js');
    	data5.setMap(map);
    	data5.setStyle(function (feature) {
    		return {   
                zIndex: 202,
                strokeColor: '#fdae61',
    			strokeWeight: 3,
        		clickable: true
	        }
	   	});
	
        data5.addListener('click', function(e) {
    	    data6.revertStyle();
            data5.revertStyle();
            data4.revertStyle();
            data5.overrideStyle(e.feature,{ 
                strokeOpacity: .7,   
                strokeColor: '#ff0000' ,
                strokeWeight: 5
    		});
        });		
		
        data5.addListener('click', function(e) {
                var content = //'<h4 style="color:white;background-color:#fdae61;padding:8px">'
                      //  +'<img style="margin:0px 0px 0px 0px" src="img/bikeped.png"/>'
                      //  + e.feature.getProperty('NAME')+'</h4>'
                           '<b>Name: </b>'+e.feature.getProperty('NAME')+'<br>'
                         +'<b>Trail Status: </b>'+e.feature.getProperty('CIRCUIT');

            $('#info-bar').html(content);
        });


        data6 = new google.maps.Data();
        data6.loadGeoJson('data/planned.js');
        data6.setMap(map);
        data6.setStyle(function (feature) {
            return {   
                zIndex: 201,
             //   strokeColor: '#005789',
                strokeColor: '#008192',
                strokeWeight: 3,
                clickable: true
            //    strokeWeight: map.getZoom()>14?5:3
            };
        });

        data6.addListener('click', function(e) {
            data6.revertStyle();
            data5.revertStyle();
            data4.revertStyle();
            data6.overrideStyle(e.feature,{ 
                strokeOpacity: .7,   
                strokeColor: '#ff0000' ,
                strokeWeight: 5
            });
        });     
        
        data6.addListener('click', function(e) {
               var content = //'<h4 style="color:white;background-color:#005789;padding:8px">'
                       // + e.feature.getProperty('NAME')+'</h4>'
                         '<b>Name: </b>'+e.feature.getProperty('NAME')+'<br>'
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
            data4.revertStyle();
            data5.revertStyle();
            data6.revertStyle();
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

