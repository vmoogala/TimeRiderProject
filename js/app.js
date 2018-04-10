//619,644,664,671,704-5-6-8
/*
 *****************************************************************************
 *****************************************************************************
 *
 * Global Constants
 *
 *****************************************************************************
 *****************************************************************************
 */
var CONSTANTS = {};

CONSTANTS.colors = {
	LIGHT_GREEN: "#006D2C",
	LIGHT_PINK: "#770174",
	BLACK: "#000000"
};

CONSTANTS.circleRadius = {
	SMALL: "3px",
	MEDIUM: "5px",
	LARGE: "8px",
	ZERO: "0px"
};

CONSTANTS.squareSize = {
	SMALL: "6px",
	MEDIUM: "10px",
	LARGE: "16px",
	ZERO: "0px"
};

CONSTANTS.rangeValues = {
	// [ lowerThreshold, upperThreshold ]
	"HbA1c": [4.0, 6.0],
	"NBZ": [0, 0],
	"BMI": [17, 25],
	"Weight": [0, 0],
	"RR_syst": [120, 140],
	"RR_diast": [80, 90],
	"Size": [0, 0],
	"Chol": [0, 0],
	"TG": [0, 0],
	"Crea": [0, 0]
};

/*
 *****************************************************************************
 *****************************************************************************
 *
 * Sliders functionality
 *
 *****************************************************************************
 *****************************************************************************
 */
var timeLineSlider = d3.select("#timeLineSlider");

var tempoSlider = document.getElementById("tempoSlider");

// Update the current slider value (each time you drag the slider handle)
tempoSlider.oninput = function() {
	var x = {};
	x.id = "mediaPlayPause";
	mediaControls.mediaClicked(x);
	mediaControls.tempoValue = (100 - tempoSlider.value);
	mediaControls.mediaClicked(x);
	console.log(tempoSlider.value);
}


/*
 *****************************************************************************
 *****************************************************************************
 *
 * ScreenShot functionality
 *
 *****************************************************************************
 *****************************************************************************
 */
function takeScreenShot() {
	html2canvas(document.body).then(function(canvas) {
		// document.body.appendChild(canvas);
		// var img = canvas.toDataURL("image/png");
		var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		//Convert image to 'octet-stream' (Just a download, really)
		window.location.href = image;
	});
}


/*
 *****************************************************************************
 *****************************************************************************
 *
 * Media Buttons functionality
 *
 *****************************************************************************
 *****************************************************************************
 */
var mediaControls = {
	mediaIsPlaying: false,
	tempoValue: 50,
	currentSliderValue: 0
};



mediaControls.mediaClicked = function(mediaImg) {
	console.log("mediaClicked with id ->" + mediaImg.id);
	switch (mediaImg.id) {
		case "mediaFastRewind":
			mediaControls.currentSliderValue = mediaControls.currentSliderValue - 10;
			$('#timeLineSlider').val(mediaControls.currentSliderValue);
			timeSliderOptionChanged(mediaControls.currentSliderValue);
			console.log("mediaFastRewind");
			break;
		case "mediaRewind":
			mediaControls.currentSliderValue = mediaControls.currentSliderValue - 1;
			$('#timeLineSlider').val(mediaControls.currentSliderValue);
			timeSliderOptionChanged(mediaControls.currentSliderValue);
			console.log("mediaRewind");
			break;
		case "mediaPlayPause":
			console.log("mediaPlayPause");
			if (mediaControls.mediaIsPlaying) {
				$("#mediaPlayPause").attr("src", "images/ic_play_arrow_black_24dp_2x.png");
				clearInterval(mediaControls.setIntervalId);
				mediaControls.mediaIsPlaying = false;
			} else {
				$("#mediaPlayPause").attr("src", "images/ic_pause_black_24dp_2x.png");
				mediaControls.playAutomatically();
				mediaControls.mediaIsPlaying = true;
			}
			break;
		case "mediaForward":
			mediaControls.currentSliderValue = mediaControls.currentSliderValue + 1;
			$('#timeLineSlider').val(mediaControls.currentSliderValue);
			timeSliderOptionChanged(mediaControls.currentSliderValue);
			console.log("mediaForward");
			break;
		case "mediaFastForward":
			mediaControls.currentSliderValue = mediaControls.currentSliderValue + 10;
			$('#timeLineSlider').val(mediaControls.currentSliderValue);
			timeSliderOptionChanged(mediaControls.currentSliderValue);
			console.log("mediaFastForward");
			break;
	}
};


mediaControls.playAutomatically = function() {
	temp = mediaControls.currentSliderValue;
	temp_max = chartProperties.days.length - 1;
	if (temp == temp_max - 1) {
		mediaControls.currentSliderValue = 0;
		temp = mediaControls.currentSliderValue;
	}
	mediaControls.setIntervalId = window.setInterval(function() {
		if (temp < temp_max) {
			$('#timeLineSlider').val(temp);
			timeSliderOptionChanged(temp);
			mediaControls.currentSliderValue = temp;
			temp = temp + 1;
		} else {
			clearInterval(mediaControls.setIntervalId);
			// $('#timeLineSlider').val(0);
			$("#mediaPlayPause").attr("src", "images/ic_play_arrow_black_24dp_2x.png");
			mediaControls.mediaIsPlaying = false;
		}
	}, mediaControls.tempoValue);

}


/*
 *****************************************************************************
 *****************************************************************************
 *
 * Zoom Controls
 *
 *****************************************************************************
 *****************************************************************************
 */
var zoomControls = {};

