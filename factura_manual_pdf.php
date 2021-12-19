<?php ob_start();

require_once 'pages/convierte_a_texto.php';
require_once("modelos/Reporteria.php");
$reporteria=new Reporteria();

$correlativo = $_GET["correlativo"];
$cliente = $_GET["cliente"];
$direccion = $_GET["direccion"];
$telefono = $_GET["telefono"];
$id_usuario = $_GET["id_usuario"];

use Dompdf\Dompdf;
use Dompdf\Options;

require_once 'dompdf/autoload.inc.php';
date_default_timezone_set('America/El_Salvador'); $hoy = date("d-m-Y H:i:s");
$data_fm = $reporteria->facturaManualData($correlativo,$cliente);
require_once 'pages/convierte_a_texto.php';
?>
<head>
	<link rel="stylesheet" href="css/styles.css">
<style>
	html{
	margin-top: 0;
    margin-left: 28px;
    margin-right:20px; 
    margin-bottom: 0;
}
</style>
</head>

<div style="margin-top: 130px;height:510px">
	<?php include 'helpers/plantilla_factura_manual.php'?>

</div>

<div style="margin-top: 30px;max-height:100px">
	<?php include 'helpers/plantilla_factura_manual.php'?>

</div>


<?php
$salida_html = ob_get_contents();
ob_end_clean();
$dompdf = new Dompdf();
$dompdf->loadHtml($salida_html);
$dompdf->setPaper('letter', 'portrait');
$dompdf->render();
$dompdf->stream('document', array('Attachment'=>'0'));
?>