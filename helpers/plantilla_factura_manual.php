<table width="100%"class='table2' width="100%" style="width: 100%">
	<tr>
		<td colspan="40" style="width:40%" class="stilot3"><strong>Cliente:</strong> <?php echo  $cliente;?></td>
		<td colspan="60" style="width:60%" class="stilot3"><strong>Dirección:</strong> <?php echo  $direccion;?></td>		
	</tr>
	<tr>

		<td colspan="40" style="width: 40%"></td>
		<td colspan="30" style="width: 30%" class="stilot3"><strong>Telefono:</strong> <?php echo  $telefono;?></td>
		<td colspan="30" style="width: 30%" class="stilot3"><strong>Fecha:</strong> <?php echo  $hoy;?></td>
	</tr>
</table>

<table class="table2" width="100%" style="margin-top: 3px" style="width: 100%">
	<thead>
	<tr>
		<th class="stiloth" colspan="5" style="width: 5%">CANT.</th>
		<th class="stiloth" colspan="45" style="width: 45%">DESCRIPCIÓN</th>
		<th class="stiloth" colspan="10" style="width: 10%">P/UNI.</th>
		<th class="stiloth" colspan="12" style="width: 12%">V.NO SUJETA</th>
		<th class="stiloth" colspan="12" style="width: 12%">V. EXENTAS</th>
		<th class="stiloth" colspan="16" style="width: 16%">V. AFECTAS</th>
    </tr>
    </thead>
	<tr style="height:50px;">
	  <td colspan="5" style="border: 1px solid black;font-family: Helvetica, Arial, sans-serif;font-size: 10px;text-align: center;margin:20px;height: 105px">
	  <?php 
	    for ($i=0; $i < sizeof($data_fm); $i++) {
	     ?><span style="margin-left: 0px !important"><?php echo $data_fm[$i]["cantidad"]?></span><br>
	     <?php } ?>     
	  </td>
	 
	  <td colspan="45" style="border: 1px solid black;font-family: Helvetica, Arial, sans-serif;font-size: 10px;text-align: left;margin:20px;text-transform: uppercase;">
	    <?php 
	    for ($i=0; $i < sizeof($data_fm); $i++) {
	     echo "&nbsp;&nbsp;&nbsp;".$data_fm[$i]["descripcion"]?><br>
	     <?php } ?>    
	  </td>
	 
	  <td colspan="10" style="border: 1px solid black;font-family: Helvetica, Arial, sans-serif;font-size:10px;text-align: center;margin:20px">
	    <?php 
	    for ($i=0; $i < sizeof($data_fm); $i++) {
	     echo "$".number_format(str_replace(',','',$data_fm[$i]["p_unitario"]),2,".",',');?><br>
	     <?php } ?> 	    
	  </td>
	  <td colspan="12" style="border: 1px solid black"></td>
	  <td colspan="12" style="border: 1px solid black"></td>
	  <td colspan="16" style="border: 1px solid black;font-family: Helvetica, Arial, sans-serif;font-size:10px;text-align: center;margin:20px">
       <?php 
	    for ($i=0; $i < sizeof($data_fm); $i++) {
	     echo "$".number_format(str_replace(',','',$data_fm[$i]["subtotal"]),2,".",',');?><br>
	     <?php } ?> 

	  </td>
	</tr>

<!--Obtener valores generales de factur a manual-->
<?php
	for($i=0; $i < sizeof($data_fm); $i++) {
      $retencion = str_replace(',','',$data_fm[$i]["retencion"]);
      $total  = str_replace(',','',$data_fm[$i]["monto"]);
	}
    $ret = str_replace('$','',$retencion);
    $tot = str_replace('$','',$total);
    $total_final = $tot-$ret;
	?>

<tr>

  <td colspan="60" rowspan="2" class="stilot1" style="width: 60%;text-align: left"><b>SON</b>: <?php echo  numletras(str_replace('$','',$total),$_moneda);?></td>
  <td colspan="24" class="stilot1" style="font-size:9px"><b>SUMAS</b></td>
  <td colspan="16" class="stilot1" style="font-size:9px"><?php echo "$".number_format(str_replace('$','',$total),2,".",","); ?></td>
</tr>
<tr>
  <td colspan="24" class="stilot1" style="font-size:8px"><b>VENTA EXENTA</b></td>
  <td colspan="16" class="stilot1"></td>

</tr>
<tr>
  <td colspan="60" class="stilot1" style="font-size:8px"><b>LLENAR SI LA OPERACIÓN IGUAL O MAYOR A $200.00</b></td>
  <td colspan="24" class="stilot1"></td>
  <td colspan="16" class="stilot1"></td>
</tr>

<tr>
  <td colspan="30" rowspan="4" class="stilot1" style="width: 60%;text-align: left;font-size: 9px">
  Entregado por:<br>
  Nombre:<br>
  DUI:<br>
  Firma:<br>
  </td>
  <td colspan="30" rowspan="4" class="stilot1" style="width: 60%;text-align: left;font-size: 9px">
  Recibido por:<br>
  Nombre:<br>
  DUI:<br>
  Firma:<br>
  </td>
  <td colspan="24" class="stilot1" style="font-size:8px; height:8px">SUBTOTAL</td>
  <td colspan="16" class="stilot1" style="height:8px"></td>
</tr>
<tr>
  <td colspan="24" class="stilot1" style="font-size:8px">(-)IVA RETENIDO</td>

  <td colspan="16" class="stilot1" style="font-size: 9px"><?php echo "$".$ret;?></td>
</tr>
<tr>
  <td colspan="24" class="stilot1" style="font-size:8px">VENTA NO SUJETA</td>
  <td colspan="16" class="stilot1"></td>
</tr>
<tr>
  <td colspan="24" class="stilot1" style="font-size:9px"><strong>TOTAL</strong></td>
  <td colspan="16" class="stilot1" style="font-size:9px"><strong><?php echo "$".number_format($total_final,2,".",",");?></strong></td>
</tr>
</table>
<span style="font-size: 9px; text-align: right;"><?php echo "User: ".$id_usuario."&nbsp;&nbsp;&nbsp;NF.".$correlativo;?></span>