zoomControls.zoomClicked = function(zoomImg) {
	console.log("mediaClicked with id ->" + zoomImg.id);
	switch (zoomImg.id) {
		case "zoom-in-image":
			console.log("zoom-in-image");
			takeScreenShot();
			break;
		case "zoom-out-image":
			console.log("zoom-out-image");
			break;
	}
};


/*
 *****************************************************************************
 *****************************************************************************
 *
 * Marks Controls
 *
 *****************************************************************************
 *****************************************************************************
 */
var marksControls = {
	colorOption: "none",
	shapeOption: "none",
	sizeOption: "none"
};

marksControls.colorOptionsChanged = function() {
	console.log("entered marksControls.colorOptionsChanged");
	marksControls.colorOption = $('#marks-options-colors').val();
	console.log(marksControls.colorOption);
	drawChart(chartProperties.data);
};

marksControls.shapeOptionsChanged = function() {
	console.log("entered marksControls.shapeOptionsChanged");
	marksControls.shapeOption = $('#marks-options-shape').val();
	console.log(marksControls.shapeOption);
	drawChart(chartProperties.data);
};

marksControls.sizeOptionsChanged = function() {
	console.log("entered marksControls.sizeOptionsChanged");
	marksControls.sizeOption = $('#marks-options-size').val();
	console.log(marksControls.sizeOption);
	drawChart(chartProperties.data);
};


/*
 *****************************************************************************
 *****************************************************************************
 *
 * Axis Controls
 *
 *****************************************************************************
 *****************************************************************************
 */
var axisControls = {};

axisControls.yAxisOptionsChanged = function() {
	console.log("entered yAxisOptionsChanged");
	var value = $('#y-axis-options-select').val();
	console.log(value);
	chartProperties.yAxisCurrentValue = value;
	axisControls.setDefaultThresholdsForAxes();

	yScale.domain(d3.extent(chartProperties.mainData, function(d) {
		return d[chartProperties.yAxisCurrentValue];
	}).reverse());

	yAxisGroup.transition().call(yAxis);
	ygridlinesGroup.transition().call(ygridlines);

	if ($("#y-axis-range-checkbox").is(':checked')) {
		axisControls.yAxisChangeThresholdValue();
	}
	drawChart(chartProperties.data);
}


axisControls.xAxisOptionsChanged = function() {
	console.log("entered xAxisOptionsChanged");
	var value = $('#x-axis-options-select').val();
	console.log(value);
	chartProperties.xAxisCurrentValue = value;
	axisControls.setDefaultThresholdsForAxes();

	xScale.domain(d3.extent(chartProperties.mainData, function(d) {
		return d[chartProperties.xAxisCurrentValue];
	}));

	xAxisGroup.transition().call(xAxis);
	xgridlinesGroup.transition().call(xgridlines);

	if ($("#x-axis-range-checkbox").is(':checked')) {
		axisControls.xAxisChangeThresholdValue();
	}

	drawChart(chartProperties.data);
}

axisControls.yAxisRangeChecked = function() {
	console.log("entered yAxisRangeChecked");
	if ($("#y-axis-range-checkbox").is(':checked')) {
		console.log("show divs");
		axisControls.yAxisChangeThresholdValue();
	} else {
		console.log("hide divs");
		d3.select("#yAxisRangeBox").remove();
	}
}

axisControls.xAxisRangeChecked = function() {
	console.log("entered xAxisRangeChecked");
	if ($("#x-axis-range-checkbox").is(':checked')) {
		console.log("show divs");
		axisControls.xAxisChangeThresholdValue();
	} else {
		console.log("hide divs");
		d3.select("#xAxisRangeBox").remove();
	}
}

axisControls.yAxisChangeThresholdValue = function() {
	// console.log("entered axisControls.yAxisChangeThresholdValue");
	var minY = $("#input-y-axis-lower-threshold").val();
	var maxY = $("#input-y-axis-upper-threshold").val();
	if (minY == "") {
		minY = CONSTANTS.rangeValues[chartProperties.yAxisCurrentValue][0];
	}
	if (maxY == "") {
		maxY = CONSTANTS.rangeValues[chartProperties.yAxisCurrentValue][1];
	}

	console.log(minY, maxY);
	d3.select("#yAxisRangeBox").remove();
	axisControls.showRangesForYaxis(minY, maxY);
}


axisControls.xAxisChangeThresholdValue = function() {
	// console.log("entered axisControls.xAxisChangeThresholdValue");
	var minX = $("#input-x-axis-lower-threshold").val();
	var maxX = $("#input-x-axis-upper-threshold").val();
	if (minX == "") {
		minX = CONSTANTS.rangeValues[chartProperties.xAxisCurrentValue][0];
	}
	if (maxX == "") {
		maxX = CONSTANTS.rangeValues[chartProperties.xAxisCurrentValue][1];
	}
	d3.select("#xAxisRangeBox").remove();
	axisControls.showRangesForXaxis(minX, maxX);
	console.log(minX, maxX);
}


axisControls.showRangesForYaxis = function(minY, maxY) {
	console.log("entered showRangesForYaxis");
	d3.select("#yAxisUpperRiskRangeBox").remove();
	d3.select("#yAxisLowerRiskRangeBox").remove();
	d3.select("#yAxisRangeBox").remove();
	axisControls.yAxisRangeBox = svg.append("g")
	axisControls.yAxisRangeBox.append("rect")
		.attr("id", "yAxisRangeBox")
		.attr("class", "y-axis-range-box")
		.attr("x", function() {
			return xScale(xScale.domain()[0]);
		})
		.attr("y", function() {
			return yScale(maxY);
		})
		.attr("width", xScale(xScale.domain()[1]))
		.attr("height", function() {
			return yScale(minY) - yScale(maxY);
		});
}


