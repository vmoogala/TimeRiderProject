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
	SMALL: "10px",
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
		var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
		window.location.href = image;
		// console.log(img);
		// document.write('<img src="'+image+'"/>');
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
	mediaIsPlaying: false
};

mediaControls.mediaClicked = function(mediaImg) {
	console.log("mediaClicked with id ->" + mediaImg.id);
	switch (mediaImg.id) {
		case "mediaFastRewind":
			console.log("mediaFastRewind");
			break;
		case "mediaRewind":
			console.log("mediaRewind");
			break;
		case "mediaPlayPause":
			console.log("mediaPlayPause");
			if (mediaControls.mediaIsPlaying) {
				$("#mediaPlayPause").attr("src", "images/ic_pause_black_24dp_2x.png");
				mediaControls.playAutomatically();
				mediaControls.mediaIsPlaying = false;
			} else {
				$("#mediaPlayPause").attr("src", "images/ic_play_arrow_black_24dp_2x.png");
				mediaControls.mediaIsPlaying = true;
			}
			break;
		case "mediaForward":
			console.log("mediaForward");
			break;
		case "mediaFastForward":
			console.log("mediaFastForward");
			break;
	}
};


mediaControls.playAutomatically = function() {
	temp = 0;
	temp_max = chartProperties.days.length - 1;
	var x = window.setInterval(function() {
		if (temp < temp_max) {
			$('#timeLineSlider').val(temp);
			timeSliderOptionChanged(temp);
			temp = temp + 1;
		} else {
			clearInterval(x)
		}
	}, 50);

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
	drawChart(chartProperties.data);
}


axisControls.yAxisChangeThresholdValue = function() {
	// console.log("entered axisControls.yAxisChangeThresholdValue");
	var minY = $("#input-y-axis-lower-threshold").val();
	var maxY = $("#input-y-axis-upper-threshold").val();
	console.log(minY, maxY);
	d3.select("#yAxisRangeBox").remove();
	axisControls.showRangesForYaxis(minY, maxY);
}


axisControls.xAxisChangeThresholdValue = function() {
	// console.log("entered axisControls.xAxisChangeThresholdValue");
	var minX = $("#input-x-axis-lower-threshold").val();
	var minY = $("#input-x-axis-upper-threshold").val();
	d3.select("#xAxisRangeBox").remove();
	console.log(minX, maxX);
}


axisControls.yAxisRangeChecked = function() {
	console.log("entered yAxisRangeChecked");
	var x = document.getElementById("y-axis-range-checkbox");
	if (x.checked) {
		console.log("show divs");
		axisControls.yAxisChangeThresholdValue();
	} else {
		console.log("hide divs");
		d3.select("#yAxisRangeBox").remove();
	}
}


axisControls.showRangesForYaxis = function(minY, maxY) {
	console.log("entered showRangesForYaxis");
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
		})

}


axisControls.xAxisRangeChecked = function() {
	console.log("entered xAxisRangeChecked");
	var x = document.getElementById("x-axis-range-checkbox");
	if (x.checked) {
		console.log("show divs");
		axisControls.yAxisChangeThresholdValue();
	} else {
		console.log("hide divs");
		d3.select("#xAxisRangeBox").remove();
	}
}

axisControls.showRangesForXaxis = function(minX, maxX) {
	console.log("entered showRangesForXaxis");
	axisControls.xAxisRangeBox = svg.append("g")
	axisControls.xAxisRangeBox.append("rect")
		.attr("id", "xAxisRangeBox")
		.attr("y", function() {
			return yScale(yScale.domain()[0]);
		})
		.attr("x", function() {
			return xScale(minX);
		})
		.attr("height", yScale(yScale.domain()[1]))
		.attr("width", function() {
			return xScale(maxX) - xScale(minX);
		})
		.attr("class", "x-axis-range-box")
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
}

