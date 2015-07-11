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

function ayuda()
{
	var ref = window.open("http://www.miagendainfantil.es/ayuda.html", '_blank', 'location=yes');
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
		
		$('#controlDiario').trigger('create');
		   
	}else	{	
	      $('.headerh1').each(function() {
		    $(this).parent().css("padding-top", "0px");
		  });
		
	}
}

/************************  fin auxiliares ************************/


var queryRealizada=false;



function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false); 
}
function onDeviceReady() {
	protectHeaderiOS();
	
	if (!verificarAccesoInternet())
	{
	$("#recargar").html('<span id="conexionnecesaria"> Conexión a internet necesaria para usar la aplicacion.</span></br>	<a data-role="button" onclick="recargarWelcome()">Volver a intentar</a>');
	
	$("#recargar").trigger("create");
	
	}else
	{
		$("#recargar").html('');
	}
	
}


function recargarWelcome()
{
	 window.location.replace("index.html");
}


$(document).on("pageshow", "#welcomePage", function() {
	 $.mobile.loading( "show", { text: "Cargando", textVisible: true, theme: "a", html: ""});	
});



   $(document).on("pagecreate", "#welcomePage", function() {
 
  
	
	if (localStorage.getItem("tel")) 
	{	
		$tel = localStorage.getItem("tel");
		$pass = localStorage.getItem("pass");
		
		
		$.ajax({
	             type:'GET',
	             url: URL_REST_BASE +'restapi/login.php',
	             data:{movil : $tel , pass:$pass},
	             dataType: 'jsonp',
	             jsonp: 'callback',
	             jsonpCallback: 'loginCallback',
	             success: function(){
	            	 $.mobile.loading( "hide");
	            	 queryRealizada=true;
	             },
	             error: function(){
	            	 $.mobile.loading( "hide");

	            }
	         
	        });
	}
	else
	{
		$.mobile.changePage("#loginPage", {transition: "none", reverse: false  } );
	}
});




$(document).on("pagecreate", "#seleccionarAlumnoTmp", function() {
   
	//alert("pagecreate --> lista hijos");
	if (queryRealizada==false)
	{
		$tel = localStorage.getItem("tel");
		$pass = localStorage.getItem("pass");
		
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
	       	 	//navigator.notification.alert('Teléfono o password incorrectos',  onLoginError(),  'Validación Incorrecta',  'cerrar');
	       }
	    
	   });
	}
	

});



/*
$(document).on("pagecreate", "#loginPage", function() {
	
	//alert("pagecreate loginpage");
	if (localStorage.getItem("tel")) 
	{	
		$tel = localStorage.getItem("tel");
		$pass = localStorage.getItem("pass");
		
		
	//	alert ("loginvalidar automatico movil:" +localStorage.getItem("tel") +  " pass:" + localStorage.getItem("pass") );
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
	            	// navigator.notification.alert('Teléfono o password incorrectos',  onLoginError(),  'Validación Incorrecta',  'cerrar');
	            }
	         
	        });
	       
	}

});

*/


function loginValidar()
{
	if (!verificarAccesoInternet()) return;
	

	$.mobile.loading( "show", {
		  text: "Validando datos",
		  textVisible: true,
		  theme: "a",
		  html: ""
	});
	
	
	$.ajax({
             type:'GET',
             url: URL_REST_BASE + 'restapi/login.php',
             data:$('#formularioLogin').serialize(),
             dataType: 'jsonp',
             jsonp: 'callback',
             jsonpCallback: 'loginCallback',
             success: function(){
            	 $.mobile.loading( "hide" );
            		localStorage.setItem("tel", $("#tel").val());
            		localStorage.setItem("pass", $("#pass").val());
            		queryRealizada=true;
            		$.mobile.loading( "hide");
            		
             },
             error: function(){
            	 $.mobile.loading( "hide" );
            	 navigator.notification.alert('Teléfono o password incorrectos',  onLoginError(),  'Validación Incorrecta',  'cerrar');
            	 
             }
            
	
        });
}



function onLoginError() {
       
}


