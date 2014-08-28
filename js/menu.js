//var URL_REST_BASE ="http://localhost/miarest2/"; 
//var URL="http://www.miagendainfantil.com/";
    
function ajaxAlumnoGetMenu()
{
	$id_alumno=window.localStorage.getItem("id_alumno");
	$id_tutor=window.localStorage.getItem("id_tutor");
  
    $.ajax({
                type:'GET',
                url: URL_REST_BASE + 'restapi/alumnoGetMenu.php',
                data:{id_alumno:$id_alumno, id_tutor:$id_tutor },
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'getMenuCallBack',
                success: function(){ 
                	//alert("success obtener menu delete");
                },
                error: function(){
                	//alert("No se pudo obtener menu");
                }
            });
}
    

function getMenuCallBack(data)
{
 //   alert(data);
     var obj = jQuery.parseJSON(data);
    
    $url= obj.url;
    
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
 



