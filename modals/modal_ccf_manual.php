<?php
$users = new Externos();
$opto = $users->get_usuarios_ventas();
?>
<div class="modal fade" id="ccf_generica">

        <div class="modal-dialog" style="max-width: 90%">
          <div class="modal-content">
            <div class="modal-header bg-dark">
              <h4 class="modal-title" style="font-size: 14px">CCF MANUAL</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
      <div class="modal-body">

        <form method="post" action="imprimir_credito_fiscal_pdf.php" target="_blank">
          <div class="form-row">
            
            <div class="form-group col-md-2">
              <label for="inputEmail4">Correlativo</label>
              <input type="number" class="form-control" id="correlativo_ccf" name="correlativo_ccf" style="color: red;font-weight: bold;font-size: 20px">
            </div>

            <div class="form-group col-md-5">
              <label for="inputEmail4">Cliente</label>
              <input type="text" class="form-control" id="cliente_ccf" name="cliente_ccf">
            </div>

            <div class="form-group col-md-5">
              <label for="inputPassword4">Dirección</label>
              <input type="text" class="form-control" id="direcion_ccf" name="direcion_ccf" required>
            </div>

            <div class="form-group col-md-3">
              <label for="inputPassword4">Registro</label>
              <input type="text" class="form-control" id="registro_ccf" name="registro_ccf" required>
            </div>

            <div class="form-group col-md-3">
              <label for="inputPassword4">NIT</label>
              <input type="text" class="form-control" id="nit_ccf" name="nit_ccf" required>
            </div>

            <div class="form-group col-md-3">
              <label for="inputPassword4">Giro</label>
              <input type="text" class="form-control" id="giro_ccf" name="giro_ccf" required>
            </div>

            <div class="col-sm-3 select2-purple">
                <label for="ex3">Usuario</label>
                <select class="select2 form-control" id="usuario_ccf" name="usuario_ccf" multiple="multiple" data-placeholder="Seleccionar vendedor" data-dropdown-css-class="select2-purple" style="width: 100%;height: ">              
                <option value="0">Seleccionar usuario</option>
                <?php
                for ($i=0; $i < sizeof($opto); $i++) { ?>
                <option value="<?php echo $opto[$i]["id_usuario"]?>"><?php echo strtoupper($opto[$i]["nick"]);?></option>
                <?php  } ?>              
                </select>              
            </div>

            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="contribuyente_tipo" name="contribuyente_tipo">
                <label class="form-check-label" for="gridCheck">
                  Gran contribuyente
              </label>
            </div>
          </div>

          <input type="hidden" id="id_paciente_ccf" name="id_paciente_ccf">
          <input type="hidden" id="n_venta_ccf" name="n_venta_cf">
          <input type="hidden" id="nombre_ccf" name="nombre_ccf">
          <input type="hidden" id="monto_ccf" name="monto_ccf">
        </div><!--fin form row--> 
      
      <button type="submit" class="btn btn-primary btn-block" onClick="registrarCorrelativoCcf();">IMPRIMIR</button>
      </form>
      </div><!--MODAL BODY-->
      <div class="modal-footer justify-content-between">
      <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>              
      </div>
      </div>
          <!-- /.modal-content -->
      </div>
        <!-- /.modal-dialog -->
      </div>
