var map;
var marcadorGuarderia;
var URL_REST_BASE ="https://www.miagendainfantil.com/miarest162/";


function protectHeaderiOS()
{
	if( (device.platform=="iOS" || device.platform=="ios") && (parseFloat(window.device.version) >= 7.0)) {
		$('.headerh1').each(function() {
	         // `this` is the h1, the padding goes on the
	         // containing header div.
	         $(this).parent().css("padding-top", "20px");
	         // sort any buttons/icons rendered from A tags too
	         $(this).siblings('A').css("margin-top", "20px");
	          
	      });
		
		$('#controlDiario').trigger('create');
		   
	}else	{	
	      $('.headerh1').each(function() {
		    $(this).parent().css("padding-top", "0px");
		  });
		
	}
}

function verificarAccesoInternet()
{
    var estado=true;
    if (navigator.network.connection.type==Connection.NONE)
	{ 
    	navigator.notification.alert('Se necesita conexión a internet',okAlert,'MIA','Cerrar');
    	estado = false;
	}
    return estado;
 }





function onDeviceReady() {

	protectHeaderiOS();	
	
	
$(document).on("pagecreate", "#map-page", function() {
	if(!verificarAccesoInternet()) return;
	
	
	//quitamos el boton hijos del nav bas si solo tenemos 1 hijo
    if ( window.localStorage.getItem("numero_hijos")==1)
	{
    	$("#mapaliHijos").remove();
    }
		
	
	
});
};

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false); 
//}
//function onDeviceReady() {
	//initialize();
	
	$id_centro=window.localStorage.getItem("id_centro");
	$id_tutor=window.localStorage.getItem("id_tutor");
	$cv = window.localStorage.getItem("cv");
	//new api 162
	//FALTA PROBAR

	
	$(".logo_centro").attr("src",window.localStorage.getItem("logo_centro"));
	//alert("onloadmapa");
	   $.ajax({
           type:'GET',
//           url: 'http://www.miagendainfantil.com/miarest2/restapi/centroGetDetalle.php',
           url: URL_REST_BASE +'restapi/centroGetDetalle.php',         
           data:{id_centro: $id_centro,cv:$cv, id_tutor:$id_tutor},
           dataType: 'jsonp',
           jsonp: 'callback',
           jsonpCallback: 'centroCallback',
                               
               success: function(){
             //      alert("success");
               }
           });
	
}

function centroCallback(data)
{
	var obj = jQuery.parseJSON(data);
        obj.fichareducida_imagen;
      
    
    var latlng = new google.maps.LatLng(obj.latitud_centro, obj.longitud_centro);
    var myOptions = {zoom: 15, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP    };
    map = new google.maps.Map(document.getElementById("map-canvas"),  myOptions);
    marcadorGuarderia = new google.maps.Marker( { position: latlng, map:map })
    
    var contentMarcador="<div style='text-align:center, width:100px;'>"+obj.nombre_comercial+" <br/>"+obj.direccion_centro+" <br/>"+obj.cp_centro+" "+obj.poblacion_centro+"</br> <a href='tel:"+obj.telefono_centro+"'>  Tel: "+obj.telefono_centro+"</a></div>";
    
    
    //var contentMarcador="<div style='text-align:center'>Guarderia MIA <br/>Avda Tarongers 1  <br/> 46022 valencia </br> Tel: 963870001</div>";
    var infoGuarderia = new google.maps.InfoWindow({content: contentMarcador});
    google.maps.event.addListener(marcadorGuarderia, 'click', function() {
        infoGuarderia.open(map,marcadorGuarderia);
    });

    
    
}

function initialize() {
    var latlng = new google.maps.LatLng(39.48, -0.3470);
    var myOptions = {zoom: 15, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP    };
    map = new google.maps.Map(document.getElementById("map-canvas"),  myOptions);
    marcadorGuarderia = new google.maps.Marker( { position: latlng, map:map })
    
    var contentMarcador="<div style='text-align:center'>Guarderia MIA <br/>Avda Tarongers 1  <br/> 46022 valencia </br> Tel: 963870001</div>";
	    var infoGuarderia = new google.maps.InfoWindow({content: contentMarcador});
	    google.maps.event.addListener(marcadorGuarderia, 'click', function() {
	    	
	    	infoGuarderia.open(map,marcadorGuarderia);
    });

    
    
    
}
  
function mostrarUbicacion(){
	// Todo3: invocar al metodo getcurrentPosition indicandole que use la máxima precisión, en caso de ir bien
	//se llamara a la funcion lecturaGPS
//	navigator.geolocation.getCurrentPosition( lecturaGPS , errorGPS , {enableHighAccuracy:true} );  
}
  
function lecturaGPS(ubicacion){
	//alert("todo fue bien");
	//Todo 4: en la fucnion lecturaGPS recuperar la latitud y la longitud y crear un nuevo marcador con la posicion actual
	
	  var miubicacion = new google.maps.LatLng(ubicacion.coords.latitude, ubicacion.coords.longitude);
	  map.setCenter(miubicacion);
	//  marcador.setPosition(miubicacion);
	var marcador2 = new google.maps.Marker( { position: miubicacion, map:map })
}
  
function errorGPS(){
	//  alerta(" Error leyendo gps");
}


/******************* funciones footer  *****************************/


$(document).on("pagecreate",  function() {
	
	
	//quitamos el boton hijos del nav bas si solo tenemos 1 hijo
	if ( window.localStorage.getItem("numero_hijos")==1)
	{
		$( "#liHijos" ).remove();
	}
	
	$(".logo_centro").attr("src",window.localStorage.getItem("logo_centro"));
	
	
	
});


function irListaHijos()
{
	//window.location.replace("index.html");
	window.location.replace("index.html#seleccionarAlumnoTmp");
}

function desconectarse(){
	//borramos variables 
	  window.localStorage.removeItem("id_tutor");
	  window.localStorage.removeItem("nombre_tutor");
	  window.localStorage.removeItem("idioma");
	  window.localStorage.removeItem("numero_hijos");
	  window.localStorage.removeItem("tel");
	  window.localStorage.removeItem("pass");
	  window.localStorage.removeItem("cv");
	   
	  location.replace("index.html");
}
