<?php
/**
 * @file SETUP.PHP
 * @brief ARQUIVO RESPONSAVEL POR SETAR VARIAVES QUE SERAO UTILIZADAS COMO PADRAO EM TODO O SISTEMA
 * @author GUSTAVO TOMANINI
 * @date 15/07/2013
 * @version 1.0
 */
session_start();
$strIdSistema = "ambev";
$strTituloCurto = "DashBoard";
$strTituloSistema = "ambev - DashBoard";
define("INTHBSISLOGIN", 0);
define("STRHBSISLOGIN", "");
define("STRSERVIDOR", "172.22.3.18");
define("STRUSUARIO", "admin");
define("STRSENHA", "admin");
define("STRBD", "hom_dashboard_dmz");
define("INTPORTA", 3306);
define("STRTITULO", "@ ambev - DashBoard");
define("STRTITULOCORPO", "DashBoard");
define("STRTITULOSISTEMA", "DashBoard");
define("STRPASTAMODELOSARQ", "template");
?>