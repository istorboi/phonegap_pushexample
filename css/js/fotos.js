//var URL_REST_BASE ="http://localhost/miarest2/"; 
//var URL="http://www.miagendainfantil.com/";
    
function ajaxAlumnoGetFotos()
{
	$id_alumno=window.localStorage.getItem("id_alumno");
	$id_tutor=window.localStorage.getItem("id_tutor");
  
	//alert("alumno:"+$id_alumno+" tutor:" + $id_tutor );
	
    $.ajax({
        type:'GET',
        url: URL_REST_BASE +'restapi/fotoGetTemas.php',
        data:{id_alumno:$id_alumno, id_tutor:$id_tutor},
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'temasCallback',
        success: function(){
        	//alert("success");
        	},
        error: function(){
        	//alert("error");
        	}
    });
    
}

function temasCallback(data){
//	alert(data);
	var obj = jQuery.parseJSON(data);
	//numero de temas
	var numtemas = obj.temas.length;
	//tabla id=tablecomidas --> vaciamos la tabla y la rellenamos de nuevo
	$("#ultemas").empty();
	var i=0;
	for( i=0;i<numtemas;i++)
	{
		var li ="<li><a onClick='ajaxGetFotosTema(\""+ obj.temas[i]["tema"]+"\")'>" + obj.temas[i]["tema"] +"</a></li>";
		$("#ultemas").append(li);
	}    
	$("#ultemas").listview("refresh");
}

function ajaxGetFotosTema(tema){
 //alert(tema); 
 $tema_seleccionado = tema;
 $("#GalleryName").html(tema);

 	$id_alumno=window.localStorage.getItem("id_alumno");
	$id_tutor=window.localStorage.getItem("id_tutor");

 
 $.ajax({
        type:'GET',
        url: URL_REST_BASE +'restapi/fotoGetFotosTema.php',
        data:{id_alumno:$id_alumno, id_tutor:$id_tutor , tema: $tema_seleccionado},
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'fotosTemaCallback',
        success: function(){ 
        	//alert("success");
        },
        error: function(){
        	//alert("error foto temas");
        }
    });

}

function fotosTemaCallback(data)
{
var obj = jQuery.parseJSON(data);
debugger;
//numero de temas
var numfotos = obj.fotos.length;

$("#gallery_table").empty();

//<div class="gallery-row">
//                    <div class="gallery-item"><a href="images/full/elena1_full.jpg" rel="external" class="ui-link"><img src="images/thumb/elena1_th.jpg" alt="Image 001" /></a></div>
//                    <div class="gallery-item"><a href="images/full/elena2_full.jpg" rel="external" class="ui-link"><img src="images/thumb/elena2_th.jpg" alt="Image 002" /></a></div>
//                    <div class="gallery-item"><a href="images/full/elena3_full.jpg" rel="external" class="ui-link"><img src="images/thumb/elena3_th.jpg" alt="Image 003" /></a></div>
//            </div>

var i=0;
var col=0;
var contenido="";
for( i=0;i<numfotos;i++)
{
    if(col==0){ contenido+='<div class="gallery-row">';}
    //contenido+='<div class="gallery-item"><a href="'+obj.fotos[i]["urlFoto"]+'" rel="external" class="ui-link"><img src="'+obj.fotos[i]["urlThumb"]+'" /></a></div>';
    contenido+='<div class="gallery-item"><a onClick="galleryDetail('+obj.fotos[i]["id_foto"]+',\''+obj.fotos[i]["urlFoto"]+'\')" rel="external" class="ui-link"><img src="'+obj.fotos[i]["urlThumb"]+'" /></a></div>';
    
    if(col==2){contenido+='</div>';}
    if(col==2){ col=0;} else{col++;};
}    
$("#gallery_table").append(contenido);
$.mobile.changePage("#Gallery1", {transition: "slide", reverse: true  } );

}

function galleryDetail(id_foto,src)
{
	$("#GalleryDetailSrc").attr("src",src);
	$("#GalleryDetailSrc").attr("data_idfoto",id_foto);
	$.mobile.changePage("#GalleryDetail", {transition: "slide", reverse: true  } );

}

function confirmDesetiquetar()
{
//se llama al servicio desetiquetar con id_foto y id_alumno.

    navigator.notification.confirm("¿Realmente quieres desetiquetar al niño", onConfirm,"Confirmar Desetiquetar", "Desetiquetar,Cancelar" );
  //  onConfirm(1); //borrar y usar apache cordova

}

function onConfirm(indiceBotton) 
{
	if (indiceBotton==1)
	{
		ajaxDesetiquetar();
	}
	else	
	{
 
	}
}




function ajaxDesetiquetar()
{

$idfoto= $("#GalleryDetailSrc").attr("data_idfoto");
$id_alumno=window.localStorage.getItem("id_alumno");
$id_tutor=window.localStorage.getItem("id_tutor");

	
  $.ajax({
        type:'GET',
        url: URL_REST_BASE + 'restapi/fotoDesetiquetarAlumno.php',
        data:{id_alumno:$id_alumno, id_tutor:$id_tutor , id_foto: $idfoto},
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'desetiquetarCallback',
        success: function(){ 
        	//alert("success desetiquetar, delete");
        },
        error: function(){
        	alert("No se pudo Desetiquetar la Foto");
        }
    });
}

function desetiquetarCallback(data)
{
	alert("Etiqueta Eliminada con éxtito");  //no borrar
	window.location.replace("#Gallery1");
	ajaxGetFotosTema($("#GalleryName").text());


}