axisControls.yAxisRiskRangesChecked = function() {
	console.log("entered axisControls.yAxisRiskRangesChecked");
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

	var html = '<div class="heading-tooltip"><p>Date: <b>' + d.Date +
		'</b><br/><b>' + d.ID + ': ' + d.Name +
		'</b>, ' + d.Gender +
		'<br/>Date of birth: ' + d.Birthday +
		'</p></div><div class="left-tooltip"><div><span class="header-text-tooltip">Biometric data</span><div class ="key-names-tooltip"> Body Mass Index <br/>Size[cm] <br/>Weight[kg] <br/>BP syst. [mmHg] <br/>BP diast. [mmHg] <br/>Smoker <br/></div><div class ="value-names-tooltip">' +
		d.BMI + ' <br/>' + d.Size + ' <br/>' + d.Weight + '<br/>' + d.RR_syst + '<br/>' + d.RR_diast + '<br/>' + d.Nikotin +
		'<br/></div></div><div><span class="header-text-tooltip">OAD therapy</span><div class ="key-names-tooltip">SH <br/>Met <br/>Glit <br/>DPP4 <br/>Acarb <br/></div><div class ="value-names-tooltip">' +
		d.SH + ' <br/>' + d.Met + ' <br/>' + d.Glit + '<br/>' + d.DPP4 + '<br/>' + d.Acarb + '<br/>' +
		'</div></div><div><span class="header-text-tooltip">Concomitant medication</span><div class ="key-names-tooltip">ACE <br/>Bbl <br/>BP Other <br/>Statin <br/>ASS <br/></div><div class ="value-names-tooltip">' +
		d.ACE + ' <br/>' + d.Bbl + ' <br/>' + d.RR_sonst + '<br/>' + d.Statin + '<br/>' + d.ASS + '<br/>' +
		'</div></div></div><div class="right-tooltip"><div><span class="header-text-tooltip">Laboratory</span><div class ="key-names-tooltip">Blood sugar [mg/dl] <br/>HbA1c[%] <br/>Cholesterol [mg/dl] <br/>Triglyceride [mg/dl] <br/>Creatinine [mg/dl] <br/>Protein in urine <br/></div><div class ="value-names-tooltip">' +
		d.NBZ + ' <br/>' + d.HbA1c + ' <br/>' + d.Chol + '<br/>' + d.TG + '<br/>' + d.Crea + '<br/>' + d.Protein_in_urine +
		'<br/></div></div><div><span class="header-text-tooltip">Insulin therapy</span><div class ="key-names-tooltip">VZI <br/>ALT <br/>Misch <br/></div><div class ="value-names-tooltip">' +
		d.VZI + '<br/>' + d.ALT + '<br/>' + d.Misch + '<br/>' +
		'</div></div><div><span class="header-text-tooltip">Organ Damages</span><div class ="key-names-tooltip">Retinopathy <br/>Stroke <br/>Coronary Heart D. <br/>PAOD <br/>Polyneuropathy <br/>Nephropathie <br/></div><div class ="value-names-tooltip">' +
		d.Retinopathie + ' <br/>' + d.Insult + ' <br/>' + d.KHK + '<br/>' + d.PAVK + '<br/>' + d.PNP + '<br/>' + d.Nephropathie +
		'<br/></div></div></div>';

	return html;
}

