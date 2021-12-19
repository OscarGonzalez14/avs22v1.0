$(document).ready(ocultar_btns_post_ingreso);

  function ocultar_btns_post_ingreso(){
  document.getElementById("post_ingreso").style.display = "none";
  
}
  function mostrar_btn_post_ingreso(){
  document.getElementById("post_ingreso").style.display = "flex";
}
  function ocultar_btn_de_ingreso(){
  document.getElementById("select_prod").style.display = "none";
  document.getElementById("btn_ingreso").style.display = "none";
  document.getElementById("btn_ingreso").style.display = "none";
}
//////////////////////////////*//
var tablas_compras_ingreso_bodegas;
function init(){
  get_numero_ingreso();
  get_correlativo_traslado();
}
 function ingresar_compras_bodega() {
  $('#modal_ingreso_bodega').modal('show');
  var numero_compra = $("#numero_compra_bod").val();
  tablas_compras_ingreso_bodegas=$('#data_productos_ingresos_bodega').dataTable(

  {

    "aProcessing": true,//Activamos el procesamiento del datatables
      "aServerSide": true,//Paginación y filtrado realizados por el servidor
      dom: 'Bfrti',//Definimos los elementos del control de tabla
      
      buttons: [
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdf'
            ],
    "ajax":
        {
          url: 'ajax/bodegas.php?op=listar_productos_ingreso_bodegas',
          type : "post",
          data:{numero_compra:numero_compra},
          error: function(e){
            console.log(e.responseText);
          }
        },
    "bDestroy": true,
    "responsive": true,
    "bInfo":true,
    "iDisplayLength": 8,//Por cada 10 registros hace una paginación
      "order": [[ 0, "desc" ]],//Ordenar (columna,orden)

      "language": {

          "sProcessing":     "Procesando...",

          "sLengthMenu":     "Mostrar _MENU_ registros",

          "sZeroRecords":    "No se encontraron resultados",

          "sEmptyTable":     "Ningún dato disponible en esta tabla",

          "sInfo":           "Mostrando un total de _TOTAL_ registros",

          "sInfoEmpty":      "Mostrando un total de 0 registros",

          "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",

          "sInfoPostFix":    "",

          "sSearch":         "Buscar:",

          "sUrl":            "",

          "sInfoThousands":  ",",

          "sLoadingRecords": "Cargando...",

          "oPaginate": {

              "sFirst":    "Primero",

              "sLast":     "Último",

              "sNext":     "Siguiente",

              "sPrevious": "Anterior"

          },

          "oAria": {

              "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",

              "sSortDescending": ": Activar para ordenar la columna de manera descendente"

          }

         }//cerrando language

  }).DataTable();
  $('#data_productos_ingresos_bodega').focus();
}

///////////////INGRESAR PRODUCTOS A BODEGA
var detalles = [];
function agregaIngreso(id_producto,numero_compra){
  $.ajax({
  url:"ajax/bodegas.php?op=buscar_producto_por_compra",
  method:"POST",
  data:{id_producto:id_producto,numero_compra:numero_compra},
  cache: false,
  dataType:"json",
  success:function(data){
    console.log(data);   
    var obj = {
      id_producto: data.id_producto,
      cant_ingreso: data.cant_ingreso,
      precio_venta: data.precio_venta,
      cantidad : 1,
      ubicacion  : '',
      numero_compra   : data.numero_compra,
      descripcion  : data.descripcion,
    };//Fin objeto
    detalles.push(obj);
    listarDetallesIngresos();
    //carga_cats();
    console.log(detalles);
    }//fin success
  });//fin de ajax
  $('#modal_ingreso_bodega').modal("hide");
  
}

