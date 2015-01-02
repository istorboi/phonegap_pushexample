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


var listadoAlumnos = new Array();


function onLoad() {
		document.addEventListener("deviceready", onDeviceReady, false); 
}
function onDeviceReady() {
    if (!verificarAccesoInternet()) return;  
    
    if (localStorage.getItem("id_profesor")=== null)
	{
		window.location.replace("index.html");
	}
    

	ajaxProfesorGetAulasAlumnos();
	ajaxProfesorGetTemasCentro();
} 

/************ menu panel  ******************/
$( document ).on( "pageinit",  function() {
    $( document ).on( "swipeleft swiperight",  function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft"  ) {
                $( "#right-panel" ).panel( "open" );
            } else if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});

/******************* fin menu panel **************/

function ajaxProfesorGetAulasAlumnos()
{
    
     $id_profesor=localStorage.getItem("id_profesor");
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
     
     listadoAlumnos = new Array(); //inicializamos el array
     
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
             listadoAlumnos.push('alumno_'+alumno["id_Alumno"]);        
         }
         contenido+='</fieldset>';
         contenido+='</div>';
         contenido+='</div>';
         $("#profFotoSubirListaAlumnos").append(contenido);
     }    
       
   
}

function ajaxProfesorGetTemasCentro()
{
    $id_profesor=localStorage.getItem("id_profesor");
    $id_centro=localStorage.getItem("id_centro");

    
    $.ajax({
            type:'GET',
            url: URL_REST_BASE +'restapi/fotoGetTemasCentro.php',
            data:{id_profesor:  $id_profesor, id_centro:  $id_centro},
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'temasCentroCallback',
            success: function(){
            	//alert("borrar success");
            },
            error: function(){
            	//alert("borrar error: obtener temas centro");
            }
        });	
}

function temasCentroCallback(data)
{	
    var obj = jQuery.parseJSON(data);
    var numTemas = obj.temas.length;
    $("#temaSelect").empty();
    var i=0;
    for( i=0;i<numTemas;i++)
    {
    	 //	<option value="0">Hombre</option>
         $("#temaSelect").append('<option value="'+obj.temas[i]["id"]+'">'+obj.temas[i]["tema"]+'</option>');
     }    
}


function ajaxCrearTema(){
	//$('[data-role=dialog]').dialog( "close" );
	 $('.ui-dialog').dialog('close');
	
	  $id_profesor=localStorage.getItem("id_profesor");
	  $id_centro=localStorage.getItem("id_centro");
	  $nuevo_tema=$("#idNuevaCarpetaNombre").val();
	    $.ajax({
	            type:'GET',
	            url: URL_REST_BASE +'restapi/fotoCrearTemaNuevo.php',
	            data:{id_profesor:  $id_profesor, id_centro:  $id_centro, nuevo_tema:$nuevo_tema},
	            dataType: 'jsonp',
	            jsonp: 'callback',
	            jsonpCallback: 'temasNuevoCallback',
	            success: function(){
	            	//alert("borrar success");
	            },
	            error: function(){
	            	//alert("borrar error: ajaxcreartema");
	            }
	        });	
}


function temasNuevoCallback(data)
{	
    var obj = jQuery.parseJSON(data);
    var numTemas = obj.temas.length;
  
    var i=0;
    for( i=0;i<numTemas;i++)
    {
    	 //	<option value="0">Hombre</option>
         $("#temaSelect").append('<option value="'+obj.temas[i]["id"]+'">'+obj.temas[i]["tema"]+'</option>');
     }  
    $("#temaSelect").trigger("change");
   
	
}



function subirFotoCamara()
{
  navigator.camera.getPicture(abrirProfFotoSubir, onCameraFail, 
	//old navigator.camera.getPicture(onCameraSuccess, onCameraFail, 
	{  quality : 50,
		  destinationType : Camera.DestinationType.DATA_URI,
		  sourceType : Camera.PictureSourceType.CAMERA,
		  allowEdit : false,
		  encodingType: Camera.EncodingType.JPEG,
		  /*targetWidth: 50,
		  targetHeight: 50,*/
		  popoverOptions: CameraPopoverOptions,
		  saveToPhotoAlbum: true }
	);

	
}

 function subirFotoGaleria(){

	 
	 
	 navigator.camera.getPicture(abrirProfFotoSubir, onCameraFail, 
		{	 
			 quality: 50,
             destinationType: Camera.DestinationType.DATA_URI,
             sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
		}
	);
	 
	/* 
	 navigator.camera.getPicture(abrirProfFotoSubir, onCameraFail, 
	{ quality : 50,
	 					  destinationType : Camera.DestinationType.DATA_URI,
	 			  sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
	 			  allowEdit : false,
	 			  encodingType: Camera.EncodingType.JPEG,
				  targetWidth: 50, 
				  targetHeight: 50,
	 			  popoverOptions: CameraPopoverOptions,
	 			  saveToPhotoAlbum: true }
	 		);
		*/
		
		
	/*	navigator.camera.getPicture(abrirProfFotoSubir, function(message) {
			navigator.notification.alert('Error al recuperar una imagen',okAlert,'MIA','Cerrar');
             },{
                 quality: 50,
                 destinationType: navigator.camera.DestinationType.FILE_URI,
                 sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
             }
		);
		*/
		
		
		
		
  }
 var retries = 0;
 function clearCache() {
	    navigator.camera.cleanup();
	}
 /*
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
	    
	  //ft.upload(fileURI, encodeURI( URL_REST_BASE + "restapi/fotoUpload.php" ), win, fail, options);
	    

	    
	    alert(fileURI);
	    
	    ft.upload(fileURI, encodeURI( "http://www.istorboi.com/mia/miarest2/" + "restapi/fotoUpload.php" ), win, fail, options);
	  
	    
}
 */
	 