tooltipFunctions.appendLineChart = function(d) {
	chartProperties.lineChartGroup = svg.append("g").attr("id", "lineChartGroup");
	console.log("current data -->", d);
	var currentPatientId = d.ID;

	var thisPatientData = [];

	chartProperties.mainData.forEach(function(x) {
		if ((x.ID == d.ID) && (x[chartProperties.xAxisCurrentValue] != 0) && (x[chartProperties.yAxisCurrentValue] != 0)) {
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
		.attr("stroke-width", 1.5)
		.attr("d", line);

	// var dataForScatterPlot = [];
	// thisPatientData.forEach(function(x) {
	// 	if(x !== d){
	// 		dataForScatterPlot.push(x);
	// 	}
	// });
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
		.on("mouseout", tooltipFunctions.onMouseOut);;
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
	outerWidth: 900,
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


d3.csv("/data/TimeRiderDataFinal.csv", type, function(data) {
	// drawChart(data);
	chartProperties.mainData = data;
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
	console.log("beforeDrawingChart");

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

	console.log(chartProperties.nestedDataByDate);
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
	console.log(min_date, max_date);
	chartProperties.days = d3.timeDay.range(new Date(min_date), new Date(max_date));
	total_days = chartProperties.days.length;
	// console.log(chartProperties.days);
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
	// console.log(d3.event.target.value); // Display the default slider value
	var d = chartProperties.days[x];
	// console.log(d.toISOString().substring(0, 10));
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
	console.log("entered drawChart");
	console.log(chartProperties.xAxisCurrentValue);
	console.log(chartProperties.yAxisCurrentValue);
	chartProperties.data = data;
	console.log(chartProperties.data);

	ygridlinesGroup.transition().call(ygridlines);
	xgridlinesGroup.transition().call(xgridlines);

	var circles = svg.selectAll("circle")
		.data(chartProperties.data);
	// .filter(function(d){
	// 	return d[chartProperties.xAxisCurrentValue]!=0 && d[chartProperties.yAxisCurrentValue]!=0;
	// });

	circles.enter()
		.append("circle");
	// .attr("r", 5); // removed for filtering values with 0's

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
			if (d[chartProperties.xAxisCurrentValue] == 0 || d[chartProperties.yAxisCurrentValue] == 0) {
				return 0;
			}
			var size;
			if (marksControls.shapeOption != "none") {
				switch (marksControls.shapeOption) {
					case "smoker":
						if (d.Nikotin == "Yes") {
							return CONSTANTS.circleRadius.ZERO;
						}
						break;
					case "gender":
						if (d.Gender == "Male") {
							return CONSTANTS.circleRadius.ZERO;
						}
						break;
				}
			}
			if (marksControls.sizeOption != "none") {
				switch (marksControls.sizeOption) {
					case "smoker":
						if (d.Nikotin == "Yes") {
							size = CONSTANTS.circleRadius.LARGE;
						} else {
							size = CONSTANTS.circleRadius.SMALL;
						}
						break;
					case "gender":
						if (d.Gender == "Male") {
							size = CONSTANTS.circleRadius.SMALL;
						} else {
							size = CONSTANTS.circleRadius.LARGE;
						}
						break;
				}
				return size;
			} else {
				return CONSTANTS.circleRadius.MEDIUM;
			}

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
			return xScale(+d[chartProperties.xAxisCurrentValue] * 10) - 5;
		})
		.attr("y", function(d) {
			// console.log(+d[chartProperties.yAxisCurrentValue] * 50) - 5;
			return yScale(+d[chartProperties.yAxisCurrentValue] * 10) - 5;
		})
		.attr("height", function(d) {
			return marksFunctions.sizeOptions(d);
		})
		.attr("width", function(d) {
			return marksFunctions.sizeOptions(d);
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
	var color;
	if (marksControls.colorOption != "none") {
		switch (marksControls.colorOption) {
			case "smoker":
				if (d.Nikotin == "Yes") {
					color = CONSTANTS.colors.LIGHT_PINK
				} else {
					color = CONSTANTS.colors.LIGHT_GREEN
				}
				break;
			case "gender":
				if (d.Gender == "Male") {
					color = CONSTANTS.colors.LIGHT_PINK
				} else {
					color = CONSTANTS.colors.LIGHT_GREEN
				}
				break;
		}
		return color;
	} else {
		return CONSTANTS.colors.BLACK;
	}
}

marksFunctions.sizeOptions = function(d) {
	var size = CONSTANTS.squareSize.ZERO;
	if (marksControls.shapeOption != "none") {
		switch (marksControls.shapeOption) {
			case "smoker":
				if (d.Nikotin == "Yes") {
					size = CONSTANTS.squareSize.SMALL;
				}
				break;
			case "gender":
				if (d.Gender == "Female") {
					size = CONSTANTS.squareSize.SMALL;
				}
				break;
		}
	}

	if (size == CONSTANTS.squareSize.SMALL && marksControls.sizeOption != "none") {
		switch (marksControls.shapeOption) {
			case "smoker":
				if (d.Nikotin == "Yes") {
					size = CONSTANTS.squareSize.LARGE;
				}
				break;
			case "gender":
				if (d.Gender == "Female") {
					size = CONSTANTS.squareSize.LARGE;
				}
				break;
		}
	}

	return size;
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