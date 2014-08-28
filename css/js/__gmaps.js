  $(document).on("pageinit", "#map_page", function() {
                var map=initialize();
                var markerSalida=addMarcadorSalida(map); //salida
                var markerComida=addMarcadorComida(map); // Comida-Dorsales
                //addInfoSalida(map,markerSalida);
                //addInfoComida(map,markerComida);

                var contentSalida="<div style='text-align:center'>Salida - Meta<br/>Calle la Marquesa,Ayora</div>";
         	    var infoSalida = new google.maps.InfoWindow({content: contentSalida});
         	    google.maps.event.addListener(markerSalida, 'click', function() {
         	    	infoComida.close();
         	    	infoSalida.open(map,markerSalida);
                });
       
         	   var contentComida="<div style='text-align:center'>Recogida Dorsales - Comida<br/>Polideportivo, Ayora</div>";
         	  var infoComida = new google.maps.InfoWindow({content: contentComida});
       	    
         	    google.maps.event.addListener(markerComida, 'click', function() {
         	    	infoSalida.close();
         	    	infoComida.open(map,markerComida);
                });
                
                //                addMe(map);
            });
 
  var salida=new google.maps.LatLng(39.060433,-1.05649);
  var comida=new google.maps.LatLng(39.060677,-1.061575);

  function initialize() 
    {               
	   var map;
	   
	   
	   var opciones = {
				zoom:15,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: salida
	   };
	   
	   map = new google.maps.Map(
		                  document.getElementById("map_canvas"), 
						  opciones);
	    
	    return map;
    }
   
   
   function addMarcadorSalida(map){
    	var marker;
    	
    	marker=new google.maps.Marker({
    		position:salida,
    		map: map,
    	});

    	
	    return marker;
   }

   function addMarcadorComida(map){
   	var marker;
   	
   	marker=new google.maps.Marker({
   		position:comida,
   		map: map,
   	});

   	
	    return marker;
  }
  
   
   function addInfoSalida(map, marker){
	   var content="<div style='text-align:center'>Salida - Meta<br/>Calle la Marquesa,Ayora</div>";

	   var info = new google.maps.InfoWindow({
		    content: content,
		    maxWidth: 100
			 });
		info.open(map,marker);
   }

   function addInfoComida(map, marker){
	   var content="<div style='text-align:center'>Recogida Dorsales - Comida<br/>Polideportivo, Ayora</div>";
	   var info = new google.maps.InfoWindow({
		    content: content,
		    maxWidth: 100
			 });

		info.open(map,marker);
   }

   
   
   function addMe(map){
	   if (navigator.geolocation) {
		   function tenemosPos(pos) {
			   var miPos=new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

				new google.maps.Marker({
					position:miPos,
					map: map
				});
		   }
		   
		   function fallo(error) {
		        console.log("Error:"+error.message);
		   }

		   navigator.geolocation.getCurrentPosition(
		  		tenemosPos, 
		  		fallo, 			
		  		{enableHighAccuracy:true,
		  		 timeout: 6000, 
		  		 maximumAge: 500000}
		  );
		  } 
   }
    
