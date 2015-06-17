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
	alert("RegistrarDispositivo");
	
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

var datosobj=null

function RegistrarDispositivoConCallback(obj) {
	
	//alert("RegistrarDispositivoConCallback");
	datosobj=obj;
	
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
	
    switch( e.event )
    {
        case 'registered':
        	
            if ( e.regid.length > 0 )
            {
             	if (localStorage.getItem("id_tutor")) 
            	{	
             		//registro alumno
             		$id_tutor=localStorage.getItem("id_tutor");
	                $plataforma="Android";
	                $registro_plataforma=e.regid;
	                
	                $.ajax({
	                    type:'GET',
	                    url: URL_REST_BASE + 'restapi/dispositivoRegistrarTutor.php',
	                    data:{id_tutor:$id_tutor, plataforma: $plataforma, registro_plataforma:$registro_plataforma},
	                     dataType: 'jsonp',
	                    jsonp: 'callback',
	                    jsonpCallback: 'dispositivoRegistrarCallback',
	                    success: function(){
	                    			//alert("Servicio de Alertas activado para su dispositivo");
	                    			navigator.notification.alert('Servicio de Alertas activado para su dispositivo',okAlert,'MIA','Cerrar');
	                    			localStorage.setItem("notificaciones",true);
	                    			loginCallbackDespuesRegistrar(datosobj);
	                    },
	                    error: function(){
	                   	 		//alert("Error: Borrar dispositivo ya registrado");
	                    	loginCallbackDespuesRegistrar(datosobj);
	                   }
	                });
            	}else{ //registro profesor
            		
            		
             		$id_profesor=localStorage.getItem("id_profesor");
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
	                    			localStorage.setItem("notificaciones",true);
	                    			loginCallbackDespuesRegistrar(datosobj);
	                    },
	                    error: function(){
	                   	 		//alert("Borrar dispositivo ya registrado");
	                    		loginCallbackDespuesRegistrar(datosobj);
	                   }
	                });
            		
            		
            	}
                
                
            }
        break;

        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
         // alert('message = '+e.message+' msgcnt = '+e.msgcnt);
         /*
        	 if (e.foreground) {
                 alert('FOREGROUND MSG:' + JSON.stringify(e));
             } else if (e.coldstart) {
                 alert('COLDSTART MSG:' + JSON.stringify(e));
             } else {
                 alert('BACKGROUND:' + JSON.stringify(e));
                // navigator.notification.alert('BACKGROUND:' + e.message ,okAlertNotificacion,'MIA-Aviso','Cerrar');
             }
             break;
        	*/
        	
          navigator.notification.alert(e.message ,okAlertNotificacion,'MIA-Aviso','Cerrar');
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
	
	
	if (localStorage.getItem("id_tutor")) 
	{	//registro alumno
 		$id_tutor=localStorage.getItem("id_tutor");
 		$plataforma="iOS";
 		$registro_plataforma=result;
 		$.ajax({
 			type:'GET',
 			url: URL_REST_BASE + 'restapi/dispositivoRegistrarTutor.php',
 			data:{id_tutor:$id_tutor, plataforma: $plataforma, registro_plataforma:$registro_plataforma},
 			dataType: 'jsonp',
 			jsonp: 'callback',
 			jsonpCallback: 'dispositivoRegistrarCallback',
 			success: function(){
         			navigator.notification.alert('Servicio de Alertas activado para su dispositivo',okAlert,'MIA','Cerrar');
         			localStorage.setItem("notificaciones",true);
         			loginCallbackDespuesRegistrar(datosobj);
        	},
 			error: function(){
        	 		//alert("Borrar dispositivo ya registrado");
 					loginCallbackDespuesRegistrar(datosobj);
 			}
        });
	}else{
		$id_profesor=localStorage.getItem("id_profesor");
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
            			localStorage.setItem("notificaciones",true);
            },
            error: function(){
           	 		//alert("Borrar dispositivo ya registrado");
           }
        });
		
	}
	
}


function dispositivoRegistrarCallback()
{
	
}

