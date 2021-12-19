<style>
.modal-header{
  background-color:black;
  color:white;
}

  .fullscreen-modal .modal-dialog {
  margin: 0;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
}
@media (min-width: 768px) {
  .fullscreen-modal .modal-dialog {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .fullscreen-modal .modal-dialog {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .fullscreen-modal .modal-dialog {
     width: 1170px;
  }
}
.modal-body{
  height:400px;
  width: 100%;
  overflow-y: auto;
}
.modal-dialog-center { /* Edited classname 10/03/2014 */ margin: 0; position: absolute; top: 50%; left: 50%; }


</style>

<!-- The Modal -->
  <div id="modal_ingreso_bodega" class="modal fullscreen-modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-xl modal-dialog  modal-dialog-centered">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header" style="justify-content:space-between;">
          <span class="modal-title"><strong> Ingresar Productos a Bodega</strong></span>
          <button type="button" class="close" data-dismiss="modal" style="color:white;">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
         <table class="table-hover table-bordered table-striped" id="data_productos_ingresos_bodega" width="100%" border="">
                  <thead style="background:#034f84;color:white">
                    <tr>
                      <th style="text-align:center" width="5%">ID</th>
                      <th style="text-align:center" width="5%"># Compra</th>
                      <th style="text-align:center" width="80%">Descripción</th>
                      <th style="text-align:center" width="5%">Disp.</th>
                      <th style="text-align:center" width="5%">Agregar</th>
                    </tr>
                  </thead>
                  <tbody style="text-align:center;font-size:14px;">
                                        
                  </tbody>
          </table>
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>
