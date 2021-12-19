<?php 
require_once("config/conexion.php");
if(isset($_SESSION["usuario"])){ 
require_once('header_dos.php');
 ?>

 <div class="content-wrapper">
 	<!-- Main content -->
    <p style="visibility:hidden">H</p>
    <section class="content" style="border-right:50px">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-dark">
              <div class="inner">
                <h4 style="text-anchor:"><b>Contado</b></h4>
                <p>0</p>
              </div>
              <div class="icon">
                <i class="fas fa-coins"></i>
              </div>
              <a href="creditos_contado.php" class="small-box-footer">ir a Contado <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-primary">
              <div class="inner">
                <h4><b>Desc. Planilla</b></h4>
                <p>0</p>
              </div>
              <div class="icon">
                <i class="fas fa-cash-register"></i>
              </div>
              <a href="creditos_oid.php" class="small-box-footer">Ir a Desc. Planilla <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-dark">
              <div class="inner">
                <h4><b>C. automáticos</b></h4>
                <p>0</p>
              </div>
              <div class="icon">
                <i class="fas fa-money-check-alt"></i>
              </div>
              <a href="creditos_cautomaticos.php" class="small-box-footer">Ir a C. Automáticos<i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-warning">
              <div class="inner">
                <h4><b>Creditos en Mora</b></h4>

                <p>0</p>
              </div>
              <div class="icon">
                <i class="far fa-thumbs-down"></i>
              </div>
              <a href="creditos_mora.php" class="small-box-footer"> Ir a C. Mora<i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>

          <?php if ($cat_user=="administrador" or $_SESSION["usuario"]=='andvas') { ?>
              
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <a href="doc_fiscales.php"><div class="small-box bg-info">
              <div class="inner">
                <h4><b>Doc. Fiscales</b></h4>

                <p>0</p>
              </div>
              <div class="icon">
                <i class="far fa-file"></i>
              </div>             
            </div></a>
            </div>
          <?php }; ?>        
    
 </div>

 <?php require_once("footer.php"); ?>
 <?php } else{
echo "Acceso no permitido";
header("Location:index.php");
        exit();
  } ?>