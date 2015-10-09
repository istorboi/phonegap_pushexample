/*******************  auxiliares      ***************************/
var pg=false;
var URL_REST_BASE ="https://www.miagendainfantil.com/miarest4/";
var URL="https://www.miagendainfantil.com/";
var MIAVERSION="100101";


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
	
	
	if (localStorage.getItem("id_alumno")=== null)
	{
		window.location.replace("index.html");
	}
	
	if (!localStorage.getItem("uuid"))  localStorage.setItem("uuid", device.uuid);
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
	  
    //podemos venir del calendario  o de otra página
    $(".logo_centro").attr("src",localStorage.getItem("logo_centro"));

	 if (localStorage.getItem("ENABLE_CONTROL_FECHA") && localStorage.getItem("ENABLE_CONTROL_FECHA")=="TRUE" ) 
	 { 
		 ajaxControlFecha();
			
	 }else
    {
    	$id_alumno=localStorage.getItem("id_alumno");
		$id_tutor=localStorage.getItem("id_tutor");
		$uuid = localStorage.getItem("uuid");
		$version=MIAVERSION;
		$.mobile.loading( "show", { text: "Cargando",  textVisible: true, theme: "a",  html: ""	});
		
		$.ajax({
	        type:'GET',
	        url: URL_REST_BASE +'restapi/alumnosGetUltimoControlDiario2_100000.php',
	        data:{id_alumno:  $id_alumno ,id_tutor: $id_tutor,uuid:$uuid,version:$version},
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
    }
	 
	 
	ajaxFichaReducida();
	
});


/*
$( document ).on( "pagecontainerbeforechange", function ( event, data ) {
	 
	 var toPage = data.toPage,
        prevPage = data.prevPage ? data.prevPage : "",
        options = data.options,
       absUrl = data.absUrl ? $.mobile.path.parseUrl(data.absUrl).hash.split("#")[1] : "",
        
        userLogged = false; //assuming the user is logged off 
 
//    if ( typeof toPage == "object" && absUrl == "pageX" && !userLogged ) {
   
//        data.toPage[ 0 ] = $("#pageY")[ 0 ];
 
//        $.extend( data.options, {
//            transition: "flip",
//            changeHash: false
//        });
//    }
  
	  
	 if (localStorage.getItem("ENABLE_CONTROL_FECHA") && localStorage.getItem("ENABLE_CONTROL_FECHA")=="TRUE" ) 
	 { 
		 alert("enablecontrol");
		 ajaxControlFecha();
		 localStorage.removeItem("fecha");
		 localStorage.removeItem("ENABLE_CONTROL_FECHA");
	 }
	
});
*/

function ajaxControlFechaNuevoSinPopup()
{
	
	$inputFecha = $("#inputFecha").val();
	localStorage.setItem("inputFecha",$inputFecha);
	localStorage.setItem("ENABLE_CONTROL_FECHA","TRUE");
	
    window.location.replace("main.html");

	    
}

function ajaxControlFecha()
{

	
	$inputFecha = localStorage.getItem("inputFecha");
	 
	$.mobile.loading( "show", { text: "Cargando",  textVisible: true, theme: "a",  html: ""	});

    $id_alumno=localStorage.getItem("id_alumno");
	$id_tutor=localStorage.getItem("id_tutor");
	$uuid = localStorage.getItem("uuid");
	
	
	cargandoDatos();
	
        $.ajax({
        type:'GET',
        url: URL_REST_BASE +'restapi/alumnosGetFechaControlDiario_100000.php',
        data:{id_alumno:  $id_alumno ,id_tutor: $id_tutor, fecha:$inputFecha,uuid:$uuid},
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'controldiarioCallback',
        success: function(){
        	$.mobile.loading( "hide" );
        	 localStorage.removeItem("fecha");
    		 localStorage.removeItem("ENABLE_CONTROL_FECHA");
    		
        },
        error: function(){
        	$.mobile.loading( "hide" );
        	 localStorage.removeItem("fecha");
    		 localStorage.removeItem("ENABLE_CONTROL_FECHA");
    		
        }
    });
    
}


