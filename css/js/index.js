var pg=false;
var URL_REST_BASE ="http://www.miagendainfantil.com/miarest3/";
var URL="http://www.miagendainfantil.com/";
var queryRealizada=false;

	
function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false); 
}
function onDeviceReady() {
	
		if (navigator.network.connection.type==Connection.NONE)
	   { 
			alert("Se necesita conexión a internet para realizar la validación");
			return;
	   }

	
}




$(document).on("pageshow", "#seleccionarAlumnoTmp", function() {
		//alert("listahijos -->pageshow");
	//   $('#listahijos').listview('refresh');

	   /*
	alert("pagecreate seleccionaalumno");
	if (queryRealizada==false)
	{
		$tel = window.localStorage.getItem("tel");
		$pass = window.localStorage.getItem("pass");
		
		$.ajax({
	        type:'GET',
	        url: URL_REST_BASE +'restapi/login.php',
	        data:{movil : $tel , pass:$pass},
	        dataType: 'jsonp',
	        jsonp: 'callback',
	        jsonpCallback: 'loginCallback',
	        success: function(){
	           
	        },
	        error: function(){
	       	 navigator.notification.alert('Teléfono o password incorrectos',  onLoginError(),  'Validación Incorrecta',  'cerrar');
	       }
	    
	   });
	}
	*/

});

$(document).on("pagecreate", "#seleccionarAlumnoTmp", function() {

	 
	   
	//alert("pagecreate --> lista hijos");
	if (queryRealizada==false)
	{
		$tel = window.localStorage.getItem("tel");
		$pass = window.localStorage.getItem("pass");
		
		$.ajax({
	        type:'GET',
	        url: URL_REST_BASE +'restapi/login.php',
	        data:{movil : $tel , pass:$pass},
	        dataType: 'jsonp',
	        jsonp: 'callback',
	        jsonpCallback: 'loginCallback',
	        success: function(){
	           
	        },
	        error: function(){
	       	 navigator.notification.alert('Teléfono o password incorrectos',  onLoginError(),  'Validación Incorrecta',  'cerrar');
	       }
	    
	   });
	}
	

});




$(document).on("pagecreate", "#loginPage", function() {
	
	//alert("pagecreate loginpage");
	if (window.localStorage.getItem("tel")) 
	{	
		$tel = window.localStorage.getItem("tel");
		$pass = window.localStorage.getItem("pass");
		
		
	//	alert ("loginvalidar automatico movil:" +window.localStorage.getItem("tel") +  " pass:" + window.localStorage.getItem("pass") );
		$.ajax({
	             type:'GET',
	             url: URL_REST_BASE +'restapi/login.php',
	             data:{movil : $tel , pass:$pass},
	             dataType: 'jsonp',
	             jsonp: 'callback',
	             jsonpCallback: 'loginCallback',
	             success: function(){
	            	 queryRealizada=true;
	             },
	             error: function(){
	            	 navigator.notification.alert('Teléfono o password incorrectos',  onLoginError(),  'Validación Incorrecta',  'cerrar');
	            }
	         
	        });
	       
	}

});




function loginValidar()
{

	$.ajax({
             type:'GET',
             url: URL_REST_BASE + 'restapi/login.php',
             data:$('#formularioLogin').serialize(),
             dataType: 'jsonp',
             jsonp: 'callback',
             jsonpCallback: 'loginCallback',
             success: function(){

            		window.localStorage.setItem("tel", $("#tel").val());
            		window.localStorage.setItem("pass", $("#pass").val());
            		queryRealizada=true;
            		
             },
             error: function(){
            	 navigator.notification.alert('Teléfono o password incorrectos',  onLoginError(),  'Validación Incorrecta',  'cerrar');
            }
            
	
        });
}



function onLoginError() {
       
}


