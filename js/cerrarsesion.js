/*******************  auxiliares      ***************************/
var pg=false;
var URL_REST_BASE ="http://miagendainfantil.com/miarest4/";
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
	
 } 


function dialogCerrarSesion()
{
	navigator.notification.confirm("¿Deseas salir ahora?", cerrarCallback, "Salir", "Salir,Cancelar");
}

function cerrarCallback(index)
{
	
	if (index==1)  desconectarse()
	else
	{	//voler a la pagina main
		window.location.replace("main.html");
	
	}
	
}

function desconectarse()
{
	
	
	
	//borramos variables 
	  localStorage.removeItem("id_alumno");
	  localStorage.removeItem("id_profesor");
	  localStorage.removeItem("id_tutor");
	  localStorage.removeItem("nombre_tutor");
	  localStorage.removeItem("idioma");
	  localStorage.removeItem("numero_hijos");
	  localStorage.removeItem("tel");
	  localStorage.removeItem("pass");
	 // localStorage.removeItem("notificaciones"); no se borran solo se registra el telefono una vez
	   
	  cerrarsesionservidor();  
	  
	  
	  
	  
	  
	  //window.location.replace("index.html");
}

function cerrarsesionservidor()
{
  	
	if(!verificarAccesoInternet()) return;
		
		$uuid = localStorage.getItem("uuid");
		
		// alert ($uuid);
			
		
	    $.ajax({
	            type:'GET',
	            url: URL_REST_BASE +'restapi/cerrarsesionservidor_100000.php',
	            data:{uuid : $uuid},
	            dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'cerrarsesionCallback',
                success: function(){
           	    $.mobile.loading( "hide");
           	    queryRealizada=true;
              },
              success: function(){
            	  window.location.replace("index.html");
             },
              error: function(){
            	  window.location.replace("index.html");
             }
        
       });
	    
		
	    //alert ("borrar fin: cerrarsesionservidor");
	    
}

function cerrarsesionCallback(data)
{
	//alert("borrar cerrarsesionCallback");
	// alert(data);
}