axisControls.showRangesForXaxis = function(minX, maxX) {
	console.log("entered showRangesForXaxis");
	axisControls.xAxisRangeBox = svg.append("g")
	axisControls.xAxisRangeBox.append("rect")
		.attr("id", "xAxisRangeBox")
		.attr("class", "x-axis-range-box")
		.attr("y", function() {
			return yScale(yScale.domain()[0]);
		})
		.attr("x", function() {
			return xScale(minX);
		})
		.attr("height", yScale(yScale.domain()[1]))
		.attr("width", function() {
			return xScale(maxX) - xScale(minX);
		});
}

axisControls.setDefaultThresholdsForAxes = function() {
	$("#input-y-axis-upper-threshold").val(CONSTANTS.rangeValues[chartProperties.yAxisCurrentValue][1])
		.attr("placeholder", CONSTANTS.rangeValues[chartProperties.yAxisCurrentValue][1]);
	$("#input-y-axis-lower-threshold").val(CONSTANTS.rangeValues[chartProperties.yAxisCurrentValue][0])
		.attr("placeholder", CONSTANTS.rangeValues[chartProperties.yAxisCurrentValue][0]);
	$("#input-x-axis-upper-threshold").val(CONSTANTS.rangeValues[chartProperties.xAxisCurrentValue][1])
		.attr("placeholder", CONSTANTS.rangeValues[chartProperties.xAxisCurrentValue][1]);
	$("#input-x-axis-lower-threshold").val(CONSTANTS.rangeValues[chartProperties.xAxisCurrentValue][0])
		.attr("placeholder", CONSTANTS.rangeValues[chartProperties.xAxisCurrentValue][0]);
}

axisControls.xAxisRiskRangesChecked = function() {
	console.log("entered axisControls.xAxisRiskRangesChecked");

	if ($("#x-axis-range-checkbox").is(':checked')) {
		if ($("#input-x-axis-show-risk-ranges").is(':checked')) {
			d3.select("#xAxisRangeBox").remove();
			axisControls.showRiskRangesForXAxis();
		} else {
			d3.select("#xAxisUpperRiskRangeBox").remove();
			d3.select("#xAxisLowerRiskRangeBox").remove();
			axisControls.xAxisChangeThresholdValue();
		}
	} else {
		console.log("x axis range checkbox must be checked");
		// $("#x-axis-range-checkbox").prop("checked", false);
	}

}

axisControls.yAxisRiskRangesChecked = function() {
	console.log("entered axisControls.yAxisRiskRangesChecked");

	if ($("#y-axis-range-checkbox").is(':checked')) {
		if ($("#input-y-axis-show-risk-ranges").is(':checked')) {
			d3.select("#yAxisRangeBox").remove();
			axisControls.showRiskRangesForYAxis();
		} else {
			d3.select("#yAxisUpperRiskRangeBox").remove();
			d3.select("#yAxisLowerRiskRangeBox").remove();
			axisControls.yAxisChangeThresholdValue();
		}
	} else {
		console.log("y axis range checkbox must be checked");
		// $("#y-axis-range-checkbox").prop('checked', false);
	}

}

axisControls.showRiskRangesForYAxis = function() {
	console.log("entered showRiskRangesForYAxis");

	var minY = $("#input-y-axis-lower-threshold").val();
	var maxY = $("#input-y-axis-upper-threshold").val();
	if (minY == "") {
		minY = CONSTANTS.rangeValues[chartProperties.yAxisCurrentValue][0];
	}
	if (maxY == "") {
		maxY = CONSTANTS.rangeValues[chartProperties.yAxisCurrentValue][1];
	}

	axisControls.yAxisUpperRiskRangeBox = svg.append("g")
	axisControls.yAxisUpperRiskRangeBox.append("rect")
		.attr("id", "yAxisUpperRiskRangeBox")
		.attr("class", "y-axis-range-box")
		.attr("x", function() {
			return xScale(xScale.domain()[0]);
		})
		.attr("y", function() {
			return yScale(yScale.domain()[0]);
		})
		.attr("width", xScale(xScale.domain()[1]))
		.attr("height", function() {
			return yScale(maxY);
		})

	axisControls.yAxisLowerRiskRangeBox = svg.append("g")
	axisControls.yAxisLowerRiskRangeBox.append("rect")
		.attr("id", "yAxisLowerRiskRangeBox")
		.attr("class", "y-axis-range-box")
		.attr("x", function() {
			return xScale(xScale.domain()[0]);
		})
		.attr("y", function() {
			return yScale(minY);
		})
		.attr("width", xScale(xScale.domain()[1]))
		.attr("height", function() {
			return yScale(yScale.domain()[1]) - yScale(minY);
		})
}

axisControls.showRiskRangesForXAxis = function() {
	console.log("entered showRiskRangesForXAxis");

	var minX = $("#input-x-axis-lower-threshold").val();
	var maxX = $("#input-x-axis-upper-threshold").val();
	if (minX == "") {
		minX = CONSTANTS.rangeValues[chartProperties.xAxisCurrentValue][0];
	}
	if (maxX == "") {
		maxX = CONSTANTS.rangeValues[chartProperties.xAxisCurrentValue][1];
	}

	axisControls.xAxisUpperRiskRangeBox = svg.append("g");
	axisControls.xAxisUpperRiskRangeBox.append("rect")
		.attr("id", "xAxisUpperRiskRangeBox")
		.attr("class", "y-axis-range-box")
		.attr("x", function() {
			return xScale(maxX);
		})
		.attr("y", function() {
			return yScale(yScale.domain()[0]);
		})
		.attr("width", xScale(xScale.domain()[1]) - xScale(maxX))
		.attr("height", function() {
			return yScale(yScale.domain()[1]);
		})

	axisControls.xAxisLowerRiskRangeBox = svg.append("g")
	axisControls.xAxisLowerRiskRangeBox.append("rect")
		.attr("id", "xAxisLowerRiskRangeBox")
		.attr("class", "y-axis-range-box")
		.attr("x", function() {
			return xScale(xScale.domain()[0]);
		})
		.attr("y", function() {
			return yScale(yScale.domain()[0]);
		})
		.attr("width", xScale(minX))
		.attr("height", function() {
			return yScale(yScale.domain()[1]);
		})
}