function controlAlumno2(id,id_centro,logo_centro)
{
	window.localStorage.setItem("id_alumno", id);
	window.localStorage.setItem("id_centro", id_centro);
	window.localStorage.setItem("logo_centro", logo_centro);
    window.location.replace("main.html");
}
function controlAlumno()
{
    window.location.replace("main.html");
}

 function loginCallback(data){
    	
   // alert(data);
    	
     var obj = jQuery.parseJSON(data);
     window.localStorage.setItem("id_tutor", obj.id_tutor);
     window.localStorage.setItem("nombre_tutor", obj.nombre_tutor);
     window.localStorage.setItem("idioma", obj.idioma);
     window.localStorage.setItem("numero_hijos", obj.alumnos.length);
     var numalumnos = obj.alumnos.length;
     var primeraVisita = obj.primeraVisita;
    
     //inicializar variables en funcion de los niños
     if (numalumnos==0)
     {
         
     }
     if(numalumnos==1)
     {
        window.localStorage.setItem("id_alumno", obj.alumnos[0]["id_alumno"]);
        window.localStorage.setItem("logo_centro", obj.alumnos[0]["logo_centro"]);
        window.localStorage.setItem("id_centro", obj.alumnos[0]["id_centro"]);
      //  controlAlumno();
     }
     if(numalumnos>1)
     {
        $("#listahijos").empty();
        
        for( var i=0;i<numalumnos;i++)
        {
            var li="";
            li= li+ '<li><a onClick="controlAlumno2(' + obj.alumnos[i]["id_alumno"]+','+obj.alumnos[i]["id_centro"] +',\''+obj.alumnos[i]["logo_centro"] + '\')">';
            li= li+"<img src='"+obj.alumnos[i]["foto_url_alumno"]+"' /> " + obj.alumnos[i]["nombre_alumno"]+ " "+obj.alumnos[i]["apellidos_alumno"]  ;
            li= li+ '</a></li>';
                
          $("#listahijos").append(li);
         
        }
        //$.mobile.changePage("#seleccionarAlumno", {transition: "slide", reverse: false  } );
     }   
    
     //pagina destino en funcion de si es la primera vez de los niños que tengan
     if  (primeraVisita==0)
     { //es la primera visita, se cambia el pass
         
         $.mobile.changePage("#pagePrimerAcceso", {transition: "slide", reverse: false  } );
         
     }
     else{
        if(numalumnos==1) { controlAlumno(); }
        if(numalumnos>1){ $.mobile.changePage("#seleccionarAlumno", {transition: "none", reverse: false  } );}   
     }   
     
  }    
 
 
 function recordarPass()
 {
     
     $movilRecordar = $("#movilRecordar").val();
         $.ajax({
                   type:'GET',
                   url: URL_REST_BASE +'restapi/tutorRecordarPass.php',
                   data:{tel:$movilRecordar},
                   dataType: 'jsonp',
                   jsonp: 'callback',
                   jsonpCallback: 'tutorRecordarPassCallback',
                   success: function(){
                       alert("Se ha enviado un email con su nueva contraseña, que deberá cambiar en su primer acceso a la aplicación")
                   },
                   error: function(){
                   //    alert ("Error estableciendo nuevo Password");
                   }
           });
  
       
 }
 function tutorRecordarPassCallback(data)
 {
     
 }
 
    function ajaxCambiarPassPrimerAcceso()
    {
        $id_tutor= window.localStorage.getItem("id_tutor");
        var newpass1 = $("#pass1").val();
        var newpass2 = $("#pass2").val();
    
        
        if (newpass1 ==newpass2 )
        {
            
             $idtutor=window.localStorage.getItem("id_tutor");
             $pass = newpass1;
                     
            $.ajax({
                    type:'GET',
                    url: URL_REST_BASE +'restapi/tutorCambiarPassPrimerAcceso.php',
                    data:{id_tutor:$idtutor, pass:$pass},
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'primerAccesoCallback',
                    success: function(){},
                    error: function(){alert ("Error estableciendo nuevo Password");}
            });
             
        }
        else
        {
            $("#pass1").val("");
            $("#pass2").val("");

            alert ("Las contraseñas no coinciden,Introduzca de nuevo la contraseña.");
        }
     }
       
    function primerAccesoCallback(data)
    {
     // alert(data); //delete
       var  numalumnos= window.localStorage.getItem("numero_hijos");
        if(numalumnos==1) { controlAlumno(); }
        if(numalumnos>1){ $.mobile.changePage("#seleccionarAlumno", {transition: "slide", reverse: false  } );}   
    
        
    }
    
    function desconectarse(){
    	//borramos variables 
    	  window.localStorage.removeItem("id_tutor");
    	  window.localStorage.removeItem("id_centro");
    	  window.localStorage.removeItem("nombre_tutor");
    	  window.localStorage.removeItem("idioma");
    	  window.localStorage.removeItem("numero_hijos");
    	  window.localStorage.removeItem("tel");
    	  window.localStorage.removeItem("pass");
    	   
    	  window.location.replace("index.html");
    }
