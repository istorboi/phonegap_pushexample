/*******************  auxiliares      ***************************/
var pg=false;
var URL_REST_BASE ="http://www.miagendainfantil.com/miarest3/";
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
		
		$('#controlDiario').trigger('create');
		   
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


$(document).on("pagecreate", "#perfil", function() {
		//quitamos el boton hijos del nav bas si solo tenemos 1 hijo
	    if ( localStorage.getItem("numero_hijos")==1)
		{
	    	$("#perfilliHijos").remove();
		}
});    
$(document).on("pagecreate", "#listaCategorias", function() {
	//quitamos el boton hijos del nav bas si solo tenemos 1 hijo
    if ( localStorage.getItem("numero_hijos")==1)
	{
    	$("#docliHijos").remove();
	}
});    

$(document).on("pagecreate", "#GalleryList", function() {
	//quitamos el boton hijos del nav bas si solo tenemos 1 hijo
    if ( localStorage.getItem("numero_hijos")==1)
	{
    	$("#galerialiHijos").remove();
	}
});
$(document).on("pagecreate", "#observaciones", function() {
	//quitamos el boton hijos del nav bas si solo tenemos 1 hijo
    if ( localStorage.getItem("numero_hijos")==1)
	{
    	$("#obsliHijos").remove();
	}
});	    





$(document).on("pagecreate", "#controlDiario", function() {
	
	//quitamos el boton hijos del nav bas si solo tenemos 1 hijo
    if ( localStorage.getItem("numero_hijos")==1)
	{
    	$("#controlliHijos").remove();
	}
	else
	{
	//	$("#controlmenu").append('<li  id="controlliHijos" ><a onClick="irListaHijos()" class="ui-nodisc-icon"  id="nav_perfil" data-icon="custom">nn</a></li>');
	}
		
	
	$(".logo_centro").attr("src",localStorage.getItem("logo_centro"));
	
	$id_alumno=localStorage.getItem("id_alumno");
	$id_tutor=localStorage.getItem("id_tutor");
	
	$.mobile.loading( "show", { text: "Cargando",  textVisible: true, theme: "a",  html: ""	});

	
	$.ajax({
        type:'GET',
        url: URL_REST_BASE +'restapi/alumnosGetUltimoControlDiario2.php',
        data:{id_alumno:  $id_alumno ,id_tutor: $id_tutor},
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'controldiarioCallback',
                    
        success: function(){
        	//alert("success");
        	$.mobile.loading( "hide");
        },
        error: function(){
        	$.mobile.loading( "hide");
        }
	});
	
	ajaxFichaReducida();
	
	
	
});




function ajaxControlFecha()
{
	
	
	if (!verificarAccesoInternet()){
		$('[data-role=dialog]').dialog( "close" );

		return;
	}
	
	$('[data-role=dialog]').dialog( "close" );
   
   $fecha = $("#inputFecha").val();
		    
	 
	$.mobile.loading( "show", { text: "Cargando",  textVisible: true, theme: "a",  html: ""	});

    $id_alumno=localStorage.getItem("id_alumno");
	$id_tutor=localStorage.getItem("id_tutor");
		    
    
	cargandoDatos();
	
        $.ajax({
        type:'GET',
        url: URL_REST_BASE +'restapi/alumnosGetFechaControlDiario.php',
        data:{id_alumno:  $id_alumno ,id_tutor: $id_tutor, fecha:$fecha},
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'controldiarioCallback',
        success: function(){
        	$.mobile.loading( "hide" );
        },
        error: function(){
        	$.mobile.loading( "hide" );
        }
    });
    
}


function ajaxControlHoy()
{
	if (!verificarAccesoInternet()) return;
	
	$id_alumno=localStorage.getItem("id_alumno");
	$id_tutor=localStorage.getItem("id_tutor");
	
	cargandoDatos();
	
	$.ajax({
        type:'GET',
        url: URL_REST_BASE + 'restapi/alumnosGetUltimoControlDiario2.php',
        data:{id_alumno:  $id_alumno ,id_tutor: $id_tutor},
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'controldiarioCallback',
                    
        success: function(){
        //	alert("success");
        },
        error:function(){
           alert("No hay datos para el alumno");
        } 
	});
	
}




function ajaxFichaReducida()
{
	$id_alumno=localStorage.getItem("id_alumno");
	$id_tutor=localStorage.getItem("id_tutor");
	
	$.ajax({
        type:'GET',
        url: URL_REST_BASE + 'restapi/alumnoGetFichaReducida.php',
        data:{id_alumno:  $id_alumno ,id_tutor: $id_tutor},
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'fichareducidaCallback',
	                    
	    success: function(){
	    	//alert("success");
	    },
        error:function(){
            //alert("Ficha reducida Error");
        } 
	});
}


