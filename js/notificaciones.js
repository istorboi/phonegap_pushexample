/*******************  auxiliares      ***************************/
var pg=false;

var URL_REST_BASE ="https://www.miagendainfantil.com/miarest162/";
//var URL_REST_BASE2 ="https://www.miagendainfantil.com/miarest4/";
var URL="https://www.miagendainfantil.com/";
var MIAVERSION="110000";

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

/************************  fin auxiliares ************************/

/*

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false); 
}
function onDeviceReady() {
	verificarAccesoInternet();
}
*/

function RegistrarDispositivo() {
	

	if(device.platform=="Android" || device.platform=="android")
	{
		//alert("plataforma Android");
		var pushNotification = window.plugins.pushNotification;
		pushNotification.register(successHandlerAndroid, errorHandler,{"senderID":"392135470400","ecb":"onNotificationGCM"});
		
		
		
	}
	if(device.platform=="iOS" || device.platform=="ios")
	{
		//alert("plataforma ios");
		var pushNotification = window.plugins.pushNotification;
		pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
	}
}

function successHandlerAndroid(result) {
//	navigator.notification.alert('Dispositivo Registrado',okAlert,'MIA','Cerrar');

};

function errorHandler(error) {
//    alert(error);
};

//servicio Registro Google
function onNotificationGCM(e) {
	//alert("onNotificationGCM2 "+ e);
    switch( e.event )
    {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                //console.log("Regid " + e.regid);
               // alert('registration id = '+e.regid);
                
                
             	if (window.localStorage.getItem("id_tutor")) 
            	{	//registro alumno
             		$id_tutor=window.localStorage.getItem("id_tutor");
	                $plataforma="Android";
	                $uuid = window.localStorage.getItem("uuid");
	                $version=MIAVERSION;
	                $registro_plataforma=e.regid;
	            

	                $cv = window.localStorage.getItem("cv");
	                //new api 162
	                //FALTA PROBAR

	                
	                $.ajax({
	                    type:'GET',
	                    url: URL_REST_BASE + 'restapi/dispositivoRegistrarTutor_100000.php',
	                    data:{id_tutor:$id_tutor, plataforma: $plataforma, registro_plataforma:$registro_plataforma,uuid:$uuid,cv: $cv, version: $version },
	                     dataType: 'jsonp',
	                    jsonp: 'callback',
	                    jsonpCallback: 'dispositivoRegistrarCallback',
	                    success: function(){
	                    			//alert("Servicio de Alertas activado para su dispositivo");
	                    			navigator.notification.alert('Servicio de Alertas activado para su dispositivo Android',okAlert,'MIA','Cerrar');
	                    			window.localStorage.setItem("notificaciones",true);
	                    },
	                    error: function(){
	                   	 	//	alert("Error: Borrar dispositivo ya registrado");
	                   }
	                });
            	}else{ //registro profesor
             		$id_profesor=window.localStorage.getItem("id_profesor");
	                $plataforma="Android";
	                $registro_plataforma=e.regid;
	                
	                $.ajax({
	                    type:'GET',
	                    url: URL_REST_BASE + 'restapi/dispositivoRegistrarProfesor.php',
	                    data:{id_profesor:$id_profesor, plataforma: $plataforma, registro_plataforma:$registro_plataforma},
	                     dataType: 'jsonp',
	                    jsonp: 'callback',
	                    jsonpCallback: 'dispositivoRegistrarCallback',
	                    success: function(){
	                    			//alert("Servicio de Alertas activado para su dispositivo");
	                    			navigator.notification.alert('Servicio de Alertas activado para su dispositivo',okAlert,'MIA','Cerrar');
	                    			window.localStorage.setItem("notificaciones",true);
	                    },
	                    error: function(){
	                   	 		//alert("Borrar dispositivo ya registrado");
	                   }
	                });
            		
            		
            	}
                
                
            }
        break;

        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
          //alert('message = '+e.message+' msgcnt = '+e.msgcnt);
        	
        	if (e.message!=null)	
        	{
        		navigator.notification.alert(e.message ,okAlertNotificacion,'MIA-Aviso','Cerrar');
        	}
          break;
        case 'error':
        //  alert('Error del servicio de notificaciones = '+e.msg);
        break;

        default:
          //alert('An unknown GCM event has occurred');
          break;
    }
	
};

function okAlertNotificacion()
{
	 window.location.replace("main.html");
}

//notificaciones IOS
function onNotificationAPN(e) {
    if (e.alert) {
         //   $("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
         // showing an alert also requires the org.apache.cordova.dialogs plugin
      
         navigator.notification.alert(e.alert ,okAlert,'MIA-Aviso','Cerrar');
    }
        
    if (e.sound) {
        // playing a sound also requires the org.apache.cordova.media plugin
        var snd = new Media(e.sound);
        snd.play();
    }
    
    if (e.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
    }
}
function tokenHandler (result) {
	//alert("borrar tokenhandler:" + result);
	
	
	if (window.localStorage.getItem("id_tutor")) 
	{	//registro alumno
 		$id_tutor=window.localStorage.getItem("id_tutor");
 		$plataforma="iOS";
 		$uuid = window.localStorage.getItem("uuid");
 		$version=MIAVERSION;

 		$cv = window.localStorage.getItem("cv");
 		//new api 162
 		//FALTA PROBAR

 		
 		$registro_plataforma=result;
 		$.ajax({
 			type:'GET',
 			url: URL_REST_BASE + 'restapi/dispositivoRegistrarTutor_100000.php',
 			data:{id_tutor:$id_tutor, plataforma: $plataforma, registro_plataforma:$registro_plataforma,uuid: $uuid,cv: $cv , version: $version},
 			dataType: 'jsonp',
 			jsonp: 'callback',
 			jsonpCallback: 'dispositivoRegistrarCallback',
 			success: function(){
         			navigator.notification.alert('Servicio de Alertas activado para su dispositivo',okAlert,'MIA','Cerrar');
         			window.localStorage.setItem("notificaciones",true);
        	},
 			error: function(){
        	 		//alert("Borrar dispositivo ya registrado");
 			}
        });
	}else{
		$id_profesor=window.localStorage.getItem("id_profesor");
		$plataforma="iOS";
 		$registro_plataforma=result;
 		
        $.ajax({
            type:'GET',
            url: URL_REST_BASE + 'restapi/dispositivoRegistrarProfesor.php',
            data:{id_profesor:$id_profesor, plataforma: $plataforma, registro_plataforma:$registro_plataforma},
             dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'dispositivoRegistrarCallback',
            success: function(){
            			//alert("Servicio de Alertas activado para su dispositivo");
            			navigator.notification.alert('Servicio de Alertas activado para su dispositivo',okAlert,'MIA','Cerrar');
            			window.localStorage.setItem("notificaciones",true);
            },
            error: function(){
           	 		//alert("Borrar dispositivo ya registrado");
           }
        });
		
	}
	
}


function dispositivoRegistrarCallback(data)
{
	//alert (data);
}

