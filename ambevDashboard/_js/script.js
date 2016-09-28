// Variáveis de inicialização
var pg = 1;
var tamanhoTitulo = '16px';
var tamanhoLabelTeste2014_08_21 = '8px';
var tamanhoLegenda = '12px';
var tamanhoLabels = '18px';
var tamanhoSeries = '14px';
var wsUrl = "./services/services.php";

/**
 * @brief PEGA A ORIENTACAO DO DISPOSITIVO
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function orientationChange() {
	//alert(window.orientation);
	if (window.orientation == 90 || window.orientation == -90) {
		window.scrollTo(0, 1);
		$('#paginas').hide();
		$('#landscape').hide();
		//lockScroll();

	} else if (window.orientation == 0) {
		$('#landscape').show();
		// $('#landscape').scrollTop();
		//unLockScroll();
	}
}

/**
 * @brief BLOQUEIA A TELA QUANDO ESTIVER NA ORIENTACAO RETRATO
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function lockScroll() {
	$(document).bind("touchmove", function(event) {
		event.preventDefault();
	});
}

/**
 * @brief HABILITA SCROLL
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function unLockScroll() {
	$(document).unbind("touchmove");
}

/**
 * @brief FUNCAO PARA ABRIR E FECHAR O MENU LATERAL
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function abreFechaMenu(grafico) {
	if ($('.dropdown-menu').is(":visible"))
		$('.dropdown-menu').hide();
	else
		$('.dropdown-menu').show();

	if (grafico > 0) {
		abreGrafico(grafico);
	}
}

$(window).resize(function() {
	abreGrafico(pg);
	tamanhoDoMenu();
});

$(document).ready(function() {

	ativaSwipe();
	abreGrafico(pg);
	tamanhoDoMenu();
	
});

/**
 * @brief AJUSTE RESPONSIVO DO TAMANHO DO MENU
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function tamanhoDoMenu() {
	var tamanho = window.innerHeight;
	tamanhoTitulo = Math.round(tamanho / 25, 0) + "px";
	tamanhoLabelTeste2014_08_21 = Math.round(tamanho / 30, 0) + "px";
	tamanhoLegenda = Math.round(tamanho / 60, 0) + "px";
	tamanhoLabels = Math.round(tamanho / 40, 0) + "px";
	tamanhoSeries = Math.round(tamanho / 80, 0) + "px";
	var deviceAgent = navigator.userAgent.toLowerCase();
	var agentID = deviceAgent
			.match(/(iphone|ipod|ipad|android|iemobile|ppc|smartphone|blackberry|webos)/);
	if (agentID) {
		$("#conteudo").css("height", (tamanho - 90));
		$("#pagination").hide();
	} else {
		$("#conteudo").css("height", (tamanho - 135));
		$("#pagination").show();
	}
	tamanho = tamanho - 83;
	$(".dropdown-menu").css("height", tamanho);
	if (window.innerHeight < 420) {
		// $(".dropdown-menu").css("overflow", "scroll");
		$(".dropdown-menu").css("height", tamanho);
	}
}

/**
 * @brief ATIVA A FUNCAO SWIPE
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function ativaSwipe(ativa) {
	$(document).swipe(
			{
				swipeLeft : function(event, direction, distance, duration,
						fingerCount) {
					paginaAvanca();
				},
				swipeRight : function(event, direction, distance, duration,
						fingerCount) {
					paginaRecua();
				},
				threshold : 150
			});
}


function autoChange(){
	setInterval(paginaAvanca(), 1000);
}



/**
 * @brief AVANCAR PAGINA
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function paginaAvanca() {
	pg++;
	if (pg == 9)
		pg = 1;
	;
	abreGrafico(pg);
}

/**
 * @brief RECUAR PAGINA
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function paginaRecua() {
	pg--;
	if (pg == 0)
		pg = 8;
	abreGrafico(pg);
}

/**
 * @brief FUNCAO PARA MONTAR O GRAFICO NA DIV CORRETA
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function abreGrafico(grafico) {
	// alert('abreFecha');
	$('#grf1').remove();
	$('#grf2').remove();
	$('#grf3').remove()
	pg = grafico;
	$('#pgCorrente').html(grafico);
	$('#conteudo').html("<div id='grf1'></div>");

	if (grafico == 1) {
		totalUsuariosConectados();
// setInterval('abreGrafico(2)', 10000);
		// setInterval('abreGrafico(1)', 120000);
		

	} else if (grafico == 2) {
			
		$('#conteudo')
				.html(
						"<div id='grf1' style='height: 80%; width: 99%; position: absolute; margin-top: 2px;'></div>");
		porLocalidade();
// setInterval('abreGrafico(3)', 10000);
	} else if (grafico == 3) {
		utilizacaoDeCpu();

		// clearInterval(10);
// setInterval(paginaAvanca(), 10000);
	} else if (grafico == 4) {
		
		$('#conteudo')
				.html(
						"<div id='grf1' style='float:left; width:30%; margin-top:1%; position:relative; margin-left: 5%; height: 100%;'></div>" +
						"<div id='grf2' style='float: left; width:30%; margin-top:1%; margin-right: 5px; margin-left: 5px; height: 100%;'></div>" +
						"<div id='grf3' style='float:left; width:30%; margin-top:1%; height: 100%;'></div>" +
						"<div style='clear:both;'></div>");
		usuariosConectados();
		alertasDeCpu();
		cpu60Min();

// setInterval(paginaAvanca(), 10000);
	} 
	else if (grafico == 5) {
		
		$('#conteudo')
				.html(
						"<div id='grf4' style='float:left; width:45%; margin-top:1%; position:relative; margin-left: 5%; height: 100%; background-color: white;'></div>" +
						"<div id='grf5' style='float:left; width:45%; margin-top:1%; position:relative; margin-left: 0%; height: 100%; background-color: white;'></div>" +
						"<div style='clear:both;'></div>");

		cpuVdpTotal();
		cpuVdpTotalCsc();
// setInterval(paginaAvanca(), 10000);
	}
	
	else if (grafico == 6)
		vdpDiario();
	else if (grafico == 7)
		vdpCscDiario();
	else if (grafico == 8)
		vdpMensal();

};

/**
 * @brief PROCESSERROR
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function processError(data, status, req) {
	alert(req.responseText + " " + status);
}

/**
 * @brief FUNCAO QUE MONTA O GRAFICO TOTAL DE USUARIOS CONECTADOS
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function totalUsuariosConectados() {
	$.ajax( {
		type : "GET",
		url : wsUrl,
		contentType : "text/xml",
		datatype : "html",
		data : {
			grafico : '1'
		},
		success : processSuccessTotalUsuariosConectados,
		error : processError
	});
}
/**
 * @brief
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function processSuccessTotalUsuariosConectados(data, status, req) {

	var arrTotalConectados = new Array();
	var arrTotalDesconectados = new Array();
	var arrHorarios = new Array();
	var strTitulo = 'Total Conectados';
	if (status == "success") {
		var strRetorno = req.responseText;
		var strTotalDesconectadosTmp = strRetorno.split("@")[0];
		strTotalDesconectadosTmp = strTotalDesconectadosTmp.split(';;');
		arrTotalDesconectados = converterTotalUsuariosConectados(strTotalDesconectadosTmp);
		var strTotalConectadosTmp = strRetorno.split("@")[1];
		strTotalConectadosTmp = strTotalConectadosTmp.split(';;');
		arrTotalConectados = converterTotalUsuariosConectados(strTotalConectadosTmp);
	}
	var chart;
	chart = new Highcharts.Chart( {
		chart : {
			renderTo : 'grf1',
			type : 'line',
			zoomType : 'x',
			spacingLeft : '0',
			resetZoomButton : {
				position : {
					x : 0,
					y : -30
				}
			},
			spacingRight : 20
		},
		title : {
			text : strTitulo,
			y : 10,
			style : {
				font : 'bold ' + tamanhoTitulo
						+ ' "Trebuchet MS", Verdana, sans-serif',
				color : '#000'
			}
		},
		legend : {
			itemStyle : {
				cursor : 'pointer',
				color : '#274b6d',
				fontSize : tamanhoLabels,
				fontWeight : 'bold'
			}
		},
		xAxis : {
			type : 'datetime',
			tickInterval : 1.5 * 3600 * 1000,
			dateTimeLabelFormats : {
				day : '%H:%M'
			},
			labels : {
				style : {
					color : '#000',
					font : tamanhoLabels + ' Helvetica',
					fontWeight : 'bold',
					width : '100px'
				}
			}
//			labels : {
//				rotation : 0,
//				align : 'center',
//				style : {
//					fontSize : tamanhoLabels,
//					fontFamily : 'Verdana, sans-serif'
//
//				}
//			}
		},
		yAxis : {
			tickInterval : 1000,
//			labels : {
//				rotation : 0,
//				align : 'center',
//				style : {
//					fontSize : tamanhoLabels,
//					fontFamily : 'Verdana, sans-serif'
//				}
//			}
			labels : {
				style : {
					color : '#000',
					font : tamanhoLabels + ' Helvetica',
					fontWeight : 'bold',
					width : '100px'
				}
			}
			,
			title : {
				text : 'Acessos',
				margin : 20
			},
			min : 0
		},
		tooltip : {
			enabled : false,
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/>'
						+ Highcharts.dateFormat('%H:%M', this.x) + ': '
						+ this.y + '';
			}
		},
		plotOptions : {
			line : {
				dataLabels : {
					enabled : true,
					style : {
						fontSize : tamanhoLabels,
						fontWeight : 'bold',
						color : '#000'
					}
				},
				enableMouseTracking : false
			}
		},
		series : [ {
			name : 'Conectados',
			data : arrTotalConectados,
			color : '#2f7ed8',
			dataLabels : {
				rotation : -60,
				y : -15,
				verticalAlign : 'bottom',
				enabled : true,
				style : {
					verticalAlign : 'bottom',
					fontSize : tamanhoLabels,
					fontFamily : 'Verdana, sans-serif'
				}
			}
		}, {
			name : 'Desconectados',
			data : arrTotalDesconectados,
			color : '#52b533',
			dataLabels : {
				enabled : true,
				rotation : -60,
				y : -15,
				style : {
					verticalAlign : 'top',
					fontSize : tamanhoLabels,
					fontFamily : 'Verdana, sans-serif'
				}
			}
		} ],
		exporting : {
			enabled : false
		}
	});
}

/**
 * @brief
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function converterTotalUsuariosConectados(strDados) {
	var arrRetorno = [];
	for (i = 0; i < strDados.length; i++) {
		var data = strDados[i].split(';')[0].split(',');
		time = (Date.UTC(Number(data[0]), Number(data[1]), Number(data[2]),
				Number(data[3]), Number(data[4]))), arrRetorno.push( {
			x : time,
			y : Number(strDados[i].split(';')[1])
		});
	}
	return arrRetorno;
}

/**
 * @brief FUNCAO QUE MONTA O GRAFICO POR LOCALIDADE
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function porLocalidade() {
	$.ajax( {
		type : "GET",
		url : wsUrl,
		contentType : "text/xml",
		datatype : "html",
		data : {
			grafico : '2'
		},
		success : processSuccessPorLocalidade,
		error : processError
	});
}

/**
 * @brief
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function processSuccessPorLocalidade(data, status, req) {
	var arrUnb;
	if (status == "success") {
		var strRetorno = req.responseText;
		arrUnb = converterEmArrayPorLocalidade(strRetorno.split("@")[0],
				strRetorno.split("@")[1]);
	}
	plot5 = $.jqplot('grf1', [ arrUnb ], {
		title : {
			text : 'Usu&aacute;rios por localidade',
			fontSize : tamanhoTitulo,
			textColor : '#000',
			fontFamily : 'Trebuchet MS, Verdana, sans-serif'
		},
		seriesColors : [ '#2f7ed8' ],
		grid : {
			shadow : true,
			shadowWidth : 0,
			shadowDepth : 0,
			shadowAlpha : 0.00,
			background : '#ffffff',
			fontSize : tamanhoTitulo
		},
		animate : !$.jqplot.use_excanvas,
		seriesDefaults : {
			renderer : $.jqplot.BarRenderer,
			rendererOptions : {
				barDirection : 'horizontal',
				highlightMouseDown : true,
				barWidth : 10,
				fontSize : tamanhoTitulo
			},
			pointLabels : {
				show : true,
				formatString : '%d',
				fontSize : tamanhoLabels
			},
			shadow : false,
			lineWidth : '100px'
		},
		legend : {
			show : false,
			location : 'e',
			placement : 'outside',
			fontSize : tamanhoTitulo
		},
		axes : {
			yaxis : {
				renderer : $.jqplot.CategoryAxisRenderer,
				tickOptions : {
					fontFamily : 'Verdana, sans-serif',
					fontSize : tamanhoLabels
				}
			},
			xaxis : {
				labels : {
				style : {
					color : '#000',
					font : tamanhoLabels + ' Helvetica',
					fontWeight : 'bold',
					width : '100px'
				}
			},
				tickOptions : {
					fontFamily : 'Verdana, sans-serif',
					fontSize : tamanhoLabels
				}
			}
		}

	});
}

/**
 * @brief
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function converterEmArrayPorLocalidade(strDadosDesc, strDadosTotal) {
	var arrRetorno = new Array();
	var arrDadosDesc = strDadosDesc.split(',');
	var arrDadosTotal = strDadosTotal.split(',');
	// for(i=0; i<arrDadosDesc.length; i++){
	for (i = arrDadosDesc.length - 1; i >= 0; i--) {
		colunas = new Array();
		colunas.push(Number(arrDadosTotal[i].trim()));
		colunas.push(arrDadosDesc[i].trim());
		arrRetorno.push(colunas);
	}
	return arrRetorno;
}

/**
 * @brief FUNCAO QUE MONTA O GRAFICO UTILIZACAO DE CPU
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function utilizacaoDeCpu() {
	$.ajax( {
		type : "GET",
		url : wsUrl,
		contentType : "text/xml",
		datatype : "html",
		data : {
			grafico : '3'
		},
		success : processSuccessUtilizacaoDeCpu,
		error : processError
	});
}

/**
 * @brief
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function processSuccessUtilizacaoDeCpu(data, status, req) {
	var arrCpus;
	if (status == "success") {
		var strRetorno = req.responseText;
		arrCpus = (JSON.parse(strRetorno)).cpus;
		var s1 = arrCpus;
	}
	var chart;
	chart = new Highcharts.Chart( {
		chart : {
			renderTo : 'grf1',
			type : 'column'
		},
		title : {
			text : 'Utilização de CPU',
			
			style : {
				font : 'bold ' + tamanhoTitulo
						+ ' "Trebuchet MS", Verdana, sans-serif',
				color : '#000'
			}
		},
		subtitle : {
			text : ''
		},
		xAxis : {
			categories : [ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ],
			labels : {
				style : {
					color : '#000',
					font : tamanhoLabels + ' Helvetica',
					fontWeight : 'bold',
					width : '100px'
				}
			}
		},
		yAxis : {
			min : 0,
			title : {
				text : ' '
			},
			labels : {
				style : {
					color : '#000',
					font : tamanhoLabels + ' Helvetica',
					fontWeight : 'bold',
					paddingRight : '15px'
				}
			}
		},
		legend : {
			enabled : false
		},
		tooltip : {
			enabled : false,
			formatter : function() {
				return '' + this.x + ': ' + this.y;
			}
		},
		plotOptions : {
			column : {
				pointPadding : -0.1,
				borderWidth : 0,
				colorByPoint : true,
				dataLabels : {
					enabled : true,
					style : {
						fontSize : tamanhoLabels,
						fontWeight : 'bold',
						fontFamily : 'Verdana, sans-serif',
						color : '#000'
					}
				},
				colors : [ '#0080c0', '#0080c0', '#0080c0', '#0080c0',
						'#0080c0', '#0080c0', '#0080c0', '#0080c0', '#ff4646',
						'#ff0000' ]
			},
			bar : {
				dataLabels : {
					enabled : true,
					style : {
						fontSize : tamanhoLabels,
						fontWeight : 'bold',
						fontFamily : 'Verdana, sans-serif',
						color : '#000'
					}
				},
				enableMouseTracking : false
			}
		},
		series : [ {
			name : 'CPU',
			data : s1
		} ],
		exporting : {
			enabled : false
		}
	});
}

/**
 * @brief FUNCAO QUE MONTA O GRAFICO ALERTAS DE CPU
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function alertasDeCpu() {
	$.ajax( {
		type : "GET",
		url : wsUrl,
		contentType : "text/xml",
		datatype : "html",
		data : {
			grafico : '4'
		},
		success : processSuccessAlertaDeCpu,
		error : processError
	});
}

function processSuccessAlertaDeCpu(data, status, req) {

	if (status == "success") {
		var strRetorno = req.responseText;
		s = [ strRetorno ];
		s1 = parseInt(s);
		var chart;
		chart = new Highcharts.Chart( {
			chart : {
				margin: [10, 0, 0, 0],
				renderTo : 'grf2',
				type : 'gauge',
				backgroundColor: '#FFF',
				plotBackgroundColor : null,
				plotBackgroundImage : null,
				plotBorderWidth : 0,
				plotShadow : false
			},
			title : {
				text : 'CPU',
				fontSize : tamanhoTitulo,
				y: 3
			},
			pane : {
				startAngle : -150,
				endAngle : 150,
				background : [ {
					backgroundColor : {
						linearGradient : {
							x1 : 0,
							y1 : 0,
							x2 : 0,
							y2 : 1
						},
						stops : [ [ 0, '#FFF' ], [ 1, '#333' ] ]
					},
					borderWidth : 0,
					outerRadius : '109%'
				}, {
					backgroundColor : {
						linearGradient : {
							x1 : 0,
							y1 : 0,
							x2 : 0,
							y2 : 1
						},
						stops : [ [ 0, '#333' ], [ 1, '#FFF' ] ]
					},
					borderWidth : 1,
					outerRadius : '107%'
				}, {
				// default background
				}, {
					backgroundColor : '#DDD',
					borderWidth : 0,
					outerRadius : '105%',
					innerRadius : '103%'
				} ]
			},
			yAxis : {
				min : 0,
				max : 1000,
				minorTickInterval : 'auto',
				minorTickWidth : 1,
				minorTickLength : 10,
				minorTickPosition : 'inside',
				minorTickColor : '#666',
				tickPixelInterval : 30,
				tickWidth : 2,
				tickPosition : 'inside',
				tickLength : 10,
				tickColor : '#666',
				labels : {
					step : 2,
					rotation : 'auto',
					style: {
							fontSize: tamanhoLabelTeste2014_08_21
						}
				},
				title : {
				// text: 'km/h'
				},
				plotBands : [ {
					from : 0,
					to : 300,
					color : '#55BF3B' // green
				}, {
					from : 301,
					to : 450,
					color : '#DDDF0D' // yellow
				}, {
					from : 451,
					to : 1000,
					color : '#DF5353' // red
				} ]
			},
			series : [ {
				name : 'Conectados',
				dataLabels : {
					rotation : 0,
					y : 50,
					verticalAlign : 'top',
					enabled : true,
					borderColor: 'none'	
//					style : {
//						verticalAlign : 'bottom',
//						fontSize : tamanhoLabels,
//						fontFamily : 'Verdana, sans-serif'
//					}
				},
				data : [ s1 ],
				
				tooltip : {
					enabled : false,
					valueSuffix : '.'
				}
			} ],
			exporting : {
				enabled : false
			}
		});
	}
}

/**
 * @brief FUNCAO QUE MONTA O GRAFICO USUARIOS CONECTADOS
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function usuariosConectados() {
	$.ajax( {
		type : "GET",
		url : wsUrl,
		contentType : "text/xml",
		datatype : "html",
		data : {
			grafico : '5'
		},
		success : processSuccessUsuariosConectados,
		error : processError
	});
}
/**
 * @brief
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function processSuccessUsuariosConectados(data, status, req) {

	var arrTotalConectados = new Array();
	var totalConectadosTmp = new Array();
	var arrTotalDesconectados = new Array();
	var strTitulo = 'Total de usuarios conectados';
	if (status == "success") {
		var strRetorno = req.responseText;
		s1 = [ Number(strRetorno) ];
		var chart;
		chart = new Highcharts.Chart( {
			chart : {
				margin: [10, 0, 0, 0],
				renderTo : 'grf1',
				type : 'gauge',
				backgroundColor: 'none',
				plotBackgroundColor : null,
				plotBackgroundImage : null,
				plotBorderWidth : 0,
				plotShadow : false
			},
			title : {
				text : 'Conectados',
				fontSize : tamanhoTitulo,
				y:3
			},
			pane : {
				startAngle : -150,
				endAngle : 150,
				background : [ {
					backgroundColor : {
						linearGradient : {
							x1 : 0,
							y1 : 0,
							x2 : 0,
							y2 : 1
						},
						stops : [ [ 0, '#FFF' ], [ 1, '#333' ] ]
					},
					borderWidth : 0,
					outerRadius : '109%'
				}, {
					backgroundColor : {
						linearGradient : {
							x1 : 0,
							y1 : 0,
							x2 : 0,
							y2 : 1
						},
						stops : [ [ 0, '#333' ], [ 1, '#FFF' ] ]
					},
					borderWidth : 1,
					outerRadius : '107%'
				}, {}, {
					backgroundColor : '#DDD',
					borderWidth : 0,
					outerRadius : '105%',
					innerRadius : '103%'
				} ]
			},
			yAxis : {
				min : 0,
				max : 12000,
				minorTickInterval : 'auto',
				minorTickWidth : 1,
				minorTickLength : 10,
				minorTickPosition : 'inside',
				minorTickColor : '#666',
				tickPixelInterval : 30,
				tickWidth : 2,
				tickPosition : 'inside',
				tickLength : 10,
				tickColor : '#666',
				labels : {
					step : 4,
					rotation : 'auto',
					style: {
							fontSize: tamanhoLabelTeste2014_08_21
						}
				},
				title : {
				 //text: 'km/h'
				},
				plotBands : [ {
					from : 0,
					to : 7500,
					color : '#55BF3B' // green
				}, {
					from : 7500,
					to : 9000,
					color : '#DDDF0D' // yellow
				}, {
					from : 9000,
					to : 12000,
					color : '#DF5353' // red
				} ]
			},

			series : [ {
				name : 'Conectados',
				data : [ s1 ],
				dataLabels : {
					rotation : 0,
					y : 50,
					verticalAlign : 'top',
					enabled : true,
					borderColor: 'none'	
			},
				tooltip : {
					enabled : false,
					valueSuffix : '.'
				}
			} ],
			exporting : {
				enabled : false
			}
		});
	}
}

/**
 * @brief FUNCAO QUE MONTA O GRAFICO ALERTAS CPU 60 MIN
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function cpu60Min() {
	$.ajax( {
		type : "GET",
		url : wsUrl,
		contentType : "text/xml",
		datatype : "html",
		data : {
			grafico : '6'
		},
		success : processSuccessCpu60Min,
		error : processError
	});
}

/**
 * @brief
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function processSuccessCpu60Min(data, status, req) {
	var arrTotalConectados = new Array();
	var totalConectadosTmp = new Array();
	var arrTotalDesconectados = new Array();
	var strTitulo = 'Total de usuarios conectados';

	if (status == "success") {
		var strRetorno = req.responseText;
		s1 = [ Number(strRetorno) ];
		var chart;
		chart = new Highcharts.Chart( {
			chart : {
				margin: [10, 0, 0, 0],
				renderTo : 'grf3',
				type : 'gauge',
				backgroundColor: 'none',
				plotBackgroundColor : null,
				plotBackgroundImage : null,
				plotBorderWidth : 0,
				plotShadow : false
			},
			title : {
				text : '60min',
				fontSize : tamanhoTitulo,
				y: 3
			},
			pane : {
				startAngle : -150,
				endAngle : 150,
				background : [ {
					backgroundColor : {
						linearGradient : {
							x1 : 0,
							y1 : 0,
							x2 : 0,
							y2 : 1
						},
						stops : [ [ 0, '#FFF' ], [ 1, '#333' ] ]
					},
					borderWidth : 0,
					outerRadius : '109%'
				}, {
					backgroundColor : {
						linearGradient : {
							x1 : 0,
							y1 : 0,
							x2 : 0,
							y2 : 1
						},
						stops : [ [ 0, '#333' ], [ 1, '#FFF' ] ]
					},
					borderWidth : 1,
					outerRadius : '107%'
				}, {
				// default background
				}, {
					backgroundColor : '#DDD',
					borderWidth : 0,
					outerRadius : '105%',
					innerRadius : '103%'
				} ]
			},

			// the value axis
			yAxis : {
				min : 0,
				max : 100,
				minorTickInterval : 'auto',
				minorTickWidth : 1,
				minorTickLength : 10,
				minorTickPosition : 'inside',
				minorTickColor : '#666',
				tickPixelInterval : 30,
				tickWidth : 2,
				tickPosition : 'inside',
				tickLength : 10,
				tickColor : '#666',
				labels : {
					step : 2,
					rotation : 'auto',
					style: {
							fontSize: tamanhoLabelTeste2014_08_21
						}
				},
				title : {
					text : '' // text: 'km/h'
				},
				plotBands : [ {
					from : 0,
					to : 40,
					color : '#55BF3B' // green
				}, {
					from : 40,
					to : 50,
					color : '#DDDF0D' // yellow
				}, {
					from : 50,
					to : 100,
					color : '#DF5353' // red
				} ]
			},
			series : [ {
				name : 'Alertas',
				data : s1,
				dataLabels : {
					rotation : 0,
					y : 50,
					verticalAlign : 'top',
					enabled : true,
					borderColor: 'none'	
			},
				tooltip : {
					enabled : false,
					valueSuffix : '.'
				}
			} ],
			exporting : {
				enabled : false
			}
		});
	}
}


/**
 * @brief FUNCAO QUE MONTA O GRAFICO CDP TOTAL
 * @author GUSTAVO TOMANINI
 * @date 22/07/2014
 * @version 1.0
 */