function controlAlumno2(id,id_centro,logo_centro)
{
	if(!verificarAccesoInternet()) return;
	localStorage.setItem("id_alumno", id);
	localStorage.setItem("id_centro", id_centro);
	localStorage.setItem("logo_centro", logo_centro);
    window.location.replace("main.html");
}
function controlAlumno()
{
    window.location.replace("main.html");
}

 function loginCallback(data){
      var obj = jQuery.parseJSON(data);
 
     
      if(("rol" in obj ) && obj.rol=="profesor" ){
       //version nueva y tipo profesor
    	  localStorage.setItem("id_profesor", obj.id_profesor);
    	  localStorage.setItem("nombre_profesor", obj.nombre_profesor);
    	  localStorage.setItem("idioma", obj.idioma);
    	  localStorage.setItem("logo_centro", obj.logo_centro);
          localStorage.setItem("id_centro", obj.id_centro);
        
    
          if (localStorage.getItem("notificaciones")==null)RegistrarDispositivo(); //registro notificaciones;
          
    	  window.location.replace("profesorMain.html");
    	  
    	  return;
    	      
      }else{
      
	     localStorage.setItem("id_tutor", obj.id_tutor);
	     localStorage.setItem("nombre_tutor", obj.nombre_tutor);
	     localStorage.setItem("idioma", obj.idioma);
	     localStorage.setItem("numero_hijos", obj.alumnos.length);
	   
	     if (localStorage.getItem("notificaciones")==null)RegistrarDispositivo(); //registro notificaciones;
	     
	     var numalumnos = obj.alumnos.length;
	     var primeraVisita = obj.primeraVisita;
	    
	     //inicializar variables en funcion de los niños
	     if (numalumnos==0)
	     {
	         
	     }
	     if(numalumnos==1)
	     {
	        localStorage.setItem("id_alumno", obj.alumnos[0]["id_alumno"]);
	        localStorage.setItem("logo_centro", obj.alumnos[0]["logo_centro"]);
	        localStorage.setItem("id_centro", obj.alumnos[0]["id_centro"]);
	      //  controlAlumno();
	     }
	     if(numalumnos>1)
	     {
	        $("#listahijos").empty();
	        
	        for( var i=0;i<numalumnos;i++)
	        {
	            var li="";
	            li= li+ '<li><a onClick="controlAlumno2(' + obj.alumnos[i]["id_alumno"]+','+obj.alumnos[i]["id_centro"] +',\''+obj.alumnos[i]["logo_centro"] + '\')">';
	            li= li+"<img style='height:80px;' src='"+obj.alumnos[i]["foto_url_alumno"]+"' /> " + obj.alumnos[i]["nombre_alumno"]+ " "+obj.alumnos[i]["apellidos_alumno"]  ;
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
                       //alert("Se ha enviado un email con su nueva contraseña, que deberá cambiar en su primer acceso a la aplicación");
                       navigator.notification.alert("Se ha enviado un email con su nueva contraseña, que deberá cambiar en su primer acceso a la aplicación",okAlert,'MIA','Cerrar');
                   },
                   error: function(){
                   //    alert ("Error estableciendo nuevo Password");
                   }
           });
  
       
 }
 function tutorRecordarPassCallback(data)
 {
	 var obj = jQuery.parseJSON(data);
	 
	 var email ="";
	 email = obj.email;
	 
	 
     navigator.notification.alert("Se ha enviado un email ("+email+") con su nueva contraseña, que deberá cambiar en su primer acceso a la aplicación",okAlert,'MIA','Cerrar');
     
 }
 
    function ajaxCambiarPassPrimerAcceso()
    {
        $id_tutor= localStorage.getItem("id_tutor");
        var newpass1 = $("#pass1").val();
        var newpass2 = $("#pass2").val();
    
        
        if (newpass1 ==newpass2 )
        {
            
             $idtutor=localStorage.getItem("id_tutor");
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

            //alert ("Las contraseñas no coinciden,Introduzca de nuevo la contraseña.");
            navigator.notification.alert("Las contraseñas no coinciden,Introduzca de nuevo la contraseña.",okAlert,'MIA','Cerrar');

        }
     }
       
    function primerAccesoCallback(data)
    {
     // alert(data); //delete
       var  numalumnos= localStorage.getItem("numero_hijos");
        if(numalumnos==1) { controlAlumno(); }
        if(numalumnos>1){ $.mobile.changePage("#seleccionarAlumno", {transition: "slide", reverse: false  } );}   
    
        
    }
    
    
    
    
    function desconectarse()
    {
    	navigator.notification.confirm("Necesitarás el teléfono y la contraseña para volver a entrar, ¿Deseas salir ahora?", cerrarCallback, "Salir", "Salir,Cancelar");
    }

    function cerrarCallback(index)
    {
    	
    	if (index==1){
    		localStorage.removeItem("id_tutor");
      	  localStorage.removeItem("id_centro");
      	  localStorage.removeItem("nombre_tutor");
      	  localStorage.removeItem("idioma");
      	  localStorage.removeItem("numero_hijos");
      	  localStorage.removeItem("tel");
      	  localStorage.removeItem("pass");
      	  localStorage.removeItem("notificaciones");
      	   
      	  window.location.replace("index.html");	
    	}
    	
    }

    
    
   
    
