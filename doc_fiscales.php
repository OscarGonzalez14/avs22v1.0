<?php 
require_once("config/conexion.php");
if(isset($_SESSION["usuario"])){ 
require_once('header_dos.php');
require_once('modals/modal_factura_manual.php');
require_once('modals/modal_ccf_manual.php');
 ?>

 <div class="content-wrapper">

</script>
<div class="card" style="margin: 5px">
    <div class="row" style="margin: 5px">
      <div class="col-sm-4">
          <button type="button" class="btn btn-sm btn-primary" id="new_fact_manual" data-toggle="modal" data-target="#factura_manual" onClick="getCorrelativoFac();"><i class="fas fa-clipboard-list"></i> Factura Manual</button>&nbsp;
          <button type="button" class="btn btn-sm btn-info" data-toggle="modal" data-target=""><i class="fas fa-clipboard-list"></i> CCF Manual</button>
      </div>
    </div>
    <div class="row" style="margin: 5px">
      <div class="col-sm-3">
        <label for="">Año</label>
        <select name="" id="year_comision" class="form-control"></select>
      </div>

      <div class="col-sm-3 select2-purple">
        <label for="">Mes</label>
        <select name="" id="month_comision" class="form-control">
          <option value="0">Seleccionar mes</option>
          <option value="01">Enero</option>
          <option value="02">Febrero</option>
          <option value="03">Marzo</option>
          <option value="04">Abril</option>
          <option value="05">Mayo</option>
          <option value="06">Junio</option>
          <option value="07">Julio</option>
          <option value="08">Agosto</option>
          <option value="09">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
      </div>

      <div class="col-sm-2">
        <label style="">Buscar</label>
        <button class="btn btn-success btn-block" onClick="filtrarDocFiscales();"><i class="fas fa-search"></i></button>
      </div>
    </div><!--FIN FORM row-->
          
</div>
<input type="hidden" name="sucursal" id="sucursal" value="<?php echo $_SESSION["sucursal"];?>"/>
<input type="hidden" name="sucursal_usuario" id="sucursal_usuario" value="<?php echo $_SESSION["sucursal_usuario"];?>"/>
<input type="hidden" name="id_usuario" id="id_usuario" value="<?php echo $_SESSION["id_usuario"];?>"/>
<?php require_once("footer.php"); ?>
<script type="text/javascript" src="js/reporteria.js"></script>
<script type="text/javascript" src="js/cleave.js"></script>

 <script>
    var telefono = new Cleave('#telefono_facman', {
      delimiter: '-',
      blocks: [4,4]      
    });

  $('#year_comision').each(function() {

  var year = (new Date()).getFullYear();
  var current = year;

  year -= 1;
  for (var i = 0; i < 15; i++) {
    if ((year+i) == current)
      $(this).append('<option selected value="' + (year + i) + '">' + (year + i) + '</option>');
    else
      $(this).append('<option value="' + (year + i) + '">' + (year + i) + '</option>');
  }
});

$(function () {
    //Initialize Select2 Elements
    $('.select2').select2()
    //Initialize Select2 Elements
    $('.select2bs4').select2({
      theme: 'bootstrap4'
    })
    $(".select2").select2({
    maximumSelectionLength: 1
});
})

</script>

 <?php } else{
echo "Acceso no permitido";
header("Location:index.php");
        exit();
  } ?>