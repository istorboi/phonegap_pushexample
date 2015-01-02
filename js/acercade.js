/*******************  auxiliares      ***************************/
var pg=false;
var URL_REST_BASE ="http://www.miagendainfantil.com/miarest4/";
var URL="http://www.miagendainfantil.com/";


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

function okAlert()
{
}
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
		
	//	$('#controlDiario').trigger('create');
		   
	}else	{	
	      $('.headerh1').each(function() {
		    $(this).parent().css("padding-top", "0px");
		  });
		
	}
}

/************************  fin auxiliares ************************/

function onLoad() {
		document.addEventListener("deviceready", onDeviceReady, false); 
}

function onDeviceReady() {
	
	verificarAccesoInternet();
	protectHeaderiOS();
	deviceinformation();
 } 


function deviceinformation()
{
	$("#aboutMIA").html("7.0.0");
	$("#aboutApache").html(device.cordova);
	$("#aboutModelo").html(device.model);
	$("#aboutUUID").html(device.uuid);
	$("#aboutPlataforma").html(device.platform);
	$("#aboutVersion").html(device.version);
		
}