function listarDetallesIngresos(){

    $('#listar_productos_de_ingreso').html('');
    var filas = "";

    for(var i=0; i<detalles.length; i++){

    //var subtotal = detalles[i].subtotal = detalles[i].cantidad * detalles[i].precio_compra;

        var filas = filas + "<tr id='fila"+i+"'><td style='text-align:center'>"+(i+1)+
        "</td>"+"<td style='text-align:center;'>"+detalles[i].numero_compra+"</td>"+"<td style='text-align:center;'>"+detalles[i].cant_ingreso+
        "</td>"+"<td style='text-align:center;'><span>"+detalles[i].descripcion+"</span></td>"+"<td>"+"<select class='form-control' id='categoria_ubicacion' onClick='setUbicacion(event, this, "+(i)+");'></select>"+"</td>"+"<td>"+"<input type='text'class='form-control cant"+detalles[i].id_producto+"' onClick='setCant(event, this, "+(i)+");' onKeyUp='setCant(event, this, "+(i)+")' value='"+detalles[i].cantidad+"' pattern='^[0-9]+' id='cant"+(i)+"'>"+"</td>"+"<td style='text-align:center'><i class='nav-icon fas fa-trash-alt fa-2x' onClick='eliminarItem("+i+");' style='color:red'></i></td>"+"</tr>";

    //subtotal = subtotal + importe;

  }//cierre for

  $('#listar_productos_de_ingreso').html(filas);

}
 
function setUbicacion(event, obj, idx){
    event.preventDefault();
    detalles[idx].ubicacion = String(obj.value);
    //recalcular(idx);
}

function setCant(event, obj, idx){
    event.preventDefault();
    detalles[idx].cantidad = String(obj.value);
    setCantidadAjax(event, obj, idx);
}

function setCantidadAjax(event, obj, idx){
  event.preventDefault();
  var cant_act=detalles[idx].cantidad = parseInt(obj.value);  
  var cant_disponible = detalles[idx].cant_ingreso;
  if (cant_act>cant_disponible) {
    setTimeout ("Swal.fire('La cantidad es mayor a cantidad disponible','','error')", 100)
    var parametro ='cant'+idx;
    document.getElementById(parametro).style.border='solid 1px red';
    document.getElementById(parametro).value=0;
  }else if(cant_act<=cant_disponible){
    document.getElementById(parametro).style.border='solid 2px #7FFFD4';
  }
}

function eliminarItem(index) {
  $("#fila" + index).remove();
  drop_item(index);
}

function drop_item(position_element){
  detalles.splice(position_element, 1);
  //recalcular(position_element);
  calcularTotales();

}
 function registrarIngresoBodega(){

  var fecha_ingreso = $("#fecha_ingreso").val();
  var usuario = $("#usuario").val();
  var sucursal_i = $("#sucursal_i").html();
  var numero_compra_i = $("#numero_compra_i").html();
  var categoria_ubicacion = $("#categoria_ubicacion").val();
  var numero_ingreso = $("#id_ingreso_c").html();

  var contador = 0;
  count_fields_empty=[];
  for(var i=0;i<detalles.length;i++){
    var cantidad = detalles[i].cantidad;
    var ubicacion = detalles[i].ubicacion;
    var cant_items = parseInt(cantidad);    
      //alert(currentNumber);
    if(cantidad == ''){
      count_fields_empty.push(cantidad);
    }
    contador = contador+cant_items;
  }
///////////////////////////////////////


//////////////VALIDAR QUE SE ENVIEN PRODUCTOS A LA BD
var test_array = detalles.length;
  if (test_array<1) {
  Swal.fire('Debe Agregar Productos al Ingreso!','','error')
  return false;
}
//////////////VALIDAR QUE CAMPOS UBCACION Y CANTIDAD NOT EMPTY
var cuenta_vacios = count_fields_empty.length;
if (cuenta_vacios>0) {
  Swal.fire('Debe seleccionar la cantidad en cada item!','','error')
  return false;
}

if(categoria_ubicacion != ""){
    console.log('Message Oscar');
    $.ajax({
    url:"ajax/bodegas.php?op=registrar_ingreso_a_bodega",
    method:"POST",
    data:{'arrayIngresoBodega':JSON.stringify(detalles),'fecha_ingreso':fecha_ingreso,'usuario':usuario,'sucursal_i':sucursal_i,'numero_compra_i':numero_compra_i,'categoria_ubicacion':categoria_ubicacion,'numero_ingreso':numero_ingreso},
    cache: false,
    dataType:"json",
    error:function(x,y,z){
      console.log(x);
      console.log(y);
      console.log(z);
    },
    success:function(data){  
    }

  });
    setTimeout ("Swal.fire('El ingreso a Bodega ha sido Exitoso','','success')", 100)
    //setTimeout ("explode();", 2000);
    mostrar_btn_post_ingreso();
    ocultar_btn_de_ingreso();
  }else{
    setTimeout ("Swal.fire('Seleccione el destino de Ingreso','','error')", 100)
  }

}