function getImgIcon(urlcorta)
{
	 var urlIcon="";
    if (urlcorta!=null && urlcorta!="" )
    {
    //urlIcon='<img src="'+ urlcorta.replace("./","http://www.miagendainfantil.com/admin/") +'">';
    urlIcon='<img src="'+ urlcorta +'">';
    
    }
    return urlIcon;
}


function cargandoDatos()
{
    $("#table-comidas").empty();
    $("#table-comidas").append("<tr><td>CARGANDO DATOS....</td></tr>");
	
}


function controldiarioCallback(data){
  
      var obj = jQuery.parseJSON(data);
       $("#fecha").html(obj.fecha);
      
    
    //1rellenamos la seccion comida
     $("#comida_etiqueta").html(obj.comida_etiqueta);
    //id=comida_etiqueta
    //numero de campos
    var numcamposcomida = obj.comida_array.length;
    //tabla id=tablecomidas --> vaciamos la tabla y la rellenamos de nuevo
   
   
    $("#table-comidas").empty();
    var i=0;
    for( i=0;i<numcamposcomida;i++)
    {
        var tr="";
        tr='<tr><td class="td1"><span class="texto-morado" >'+ obj.comida_array[i]["campo"]+'</span></td>'+
               '<td class="td2">'+getImgIcon(obj.comida_array[i]["icono"])+' </td>'+
               '<td class="td3">'+obj.comida_array[i]["valor"]+'</td>';
        if(i==0)  tr=tr +'<td class="td4" rowspan="'+numcamposcomida+'" style="text-align: right; padding-right:5px;"><img src="./img/comidas_64.jpg"></td>';
    tr= tr +'</tr>';
            
        $("#table-comidas").append(tr);
    }    
    
    
      //2rellenamos la seccion  regularidad
     $("#regularidad_etiqueta").html(obj.regularidad_etiqueta);
    //numero de campos
    var numcamposregularidad = obj.regularidad_array.length;
    $("#table-regularidad").empty();
    var r=0;
    
    for( r=0;r<numcamposregularidad;r++)
    {
        var tr="";
        tr='<tr><td class="td1" ><span class="texto-amarillo" >'+ obj.regularidad_array[r]["campo"]+'</span></td>'+
               '<td class="td2">'+getImgIcon(obj.regularidad_array[r]["icono"])+' </td>'+
               '<td class="td3">'+obj.regularidad_array[r]["valor"]+'</td>';
        if(r==0)  tr=tr +'<td class="td4" rowspan="'+numcamposregularidad+'" style="text-align: right; padding-right:5px;"><img src="./img/wc_64_2.jpg"></td>';
    tr= tr +'</tr>';
            
        $("#table-regularidad").append(tr);
    }  
    
    
    //3 rellenamos la seccion Sueño
    
    $("#sueno_etiqueta").html(obj.sueno_etiqueta);
    //numero de campos
    var numcampossueno = obj.sueno_array.length;
    $("#table-sueno").empty();
    
    
    for(var s=0;s<numcampossueno;s++)
    {
        var tr="";
        tr='<tr><td class="td1"><span class="texto-azul" >'+ obj.sueno_array[s]["campo"]+'</span></td>'+
               '<td class="td2">'+getImgIcon(obj.sueno_array[s]["icono"])+' </td>'+
               '<td class="td3">'+obj.sueno_array[s]["valor"]+'</td>';
        if(s==0)  tr=tr +'<td class="td4" rowspan="'+numcampossueno+'" style="text-align: right; padding-right:5px;"><img src="./img/sueno_64.jpg"></td>';
    tr= tr +'</tr>';
            
        $("#table-sueno").append(tr);
    }  
    
    //4 rellenamos la seccion traer
    $("#traer_etiqueta").html(obj.traer_etiqueta);
    var numcampostraer = obj.traer_array.length;
    $("#table-traer").empty();
    for(var s=0;s<numcampostraer;s++)
    {
        var tr='<tr><td class="td1"><span class="texto-verde" >'+ obj.traer_array[s]["campo"]+'</span></td>'+
               '<td class="td2">'+getImgIcon(obj.traer_array[s]["icono"])+' </td>'+
               '<td class="td3">'+obj.traer_array[s]["valor"]+'</td>';
        if(s==0)  tr=tr +'<td class="td4" rowspan="'+numcampostraer+'" style="text-align: right; padding-right:5px;"><img src="./img/traer_64.jpg"></td>';
    tr= tr +'</tr>';
            
        $("#table-traer").append(tr);
    }  
    
    
    //observaciones
    $("#observaciones_etiqueta").html(obj.observaciones_etiqueta);
    //$("#observaciones").html(obj.observaciones);
  
    
    var numcamposobservaciones = obj.observaciones.length;
    $("#table-observaciones").empty();
    for(var s=0;s<numcamposobservaciones;s++)
    {
        var tr='<tr><td><span class="texto-marron fonts_Handlee_Regular" ><b>'+ obj.observaciones[s]["usuario"]+':</b> '+obj.observaciones[s]["texto"]+ '</span></td></tr>';
        $("#table-observaciones").append(tr);
    }  
     
    
  //tablonaula
    $("#tablonaula_etiqueta").html(obj.tablonaula_etiqueta);
  //  $("#tablonaula").html(obj.tablonaula);
    var numtablonaula = obj.tablonaula.length;
    $("#table-aula").empty();
    for(var s=0;s<numtablonaula;s++)
    {
        var tr='<tr><td><span class="texto-gris" >'+ obj.tablonaula[s]["texto"]+ '</span></td></tr>';
            
        $("#table-aula").append(tr);
    }  
    
    
    //tabloncentro
    $("#tabloncentro_etiqueta").html(obj.tabloncentro_etiqueta);
  //  $("#tabloncentro").html(obj.tabloncentro);
    var numtabloncentro = obj.tabloncentro.length;
    $("#table-centro").empty();
    for(var s=0;s<numtabloncentro;s++)
    {
        var tr='<tr><td><span class="texto-rojo" >'+ obj.tabloncentro[s]["texto"]+ '</span></td></tr>';
            
        $("#table-centro").append(tr);
    }
 
    
}

