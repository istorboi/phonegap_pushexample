/**
 * 
 */

var boolGetDocCategoria=false;  //refresh excepto primera vez
var boolGetCategoria=false;  //refresh excepto primera vez


function ajaxGetDocumentosCentro()
{
	$id_centro=window.localStorage.getItem("id_centro");
	
    $.ajax({
        type:'GET',
        url: URL_REST_BASE +'restapi/documentacionGetCategorias.php',
        data:{id_centro:$id_centro},
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'categoriasCallback',
        success: function(){
        	//alert("success");
        	},
        
        error: function(){
        	//alert("error");
        	}
    });
    
}


function categoriasCallback(data){
   var obj = jQuery.parseJSON(data);
    var numcategorias = obj.categorias.length;
    $("#ulCategorias").empty();
    var i=0;
    for( i=0;i<numcategorias;i++)
    {
        var li ="<li><a onClick='ajaxGetDocumentosCategoria(\""+ obj.categorias[i]["descripcion"]+"\")'>" + obj.categorias[i]["descripcion"] +"</a></li>";
        $("#ulCategorias").append(li);
    }
    
    if (boolGetCategoria==false)
    {
    	boolGetCategoria=true;
    	
    }
    else
    {
    	$("#ulCategorias").listview("refresh");
    }
    
    $.mobile.changePage("#listaCategorias", {transition: "slide", reverse: true  } );
    //$("#listaCategorias div[data-role='content']").trigger("create");

    
 }

function ajaxGetDocumentosCategoria(descripcion){
	$id_centro=window.localStorage.getItem("id_centro");
	$categoria_seleccionado = descripcion;
     $("#CategoryName").html(descripcion);

     $.ajax({
            type:'GET',
            url: URL_REST_BASE +'restapi/documentacionGetDocCategoria.php',
            data:{id_centro:$id_centro, categoria: $categoria_seleccionado},
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'documentacionGetDocCategoriaCallback',
            success: function(){
            	//alert("success");
            	},
            error: function(){
            	//alert("error Categorias");
            	}
        });
     
}

function documentacionGetDocCategoriaCallback(data)
{
	//alert(data);
    var obj = jQuery.parseJSON(data);
    var numdoc = obj.documentos.length;
    $("#ulDocumentos").empty();
    var i=0;
    for( i=0;i<numdoc;i++)
    {
        var li ="<li><a onClick='mostrarDocumento(\""+ obj.documentos[i]["urlDoc"]+"\")'>" + obj.documentos[i]["descripcion"] +"</a></li>";
        $("#ulDocumentos").append(li);
    }
    
    if (boolGetDocCategoria==false)
    {
    	boolGetDocCategoria=true;
    	
    }
    else
    {
    	$("#ulDocumentos").listview("refresh");
    }
    
    
    $.mobile.changePage("#listaDoc", {transition: "slide", reverse: true  } );
    
   
}

function mostrarDocumento(src)
{

  $url=src;  
    
  var isCanvasSet = false;
$(document).on("pageshow",function(event,data){
	  var docLocation = document.location.href;
	  if(docLocation.indexOf("menu") !== -1 && isCanvasSet == false){
	   
	    var imgCanvas = document.getElementById('mycanvas');
        var gesturableImg = new ImgTouchCanvas({
            canvas: imgCanvas,
            path:  $url,
      
            desktop: true
        });
        isCanvasSet = true;
	  }
	  if(docLocation.indexOf("menu") == -1 && isCanvasSet == true){
	    var imgCanvas = document.getElementById('mycanvas');
	    var ctx = imgCanvas.getContext("2d");
	    ctx.clearRect(0, 0, imgCanvas.width,imgCanvas.height);
	    ctx.fillStyle="#000000";
	    ctx.fillRect(0,0,imgCanvas.width,imgCanvas.height);		
	    isCanvasSet = false;
	  }
	});

document.location.href = "#menu";
   
}