////////REPORTE DE ULTIMO INGESOS A BODEGA
function reporte_ingreso_bodega(){
  var numero_compra = $("#n_compra").val();

  tabla_compras_admin_report=$('#reporte_compra_admin').dataTable(
  {
    "aProcessing": true,//Activamos el procesamiento del datatables
      "aServerSide": true,//Paginación y filtrado realizados por el servidor
      dom: 'Bfrtip',//Definimos los elementos del control de tabla
      buttons: [{
          extend: 'excelHtml5',
          download: 'open',
          text: 'Descargar Excel',
          filename: function() {
              var date_edition = 'Compras Pendientes Ingresar '+moment().format("DD-MM-YYYY HH[h]mm")
              var selected_machine_name = $("#output_select_machine select option:selected").text()
              return date_edition + ' - ' + selected_machine_name
           },
           sheetName: 'Compras',
           title : null
       },
            {
              extend: 'pdfHtml5',
              download: 'open',
              text: 'Imprimir',
              orientation: 'portrait',
              pageSize: 'letter',
              customize : function(doc) {doc.pageMargins = [10, 10, 10,10 ]; },
              filename: function() {
              var fecha = 'Compra '+moment().format("DD-MM-YYYY HH[h]mm")
              var selected_machine_name = $("#output_select_machine select option:selected").text()
              return fecha + ' - ' + selected_machine_name
              
            },
            title : 'Compras'
        }   
       ],
    "ajax":
        {
          url: 'ajax/compras.php?op=reporte_compra_administrador',
          type : "post",
          data:{numero_compra:numero_compra},   
          error: function(e){
            console.log(e.responseText);
          }
        },
    "bDestroy": true,
    "responsive": true,
    "bInfo":true,
    "iDisplayLength": 10,//Por cada 10 registros hace una paginación
      "order": [[ 0, "desc" ]],//Ordenar (columna,orden)

      "language": {

          "sProcessing":     "Procesando...",

          "sLengthMenu":     "Mostrar _MENU_ registros",

          "sZeroRecords":    "No se encontraron resultados",

          "sEmptyTable":     "Ningún dato disponible en esta tabla",

          "sInfo":           "Mostrando un total de _TOTAL_ registros",

          "sInfoEmpty":      "Mostrando un total de 0 registros",

          "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",

          "sInfoPostFix":    "",

          "sSearch":         "Buscar:",

          "sUrl":            "",

          "sInfoThousands":  ",",

          "sLoadingRecords": "Cargando...",

          "oPaginate": {

              "sFirst":    "Primero",

              "sLast":     "Último",

              "sNext":     "Siguiente",

              "sPrevious": "Anterior"

          },

          "oAria": {

              "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",

              "sSortDescending": ": Activar para ordenar la columna de manera descendente"

          }

         }//cerrando language

  }).DataTable();
}