function cpuVdpTotal() {
	$.ajax( {
		type : "GET",
		url : wsUrl,
		contentType : "text/xml",
		datatype : "html",
		data : {
			grafico : '7'
		},
		success : processSuccessVdpTotal,
		error : processError
	});
}

/**
 * @brief
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function processSuccessVdpTotal(data, status, req) {
	var arrTotalConectados = new Array();
	var totalConectadosTmp = new Array();
	var arrTotalDesconectados = new Array();
	var strTitulo = 'VDP (%)';
	if (status == "success") {
		var strRetorno = req.responseText;
		s1 = [ Number(strRetorno) ];
		var chart;
		chart = new Highcharts.Chart( {
			chart : {
				margin: [10, 0, 0, 0],
				renderTo : 'grf4',
				type : 'gauge',
				backgroundColor: 'none',
				plotBackgroundColor : null,
				plotBackgroundImage : null,
				plotBorderWidth : 0,
				plotShadow : false
			},
			title : {
				text : 'VDP (%)',
				fontSize : tamanhoTitulo,
				y: 3
			},
			pane : {
				startAngle : -150,
				endAngle : 150,
				background : [ {
					backgroundColor : {
						linearGradient : {
							x1 : 0,
							y1 : 0,
							x2 : 0,
							y2 : 1
						},
						stops : [ [ 0, '#FFF' ], [ 1, '#333' ] ]
					},
					borderWidth : 0,
					outerRadius : '109%'
				}, {
					backgroundColor : {
						linearGradient : {
							x1 : 0,
							y1 : 0,
							x2 : 0,
							y2 : 1
						},
						stops : [ [ 0, '#333' ], [ 1, '#FFF' ] ]
					},
					borderWidth : 1,
					outerRadius : '107%'
				}, {
				// default background
				}, {
					backgroundColor : '#DDD',
					borderWidth : 0,
					outerRadius : '105%',
					innerRadius : '103%'
				} ]
			},

			// the value axis
			yAxis : {
				min : 1,
				max : 25,
				minorTickInterval : 'auto',
				minorTickWidth : 1,
				minorTickLength : 5,
				minorTickPosition : 'inside',
				minorTickColor : '#666',
				tickPixelInterval : 30,
				tickWidth : 2,
				tickPosition : 'inside',
				tickLength : 10,
				tickColor : '#666',
//				labels : {
//					step : 2,
//					rotation : 'auto',
//					style: {
//							fontSize: tamanhoLabelTeste2014_08_21
//						}
//				}
				labels : {
					style : {
						color : '#000',
						font : tamanhoLabels + ' Helvetica',
						fontWeight : 'bold',
						width : '100px'
					}
				}
				,
				title : {
					text : '' // text: 'km/h'
				},
				plotBands : [ {
					from : 0,
					to : 3,
					color : '#55BF3B' // green
				}, {
					from : 3,
					to : 7,
					color : '#DDDF0D' // yellow
				}, {
					from : 7,
					to : 25,
					color : '#DF5353' // red
				} ]
			},
			series : [ {
				name : 'Alertas',
				data : s1,
				dataLabels : {
					rotation : 0,
					y : 50,
					verticalAlign : 'top',
					enabled : true,
					borderColor: 'none'	
			},
				tooltip : {
					enabled : false,
					valueSuffix : '.'
				}
			} ],
			exporting : {
				enabled : false
			}
		});
	}
}


/**
 * @brief FUNCAO QUE MONTA O GRAFICO CDP TOTAL CSC
 * @author GUSTAVO TOMANINI
 * @date 22/07/2014
 * @version 1.0
 */