/*
 *****************************************************************************
 *****************************************************************************
 *
 * Tooltip related functions
 *
 *****************************************************************************
 *****************************************************************************
 */
var tooltipFunctions = {};

tooltipFunctions.onMouseOver = function(d) {
	// console.log(d);
	console.log("mouseover");
	// tooltip.style("display", "inline");
	tooltip.html(tooltipFunctions.getHtmlStringForToolTip(d))
		.style("left", (d3.event.pageX + 3) + "px")
		.style("top", (d3.event.pageY + 3) + "px")
		// .style("display", "inline")
		.transition()
		.duration(200) // in ms
		.style("opacity", .9);
	tooltipFunctions.appendLineChart(d);
}


tooltipFunctions.onMouseOut = function() {
	console.log("mouseout");
	// tooltip.style("display", "none")
	tooltip
		.transition()
		.duration(200) // ms
		.style("opacity", 0);

	// d3.select("#lineChartGroup").remove();
}

//Forming a html string to show the popup
tooltipFunctions.getHtmlStringForToolTip = function(d_in) {
	// To Create a new object without reference to previous object using jquery's extend method
	var d = {};
	$.extend(d, d_in);

	// To show 'X' when a value is true, '' when false, '?' when null in popup
	function temp(x) {
		for (i = 0; i < x.length; i++) {
			console.log(x.length);
			if (d[x[i]] == 'T') {
				d[x[i]] = 'X';
			} else if (d[x[i]] == 'F') {
				d[x[i]] = "";
			} else {
				d[x[i]] = "?";
			}
		}
		// console.log(d);
	}

	temp(["Nikotin", "SH", "Met", "Glit", "DPP4", "Acarb", "ACE", "Bbl", "RR_sonst", "Statin", "ASS", "Protein_in_urine", "VZI", "ALT", "Misch", "Retinopathie", "Insult", "KHK", "PAVK", "PNP", "Nephropathie"]);

	var html = '<div class="heading-tooltip"><p>Date: <b>' + d.Date;

	if (d.opacity < 1) {
		html = html + "<span style='color: red;'> **Predicted** </span>";
	}

	html = html + '</b><br/><b>' + d.ID + ': ' + d.Name +
		'</b>, ' + d.Gender +
		'<br/>Date of birth: ' + d.Birthday +
		'</p></div><div class="left-tooltip"><div><span class="header-text-tooltip">Biometric data</span><div class ="key-names-tooltip"> Body Mass Index <br/>Size[cm] <br/>Weight[kg] <br/>BP syst. [mmHg] <br/>BP diast. [mmHg] <br/>Smoker <br/></div><div class ="value-names-tooltip">' +
		d.BMI.toPrecision(4) + ' <br/>' + d.Size.toPrecision(4) + ' <br/>' + d.Weight.toPrecision(4) + '<br/>' + d.RR_syst.toPrecision(4) + '<br/>' + d.RR_diast.toPrecision(4) + '<br/>' + d.Nikotin +
		'<br/></div></div><div><span class="header-text-tooltip">OAD therapy</span><div class ="key-names-tooltip">SH <br/>Met <br/>Glit <br/>DPP4 <br/>Acarb <br/></div><div class ="value-names-tooltip">' +
		d.SH + ' <br/>' + d.Met + ' <br/>' + d.Glit + '<br/>' + d.DPP4 + '<br/>' + d.Acarb + '<br/>' +
		'</div></div><div><span class="header-text-tooltip">Concomitant medication</span><div class ="key-names-tooltip">ACE <br/>Bbl <br/>BP Other <br/>Statin <br/>ASS <br/></div><div class ="value-names-tooltip">' +
		d.ACE + ' <br/>' + d.Bbl + ' <br/>' + d.RR_sonst + '<br/>' + d.Statin + '<br/>' + d.ASS + '<br/>' +
		'</div></div></div><div class="right-tooltip"><div><span class="header-text-tooltip">Laboratory</span><div class ="key-names-tooltip">Blood sugar [mg/dl] <br/>HbA1c[%] <br/>Cholesterol [mg/dl] <br/>Triglyceride [mg/dl] <br/>Creatinine [mg/dl] <br/>Protein in urine <br/></div><div class ="value-names-tooltip">' +
		d.NBZ.toPrecision(4) + ' <br/>' + d.HbA1c.toPrecision(4) + ' <br/>' + d.Chol.toPrecision(4) + '<br/>' + d.TG.toPrecision(4) + '<br/>' + d.Crea.toPrecision(2) + '<br/>' + d.Protein_in_urine +
		'<br/></div></div><div><span class="header-text-tooltip">Insulin therapy</span><div class ="key-names-tooltip">VZI <br/>ALT <br/>Misch <br/></div><div class ="value-names-tooltip">' +
		d.VZI + '<br/>' + d.ALT + '<br/>' + d.Misch + '<br/>' +
		'</div></div><div><span class="header-text-tooltip">Organ Damages</span><div class ="key-names-tooltip">Retinopathy <br/>Stroke <br/>Coronary Heart D. <br/>PAOD <br/>Polyneuropathy <br/>Nephropathie <br/></div><div class ="value-names-tooltip">' +
		d.Retinopathie + ' <br/>' + d.Insult + ' <br/>' + d.KHK + '<br/>' + d.PAVK + '<br/>' + d.PNP + '<br/>' + d.Nephropathie +
		'<br/></div></div></div>';

	return html;
}

