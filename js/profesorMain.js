/*******************  auxiliares      ***************************/
var pg=false;
var URL_REST_BASE ="http://www.miagendainfantil.com/miarest3/";
var URL="http://www.miagendainfantil.com/";


function desconectarse(){
	  window.localStorage.removeItem("id_profesor");
	  window.localStorage.removeItem("idioma");
	  window.localStorage.removeItem("nombre_profesor");
	  window.localStorage.removeItem("logo_centro");
      window.localStorage.removeItem("id_centro");
      window.localStorage.removeItem("tel");
      window.localStorage.removeItem("pass");
	  window.location.replace("index.html");
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

function okAlert()
{
}

/************************  fin auxiliares ************************/



function onLoad() {
		document.addEventListener("deviceready", onDeviceReady, false); 
}
function onDeviceReady() {
	ajaxProfesorGetAulasAlumnos();
} 


function ajaxProfesorGetAulasAlumnos()
{
    
    if (!verificarAccesoInternet()) return;  
    
     $id_profesor=window.localStorage.getItem("id_profesor");
	$.ajax({
             type:'GET',
             url: URL_REST_BASE +'restapi/profesorGetAulasAlumnos.php',
             data:{id_profesor:  $id_profesor},
             dataType: 'jsonp',
             jsonp: 'callback',
             jsonpCallback: 'callBackListaAulasAlumnos',
             success: function(){},
             error: function(){}
         });
     
     
}
function callBackListaAulasAlumnos(data)
{
      var obj = jQuery.parseJSON(data);
      var numAulas = obj.aulas.length;
   
     $("#profFotoSubirListaAlumnos").empty();
     
     var i=0;
     for( i=0;i<numAulas;i++)
     {
         //<div data-role="collapsible">
         //<h3>Clase 1</h3>
         //<div data-role="fieldcontain">
         //    <fieldset data-role="controlgroup" >
         //    <label for="clase_1">Clase 1</label><input type="checkbox"  onclick="checkAlumnos('clase_1')" id="clase_1" name="clase_1">
         //    </fieldset>
         //</div>
         //</div>

         var aula = obj.aulas[i];
         var numAlumnos = aula.alumnos.length;
         var contenido="";   
         contenido+='<div data-role="collapsible">';
         contenido+='<h3>'+aula["nombre_aula"] +'</h3>';
         contenido+='<div data-role="fieldcontain">';
         contenido+='<fieldset data-role="controlgroup" >';
         contenido+='<label style="color:#38c;" for="clase_'+aula["id_aula"]+'">'+aula["nombre_aula"] +'</label><input type="checkbox"  onclick="checkAlumnos(\'clase_'+aula["id_aula"]+'\')" id="clase_'+aula["id_aula"]+'" name="clase_'+aula["id_aula"]+'">';
     
         for (var j=0; j<numAlumnos;j++)
         {
             var alumno = aula.alumnos[j];
             contenido+='<label for="alumno_'+alumno["id_Alumno"]+'">'+ alumno["nombre_alumno"] + ' ' + alumno["apellidos_alumno"]    +'</label><input type="checkbox" data-clase="clase_'+ aula["id_aula"]   +'" id="alumno_'+alumno["id_Alumno"]+'" name="alumno_'+alumno["id_Alumno"]+'">';
             
         }
         contenido+='</fieldset>';
         contenido+='</div>';
         contenido+='</div>';
         $("#profFotoSubirListaAlumnos").append(contenido);
     }    
       
   
}


function subirFotoCamara()
{
    
	navigator.camera.getPicture(onCameraSuccess, onCameraFail, 
	{  quality : 20,
		  destinationType : Camera.DestinationType.DATA_URI,
		  sourceType : Camera.PictureSourceType.CAMERA,
		  allowEdit : false,
		  encodingType: Camera.EncodingType.JPEG,
		  targetWidth: 50,
		  targetHeight: 50,
		  popoverOptions: CameraPopoverOptions,
		  saveToPhotoAlbum: true }
	);

	
	
	
}

 function subirFotoGaleria(){
		navigator.camera.getPicture(onCameraSuccess, onCameraFail, 
				{ quality : 20,
					  destinationType : Camera.DestinationType.DATA_URI,
					  sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
					  allowEdit : false,
					  encodingType: Camera.EncodingType.JPEG,
					  targetWidth: 50,
					  targetHeight: 50,
					  popoverOptions: CameraPopoverOptions,
					  saveToPhotoAlbum: true }
				);
	 
	 
	 
 }
 var retries = 0;
 function clearCache() {
	    navigator.camera.cleanup();
	}
 
 function onCameraSuccess(fileURI) {
	 var win = function (r) {
	        clearCache();
	        retries = 0;
	        alert('Done!');
	    }
	 
	    var fail = function (error) {
	        if (retries == 0) {
	            retries ++
	            setTimeout(function() {
	            	onCameraSuccess(fileURI)
	            }, 1000)
	        } else {
	            retries = 0;
	            clearCache();
	            alert('Ups. Something wrong happens!');
	        }
	    }
	 
	    var options = new FileUploadOptions();
	    options.fileKey = "file";
	    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
	    options.mimeType = "image/jpeg";
	    options.params = {}; // if we need to send parameters to the server request
	    options.chunkedMode = false;
	    options.trustEveryone=true;
	    var ft = new FileTransfer();
	    ft.upload(fileURI, encodeURI( URL_REST_BASE + "restapi/fotoUpload.php" ), win, fail, options);
}
	 
function onCameraFail(message) {
	navigator.notification.alert('Error',okAlert,'MIA',message);
}
 



 

 function checkAlumnos(clase)
 {   //marca o desmarca los alumnos de una clase 
     var value = $("#"+clase).is(':checked');    
     $('[data-clase="'+clase+'"]').prop('checked', value);
     $("#profFotoSubir div[data-role='content']").trigger("create");
 }   