function cpuVdpTotalCsc() {
	$.ajax( {
		type : "GET",
		url : wsUrl,
		contentType : "text/xml",
		datatype : "html",
		data : {
			grafico : '8'
		},
		success : processSuccessVdpTotalCsc,
		error : processError
	});
}

/**
 * @brief
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function processSuccessVdpTotalCsc(data, status, req) {
	var arrTotalConectados = new Array();
	var totalConectadosTmp = new Array();
	var arrTotalDesconectados = new Array();
	var strTitulo = 'VDP CSC(%)';

	if (status == "success") {
		var strRetorno = req.responseText;
		s1 = [ Number(strRetorno) ];
		var chart;
		chart = new Highcharts.Chart( {
			chart : {			
				margin: [10, 0, 0, 0],
				renderTo : 'grf5',
				type : 'gauge',
				backgroundColor: 'none',
				plotBackgroundColor : null,
				plotBackgroundImage : null,
				plotBorderWidth : 0,
				plotShadow : false
			},
			title : {
				text : 'VDP CSC(%)',
				fontSize : tamanhoTitulo,
				y: 3
			},
			pane : {
				startAngle : -150,
				endAngle : 150,
				background : [ {
					backgroundColor : {
						linearGradient : {
							x1 : 0,
							y1 : 0,
							x2 : 0,
							y2 : 1
						},
						stops : [ [ 0, '#FFF' ], [ 1, '#333' ] ]
					},
					borderWidth : 0,
					outerRadius : '109%'
				}, {
					backgroundColor : {
						linearGradient : {
							x1 : 0,
							y1 : 0,
							x2 : 0,
							y2 : 1
						},
						stops : [ [ 0, '#333' ], [ 1, '#FFF' ] ]
					},
					borderWidth : 1,
					outerRadius : '107%'
				}, {
				// default background
				}, {
					backgroundColor : '#DDD',
					borderWidth : 0,
					outerRadius : '105%',
					innerRadius : '103%'
				} ]
			},

			// the value axis
			yAxis : {
				min : 1,
				max : 25,
				minorTickInterval : 'auto',
				minorTickWidth : 1,
				minorTickLength : 5,
				minorTickPosition : 'inside',
				minorTickColor : '#666',
				tickPixelInterval : 30,
				tickWidth : 2,
				tickPosition : 'inside',
				tickLength : 10,
				tickColor : '#666',
				labels : {
					step : 2,
					rotation : 'auto',
					style: {
							fontSize: tamanhoLabelTeste2014_08_21
						}
				},
				title : {
					text : '' // text: 'km/h'
				},
				plotBands : [ {
					from : 1,
					to : 3,
					color : '#55BF3B' // green
				}, {
					from : 3,
					to : 7,
					color : '#DDDF0D' // yellow
				}, {
					from : 7,
					to : 25,
					color : '#DF5353' // red
				} ]
			},
			series : [ {
				name : 'Alertas',
				data : s1,
				dataLabels : {
					rotation : 0,
					y : 50,
					verticalAlign : 'top',
					enabled : true,
					borderColor: 'none'	
			},
				tooltip : {
					enabled : false,
					valueSuffix : '.'
				}
			} ],
			exporting : {
				enabled : false
			}
		});
	}
}

/**
 * @brief FUNCAO QUE MONTA O GRAFICO CDP DIARIO
 * @author GUSTAVO TOMANINI
 * @date 22/07/2014
 * @version 1.0
 */