/////REPORTE INGRESOS A BODEGA
function reporte_ingresos_bodega()
{
  var numero_ingreso = $("#id_ingreso_c").html();
  //alert(numero_compra);
  //return false;
  tabla_reporte_ingresos_bodega=$('#reporte_ingresos_bodega').dataTable(
  {
    "aProcessing": true,//Activamos el procesamiento del datatables
      "aServerSide": true,//Paginación y filtrado realizados por el servidor
      dom: 'Bfrtip',//Definimos los elementos del control de tabla
      buttons: [
                'excelHtml5'
            ],
    "ajax":
        {
          url: 'ajax/bodegas.php?op=reporte_ingresos_bodega',
          type : "post",
          data:{numero_ingreso:numero_ingreso},   
          error: function(e){
          console.log(e.responseText);
          }
        },
    "bDestroy": true,
    "responsive": true,
    "bInfo":true,
    "iDisplayLength": 10,//Por cada 10 registros hace una paginación
      "order": [[ 0, "desc" ]],//Ordenar (columna,orden)

      "language": {

          "sProcessing":     "Procesando...",

          "sLengthMenu":     "Mostrar _MENU_ registros",

          "sZeroRecords":    "No se encontraron resultados",

          "sEmptyTable":     "Ningún dato disponible en esta tabla",

          "sInfo":           "Mostrando un total de _TOTAL_ registros",

          "sInfoEmpty":      "Mostrando un total de 0 registros",

          "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",

          "sInfoPostFix":    "",

          "sSearch":         "Buscar:",

          "sUrl":            "",

          "sInfoThousands":  ",",

          "sLoadingRecords": "Cargando...",

          "oPaginate": {

              "sFirst":    "Primero",

              "sLast":     "Último",

              "sNext":     "Siguiente",

              "sPrevious": "Anterior"

          },

          "oAria": {

              "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",

              "sSortDescending": ": Activar para ordenar la columna de manera descendente"

          }

         }//cerrando language

  }).DataTable();
}
/////////////////////GET NUMERO DE INGRESO
function get_numero_ingreso(){
    $.ajax({
      url:"ajax/bodegas.php?op=get_numero_ingreso",
      method:"POST",
      cache:false,
      dataType:"json",
      success:function(data)
      {
        $("#id_ingreso_c").html(data.n_ingreso);
      }
    })
}

//////////////carga Select
    function carga_cats(){
     $.ajax({
      url:"ajax/categoria.php?op=get_categorias",
      method:"POST",
      //data:{numero_venta:numero_venta},
      cache:false,
      dataType:"json",
      success:function(data)
      {
        console.log(data);
        for(var i in data)
            { 
              document.getElementById("categoria_ubicacion").innerHTML += "<option value='"+data[i]+"'>"+data[i]+"</option>"; 

            }
      }
    });
}

//////////////GET CATEGORIAS EN STOCK
$(document).ready(function(){
  var sucursal = $("#sucursal_user").val();
  $("#tipo_categoria").change(function () {         
    $("#tipo_categoria option:selected").each(function () {
      categoria = $(this).val();
      $.post('ajax/bodegas.php?op=select_categorias', {categoria:categoria,sucursal:sucursal}, function(data){
        $("#ubicacion_bodega").html(data);
      });            
    });
  })
});

//////////////////
$(document).on('click', '#tipo_categoria', function(){ 
    
    var sucursal = $("#sucursal_user").val();
    var categoria = $(this).val();
    console.log(categoria);
    console.log(sucursal);
    $.ajax({
      url:"ajax/categoria.php?op=get_categorias_sucursal",
      method:"POST",
      data:{sucursal:sucursal,categoria:categoria},
      cache:false,
      dataType:"json",
      success:function(data)
      {
        console.log(data);
        $("#categoria_ubicaciones").empty();
        for(var i in data){

              document.getElementById("categoria_ubicaciones").innerHTML += "<option value='"+data[i]+"'>"+data[i]+"</option>"; 

            }
      }
    });

  });
//////////////////////////GET INVENTARIO GENERAL
$(document).on("click","#categoria_ubicaciones", function(){
  var ubicacion = $(this).val();
  tabla_existencias= $('#data_inventario_genaral').DataTable({
      
  "aProcessing": true,//Activamos el procesamiento del datatables
         "aServerSide": true,//Paginación y filtrado realizados por el servidor
      dom: 'Bfrtip',//Definimos los elementos del control de tabla
      buttons: [
                'excelHtml5'
            ],

           "ajax":{
            url:"ajax/bodegas.php?op=get_inventario_general",
            type : "post",
        //dataType : "json",
        data:{ubicacion:ubicacion},           
        error: function(e){
        console.log(e.responseText);
        },
            
      },

              "bDestroy": true,
        "responsive": true,
        "bInfo":true,
        "iDisplayLength": 10,//Por cada 10 registros hace una paginación
          "order": [[ 0, "desc" ]],//Ordenar (columna,orden)

            "language": {
 
          "sProcessing":     "Procesando...",
       
          "sLengthMenu":     "Mostrar _MENU_ registros",
       
          "sZeroRecords":    "No se encontraron resultados",
       
          "sEmptyTable":     "Ningún dato disponible en esta tabla",
       
          "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
       
          "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
       
          "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
       
          "sInfoPostFix":    "",
       
          "sSearch":         "Buscar:",
       
          "sUrl":            "",
       
          "sInfoThousands":  ",",
       
          "sLoadingRecords": "Cargando...",
       
          "oPaginate": {
       
              "sFirst":    "Primero",
       
              "sLast":     "Último",
       
              "sNext":     "Siguiente",
       
              "sPrevious": "Anterior"
       
          },
       
          "oAria": {
       
              "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
       
              "sSortDescending": ": Activar para ordenar la columna de manera descendente"
       
          }

         }, //cerrando language

          //"scrollX": true



        });



      });