function onCameraFail(message) {
	//En caso de fallar la foto se deja vacio el campo de la foto 
	lastImageURI = null;
	$("#fotoasubir").empty();
	
	navigator.notification.alert('Error',okAlert,'MIA',message);
}
  

 function checkAlumnos(clase)
 {   //marca o desmarca los alumnos de una clase 
     var value = $("#"+clase).is(':checked');    
     $('[data-clase="'+clase+'"]').prop('checked', value);
    $("#profFotoSubir div[data-role='content']").trigger("create");
 
 
 }   
 

 /********************************** ini funcion sube fotos al servidor *************************************************************************/
 
 
//getImage Deprecated, ya no hace falta
 function getImage() {
     // Retrieve image file location from specified source
     
	navigator.camera.getPicture(abrirProfFotoSubir, function(message) {
			navigator.notification.alert('Error al recuperar una imagen',okAlert,'MIA','Cerrar');
             },{
                 quality: 50,
                 destinationType: navigator.camera.DestinationType.FILE_URI,
                 sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
             }
     );
     
    

 }
 
 var lastImageURI;
 
 function abrirProfFotoSubir(imageURI) {
	 

	 lastImageURI = imageURI;
	 
		$("#fotoasubir").html('<img src="'+imageURI+ '" width="50%">');
		$.mobile.changePage("#profFotoSubir", { reverse: true  } );

		
		
     //var options = new FileUploadOptions();
     //options.fileKey="file";
     //options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
     //options.mimeType="image/jpeg";

     //var params = new Object();
     //params.value1 = "test";
     //params.value2 = "param";

     //options.params = params;
     //options.chunkedMode = false;

  //   var ft = new FileTransfer();
  //   ft.upload(imageURI, "http://www.istorboi.com/mia/miarest2/restapi/fotoUpload.php", win, fail, options);
 }

 
 
 
 function ajaxSubirFotoServidor()
 {
	// alert ("ajaxSubirFotoServidor");//delete
    
	 var alumnos="";
	 var algunAlumno=false;
	
	 
	 //verificar campos necesarios --> un tema seleccionado y algun alumnos seleccionado
	 
	 if (  ($("#temaSelect" ).val()==null) || ($("#temaSelect" ).val()==""))
    {
		 navigator.notification.alert('Debes Seleccionar un tema',okAlert,'MIA','Cerrar');
		 		 
		 return;
		 
    }
	
	 
	// alert ("numero alumnos total:" +listadoAlumnos.length); //delete
	 for (var i=0; i<listadoAlumnos.length;i++ )
	{
		 
		   if($("#"+listadoAlumnos[i]).is(':checked'))
		   { 
			   if (alumnos=!"") alumnos+=",";
			   alumnos+=listadoAlumnos[i];
			   algunAlumno =true;	   
		   }
	}	 
	 if (algunAlumno==false)
     {
		 navigator.notification.alert('Debes Seleccionar algún alumno',okAlert,'MIA','Cerrar');
 		 
		 return;
		 
     }
	 
	 //fin verificar
	 
	 
	 
	 $.mobile.loading( "show", { text: "Subiendo imagen",  textVisible: true, theme: "a",  html: ""	});
		
	 
	 
	 
	 var options = new FileUploadOptions();
     options.fileKey="file";
     options.fileName=lastImageURI.substr(lastImageURI.lastIndexOf('/')+1) +".jpg";
     options.mimeType="image/jpeg";
     

     var params = new Object();
     params.tema = $("#temaSelect").val();
     params.alumnos = alumnos;
     params.profesor=localStorage.getItem("id_profesor");
     params.centro= localStorage.getItem("id_centro");
  //   params.value2 = "45";

     options.params = params;
     options.chunkedMode = false;

     var ft = new FileTransfer();
     ft.upload(lastImageURI, "http://www.istorboi.com/mia/miarest2/restapi/fotoUpload.php", win, fail, options);
 	 
     //alert("fin upload"); //borrar
     
     
	 
 }
 
 
 
 
 
 
 /*function getImage() {
 // Retrieve image file location from specified source
 navigator.camera.getPicture(uploadPhoto, function(message) {
             alert('get picture failed');
         },{
             quality: 50,
             destinationType: navigator.camera.DestinationType.FILE_URI,
             sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
         }
 );

}*/

 
 /* metodo que funciona function uploadPhoto(imageURI) {
     var options = new FileUploadOptions();
     options.fileKey="file";
     options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
     options.mimeType="image/jpeg";

     var params = new Object();
     params.value1 = "test";
     params.value2 = "param";

     options.params = params;
     options.chunkedMode = false;

     var ft = new FileTransfer();
     ft.upload(imageURI, "http://www.istorboi.com/mia/miarest2/restapi/fotoUpload.php", win, fail, options);
 }*/

 function win(r) {
	 
		$.mobile.loading( "hide");
     console.log("Code = " + r.responseCode.toString()+"\n");
     console.log("Response = " + r.response.toString()+"\n");
     console.log("Sent = " + r.bytesSent.toString()+"\n");
     //alert("Code Slayer!!!");
     navigator.notification.alert('Foto subida al servidor',okAlert,'MIA','Cerrar');
     
     window.location.replace("profesorMain.html");
     
 }

 function fail(error) {
     //alert("An error has occurred: Code = " + error.code);
	 
		$.mobile.loading( "hide");
     navigator.notification.alert('Se ha producido un error alsubir la imagen',okAlert,'MIA','Cerrar');
 }