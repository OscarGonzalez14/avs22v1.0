$(document).ready(hiddenElements);

function hiddenElements(){
	document.getElementById('btnprint-facman').style.display='none';
}

function clear_inputs(element_focus){
	let items = document.getElementsByClassName('clear_input');
	for(i=0;i<items.length;i++){
      let id_element = items[i].id;
      document.getElementById(id_element).value = "";
   }
   document.getElementById(element_focus).focus();
}

function get_data_ccf(){

 let items = array_total_ccf.length;

 if (items<1) {
 	Swal.fire('Debe Seleccionar pacientes','','error');
 	$("#modal-default").modal('hide');
 	return false;
 }

 document.getElementById("contribuyente_tipo").checked = false;
 let monto_ccf = 0;
 let items_ccf = '';

 for(let j=0;j<array_total_ccf.length;j++){
 	monto_ccf += parseFloat(array_total_ccf[j].monto_venta);
 	items_ccf += "<b>"+array_total_ccf[j].numero_venta+"</b>"+"=$"+array_total_ccf[j].monto_venta+"; ";
 }
 let empresa = $("#empresa").val();

 $("#monto_ccf_det").val(monto_ccf);
 $("#items_ccf_det").val(items_ccf);
 $("#items_lengt").val(array_total_ccf.length);
 $("#empresa_cff").val(empresa);
}

function emitir_ccf(id_paciente,numero_venta,nombres,monto){
	$("#ccf_generica").modal('show');
	$("#n_venta_ccf").val(numero_venta);
	$("#id_paciente_ccf").val(id_paciente);
	$("#cliente_ccf").val(nombres);
	$("#monto_ccf").val(monto);
	let sucursal = $("#sucursal").val();
    let sucursal_usuario = $("#sucursal_usuario").val();
    ///////////////   GET CORRELATIVO COMPROBANTE  ///////////////
    $.ajax({
    url:"ajax/creditos.php?op=get_correlativo_ccf",
    method:"POST",
    data:{sucursal:sucursal,sucursal_usuario:sucursal_usuario},
    cache:false,
    dataType:"json",
    success:function(data){ 
    console.log(data);
    $("#correlativo_ccf").val(data.correlativo);    
  }
});

}

function registrarCorrelativoCcf(){

	let correlativo = $("#correlativo_ccf").val();
	let sucursal = $("#sucursal").val();
	let user = $("#usuario_ccf").val();
	let usuario = user.toString();
	let cliente = $("#cliente_ccf").val();
	let n_registro = $("#registro_ccf").val();
	let nit = $("#nit_ccf").val();
	let giro = $("#giro_ccf").val();
	let monto = $("#monto_ccf").val();
	let n_venta = $("#n_venta_ccf").val()

    $.ajax({
    url:"ajax/creditos.php?op=registrar_correlativo_ccf",
    method:"POST",
    data:{correlativo:correlativo,sucursal:sucursal,usuario:usuario,cliente:cliente,n_registro:n_registro,nit:nit,giro:giro,monto:monto,correlativo:correlativo,n_venta:n_venta},
    cache:false,
    dataType:"json",
    success:function(data){ 
    console.log(data);
    }
  });
}

var items_array_fac_manual = [];
$(document).keypress(function(e) {

    if(e.which == 13) {
    	e.preventDefault();
        agregaItemFacManual();
    }
});
function agregaItemFacManual(){
	let cant_fac_man = $("#cant_fac_man").val();
	let desc_fac_man = $("#desc_fac_man").val(); 
	let precio_fac_man = $("#precio_fac_man").val(); 
	let subt_fac_man = $("#subt_fac_man").val();

	if (cant_fac_man =="" || desc_fac_man =="" || precio_fac_man =="" || subt_fac_man =="") {return false}    

	let obj = {cant_fac_man,desc_fac_man,precio_fac_man,subt_fac_man}
	items_array_fac_manual.push(obj);
    
	showItemsFactManual();    
}

const formatMoney = (number) => {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).replace(/,/g,",",);
}

function calcSubtFactMan(){
	let cant = $("#cant_fac_man").val();
	let p_unit = $("#precio_fac_man").val();
	let sub_fac = p_unit*cant;
    $("#subt_fac_man").val(formatMoney(sub_fac));
}

function showItemsFactManual(){

  $("#items_factura_manual").html("");
  let filas = '';
  let total_fac =0;
   for(var i=0; i < items_array_fac_manual.length; i++){
   	let subtotal = (items_array_fac_manual[i].subt_fac_man).replace(/,/, "");
   	total_fac = parseFloat(total_fac)+parseFloat(subtotal);
    filas = filas + "<tr id='fila"+i+"'>"+
    "<td colspan='5' style='max-width:5%'>"+(i+1)+"</td>"+
    "<td colspan='10' style='max-width:10%'>"+items_array_fac_manual[i].cant_fac_man+"</td>"+
    "<td colspan='55' style='max-width:55%;text-align:left'>"+items_array_fac_manual[i].desc_fac_man+"</td>"+
    "<td colspan='10' style='max-width:10%;text-align:right'>$"+parseFloat(items_array_fac_manual[i].precio_fac_man).toFixed(2)+"</td>"+
    "<td colspan='10' style='max-width:10%;text-align:right'> $"+formatMoney(items_array_fac_manual[i].subt_fac_man)+"</td>"+
    "<td colspan='10' style='max-width:10%'>"+"<i class='fas fa-trash' onClick='eliminarFilafm("+i+");' style='color:red'></i>"+"</td>"+        
    "</tr>";
  }
//(1234567).toLocaleString().replace(/,/g,",",)
  filas = filas + "<tr style='border 1px solid'>"+
  	"<td colspan='80' style='width:80%;text-align:right;border-top:blue 1px solid'><b>SUMAS </b></td>"+
  	"<td colspan='10' style='width:10%;border-top:blue 1px solid;text-align:right'>$<span id='total_fac_man'>"+formatMoney(total_fac)+"</span></td>"+
  	"<td colspan='10' style='width:10%;border-top:blue 1px solid;text-align:right'></td>"+
  "</tr>";
  $('#items_factura_manual').html(filas); 
  clear_inputs('cant_fac_man');
  calcularValoresFactMan();
}