///////////////////////////TRASLADOS
var detalles_traslado = [];
function realizar_traslado(id_producto,categoria_ub){

  $.ajax({
  url:"ajax/bodegas.php?op=get_productos_traslados",
  method:"POST",
  data:{id_producto:id_producto,categoria_ub:categoria_ub},
  cache: false,
  dataType:"json",
  success:function(data){
    console.log(data);   
    var obj = {
      cantidad : 1,
      codProd  : id_producto,
      descripcion   : data.desc_producto,
      origen    : data.categoria_ub,
      destino  : "",
      num_compra : data.num_compra,
      id_ingreso : data.id_ingreso,
      precio_venta:data.precio_venta
    };//Fin objeto
    detalles_traslado.push(obj);
    $('#modalTraslados').modal("hide");
    listarDetallesTraslado();
    console.log(detalles_traslado);
    }//fin success
  });//fin de ajax

}
/////////////////////////LISTAR DETALLES DE TRASLADO
/////////fin aggergar acc a compra
function listarDetallesTraslado(){

    $('#listar_det_traslados').html('');

    var filas = "";
    for(var i=0; i<detalles_traslado.length; i++){
        var filas = filas + "<tr id='fila_t"+i+"'><td>"+(i+1)+
        "</td><td style='text-align:center;'>"+detalles_traslado[i].descripcion+
        "<td style='text-align:center'><input style='text-align:right' type='number' class='cantidad form-control' onClick='setCantidad_traslado(event, this, "+(i)+");' onKeyUp='setCantidad_traslado(event, this, "+(i)+");' value='"+detalles_traslado[i].cantidad+"'><td style='text-align:center'><input style='text-align:right' type='text' class='cantidad form-control'  value='"+detalles_traslado[i].origen+"' readonly ></td><td style='text-align:center'><input style='text-align:right' type='text' class='cantidad form-control'  value='"+detalles_traslado[i].destino+"' onClick='buscar_categorias("+(i)+")' id='item_traslado"+(i)+"'></td><td style='text-align:center'><i class='nav-icon fas fa-trash-alt fa-2x' onClick='eliminarItemTraslado("+i+");' style='color:red'></i></td></tr>";
    


    //subtotal = subtotal + importe;

  }//cierre for
  $('#listar_det_traslados').html(filas);
}

