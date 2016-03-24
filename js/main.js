    var map;
	var MY_MAPTYPE_ID = 'Base Map';
    var streetViewService = new google.maps.StreetViewService();
	var geoJsonObject;
  
	var region = new google.maps.LatLng(39.950143, -75.170669);
 	    
    function toggleLayer(dataLayer,id){
        if ($('#'+id).is(':checked')){
            dataLayer.setMap(map);
        }
        else {
            dataLayer.setMap(null);
        }
    };  
        
	function initialize() {
  //  $('#aboutModal').modal();
/* var stylez = [{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#f5f5f5"}]},
{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},
{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#f5f5f5"}]},
{"featureType":"poi","elementType":"all","stylers":[{"color":"#cdd7cd"}]},
{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},
{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},
{"featureType":"road.highway","elementType":"all","stylers":[{"color":"#e0e0e0"}]},
{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},
{"featureType":"road.arterial","elementType":"all","stylers":[{"color":"#e0e0e0"}]},
{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"visibility":"on"}]},
{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"},{"color":"#e0e0e0"}]},
{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},
{"featureType":"transit.station","elementType":"geometry.fill","stylers":[{"color":"#e0e0e0"}]},
{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#a5b4c8"}]},
{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]}];
*/
// var stylez = [{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}];
  var stylez = [{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"geometry.fill","stylers":[{"lightness":"-47"},{"visibility":"on"},{"color":"#37b2bd"}]},{"featureType":"administrative.neighborhood","elementType":"geometry.stroke","stylers":[{"color":"#37b2bd"},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"},{"hue":"#ff0000"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","elementType":"all","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#75cfd7"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}];

  // Create a simple map.
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: {lat: 39.950143, lng:-75.170669 },
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

	    data4 = new google.maps.Data();
	    data4.loadGeoJson('data/existing.js');
    	data4.setMap(map);
    	data4.setStyle(function (feature) {
		    return {   
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
            var content = '<h4 style="color:white;background-color:#8dc63f;padding:8px">'
                      //  +'<img style="margin:0px 0px 0px 0px" src="img/bikeped.png"/>'
                        + e.feature.getProperty('NAME')+'</h4>'
                      //   +'<b>Name: </b>'+e.feature.getProperty('NAME')
                		 +'<b>Trail Status: </b>'+e.feature.getProperty('CIRCUIT');

	        $('#info-bar').html(content);
        });		
	
        data5 = new google.maps.Data();
    	data5.loadGeoJson('data/inprogress.js');
    	data5.setMap(map);
    	data5.setStyle(function (feature) {
    		return {   
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
                var content = '<h4 style="color:white;background-color:#fdae61;padding:8px">'
                      //  +'<img style="margin:0px 0px 0px 0px" src="img/bikeped.png"/>'
                        + e.feature.getProperty('NAME')+'</h4>'
                      //   +'<b>Name: </b>'+e.feature.getProperty('NAME')
                         +'<b>Trail Status: </b>'+e.feature.getProperty('CIRCUIT');

            $('#info-bar').html(content);
        });


        data6 = new google.maps.Data();
        data6.loadGeoJson('data/planned.js');
        data6.setMap(map);
        data6.setStyle(function (feature) {
            return {   
                strokeColor: '#005789',
                strokeWeight: 3,
                clickable: true
            }
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
               var content = '<h4 style="color:white;background-color:#005789;padding:8px">'
                      //  +'<img style="margin:0px 0px 0px 0px" src="img/bikeped.png"/>'
                        + e.feature.getProperty('NAME')+'</h4>'
                      //   +'<b>Name: </b>'+e.feature.getProperty('NAME')
                         +'<b>Trail Status: </b>'+e.feature.getProperty('CIRCUIT');

            $('#info-bar').html(content);
        });

        //County Bndy
         $.getJSON('data/cnty.js', function(d) {
            var data = new google.maps.Data({map: map, style:{
                clickable: false,
                zIndex:10,
                 fillOpacity: .0,   
                 strokeColor: 'grey',
                 strokeWeight: 3
                     }});
            data.addGeoJson(d);
         });

        
        $("#zoomToRegion").click(function(){
            map.setCenter(new google.maps.LatLng(39.950143, -75.170669));
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
    }
        google.maps.event.addDomListener(window, 'load', initialize);