function vdpDiario() {
	$.ajax( {
		type : "GET",
		url : wsUrl,
		contentType : "text/xml",
		datatype : "html",
		data : {
			grafico : '9'
		},
		success : processSuccessVdpDiario,
		error : processError
	});
}
 /**
 * @brief
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function processSuccessVdpDiario(data, status, req) {
	var strTitulo = 'VDP Diario';
//	var s2 = new Array();
		
	if (status == "success") {
		var strRetorno = String(req.responseText);
		s2 = eval("[" + strRetorno + "]");
//		arrCpus = (JSON.parse(strRetorno)).cpus;
		
		
		var chart;
		 
        chart = new Highcharts.Chart({
          chart: {
            renderTo: 'grf1',
            type: 'line'
          },
          title: {
            text: 'VDP (%)',
            style: {
          	  font : 'bold ' + tamanhoTitulo
          	  	+ ' "Trebuchet MS", Verdana, sans-serif',
          	  color : '#000'
                  }
          },
          
          subtitle: {
            text: 'Acompanhamento Diario',
            style: {
                    font: tamanhoLabelTeste2014_08_21+' "Trebuchet MS", Verdana, sans-serif',
                    color: '#000'
                }
          },
          
          xAxis: {
        	  labels : {
				style : {
					color : '#000',
					font : tamanhoLabels + ' Helvetica',
					fontWeight : 'bold',
					width : '100px'
				}
			},	
            type: 'datetime',
           
            tickInterval: 1.5 * 3600 * 1000,
            dateTimeLabelFormats: { // don't display the dummy year
             // month: '%h. %b',
             // year: '%b'
                 day: '%H:%M'
            }
            
          },
          yAxis: {
        	  labels : {
				style : {
					color : '#000',
					font : tamanhoLabels + ' Helvetica',
					fontWeight : 'bold',
					width : '100px'
				}
			},
            tickInterval: 2,

            title: {
              text: 'Alertas'
            },
            min: 0
          },
          tooltip: {
            enabled: false,
            formatter: function() {
              return '<b>'+ this.series.name +'</b><br/>'+
              Highcharts.dateFormat('%D:%M', this.x) +': '+ this.y +'';
            }
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true,
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    
                    color: '#000'
                }
              },
              enableMouseTracking: false
            }
          },
          
          series: [{
            name: 'VDP (%)',
            lineWidth:5, 
             //color: '#dd271e',
            data: s2        
            
          }],
          exporting : {
				enabled : false
			}
        });

	
	}
}

/**
 * @brief FUNCAO QUE MONTA O GRAFICO CDP CSC DIARIO
 * @author GUSTAVO TOMANINI
 * @date 22/07/2014
 * @version 1.0
 */