tooltipFunctions.appendLineChart = function(d) {
	d3.select("#lineChartGroup").remove();
	chartProperties.lineChartGroup = svg.append("g").attr("id", "lineChartGroup");
	console.log("current data -->", d);
	var currentPatientId = d.ID;

	var thisPatientData = [];

	chartProperties.mainData.forEach(function(x) {
		if ((x.ID == d.ID) && (x.opacity == 1) && (x[chartProperties.xAxisCurrentValue] != 0) && (x[chartProperties.yAxisCurrentValue] != 0)) {
			thisPatientData.push(x);
		}
	});
	console.log(thisPatientData);

	var line = d3.line()
		.x(function(d) {
			return xScale(d[chartProperties.xAxisCurrentValue]);
		})
		.y(function(d) {
			return yScale(d[chartProperties.yAxisCurrentValue]);
		});

	chartProperties.lineChartGroup.append("path")
		.datum(thisPatientData)
		.attr("fill", "none")
		.attr("stroke", "steelblue")
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 3)
		// .transition()
		// .duration(3000)
		.attr("d", line);


	chartProperties.lineChartGroup.selectAll("dot")
		.data(thisPatientData)
		.enter().append("circle")
		.style("fill", "red")
		.attr("r", CONSTANTS.circleRadius.MEDIUM)
		.attr("cx", function(d) {
			return xScale(d[chartProperties.xAxisCurrentValue]);
		})
		.attr("cy", function(d) {
			return yScale(d[chartProperties.yAxisCurrentValue]);
		})
		.on("mouseover", function(d) {
			tooltipFunctions.lineChartMouseOver(d)
		})
		.on("mouseleave", tooltipFunctions.onLineChartMouseOut);;
}

tooltipFunctions.lineChartMouseOver = function(d) {
	tooltip.html(tooltipFunctions.getHtmlStringForToolTip(d))
		.style("left", (d3.event.pageX + 3) + "px")
		.style("top", (d3.event.pageY + 3) + "px")
		// .style("display", "inline")
		.transition()
		.duration(200) // in ms
		.style("opacity", .9);
}

tooltipFunctions.onLineChartMouseOut = function() {
	console.log("mouseout");
	// tooltip.style("display", "none")
	tooltip
		.transition()
		.duration(200) // ms
		.style("opacity", 0);

	// d3.select("#lineChartGroup").remove();	
}
/**
 **************************************************************************************
 **************************************************************************************
 *
 *  Chart Code
 *
 **************************************************************************************
 **************************************************************************************
 */

var chartProperties = {
	outerWidth: 925,
	outerheight: 500,
	margin: {
		top: 30,
		right: 30,
		bottom: 30,
		left: 30
	},
	data: [],
	nestedDataByDate: [],
	xAxisCurrentValue: "BMI",
	yAxisCurrentValue: "HbA1c"
};

chartProperties.width = chartProperties.outerWidth - chartProperties.margin.left - chartProperties.margin.right;
chartProperties.height = chartProperties.outerheight - chartProperties.margin.top - chartProperties.margin.bottom;

// var zoom = d3.zoom()
// 	.scaleExtent([1, 10])
// 	.on("zoom", zoomed);

// function zoomed() {
// 	// svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
// 	svg.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');

// }

var svg = d3.select("#svg-div")
	.append("svg")
	.attr("width", chartProperties.width + chartProperties.margin.left + chartProperties.margin.right)
	.attr("height", chartProperties.height + chartProperties.margin.top + chartProperties.margin.bottom)
	.append("g")
	.attr("transform", "translate(" + chartProperties.margin.left + "," + chartProperties.margin.top + ")");
// .call(zoom);

// Scale
var xScale = d3.scaleLinear()
	.domain([0, 100])
	.range([0, chartProperties.width]);

var yScale = d3.scaleLinear()
	.domain([100, 0])
	.range([0, chartProperties.height]);

// Axis
var xAxis = d3.axisBottom()
	.scale(xScale);

var yAxis = d3.axisLeft()
	.scale(yScale);

var xAxisGroup = svg.append("g")
	.attr("transform", "translate(" + 0 + "," + chartProperties.height + ")")
	.call(xAxis);

var yAxisGroup = svg.append("g")
	.attr("transform", "translate(" + 0 + "," + 0 + ")")
	.call(yAxis);

// Gridline
var ygridlines = d3.axisTop()
	.tickFormat("")
	.tickSize(-chartProperties.height)
	.scale(xScale);

var xgridlines = d3.axisLeft()
	.tickFormat("")
	.tickSize(-chartProperties.width)
	.scale(yScale);

var ygridlinesGroup = svg.append("g")
	.attr("class", "grid")
	.call(ygridlines);

var xgridlinesGroup = svg.append("g")
	.attr("class", "grid")
	.call(xgridlines);

//Tooltip
var tooltip = d3.select("body").append("div")
	.attr("class", "tooltip1")
	.attr("id", "tooltip1")
	.style("opacity", 0);
// .style("display", "none");


// d3.csv("/data/TimeRiderDataFinal.csv", type, function(data) {
d3.csv("/data/ModifiedDataWorked.csv", type, function(data) {
	// drawChart(data);
	// console.log(JSON.stringify(data));
	chartProperties.mainData = data;
	// console.log(chartProperties.mainData)
	beforeDrawingChart(data);
});