function buscar_categorias(index_cat){
  var indice = index_cat;
  var sucursal =$("#sucursal").val();
  $("#modal_cat_traslados").modal("show");
  $("#indice_categoria").val(indice);
    tabla_prod_traslados=$('#data_cats_traslados').dataTable({
    "aProcessing": true,//Activamos el procesamiento del datatables
      "aServerSide": true,//Paginación y filtrado realizados por el servidor
      dom: 'Bfrtip',//Definimos los elementos del control de tabla
      columnDefs: [
          {"targets": [0],
          "visible": false,
          "searchable": false
          },
        ],
      buttons: [
            'excelHtml5',
            'pdf'
            ],
    "ajax":{
      url: 'ajax/categoria.php?op=get_categorias_traslados',
      type : "post",
      dataType : "json",
      data:{sucursal:sucursal},         
      error: function(e){
      console.log(e.responseText);  
        }
    },
    "bDestroy": true,
    "responsive": true,
    "bInfo":true,
    "iDisplayLength": 10,//Por cada 10 registros hace una paginación
      //"order": [[ 0, "desc" ]],//Ordenar (columna,orden)
      
      "language": {
 
          "sProcessing":     "Procesando...",
       
          "sLengthMenu":     "Mostrar _MENU_ registros",
       
          "sZeroRecords":    "No se encontraron resultados",
       
          "sEmptyTable":     "Ningún dato disponible en esta tabla",
       
          "sInfo":           "Mostrando un total de _TOTAL_ registros",
       
          "sInfoEmpty":      "Mostrando un total de 0 registros",
       
          "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
       
          "sInfoPostFix":    "",
       
          "sSearch":         "Buscar:",
       
          "sUrl":            "",
       
          "sInfoThousands":  ",",
       
          "sLoadingRecords": "Cargando...",
       
          "oPaginate": {
       
              "sFirst":    "Primero",
       
              "sLast":     "Último",
       
              "sNext":     "Siguiente",
       
              "sPrevious": "Anterior"
       
          }

         }//cerrando language
         
  }).DataTable();
}

function agregar_item_traslado(categoria){
  var indice = $("#indice_categoria").val();
  console.log(indice);
  console.log(categoria);
  $("#modal_cat_traslados").modal("hide");
  detalles_traslado[indice].destino = categoria;
  $("#item_traslado"+indice).val(categoria);
}

function eliminarItemTraslado(index) {
  $("#fila_t" + index).remove();
  drop_item_t(index);
}

function drop_item_t(position_element){
  detalles_traslado.splice(position_element, 1);
}

/////////////////////REGISTRAR TRASLADO//////////////

function registrar_traslado(){
  var  sucursal= $("#sucursal").val();
  var  usuario= $('#usuario').val();
  var  fecha= $('#fecha').val();
  var  tipo_traslado= $('#tipo_traslado').val();
  var  num_traslado = $("#num_traslado").html();
  ubicaciones_vacias=[];
  for(var i=0;i<detalles_traslado.length;i++){
      var dest = detalles_traslado[i].destino;
      if(dest == ""){
      ubicaciones_vacias.push(dest);
    }
  }


var cuenta_vacios = ubicaciones_vacias.length;
if (cuenta_vacios>0) {
  Swal.fire('Debe especificar la nueva ubicacion de cada producto!','','error')
  return false;
}
////////VALIDAR QUE LA RUTA DE DESTINO SEA DIFERENTE A ORIGEN
for(var i=0;i<detalles_traslado.length;i++){
      var desti = detalles_traslado[i].destino;
      var origen =detalles_traslado[i].origen;
      if(desti == origen){
      Swal.fire('Existen ubicaciones mal seleccionadas!','','error')
  return false;
    }
  }

var test_array = detalles_traslado.length;
  if (test_array<1) {
  Swal.fire('Debe Agregar Productos al traslado!','','error')
  return false;
}

   $.ajax({
    url:"ajax/bodegas.php?op=registrar_traslado",
    method:"POST",
    data:{'arrayTraslado':JSON.stringify(detalles_traslado),'sucursal':sucursal,'usuario':usuario,'fecha':fecha,'tipo_traslado':tipo_traslado,'num_traslado':num_traslado},
    cache: false,
    dataType:"json",
    error:function(x,y,z){
      console.log(x);
      console.log(y);
      console.log(z);
    },

    success:function(data){
    console.log(data);
  }

  });
    $('#listar_det_traslados').html('');
    setTimeout ("Swal.fire('Se ha registrado Exitosamente el traslado','','success')", 100);

}

////////////////GET CORRELATIVO TRASLADO
function get_correlativo_traslado(){
  var sucursal = $("#sucursal").val();
  $.ajax({
    url:"ajax/bodegas.php?op=get_numero_traslado",
    method:"POST",
    data:{sucursal:sucursal},
    cache:false,
    dataType:"json",
      success:function(data){
      console.log(data);        
      $("#num_traslado").html(data.correlativo);             
      }
    })
}

init();