function vdpCscDiario() {
	$.ajax( {
		type : "GET",
		url : wsUrl,
		contentType : "text/xml",
		datatype : "html",
		data : {
			grafico : '10'
		},
		success : processSuccessVdpCscDiario,
		error : processError
	});
}
/**
 * @brief
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function processSuccessVdpCscDiario(data, status, req) {
	var strTitulo = 'VDP CSC Diario';
	
	if (status == "success") {
		var strRetorno = req.responseText;
		var s1 = eval("[" + strRetorno + "]");
//		var s1 = JSON.parse("[" + strRetorno + "]");
    	var chart;
        
        chart = new Highcharts.Chart({
          chart: {
            renderTo: 'grf1',
            type: 'line'
          },
          exporting: {
              enabled: false
          },
          title: {
            text: 'VDP CSC(%)',
            style: {
        	  font : 'bold ' + tamanhoTitulo
        	  	+ ' "Trebuchet MS", Verdana, sans-serif',
        	  color : '#000'
                }
          },
          
          subtitle: {
            text: 'Acompanhamento Diario',
            style: {
                    font: tamanhoLabelTeste2014_08_21+' "Trebuchet MS", Verdana, sans-serif',
                    color: '#000'
                }
          },
          
          xAxis: {
        	  labels : {
				style : {
					color : '#000',
					font : tamanhoLabels + ' Helvetica',
					fontWeight : 'bold',
					width : '100px'
				}
			},
            type: 'datetime',
           
            tickInterval: 1.5 * 3600 * 1000,
            dateTimeLabelFormats: { // don't display the dummy year
             // month: '%h. %b',
             // year: '%b'
                 day: '%H:%M'
            }
            
          },
          yAxis: {
        	  labels : {
				style : {
					color : '#000',
					font : tamanhoLabels + ' Helvetica',
					fontWeight : 'bold',
					width : '100px'
				}
			},
            tickInterval: 2,

            title: {
              text: 'Alertas'
            },
            min: 0
          },
          tooltip: {
            enabled: false,
            formatter: function() {
              return '<b>'+ this.series.name +'</b><br/>'+
              Highcharts.dateFormat('%D:%M', this.x) +': '+ this.y +'';
            }
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true,
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    
                    color: '#000'
                },
                rotation : -60,
                y : -15
              },
              enableMouseTracking: false
            }
          },
          
          series: [{
            name: 'VDP (%)',
            lineWidth:5, 
             //color: '#dd271e',
            data: s1
          }]
        });
		
	}
}

/**
 * @brief FUNCAO QUE MONTA O GRAFICO CDP MENSAL
 * @author GUSTAVO TOMANINI
 * @date 22/07/2014
 * @version 1.0
 */
