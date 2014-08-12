var URL_REST_BASE ="http://www.miagendainfantil.com/rest/rest_1_0_1/";
function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false); 
}
function onDeviceReady() {
	
	alert(device.platform);
	if(device.platform=="Android" || device.platform=="android")
	{
		alert("plataforma Android");
		var pushNotification = window.plugins.pushNotification;
		pushNotification.register(successHandlerAndroid, errorHandler,{"senderID":"222758583205","ecb":"onNotificationGCM"});
	}
	if(device.platform=="iOS" || device.platform=="ios")
	{
		alert("plataforma ios");
		var pushNotification = window.plugins.pushNotification;
		pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
    	
		
		
	}
}

function successHandlerAndroid(result) {
    alert('Callback Success2! Result = '+result)
};

function errorHandler(error) {
    alert(error);
};
function onNotificationGCM(e) {
	alert("onNotificationGCM2 "+ e);
    switch( e.event )
    {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                //console.log("Regid " + e.regid);
                alert('registration id = '+e.regid);
                
                $id_tutor=54;
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
                    			alert("Servicio de Alertas activado para su dispositivo");
                   		
                    },
                    error: function(){
                   	 		alert("Borrar dispositivo ya registrado");
                   }
                   
       	
               });
                
                
                
            }
        break;

        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
          alert('message = '+e.message+' msgcnt = '+e.msgcnt);
        break;

        case 'error':
          alert('GCM error = '+e.msg);
        break;

        default:
          alert('An unknown GCM event has occurred');
          break;
    }
	
};


function onNotificationAPN(e) {
    if (e.alert) {
         $("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
         // showing an alert also requires the org.apache.cordova.dialogs plugin
         navigator.notification.alert(e.alert);
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
	alert("borrar tokenhandler:" + result);
	
	
	
	 $id_tutor=54;
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
         			alert("Servicio de Alertas activado para su dispositivo");
        		
         },
         error: function(){
        	 		alert("Borrar dispositivo ya registrado");
        }
        

    });
	
	
    //$("#app-status-ul").append('<li>token: '+ result +'</li>');
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
}




function dispositivoRegistrarCallback()
{
	
}



