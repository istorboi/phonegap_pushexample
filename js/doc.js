/**
 * 
 */

var boolGetDocCategoria=false;  //refresh excepto primera vez
var boolGetCategoria=false;  //refresh excepto primera vez


function ajaxGetDocumentosCentro()
{
	$id_centro=window.localStorage.getItem("id_centro");
	
	
	$.mobile.loading( "show", { text: "Cargando",  textVisible: true, theme: "a",  html: ""	});
	$cv = window.localStorage.getItem("cv");
	//new api 162
	//FALTA PROBAR

	
    $.ajax({
        type:'GET',
        url: URL_REST_BASE +'restapi/documentacionGetCategorias.php',
        data:{id_centro:$id_centro,cv:$cv},
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'categoriasCallback',
        success: function(){
        	//alert("success");
        	$.mobile.loading( "hide");
        	},
        
        error: function(){
        	//alert("error");
        	$.mobile.loading( "hide");
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

     $.mobile.loading( "show", { text: "Cargando",  textVisible: true, theme: "a",  html: ""	});

   $cv = window.localStorage.getItem("cv");
   //new api 162
   //FALTA PROBAR

     
     $.ajax({
            type:'GET',
            url: URL_REST_BASE +'restapi/documentacionGetDocCategoria.php',
            data:{id_centro:$id_centro, categoria: $categoria_seleccionado,cv:$cv},
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'documentacionGetDocCategoriaCallback',
            success: function(){
            	//alert("success");
            	$.mobile.loading( "hide");

            	},
            error: function(){
            	//alert("error Categorias");
            	$.mobile.loading( "hide");

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
 //   var re = /(?:\.([^.]+))?$/;   
   
    for( i=0;i<numdoc;i++)
    {
    	//var ext =   re.exec(obj.documentos[i]["urlDoc"])[1];
    	var lon=obj.documentos[i]["urlDoc"].length;
    	var ext =   obj.documentos[i]["urlDoc"].substring(lon-3, lon);
    
    	var li="";
    if (ext =="pdf" || ext =="PDF")
    	{
    		li ="<li><a onClick='mostrarDocumentoPDF(\""+ obj.documentos[i]["urlDoc"]+"\",\""+ obj.documentos[i]["descripcion"]+"\" )'><img src='./css/pdficon24.png' class='ui-li-icon' > " +    obj.documentos[i]["descripcion"] +"</a></li>";	
    	}else
    	{
    		li ="<li><a onClick='mostrarDocumentoIMG(\""+ obj.documentos[i]["urlDoc"]+"\",\""+ obj.documentos[i]["descripcion"]+"\" )'><img src='./css/imageicon24.jpg' class='ui-li-icon' > " + obj.documentos[i]["descripcion"] +"</a></li>";
    	}
    	
        
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



function mostrarDocumentoPDF(src,name)
{

  $url=src;  
  window.localStorage.setItem("doc2", src);
  
  var msg="";
  
  if( (device.platform=="iOS" || device.platform=="ios") && (parseFloat(window.device.version) >= 7.0)) 
  {
	  msg= 'Se mostrará el documento '+name+' en el navegador y la aplicación MIA pasará a un segundo plano';
	  
  }else	
  {	
	  msg= 'Se descargará el documento '+name+ ' (PDF), el documento lo encontrarás en la sección de descargas o en la barra de notificaciones. Necesitas un lector de pdf para verlo (puedes instalarte el Adobe reader o similar)';
	  
  }
  

  navigator.notification.alert(msg,okDescargarPDF,'MIA','Descargar');
	
  
//ref= window.open(URL_REST_BASE +url, '_system', 'location=yes');
   
}

function okDescargarPDF(){
	
	var url = window.localStorage.getItem("doc2");
	
	ref= window.open(url, '_system', 'location=yes');
	
	
}


function mostrarDocumentoIMG(src ,name)
{
	$url=src; 
	window.localStorage.setItem("doc", src);
	
	$("#docImgSrc").attr("src",src);
	$("#h1docImgName").html(name);
	$.mobile.changePage("#DocImage", {transition: "slide", reverse: true  } );
	
}


function abrirDocImg(){
	var url = window.localStorage.getItem("doc");
	
	ref= window.open(url, '_system', 'location=yes');
	
}



/******************************************************************************** */
/* documentos con canvas deprecated */
/*
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
  window.localStorage.setItem("doc", src);
	
  
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
*/

