<?php
/**
 * @file CONEXAO.PHP
 * @brief ARQUIVO RESPONSAVEL POR CONECTAR COM O BANCO DE DADOS
 * @author 	GUSTAVO TOMANINI
 * @date 15/07/2013
 * @version 1.0
 */

$conConexao =	mysqli_connect(STRSERVIDOR, STRUSUARIO, STRSENHA, STRBD, INTPORTA);
?>