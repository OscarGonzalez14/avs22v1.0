<?php
require_once("modelos/Externos.php");
$users = new Externos();
$opto = $users->get_usuarios_ventas();
?>
<div class="modal fade" id="factura_manual" tabindex="-1" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel">

  <div class="modal-dialog" style="max-width: 95%">
    <div class="modal-content">
      <div class="modal-header bg-dark">
        <h4 class="modal-title" style="font-size: 14px">FACTURA MANUAL</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

          <div class="form-row">            
            <div class="form-group col-md-2">
              <label for="inputEmail4">Correlativo</label>
              <input type="number" class="form-control oblig-fm" id="correlativo_factura_man" name="correlativo_factura_man" style="color: red;font-weight: bold;font-size: 20px">
            </div>

            <div class="form-group col-md-7">
              <label for="inputEmail4">Cliente</label>
              <input type="text" class="form-control oblig-fm" id="cliente_facman" name="cliente_facman" data-nombre="Paciente fac manual">
            </div>

            <div class="form-group col-md-3">
              <label for="inputPassword4">Telefono</label>
              <input type="text" class="form-control oblig-fm" id="telefono_facman" name="telefono_facman" required>
            </div>

            <div class="form-group col-md-12">
              <label for="inputPassword4">Dirección</label>
              <input type="text" class="form-control oblig-fm" id="direcion_facman" name="direcion_facman" required>
            </div>
            
            <div class="form-group col-md-12" style="margin-left: 20px;">
            <input class="form-check-input" type="checkbox" id="contribuyente_tipo" name="contribuyente_tipo" onClick="calcularValoresFactMan();">
                <label class="form-check-label" for="gridCheck" style="color: blue">
                  <b>Gran contribuyente</b>
                </label>
            </div>
            <br>

            <div class="form-group col-md-2">
              <label for="inputPassword4">Cant</label>
              <input type="number" class="form-control clear_input" id="cant_fac_man" name="cant_fac_man" onkeyup="calcSubtFactMan()" onClick="calcSubtFactMan()">
            </div>

            <div class="form-group col-md-5">
              <label for="inputPassword4">Descripción</label>
              <input type="text" class="form-control clear_input" id="desc_fac_man" name="desc_fac_man" required>
            </div>

            <div class="form-group col-md-2">
              <label for="inputPassword4">P.Unit</label>
              <input type="number" class="form-control clear_input" id="precio_fac_man" name="precio_fac_man" onkeyup="calcSubtFactMan()" onClick="calcSubtFactMan()">
            </div>

            <div class="form-group col-md-2">
              <label for="inputPassword4">Subt.</label>
              <input type="text" class="form-control clear_input" id="subt_fac_man" name="subt_fac_man" readonly>
            </div>

            <div class="form-group col-md-1">
              <label for="inputPassword4">Ag.</label>
              <button class="btn btn-success btn-block" onClick="agregaItemFacManual();"><i class="fas fa-plus"></i></button>
            </div>
        
            <table id="" width="100%" style="text-align: center;text-align:center;margin: 5px;width: 100%"  class="table-hover table-bordered">

            <thead style="color:black;min-height:10px;border-radius: 2px;font-style: normal;font-size: 15px" class="bg-info">
              <tr style="min-height:10px;border-radius: 3px;font-style: normal;font-size: 15px">
                <td colspan='5' style="text-align:center;max-width: 5%">#</td>
                <td colspan='10' style="text-align:center;max-width: 10%">Cantidad</td>
                <td colspan='55' style="text-align:center;max-width: 55%">Descripción</td>
                <td colspan='10' style="text-align:center;max-width: 10%">P.U</td>
                <td colspan='10' style="text-align:center;max-width: 10%">Subtotal</td>
                <td colspan='10' style="text-align:center;max-width: 10%">Eliminar</td>
              </tr>

            </thead>

            <tbody style="text-align:center;color: black" id="items_factura_manual"></tbody>
              <tfoot>
                <tr>
                  <td colspan='80' style='width:80%;text-align:right;border-top:blue 1px solid'>IVA RETENIDO</td>
                  <td colspan='10' style='width:10%;border-top:blue 1px solid;text-align:right;' id="iva_retenido_facman"></td>
                  <td colspan='10' style='width:10%;border-top:blue 1px solid'></td>
                </tr>
                <tr>
                  <td colspan='80' style='width:80%;text-align:right;border-top:blue 1px solid'>TOTAL</td>
                  <td colspan='10' style='width:10%;border-top:blue 1px solid;text-align:right;color: blue;font-weight: bold;' id="totales-facman"></td>
                  <td colspan='10' style='width:10%;border-top:blue 1px solid'></td>
                </tr>
              </tfoot>       
            </table>

      <input type="hidden" id="id_paciente_ccf" name="id_paciente_ccf">
      <input type="hidden" id="n_venta_ccf" name="n_venta_cf">
      <input type="hidden" id="nombre_ccf" name="nombre_ccf">
      <input type="hidden" id="monto_ccf" name="monto_ccf">
    </div><!--fin form row--> 
      
      <button type="button" class="btn btn-primary btn-block" id="registrar-fac-manual" onClick="registrarFacturaManual();">REGISTRAR</button>
      <a href="" id="print-facman" target="_blank"><button type="button" class="btn btn-success btn-block" id="btnprint-facman"><i class="fas fa-print"></i> IMPRIMIR</button></a>

      </div><!--MODAL BODY-->
      </div>
          <!-- /.modal-content -->
      </div>
        <!-- /.modal-dialog -->
      </div>
