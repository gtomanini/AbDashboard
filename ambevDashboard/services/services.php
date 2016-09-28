<?php
/**
 * @file SERVICES.PHP
 * @brief PAGINA QUE EXECUTA OS SQL PARA LEITURA BD E RETORNA OS VALORES
 * @author GUSTAVO TOMANINI
 * @date 15/07/2014
 * @version 1.0
 */


require_once "setup.php";
require_once "conexao.php";
require_once "funcoes/funcoes.php";

function teste($name) {
	return 'Servidor respondendo a: '.$name;
}

switch($_GET['grafico']){
	case 1:
		$strTotalUserRede = "CALL sp_se_total_user_rede()";
		$rstTotalUserRede = executeStoredProcedure($strTotalUserRede);
		$arrDadosTotalUserRede = mysqli_fetch_array($rstTotalUserRede);
		echo $arrDadosTotalUserRede[1]."@".$arrDadosTotalUserRede[0];
		break;
	case 5:

		$strSqlUserRede = "CALL sp_se_user_rede();";
		$rstUserRede = executeStoredProcedure($strSqlUserRede);
		$arrDadosUserRede = mysqli_fetch_array($rstUserRede);
		echo $arrDadosUserRede[0];
		break;
	case 2:
		$strSqlPorLocalidade = "CALL sp_se_por_localidade();";
		$rstPorLocalidade = executeStoredProcedure($strSqlPorLocalidade);
		$arrDadosPorLocalidade = mysqli_fetch_array($rstPorLocalidade);
		echo $arrDadosPorLocalidade[0]."@".$arrDadosPorLocalidade[1];
		break;
	case 3:
		$arrCpus = Array();
		$strSql = "CALL sp_se_cpus()";
		$rstRetorno = executeStoredProcedure($strSql);
		$arrDados = mysqli_fetch_assoc($rstRetorno);
		$t10 = $arrDados['num_cpu1'];
		$t20 = $arrDados['num_cpu2'];
		$t30 = $arrDados['num_cpu3'];
		$t40 = $arrDados['num_cpu4'];
		$t50 = $arrDados['num_cpu5'];
		$t60 = $arrDados['num_cpu6'];
		$t70 = $arrDados['num_cpu7'];
		$t80 = $arrDados['num_cpu8'];
		$t90 = $arrDados['num_cpu9'];
		$t100 = $arrDados['num_cpu10'];
		$t10 = ($t10 == '' ? 0 :$t10);
		$t20 = ($t20 == '' ? 0 :$t20);
		$t30 = ($t30 == '' ? 0 :$t30);
		$t40 = ($t40 == '' ? 0 :$t40);
		$t50 = ($t50 == '' ? 0 :$t50);
		$t60 = ($t60 == '' ? 0 :$t60);
		$t70 = ($t70 == '' ? 0 :$t70);
		$t80 = ($t80 == '' ? 0 :$t80);
		$t90 = ($t90 == '' ? 0 :$t90);
		$t100 = ($t100 == '' ? 0 :$t100);

		$arrCpus[0]= $t10;
		$arrCpus[1]= $t20;
		$arrCpus[2]= $t30;
		$arrCpus[3]= $t40;
		$arrCpus[4]= $t50;
		$arrCpus[5]= $t60;
		$arrCpus[6]= $t70;
		$arrCpus[7]= $t80;
		$arrCpus[8]= $t90;
		$arrCpus[9]= $t100;
		 
		$arrRetorno = array('cpus'=>$arrCpus);
		echo json_encode($arrRetorno, JSON_NUMERIC_CHECK);
		break;
	case 4:
		$strSqlAlertasCpu = "CALL sp_se_alertas_cpu()";
		$rstAlertasCpu = executeStoredProcedure($strSqlAlertasCpu);
		$arrDadosAlertasCpu = mysqli_fetch_array($rstAlertasCpu);
		echo $arrDadosAlertasCpu[0];
		break;
	case 6:
		$strSqlAlertas60min = "CALL sp_se_alertas_60_min()";
		$rstAlertas60min = executeStoredProcedure($strSqlAlertas60min);
		$arrDadosAlertas60min = mysqli_fetch_array($rstAlertas60min);
		echo $arrDadosAlertas60min[0];
		break;
	case 7:
		$strSqlCdpTotal = "CALL  sp_se_vd_cdp_total()";
		$rstCdpTotal = executeStoredProcedure($strSqlCdpTotal);
		$arrDadosCdpTotal = mysqli_fetch_array($rstCdpTotal);
		echo round($arrDadosCdpTotal[0], 2);
		break;
	case 8:
		$strSqlCdpTotalCsc = "CALL  sp_se_vd_cdp_total_csc()";
		$rstCdpTotalCsc = executeStoredProcedure($strSqlCdpTotalCsc);
		$arrDadosCdpTotalCsc = mysqli_fetch_array($rstCdpTotalCsc);
		echo round($arrDadosCdpTotalCsc[0], 2);
		break;	
	case 9:
		$strSqlCdpDiario = "CALL  sp_se_vd_cdp_diario()";
		$rstCdpDiario = executeStoredProcedure($strSqlCdpDiario);
		$strTotal = mysqli_num_rows($rstCdpDiario);
		$cy = "";
		$strGraficoDadosConectados = "";
      while($arrDados = mysqli_fetch_assoc($rstCdpDiario)) {
        $cy++;
        $strVr = ',';
        list($strAno,$strMes,$strDia)  = @split('-',$arrDados['dat_inclusao']);
        list($strDia,$strTime) = @split(' ',$strDia);
        list($strHora,$strMinuto) = @split(':',$strTime);
        if ($strTotal == $cy) {
          $strVr = '';
        }
        $arrDados['val_media'] = round($arrDados['val_calculo'],2);
        $arrDados['val_calculo'] = round($arrDados['val_calculo'],2);
        $strMes = $strMes-1;
        
        $strGraficoDadosConectados .= "[Date.UTC($strAno,  $strMes, $strDia,$strHora,$strMinuto), $arrDados[val_calculo] ]$strVr\n";
      }
		 echo $strGraficoDadosConectados;
		
		break;	
	case 10:
		$strSql = "CALL  sp_se_vd_cdp_diario_csc()";
    $rstRetorno = executeStoredProcedure($strSql);
    $strTotal = mysqli_num_rows($rstRetorno);
    $cy = "";
    $strGraficoDadosConectados = "";
    while($arrDados = mysqli_fetch_assoc($rstRetorno)) {
    	$cy++;
      $strVr = ',';
      list($strAno,$strMes,$strDia)  = @split('-',$arrDados['dat_inclusao']);
      list($strDia,$strTime) = @split(' ',$strDia);
      list($strHora,$strMinuto) = @split(':',$strTime);
      if ($strTotal == $cy) {
      	$strVr = '';
      }
      $arrDados['val_media'] = round($arrDados['val_calculo'],2);
      $arrDados['val_calculo'] = round($arrDados['val_calculo'],2);
      $strMes = $strMes-1;
      $strGraficoDadosConectados .= "  [Date.UTC($strAno,  $strMes, $strDia,$strHora,$strMinuto), $arrDados[val_calculo] ]$strVr\n";
      }
     echo $strGraficoDadosConectados;
		break;
	case 11:
		$strSql = "CALL  sp_se_vd_cdp_semanal()";
    $rstRetorno = executeStoredProcedure($strSql);
		$strTotal = mysqli_num_rows($rstRetorno);
		$cy = "";
		$strGraficoDadosDesconectados = "";
		$strGraficoDadosConectados = "";
		$strGraficoDadosDesconectados2 = "";
		$strGraficoDadosConectados2 = "";
      while($arrDados = mysqli_fetch_assoc($rstRetorno)) {
        $cy++;
        $strVr = ',';
        list($strAno,$strMes,$strDia)  = @split('-',$arrDados['dat_inclusao']);
        if ($strTotal == $cy) {
          $strVr = '';
        }
        $arrDados['val_media'] = round($arrDados['val_media'],2);
        $arrDados['val_max'] = round($arrDados['val_max'],2);
        
        $arrDados['val_media_csc'] = round($arrDados['val_media_csc'],2);
        $arrDados['val_max_csc'] = round($arrDados['val_max_csc'],2);
        $strMes = $strMes-1;
        
        $strGraficoDadosDesconectados .= " [Date.UTC($strAno,  $strMes, $strDia,0,0), $arrDados[val_media] ]$strVr\n";
        $strGraficoDadosConectados .= "  [Date.UTC($strAno,  $strMes, $strDia,0,0), $arrDados[val_max] ]$strVr\n";
        $strGraficoDadosDesconectados2 .= " [Date.UTC($strAno,  $strMes, $strDia,0,0), $arrDados[val_media_csc] ]$strVr\n";
        $strGraficoDadosConectados2 .= "  [Date.UTC($strAno,  $strMes, $strDia,0,0), $arrDados[val_max_csc] ]$strVr\n";
      }
      echo $strGraficoDadosDesconectados."@".$strGraficoDadosConectados."@".$strGraficoDadosDesconectados2."@".$strGraficoDadosConectados2;
		break;
}
?>