function fichareducidaCallback(data){
    var obj = jQuery.parseJSON(data);
    
    
    var url="";
    var urlcorta = obj.fichareducida_imagen;
     if (urlcorta!=null && urlcorta!="" )
    {
      url = urlcorta;//
      url = urlcorta.replace("./","http://www.miagendainfantil.com/admin/");
    }
    else
    {
        url="./imagenes/noimage.jpeg";
    }
   $("#fichareducida_imagen").attr("src", url );
    
    $("#fichareducida_nombre").html(obj.fichareducida_nombre);
    $("#fichareducida_fechaaula").html(obj.fichareducida_fechaaula);
  }


/****************** funciones fichadetallada *********************/


function ajaxfichadetallada()
{
	if(!verificarAccesoInternet()) return;
	
	$.mobile.changePage("#perfil");
	$.mobile.loading( "show", { text: "Cargando", textVisible: true, theme: "a", html: ""});
	
	
	 $id_alumno=localStorage.getItem("id_alumno");
	 $id_tutor=localStorage.getItem("id_tutor");

	$.ajax({
        type:'GET',
        url: URL_REST_BASE + 'restapi/alumnoGetFichaDetallada.php',
        data:{id_alumno:$id_alumno, id_tutor:$id_tutor},
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'fichaDetalladaCallback',
        success: function(){
       // alert("borrar success ficher detallada");
        	 $.mobile.loading( "hide");
        },
        error: function(){
        	 $.mobile.loading( "hide");
        	
        }
	});
}


function fichaDetalladaCallback(data){
   // alert("fichaDetalladaCallback");
  //  alert(data);
    
    
        var obj = jQuery.parseJSON(data);
       
       
       var url=obj.fichadetalle_imagen;
        var urlcorta = obj.fichadetalle_imagen;
        if (urlcorta!=null && urlcorta!="" )
       {
         //url = urlcorta.replace("./","http://www.miagendainfantil.com/admin/");
         url = urlcorta;
       }
       else
       {
           url="./imagenes/noimage.jpg";
       }
        
      $("#fichadetalle_imagen").attr("src", url );
       
       $("#fichadetalle_nombre").html(obj.fichadetalle_nombre);
       $("#fichadetalle_fechaaula").html(obj.fichadetalle_fechaaula);
   
    
       var numtutores = obj.tutores.length;
      
       $("#tutores_contacto").empty();
       var i=0;
       for( i=0;i<numtutores;i++)
       {
           var tr="<tr>";
           
           tr+='<td><span class="texto-morado">'+obj.tutores[i]["tutor_nombre"]+"</span></td>";
           tr+='<td>'+obj.tutores[i]["tutor_rol"]+'</td>';
           tr+='<td> <a href="tel:'+obj.tutores[i]["tutor_tefefono"]+'"> llamar </a></td>';
           tr +='</tr>';
               
           $("#tutores_contacto").append(tr);
       }    
       
          $("#observaciones_alumno").html(obj.fichadetalle_observaciones);
    }
   


/******************* funciones footer  *****************************/

function irListaHijos()
{
	//window.location.replace("index.html");
	window.location.replace("index.html#seleccionarAlumnoTmp");
}

function desconectarse(){
	//borramos variables 
	  localStorage.removeItem("id_tutor");
	  localStorage.removeItem("nombre_tutor");
	  localStorage.removeItem("idioma");
	  localStorage.removeItem("numero_hijos");
	  localStorage.removeItem("tel");
	  localStorage.removeItem("pass");
	  localStorage.removeItem("notificaciones");
	   
	  window.location.replace("index.html");
}