function calcularValoresFactMan(){

 let total_fac = $("#total_fac_man").html();
 console.log(total_fac);
  
 let checkbox = document.getElementById('contribuyente_tipo');
  let check_state = checkbox.checked;
  if (check_state) {
  	let valor_neto = parseFloat(total_fac.replace(/,/, ""))/(1.13);
  	let iva_retenido = parseFloat(valor_neto)*0.01;
  	let sumas_totales = parseFloat(total_fac.replace(/,/, ""))-parseFloat(iva_retenido);
  	$("#iva_retenido_facman").html("$"+formatMoney(iva_retenido));
  	$("#totales-facman").html("$"+formatMoney(sumas_totales));
  }else{
  	$("#iva_retenido_facman").html("0.00");
  	$("#totales-facman").html("$"+total_fac);
  }

}

function eliminarFilafm(index) {
	$("#fila"+index).remove();
	drop_index(index);
}

  function drop_index(position_element){
    items_array_fac_manual.splice(position_element, 1);
    showItemsFactManual();
  }

 function getCorrelativoFac(){
  	let sucursal = $("#sucursal").val();
  	let sucursal_usuario =$("#sucursal_usuario").val();

  	console.log(`sucursal ${sucursal} sucursal usuario ${sucursal_usuario}`);

  	$.ajax({
    url:"ajax/creditos.php?op=get_correlativo_factura",
    method:"POST",
    data:{sucursal:sucursal,sucursal_usuario:sucursal_usuario},
    cache:false,
    dataType:"json",
    success:function(data){ 
    console.log(data)
    	$("#correlativo_factura_man").val(data.correlativo);
    }
 })
}

document.getElementById("new_fact_manual").addEventListener("click", function() {
 document.getElementById('registrar-fac-manual').style.display = 'block';
 document.getElementById('btnprint-facman').style.display = 'none';
 document.getElementById("print-facman").href='';
 document.getElementById("contribuyente_tipo").checked = false;
 items_array_fac_manual = [];
 let items = document.getElementsByClassName('oblig-fm');
	for(i=0;i<items.length;i++){
      let id_element = items[i].id;
      document.getElementById(id_element).value = "";
    }
    showItemsFactManual();
});


function registrarFacturaManual(){
	////////////////////  VERIFICAR CAMPOS VACIOS ///////////
	let items = document.getElementsByClassName('oblig-fm');
	for(i=0;i<items.length;i++){
      let valor = items[i].value;
      if (valor=="") {
      	let id_element = items[i].id;
      	 $('#'+id_element).addClass(' is-invalid');
      	let name_element = items[i].dataset.nombre;
      	Swal.fire('Existen campos obligatorios vacios','','error');
      	return false;
      }      
    }
    ////////////////////  VERIFICAR ARRAY ///////////
    let itemsArray = items_array_fac_manual.length;
    if (itemsArray==0) {
    	Swal.fire('Debe agregar productos para facturar','','error');
    	return false;
    }
    ////////////////////  OBTENER CAMPOS ////////////
    let correlativo = $("#correlativo_factura_man").val();
    let sucursal = $("#sucursal").val();
    let id_usuario = $("#id_usuario").val();
    let cliente = $("#cliente_facman").val();
    let monto = $("#total_fac_man").html();
    let retencion = $("#iva_retenido_facman").html();
    let direccion = $("#direcion_facman").val();
    let telefono = $("#telefono_facman").val();
    $.ajax({
      url:"ajax/creditos.php?op=registrar_factura_manual",
      method:"POST",
      data:{'arrayDetFactMan':JSON.stringify(items_array_fac_manual),'correlativo':correlativo,'sucursal':sucursal,'id_usuario':id_usuario,'cliente':cliente,'monto':monto,'retencion':retencion},
      cache:false,
      dataType:"json",
      success:function(data){
      	if (data=='Ok') {        	
        	document.getElementById('registrar-fac-manual').style.display = 'none';
        	document.getElementById('btnprint-facman').style.display = 'block';
        	document.getElementById("print-facman").href='factura_manual_pdf.php?direccion='+
            direccion+'&'+'correlativo='+correlativo+'&'+'cliente='+cliente+'&'+'telefono='+telefono+'&'+'id_usuario='+id_usuario;
        	Swal.fire('Se ha realizado factura manual','','success');	
        }else{
        	Swal.fire('Este correlativo ya fue registrado','','error');
        }
    }
    });
}


$(document).on('keyup', '.is-invalid', function(){
	let id  = $(this).attr("id");
	document.getElementById(id).classList.remove('is-invalid');
	document.getElementById(id).classList.add('is-valid');
});