/*

function ajaxControlFecha()
{
		
	if (!verificarAccesoInternet()){
	//	$('#dialogCalendario').dialog( "close" );
		//$('[data-role=dialog]').dialog( "close" );
		return;
	}
	//$('#dialogCalendario').dialog( "close" );
	
	
	//$('[data-role=dialog]').dialog( "close" );
    $fecha = $("#inputFecha").val();
	 
	$.mobile.loading( "show", { text: "Cargando",  textVisible: true, theme: "a",  html: ""	});

    $id_alumno=localStorage.getItem("id_alumno");
	$id_tutor=localStorage.getItem("id_tutor");
	$uuid = localStorage.getItem("uuid");
	
	
	cargandoDatos();
	
        $.ajax({
        type:'GET',
        url: URL_REST_BASE +'restapi/alumnosGetFechaControlDiario_100000.php',
        data:{id_alumno:  $id_alumno ,id_tutor: $id_tutor, fecha:$fecha,uuid:$uuid},
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
*/

function ajaxControlHoy()
{
	
	if (!verificarAccesoInternet()) return;
	
	$id_alumno=localStorage.getItem("id_alumno");
	$id_tutor=localStorage.getItem("id_tutor");
	
	
	$uuid = localStorage.getItem("uuid");
	$version=MIAVERSION;
	
	
	cargandoDatos();
	
	$.ajax({
        type:'GET',
        url: URL_REST_BASE +'restapi/alumnosGetUltimoControlDiario2_100000.php',
        data:{id_alumno:  $id_alumno ,id_tutor: $id_tutor,uuid:$uuid,version:$version},
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'controldiarioCallback',
                    
        success: function(){
        //	alert("success");
        },
        error:function(){
           //alert("No hay datos para el alumno");
           navigator.notification.alert('No hay datos para el alumno',okAlert,'MIA','Cerrar');
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
    
    var tablecomidas="";
    for( i=0;i<numcamposcomida;i++)
    {
        var tr="";
        tr='<tr><td class="td1"><span class="texto-morado" >'+ obj.comida_array[i]["campo"]+'</span></td>'+
               '<td class="td2">'+getImgIcon(obj.comida_array[i]["icono"])+' </td>'+
               '<td class="td3">'+obj.comida_array[i]["valor"]+'</td>';
        if(i==0)  tr=tr +'<td class="td4" rowspan="'+numcamposcomida+'" style="text-align: right; padding-right:5px;"><img src="./img/comidas_64.jpg"></td>';
    tr= tr +'</tr>';
            
    tablecomidas += tr;
        //$("#table-comidas").append(tr);
    }    
    $("#table-comidas").append(tablecomidas);
    tablecomidas=null;
    
      //2rellenamos la seccion  regularidad
     $("#regularidad_etiqueta").html(obj.regularidad_etiqueta);
    //numero de campos
    var numcamposregularidad = obj.regularidad_array.length;
    $("#table-regularidad").empty();
    var tablereg="";
    var r=0;
    
    for( r=0;r<numcamposregularidad;r++)
    {
        var tr="";
        tr='<tr><td class="td1" ><span class="texto-amarillo" >'+ obj.regularidad_array[r]["campo"]+'</span></td>'+
               '<td class="td2">'+getImgIcon(obj.regularidad_array[r]["icono"])+' </td>'+
               '<td class="td3">'+obj.regularidad_array[r]["valor"]+'</td>';
        if(r==0)  tr=tr +'<td class="td4" rowspan="'+numcamposregularidad+'" style="text-align: right; padding-right:5px;"><img src="./img/wc_64_2.jpg"></td>';
    tr= tr +'</tr>';
    tablereg+=tr;    
        
    }  
    $("#table-regularidad").append(tablereg);
    tablereg=null;
    
    //3 rellenamos la seccion Sueño
    
    $("#sueno_etiqueta").html(obj.sueno_etiqueta);
    //numero de campos
    var numcampossueno = obj.sueno_array.length;
    $("#table-sueno").empty();
    var tablesueno="";
    
    for(var s=0;s<numcampossueno;s++)
    {
        var tr="";
        tr='<tr><td class="td1"><span class="texto-azul" >'+ obj.sueno_array[s]["campo"]+'</span></td>'+
               '<td class="td2">'+getImgIcon(obj.sueno_array[s]["icono"])+' </td>'+
               '<td class="td3">'+obj.sueno_array[s]["valor"]+'</td>';
        if(s==0)  tr=tr +'<td class="td4" rowspan="'+numcampossueno+'" style="text-align: right; padding-right:5px;"><img src="./img/sueno_64.jpg"></td>';
        tr= tr +'</tr>';
        tablesueno+=tr;    
        
    }  
    $("#table-sueno").append(tablesueno);
    tablesueno=null;
    
    //4 rellenamos la seccion traer
    $("#traer_etiqueta").html(obj.traer_etiqueta);
    var numcampostraer = obj.traer_array.length;
    $("#table-traer").empty();
    var tabletraer="";
    for(var s=0;s<numcampostraer;s++)
    {
        var tr='<tr><td class="td1"><span class="texto-verde" >'+ obj.traer_array[s]["campo"]+'</span></td>'+
               '<td class="td2">'+getImgIcon(obj.traer_array[s]["icono"])+' </td>'+
               '<td class="td3">'+obj.traer_array[s]["valor"]+'</td>';
        if(s==0)  tr=tr +'<td class="td4" rowspan="'+numcampostraer+'" style="text-align: right; padding-right:5px;"><img src="./img/traer_64.jpg"></td>';
        tr= tr +'</tr>';
        tabletraer+= tr;    
       
    }  
    $("#table-traer").append(tabletraer);
    tabletraer=null;
    
    //observaciones
    $("#observaciones_etiqueta").html(obj.observaciones_etiqueta);
    //$("#observaciones").html(obj.observaciones);
  
    
    var numcamposobservaciones = obj.observaciones.length;
    $("#table-observaciones").empty();
    var tableobs="";
    for(var s=0;s<numcamposobservaciones;s++)
    {
        var tr='<tr><td><span class="texto-marron fonts_Handlee_Regular" ><b>'+ obj.observaciones[s]["usuario"]+':</b> '+obj.observaciones[s]["texto"]+ '</span></td></tr>';
        tableobs +=tr;
        
        //$("#table-observaciones").append(tr);
    }  
    $("#table-observaciones").append(tableobs);
    tableobs=null;
  //tablonaula
    $("#tablonaula_etiqueta").html(obj.tablonaula_etiqueta);
  //  $("#tablonaula").html(obj.tablonaula);
    var numtablonaula = obj.tablonaula.length;
    $("#table-aula").empty();
    var tableaula="";
    for(var s=0;s<numtablonaula;s++)
    {
        var tr='<tr><td><span class="texto-gris" >'+ obj.tablonaula[s]["texto"]+ '</span></td></tr>';
        tableaula+=tr;    
    }  
    $("#table-aula").append(tableaula);
    tableaula=null;
    
    //tabloncentro
    $("#tabloncentro_etiqueta").html(obj.tabloncentro_etiqueta);
  //  $("#tabloncentro").html(obj.tabloncentro);
    var numtabloncentro = obj.tabloncentro.length;
    $("#table-centro").empty();
    var tablecentro="";
    for(var s=0;s<numtabloncentro;s++)
    {
        var tr='<tr><td><span class="texto-rojo" >'+ obj.tabloncentro[s]["texto"]+ '</span></td></tr>';
        tablecentro+=tr;    
        
    }
    $("#table-centro").append(tablecentro);
    tablecentro=null;
}

function fichareducidaCallback(data){
    var obj = jQuery.parseJSON(data);
    
    
    var url="";
    var urlcorta = obj.fichareducida_imagen;
     if (urlcorta!=null && urlcorta!="" )
    {
      url = urlcorta;//
      url = urlcorta.replace("./","https://www.miagendainfantil.com/admin/");
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
   


function ayuda()
{
	var ref = window.open("http://www.miagendainfantil.es/ayuda.html", '_blank', 'location=yes');

}


/******************* funciones footer  *****************************/

function irListaHijos()
{
	//window.location.replace("index.html");
	window.location.replace("index.html#seleccionarAlumnoTmp");
}
/*
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
*/