function type(d) {
	d.Size = +d.Size || 0;
	d.Weight = +d.Weight || 0;
	d.BMI = +d.BMI || 0;
	d.NBZ = +d.NBZ || 0;
	d.HbA1c = +d.HbA1c || 0;
	d.Chol = +d.Chol || 0;
	d.TG = +d.TG || 0;
	d.Crea = +d.Crea || 0;
	d.RR_syst = +d.RR_syst || 0;
	d.RR_diast = +d.RR_diast || 0;
	return d;
}


function beforeDrawingChart(data) {
	// console.log("beforeDrawingChart");

	xScale.domain(d3.extent(chartProperties.mainData, function(d) {
		return d[chartProperties.xAxisCurrentValue];
	}));

	yScale.domain(d3.extent(chartProperties.mainData, function(d) {
		return d[chartProperties.yAxisCurrentValue];
	}).reverse());

	// Axis
	xAxisGroup.transition().call(xAxis);
	yAxisGroup.transition().call(yAxis);
	ygridlinesGroup.transition().call(ygridlines);
	xgridlinesGroup.transition().call(xgridlines);

	axisControls.setDefaultThresholdsForAxes();


	chartProperties.nestedDataByDate = d3.nest()
		.key(function(d) {
			return d.Date;
		})
		.entries(data);

	// console.log(chartProperties.nestedDataByDate);
	chartProperties.dateArray = [];
	for (i = 0; i < chartProperties.nestedDataByDate.length; i++) {
		chartProperties.dateArray.push(chartProperties.nestedDataByDate[i].key);
		// console.log(chartProperties.nestedDataByDate[i].key);
	}
	chartProperties.dateArray = chartProperties.dateArray.sort();
	// console.log(chartProperties.dateArray);

	setDateOptionsForSlider(chartProperties.dateArray[0], chartProperties.dateArray[chartProperties.dateArray.length - 1]);

	// console.log(chartProperties.nestedDataByDate[0].values);
	chartProperties.data = chartProperties.nestedDataByDate[0].values;
	// Date d = new Date(chartProperties.nestedDataByDate[0].key);
	// drawChart(chartProperties.data);
	drawChart(chartProperties.nestedDataByDate[0].values);
	drawChart(chartProperties.nestedDataByDate[0].values);
};

function setDateOptionsForSlider(min_date, max_date) {
	// console.log(min_date, max_date);
	chartProperties.days = d3.timeDay.range(new Date(min_date), new Date(max_date));
	total_days = chartProperties.days.length;
	temp = []
	chartProperties.days.forEach(function(d) {
		temp.push(d.toISOString().substring(0, 10));
	})
	// console.log(JSON.stringify(temp));
	// console.log(total_days);
	$("#sliderDateIndicatorText").text("Currently Visible Time:" + new Date(min_date).toISOString().substring(0, 10));

	timeLineSlider.attr("min", 0)
		.attr("max", total_days - 1)
		.attr("value", 0)
		.attr("step", 1)
		.on("input", function() {
			// console.log(+this.value);
			timeSliderOptionChanged(+this.value)
		});
}


function timeSliderOptionChanged(x) {
	d3.select("#lineChartGroup").remove();
	// console.log(d3.event.target.value); // Display the default slider value
	var d = chartProperties.days[x];
	// console.log(d.toISOString().substring(0, 10));
	mediaControls.currentSliderValue = chartProperties.days.indexOf(d);
	$("#sliderDateIndicatorText").text("Currently Visible Time:" + d.toISOString().substring(0, 10));
	for (i = 0; i < chartProperties.nestedDataByDate.length; i++) {
		if (chartProperties.nestedDataByDate[i].key == d.toISOString().substring(0, 10)) {
			// console.log(d.toISOString().substring(0, 10));
			// console.log(chartProperties.nestedDataByDate[i].values);
			chartProperties.data = chartProperties.nestedDataByDate[i].values;
			drawChart(chartProperties.data);
			break;
		}
	}
}

// Scatter points
function drawChart(data) {
	// console.log("entered drawChart");
	// console.log(chartProperties.xAxisCurrentValue);
	// console.log(chartProperties.yAxisCurrentValue);
	chartProperties.data = data;
	// console.log(chartProperties.data);

	ygridlinesGroup.transition().call(ygridlines);
	xgridlinesGroup.transition().call(xgridlines);

	var circles = svg.selectAll("circle")
		.data(chartProperties.data);
	// .filter(function(d){
	// 	return d[chartProperties.xAxisCurrentValue]!=0 && d[chartProperties.yAxisCurrentValue]!=0;
	// });

	circles.enter()
		.append("circle");

	circles.attr("class", "dot")
		.attr("cx", function(d) {
			// console.log(+d[chartProperties.xAxisCurrentValue]);
			return xScale(+d[chartProperties.xAxisCurrentValue]);
		})
		.attr("cy", function(d) {
			// console.log(+d[chartProperties.yAxisCurrentValue]);
			return yScale(+d[chartProperties.yAxisCurrentValue]);
		})
		.attr("r", function(d) {
			return marksFunctions.circleSizeOptions(d);
		})
		.attr("opacity", function(d) {
			return d.opacity;
		})
		.attr("fill", function(d) {
			return marksFunctions.fillOptions(d);
		})
		.on("mouseover", function(d) {
			tooltipFunctions.onMouseOver(d)
		})
		.on("mouseout", tooltipFunctions.onMouseOut);

	circles.exit().remove();

	var squares = svg.selectAll("rect")
		.data(chartProperties.data);

	squares.enter()
		.append("rect")
		.attr("height", CONSTANTS.squareSize.ZERO)
		.attr("width", CONSTANTS.squareSize.ZERO);

	squares.attr("class", "dot")
		.attr("x", function(d) {
			// console.log(+d[chartProperties.xAxisCurrentValue] * 50) - 5;
			return xScale(+d[chartProperties.xAxisCurrentValue]) - 5;
		})
		.attr("y", function(d) {
			// console.log(+d[chartProperties.yAxisCurrentValue] * 50) - 5;
			return yScale(+d[chartProperties.yAxisCurrentValue]) - 5;
		})
		.attr("height", function(d) {
			return marksFunctions.squareSizeOptions(d);
		})
		.attr("width", function(d) {
			return marksFunctions.squareSizeOptions(d);
		})
		.attr("fill", function(d) {
			return marksFunctions.fillOptions(d);
		})
		.on("mouseover", function(d) {
			tooltipFunctions.onMouseOver(d)
		})
		.on("mouseout", tooltipFunctions.onMouseOut);

	squares.exit().remove();

}