function vdpMensal() {
	$.ajax( {
		type : "GET",
		url : wsUrl,
		contentType : "text/xml",
		datatype : "html",
		data : {
			grafico : '11'
		},
		success : processSuccessVdpMensal,
		error : processError
	});
}
/**
 * @brief
 * @author GUSTAVO TOMANINI
 * @date 23/05/2014
 * @version 1.0
 */
function processSuccessVdpMensal(data, status, req) {
	var strTitulo = 'VDP CSC Mensal';
	
	if (status == "success") {
		var strRetorno = req.responseText;
		var dadosDesconectados = eval("[" + strRetorno.split("@")[0] + "]");
		var dadosConectados = eval("[" + strRetorno.split("@")[1] + "]");
		var dadosDesconectados2 = eval("[" + strRetorno.split("@")[2] + "]");
		var dadosConectados2 = eval("[" + strRetorno.split("@")[3] + "]");
//    	alert(dadosDesconectados);
//    	alert(dadosConectados);
//    	alert(dadosDesconectados2);
//    	alert(dadosConectados2);
    
        var chart;
        
        chart = new Highcharts.Chart({
          chart: {
            renderTo: 'grf1',
            type: 'column'
          },
          exporting: {
              enabled: false
          },
          title: {
            text: 'VDP CSC (%)',
            style: {
        	  font : 'bold ' + tamanhoTitulo
        	  	+ ' "Trebuchet MS", Verdana, sans-serif',
        	  color : '#000'
                }
          },
          
          subtitle: {
            text: 'Acompanhamento Mensal CSC',
            style: {
                    font: tamanhoLabelTeste2014_08_21+' "Trebuchet MS", Verdana, sans-serif',
                    color: '#000'
                }
          },
          
          xAxis: {
  			labels : {
				style : {
					color : '#000',
					font : tamanhoLabels + ' Helvetica',
					fontWeight : 'bold',
					width : '100px'
				}
			},
            type: 'datetime',
            maxZoom:   5 * 24 * 3600000,
            dateTimeLabelFormats: { // don't display the dummy year
             // month: '%h. %b',
             // year: '%b'
                day: '%d/%m'
            }
            
          },
          yAxis: {
          
            tickInterval: 2,

            title: {
              text: 'Alertas'
            },
			labels : {
				style : {
					color : '#000',
					font : tamanhoLabels + ' Helvetica',
					fontWeight : 'bold',
					width : '100px'
				}
			}
			,
            min: 0
          },
          tooltip: {
            enabled: false,
            formatter: function() {
              return '<b>'+ this.series.name +'</b><br/>'+
              Highcharts.dateFormat('%D:%M', this.x) +': '+ this.y +'';
            }
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true,
                style: {
                    fontSize: '10px',
                    
//                    fontWeight: 'bold',
                    
                    color: '#000'
                },
                rotation : -60,
                y : -15
              },
              enableMouseTracking: false
            }
          },
          
          series: [{
            name: 'VDP MAX (%)',
            lineWidth:3, 
            // color: '#dd271e',
            data: dadosConectados
          }, {
            name: 'VDP TT (%)',
            lineWidth:3, 
           // color: '#e48d16',
            data: dadosDesconectados
          }, {
            name: 'VDP MAX CSC (%)',
            lineWidth:3, 
            //color: '#28acd2',
            data: dadosConectados2
          }, {
            name: 'VDP TT CSC (%)',
            lineWidth:3, 
           // color: '#2649d5',
            data: dadosDesconectados2
          }
          ]
        });
    	
    	
    	
	}
}
