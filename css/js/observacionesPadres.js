



$(document).on("pagebeforeshow","#observaciones",function(){
	inicializarFormularioObservaciones();
});


function inicializarFormularioObservaciones()
{
   // alert("inicializa observaciones");
  
   
   $("[type=checkbox]").attr("data-cacheval",true);
 
    $("#check1").attr("checked", false);
    $("#check2").attr("checked", false);
    $("#check3").attr("checked", false);
    $("#check4").attr("checked", false);
    $("#check5").attr("checked", false);
    $("#check6").attr("checked", false);
    $("#check7").attr("checked", false);
    $("#textObservaciones").val('');

  
    var id_alumno_obs=window.localStorage.getItem("id_alumno");
	var id_tutor_obs=window.localStorage.getItem("id_tutor");

    $("#id_tutorObservaciones").val(id_tutor_obs);
    $("#id_alumnoObservaciones").val(id_alumno_obs);
    
  
    
    
 var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
 var f=new Date();
 var f1=new Date(new Date().getTime() + 1*24 * 60 * 60 * 1000);
 var f2=new Date(new Date().getTime() + 2*24 * 60 * 60 * 1000);
 var f3=new Date(new Date().getTime() + 3*24 * 60 * 60 * 1000);
 var f4=new Date(new Date().getTime() + 4*24 * 60 * 60 * 1000);
 var f5=new Date(new Date().getTime() + 5*24 * 60 * 60 * 1000);
 var f6=new Date(new Date().getTime() + 6*24 * 60 * 60 * 1000);

 $("#labelcheck2").html( "Ahora");
 $("#labelcheck2").html( diasSemana[(f.getDay() +1)%7] +" "+f1.getDate());
 $("#labelcheck3").html(diasSemana[(f.getDay() +2)%7] + " "+f2.getDate());
 $("#labelcheck4").html(diasSemana[(f.getDay() +3)%7] + " "+f3.getDate());
 $("#labelcheck5").html(diasSemana[(f.getDay() +4)%7] + " "+f4.getDate());
 $("#labelcheck6").html(diasSemana[(f.getDay() +5)%7] + " "+f5.getDate());
 $("#labelcheck7").html(diasSemana[(f.getDay() +6)%7] + " "+f6.getDate());
   /* 
 $("#labelcheck2").html( diasSemana[(f.getDay() +1)%7] +" "+(f.getDate()+1));
 $("#labelcheck3").html(diasSemana[(f.getDay() +2)%7] + " "+(f.getDate() +2));
 $("#labelcheck4").html(diasSemana[(f.getDay() +3)%7] + " "+(f.getDate() +3));
 $("#labelcheck5").html(diasSemana[(f.getDay() +4)%7] + " "+(f.getDate() +4));
 $("#labelcheck6").html(diasSemana[(f.getDay() +5)%7] + " "+(f.getDate() +5));
 $("#labelcheck7").html(diasSemana[(f.getDay() +6)%7] + " "+(f.getDate() +6));
 
 */   

 
 
    $("#formObservaciones").trigger("create");
   
    
}

function enviarFormularioObservaciones()
{
   // alert($('#formObservaciones').serialize());
	
    $.ajax({
            type:'GET',
            url: URL_REST_BASE +'restapi/crearObservaciones.php',
            data:$('#formObservaciones').serialize(),
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        jsonpCallback: 'formObservacionesCallback',
                        
                        success: function(){
                            inicializarFormularioObservaciones();
 
                           // alert ("ok submit form observaciones");
                        },
                        error: function(){
                            inicializarFormularioObservaciones();
 
                               alert ("No se pudo mandar la Observación");
                         }
    });
    
    
}

function formObservacionesCallback(data)
{
    //alert("Del "+ data);
	//inicializarFormularioObservaciones();
	//alert("Observación Enviada");
	navigator.notification.alert(
		    'Observación Enviada!',     // mensaje (message)
		    okObsercacion,         // función 'callback' (alertCallback)
		    'MIA',            // titulo (title)
		    'Cerrar'                // nombre del botón (buttonName)
		    );
	
	//history.back();
    
}

function okObsercacion()
{	history.back();
	}