/**
 **************************************************************************************
 **************************************************************************************
 *
 *  Marks Controls
 *
 **************************************************************************************
 **************************************************************************************
 */
var marksFunctions = {};

marksFunctions.fillOptions = function(d) {
	if (marksControls.colorOption != "none") {
		switch (marksControls.colorOption) {
			case "gender":
				if (d.Gender == "male") {
					return CONSTANTS.colors.LIGHT_PINK;
				} else if (d.Gender == "female") {
					return CONSTANTS.colors.LIGHT_GREEN;
				} else {
					return CONSTANTS.colors.BLACK;
				}
				break;
			default:
				if (d[marksControls.colorOption] == 'T') {
					return CONSTANTS.colors.LIGHT_GREEN;
				} else if (d[marksControls.colorOption] == 'F') {
					return CONSTANTS.colors.LIGHT_PINK;
				} else {
					return CONSTANTS.colors.BLACK;
				}
		}
	} else {
		return CONSTANTS.colors.BLACK;
	}
}

marksFunctions.circleSizeOptions = function(d) {
	if (d[chartProperties.xAxisCurrentValue] == 0 || d[chartProperties.yAxisCurrentValue] == 0) {
		return 0;
	}
	if (marksControls.shapeOption == "none") {
		if (marksControls.sizeOption == "none") {
			return CONSTANTS.circleRadius.MEDIUM;
		}
		switch (marksControls.sizeOption) {
			case "gender":
				if (d.Gender == "male") {
					return CONSTANTS.circleRadius.SMALL;
				} else if (d.Gender == "female") {
					return CONSTANTS.circleRadius.LARGE;
				} else {
					return CONSTANTS.circleRadius.MEDIUM;
				}
				break;
			default:
				if (d[marksControls.colorOption] == 'T') {
					return CONSTANTS.circleRadius.SMALL;
				} else if (d.Gender == "female") {
					return CONSTANTS.circleRadius.LARGE;
				} else {
					return CONSTANTS.circleRadius.MEDIUM;
				}
		}
	} else {
		switch (marksControls.shapeOption) {
			case "gender":
				if (d.Gender == "female") {
					if (marksControls.sizeOption == "none") {
						return CONSTANTS.circleRadius.MEDIUM;
					} else {
						switch (marksControls.sizeOption) {
							case "gender":
								if (d.Gender == "male") {
									return CONSTANTS.circleRadius.SMALL;
								} else if (d.Gender == "female") {
									return CONSTANTS.circleRadius.LARGE;
								} else {
									return CONSTANTS.circleRadius.MEDIUM;
								}
								break;
							default:
								if (d[marksControls.colorOption] == 'T') {
									return CONSTANTS.circleRadius.SMALL;
								} else if (d.Gender == "female") {
									return CONSTANTS.circleRadius.LARGE;
								} else {
									return CONSTANTS.circleRadius.MEDIUM;
								}
						}
					}
				} else {
					return 0;
				}
				break;
			default:
				if (d[marksControls.shapeOption] == 'T') {
					if (marksControls.sizeOption == "none") {
						return CONSTANTS.circleRadius.MEDIUM;
					} else {
						switch (marksControls.sizeOption) {
							case "gender":
								if (d.Gender == "male") {
									return CONSTANTS.circleRadius.SMALL;
								} else if (d.Gender == "female") {
									return CONSTANTS.circleRadius.LARGE;
								} else {
									return CONSTANTS.circleRadius.MEDIUM;
								}
								break;
							default:
								if (d[marksControls.colorOption] == 'T') {
									return CONSTANTS.circleRadius.SMALL;
								} else if (d.Gender == "female") {
									return CONSTANTS.circleRadius.LARGE;
								} else {
									return CONSTANTS.circleRadius.MEDIUM;
								}
						}
					}
				} else {
					return 0;
				}

		}
	}
}

