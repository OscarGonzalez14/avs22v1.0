function init(){
	cargar_marca();
}

function guardarMarca(){
	var nom_marca=$("#marca").val();
	
	if(nom_marca !=""){
	$.ajax({
		url:"ajax/marca.php?op=guardar_marca",
		method:"POST",
		data:{nom_marca:nom_marca},
		cache: false,
		dataType: "json",
		error:function(x,y,z){
			d_pacole.log(x);
			console.log(y);
			console.log(z);
		},
		success:function(data){
         if (data=='ok') {
	      setTimeout ("Swal.fire('Se ha registrado una nueva marca','','success')", 1000);
	      setTimeout ("cargar_marca();", 2000);
	    }else{
          setTimeout ("Swal.fire('Esta marca ya se encuetra registrada','','error')", 1000);
          return false;
  		}
        }

     });
	}
}

function cargar_marca(){
	$.ajax({
		url:"ajax/marca.php?op=get_marcas",
      	method:"POST",
      	cache:false,
      	dataType:"json",
      	success:function(data)
      	{
         console.log(data);
         $("#marca_aros").empty();
         for(var i in data)
            { 
              document.getElementById("marca_aros").innerHTML += "<option value='"+data[i]+"'>"+data[i]+"</option>"; 
              document.getElementById("marca_accesorio").innerHTML += "<option value='"+data[i]+"'>"+data[i]+"</option>";

            }
      }
	}); 
}

init();