marksFunctions.squareSizeOptions = function(d) {
	if (d[chartProperties.xAxisCurrentValue] == 0 || d[chartProperties.yAxisCurrentValue] == 0 || marksControls.shapeOption == "none") {
		return 0;
	}
	if (marksControls.shapeOption == "none") {
		if (marksControls.sizeOption == "none") {
			return CONSTANTS.squareSize.MEDIUM;
		}
		switch (marksControls.sizeOption) {
			case "gender":
				if (d.Gender == "male") {
					return CONSTANTS.squareSize.SMALL;
				} else if (d.Gender == "female") {
					return CONSTANTS.squareSize.LARGE;
				} else {
					return CONSTANTS.squareSize.MEDIUM;
				}
				break;
			default:
				if (d[marksControls.colorOption] == 'T') {
					return CONSTANTS.squareSize.SMALL;
				} else if (d.Gender == "female") {
					return CONSTANTS.squareSize.LARGE;
				} else {
					return CONSTANTS.squareSize.MEDIUM;
				}
		}
	} else {
		switch (marksControls.shapeOption) {
			case "gender":
				if (d.Gender == "male") {
					if (marksControls.sizeOption == "none") {
						return CONSTANTS.squareSize.MEDIUM;
					} else {
						switch (marksControls.sizeOption) {
							case "gender":
								if (d.Gender == "male") {
									return CONSTANTS.squareSize.SMALL;
								} else if (d.Gender == "female") {
									return CONSTANTS.squareSize.LARGE;
								} else {
									return CONSTANTS.squareSize.MEDIUM;
								}
								break;
							default:
								if (d[marksControls.colorOption] == 'T') {
									return CONSTANTS.squareSize.SMALL;
								} else if (d.Gender == "female") {
									return CONSTANTS.squareSize.LARGE;
								} else {
									return CONSTANTS.squareSize.MEDIUM;
								}
						}
					}
				} else {
					return 0;
				}
				break;
			default:
				if (d[marksControls.shapeOption] == 'T') {
					if (marksControls.sizeOption == "none") {
						return CONSTANTS.squareSize.MEDIUM;
					} else {
						switch (marksControls.sizeOption) {
							case "gender":
								if (d.Gender == "male") {
									return CONSTANTS.squareSize.SMALL;
								} else if (d.Gender == "female") {
									return CONSTANTS.squareSize.LARGE;
								} else {
									return CONSTANTS.squareSize.MEDIUM;
								}
								break;
							default:
								if (d[marksControls.colorOption] == 'T') {
									return CONSTANTS.squareSize.SMALL;
								} else if (d.Gender == "female") {
									return CONSTANTS.squareSize.LARGE;
								} else {
									return CONSTANTS.squareSize.MEDIUM;
								}
						}
					}
				} else {
					return 0;
				}

		}
	}
}
/**
 **************************************************************************************
 **************************************************************************************
 *
 *  Filter Options
 *
 **************************************************************************************
 **************************************************************************************
 */

/**
 **************************************************************************************
 **************************************************************************************
 *
 *  Legends for Marks
 *
 **************************************************************************************
 **************************************************************************************
 */
var colorsLegendSvg = d3.select("#colorsLegendSvg")
colorsLegendData = [{
	color: CONSTANTS.colors.LIGHT_PINK,
	text: "False/Male",
	size: CONSTANTS.circleRadius.SMALL
}, {
	color: CONSTANTS.colors.LIGHT_GREEN,
	text: "True/Female",
	size: CONSTANTS.circleRadius.LARGE
}, {
	color: CONSTANTS.colors.BLACK,
	text: "No Data",
	size: CONSTANTS.circleRadius.MEDIUM
}];

colorsLegendSvg.selectAll("circle")
	.data(colorsLegendData).enter()
	.append("circle")
	.attr("cx", 10)
	.attr("cy", function(d, i) {
		return 10 + i * 20;
	})
	.attr("r", 5)
	.attr("fill", function(d) {
		return d.color;
	})

colorsLegendSvg.selectAll("text")
	.data(colorsLegendData).enter()
	.append("text")
	.attr("x", 20)
	.attr("y", function(d, i) {
		return 15 + i * 20;
	})
	.text(function(d) {
		return d.text;
	})
	.attr("fill", function(d) {
		return d.color;
	})
	.attr("font-size", "15px")


var sizeLegendSvg = d3.select("#sizeLegendSvg")
sizeLegendSvg.selectAll("circle")
	.data(colorsLegendData).enter()
	.append("circle")
	.attr("cx", 10)
	.attr("cy", function(d, i) {
		return 10 + i * 20;
	})
	.attr("r", function(d){
		return d.size;
	})
	.attr("fill", CONSTANTS.colors.BLACK)

sizeLegendSvg.selectAll("text")
	.data(colorsLegendData).enter()
	.append("text")
	.attr("x", 20)
	.attr("y", function(d, i) {
		return 15 + i * 20;
	})
	.text(function(d) {
		return d.text;
	})
	.attr("fill", CONSTANTS.colors.BLACK)
	.attr("font-size", function(d,i){
		if(i==0){
			return "12px";
		}else if(i==1){
			return "18px";
		}else return "15px";
	})


// shapesLegendSvg
var shapesLegendSvg = d3.select("#shapesLegendSvg")
shapesLegendSvg.selectAll("circle")
	.data(["1"]).enter()
	.append("circle")
	.attr("cx", 10)
	.attr("cy", 15)
	.attr("r", CONSTANTS.circleRadius.MEDIUM)
	.attr("fill", CONSTANTS.colors.BLACK)

shapesLegendSvg.selectAll("rect")
	.data(["1"]).enter()
	.append("rect")
	.attr("x", 5)
	.attr("y", 30)
	.attr("height", CONSTANTS.squareSize.MEDIUM)
	.attr("width", CONSTANTS.squareSize.MEDIUM)
	.attr("fill", CONSTANTS.colors.BLACK)

shapesLegendSvg.selectAll("text")
	.data(["True/Female", "False/Male"]).enter()
	.append("text")
	.attr("x", 20)
	.attr("y", function(d, i) {
		return 20 + i * 20;
	})
	.text(function(d) {
		return d;
	})
	.attr("fill", CONSTANTS.colors.BLACK)
	.attr("font-size", "15px")


