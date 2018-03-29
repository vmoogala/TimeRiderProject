var colors = {
	LIGHT_GREEN: "#006D2C",
	LIGHT_PINK: "#770174",
	BLACK: "#000000"
};

var circleRadius = {
	SMALL: "3px",
	MEDIUM: "5px",
	LARGE: "8px",
	ZERO: "0px"
}

var squareSize = {
	SMALL: "10px",
	LARGE: "16px",
	ZERO: "0px"
}


var timeLineSlider = d3.select("#timeLineSlider");
timeLineSlider.attr("min", 0)
	.attr("max", 100)
	.attr("value", 50)
	.attr("step", 10)
	.on("input", function() {
		console.log(d3.event.target.value); // Display the default slider value
		// document.getElementById("myRange").value = "0";
	});

var tempoSlider = document.getElementById("tempoSlider");

// Update the current slider value (each time you drag the slider handle)
tempoSlider.oninput = function() {
	console.log(tempoSlider.value); // Display the default slider value
}

function insertTimeLineAxis() {
	// Reference: https://bl.ocks.org/d3noob/0e276dc70bb9184727ee47d6dd06e915
	var svg = d3.select("#timeSvg")
		.append("svg")
		.attr("width", window.innerWidth / 2)
		.attr("height", 20);

	var x = d3.scaleTime().range([0, window.innerWidth / 2]);
	data = ["2015-01-01", "2015-02-02", "2015-03-03"];
	x.domain("2015-01-01", "2015-03-03");

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(50," + 0 + ")")
		.call(d3.axisBottom(x)
			.tickFormat(d3.timeFormat("%Y-%m-%d")))
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", ".15em")
		.attr("transform", "rotate(0)");
}


////////////////////////////////////////////////////////////////////
// mediaControls
////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////
// Zoom Controls
////////////////////////////////////////////////////////////////////
var zoomControls = {};

zoomControls.zoomClicked = function(zoomImg) {
	console.log("mediaClicked with id ->" + zoomImg.id);
	switch (zoomImg.id) {
		case "zoom-in-image":
			console.log("zoom-in-image");
			break;
		case "zoom-out-image":
			console.log("zoom-out-image");
			break;
	}
};

////////////////////////////////////////////////////////////////////
// Marks Controls
////////////////////////////////////////////////////////////////////
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


////////////////////////////////////////////////////////////////////
// Axis Controls
////////////////////////////////////////////////////////////////////
function yAxisOptionsChanged() {
	console.log("entered yAxisOptionsChanged");
	var value = $('#y-axis-options-select').val();
	console.log(value);
	chartProperties.yAxisCurrentValue = value;
	drawChart(chartProperties.data);
}

function xAxisOptionsChanged() {
	console.log("entered xAxisOptionsChanged");
	var value = $('#x-axis-options-select').val();
	console.log(value);
	chartProperties.xAxisCurrentValue = value;
	drawChart(chartProperties.data);
}


function changeThresholdValue() {
	// console.log("entered onblur");
	var x = document.getElementById("input-y-axis-upper-threshold");
	console.log(x.value);
	// console.log(d3.select('#input-y-axis-upper-threshold')[0].value);
}


function yAxisRangeChecked() {
	console.log("entered yAxisRangeChecked");
	var x = document.getElementById("y-axis-range-checkbox");
	if (x.checked) {
		console.log("show divs");
		showRangesForYaxis(0, 0);
	} else {
		console.log("hide divs");
	}
}


function showRangesForYaxis(minY, maxY) {
	console.log("entered showRangesForYaxis");
	var yAxisRangeBox = svg.append("g")
	yAxisRangeBox.append("rect")
		.attr("x", function() {
			return xScale(0);
		})
		.attr("y", function() {
			return yScale(maxY);
		})
		.attr("width", xScale(100))
		.attr("height", function() {
			return yScale(minY) - yScale(maxY);
		})
		.attr("class", "y-axis-range-box")
}


function showRangesForXaxis(minX, maxX) {
	console.log("entered showRangesForXaxis");
	var xAxisRangeBox = svg.append("g")
	xAxisRangeBox.append("rect")
		.attr("y", function() {
			return yScale(100);
		})
		.attr("x", function() {
			return xScale(minX);
		})
		.attr("height", yScale(0))
		.attr("width", function() {
			return xScale(maxX) - xScale(minX);
		})
		.attr("class", "x-axis-range-box")
}


////////////////////////////////////////////////////////////////////
// Tooltip code
////////////////////////////////////////////////////////////////////
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
		.duration(200) // ms
		.style("opacity", .9);
}

tooltipFunctions.onMouseOut = function() {
	console.log("mouseout");
	// tooltip.style("display", "none")
	tooltip
		.transition()
		.duration(200) // ms
		.style("opacity", 0);
}

tooltipFunctions.getHtmlStringForToolTip = function(d) {
	var html = '<div class="heading-tooltip"><p>Date: <b>' + d.visit_date +
		'</b><br/><b>' + d.patient_id + ': ' + d.patient_name +
		'</b>, ' + d.gender +
		'<br/>Date of birth: ' + d.date_of_birth +
		'</p></div><div class="left-tooltip"><div><span class="header-text-tooltip">Biometric data</span><div class ="key-names-tooltip"> Body Mass Index <br/>Size[cm] <br/>Weight[kg] <br/>BP syst. [mmHg] <br/>BP diast. [mmHg] <br/>Smoker <br/></div><div class ="value-names-tooltip">' +
		d.bmi + ' <br/>' + d.size + ' <br/>' + d.weight + '<br/>' + d.bp_syst + '<br/>' + d.bp_diast + '<br/>' + d.smoker +
		'<br/></div></div><div><span class="header-text-tooltip">OAD therapy</span><div class ="key-names-tooltip">SH <br/>Met <br/>Glit <br/>DPP4 <br/>Acarb <br/></div><div class ="value-names-tooltip">' +
		d.sh + ' <br/>' + d.met + ' <br/>' + d.glit + '<br/>' + d.dpp4 + '<br/>' + d.acarb + '<br/>' +
		'</div></div><div><span class="header-text-tooltip">Concomitant medication</span><div class ="key-names-tooltip">ACE <br/>Bbl <br/>BP Other <br/>Statin <br/>ASS <br/></div><div class ="value-names-tooltip">' +
		d.ace + ' <br/>' + d.bbl + ' <br/>' + d.bp_other + '<br/>' + d.statin + '<br/>' + d.ass + '<br/>' +
		'</div></div></div><div class="right-tooltip"><div><span class="header-text-tooltip">Laboratory</span><div class ="key-names-tooltip">Blood sugar [mg/dl] <br/>HbA1c[%] <br/>Cholesterol [mg/dl] <br/>Triglyceride [mg/dl] <br/>Creatinine [mg/dl] <br/>Protein in urine <br/></div><div class ="value-names-tooltip">' +
		d.blood_sugar + ' <br/>' + d.hba1c + ' <br/>' + d.cholesterol + '<br/>' + d.triglyceride + '<br/>' + d.creatinine + '<br/>' + d.protein_in_urine +
		'<br/></div></div><div><span class="header-text-tooltip">Insulin therapy</span><div class ="key-names-tooltip">VZI <br/>ALT <br/>Misch <br/></div><div class ="value-names-tooltip">' +
		d.vzi + '<br/>' + d.alt + '<br/>' + d.misch + '<br/>' +
		'</div></div><div><span class="header-text-tooltip">Organ Damages</span><div class ="key-names-tooltip">Retinopathy <br/>Stroke <br/>Coronary Heart D. <br/>PAOD <br/>Polyneuropathy <br/>Nephropathie <br/></div><div class ="value-names-tooltip">' +
		d.retinopathy + ' <br/>' + d.stroke + ' <br/>' + d.coronary_heart_d + '<br/>' + d.paod + '<br/>' + d.polyneuropathy + '<br/>' + d.nephropathie +
		'<br/></div></div></div>';
	return html;
}

/**
 **************************************************************************************
 **************************************************************************************
 *  Chart Code
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



// function xAxisValue(d, x){
// 	return d[x]
// }

// d3.json("/data/my_data.json", function(data) {
// 	chartProperties.data = data;
// });
insertTimeLineAxis();

d3.csv("/data/TimeRiderDataFinal.csv", type, function(data) {
	// drawChart(data);
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

// Scatter points
function drawChart(data) {
	console.log("entered drawChart");
	console.log(chartProperties.xAxisCurrentValue);
	console.log(chartProperties.yAxisCurrentValue);
	chartProperties.data = data;
	console.log(chartProperties.data);

	xScale.domain(d3.extent(data, function(d) {
		return d[chartProperties.xAxisCurrentValue];
	}));

	yScale.domain(d3.extent(data, function(d) {
		return d[chartProperties.yAxisCurrentValue];
	}).reverse());

	// Axis
	xAxisGroup.transition().call(xAxis);
	yAxisGroup.transition().call(yAxis);
	ygridlinesGroup.transition().call(ygridlines);
	xgridlinesGroup.transition().call(xgridlines);

	var circles = svg.selectAll("circle")
		.data(chartProperties.data);

	circles.enter()
		.append("circle")
		.attr("r", 5);

	circles.attr("class", "dot")
		.attr("cx", function(d) {
			console.log(+d[chartProperties.xAxisCurrentValue]);
			return xScale(+d[chartProperties.xAxisCurrentValue]);
		})
		.attr("cy", function(d) {
			console.log(+d[chartProperties.yAxisCurrentValue]);
			return yScale(+d[chartProperties.yAxisCurrentValue]);
		})
		.attr("r", function(d) {
			var size;
			if (marksControls.shapeOption != "none") {
				switch (marksControls.shapeOption) {
					case "smoker":
						if (d.smoker == "Yes") {
							return circleRadius.ZERO;
						}
						break;
					case "gender":
						if (d.gender == "Male") {
							return circleRadius.ZERO;
						}
						break;
				}
			}
			if (marksControls.sizeOption != "none") {
				switch (marksControls.sizeOption) {
					case "smoker":
						if (d.smoker == "Yes") {
							size = circleRadius.LARGE;
						} else {
							size = circleRadius.SMALL;
						}
						break;
					case "gender":
						if (d.gender == "Male") {
							size = circleRadius.SMALL;
						} else {
							size = circleRadius.LARGE;
						}
						break;
				}
				return size;
			} else {
				return circleRadius.MEDIUM;
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
		.attr("height", squareSize.ZERO)
		.attr("width", squareSize.ZERO);

	squares.attr("class", "dot")
		.attr("x", function(d) {
			console.log(+d[chartProperties.xAxisCurrentValue] * 50) - 5;
			return xScale(+d[chartProperties.xAxisCurrentValue] * 10) - 5;
		})
		.attr("y", function(d) {
			console.log(+d[chartProperties.yAxisCurrentValue] * 50) - 5;
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
var nestedDataByDate;

function beforeDrawingChart(data) {
	console.log("beforeDrawingChart");
	nestedDataByDate = d3.nest()
		.key(function(d) {
			// return d.visit_date;
			return d.admission_start_date;
		})
		.entries(data);
	console.log(nestedDataByDate[0].values);
	chartProperties.data = nestedDataByDate[0].values;
	// Date d = new Date(nestedDataByDate[0].key);
	drawChart(chartProperties.data);
};

var marksFunctions = {};

marksFunctions.fillOptions = function(d) {
	var color;
	if (marksControls.colorOption != "none") {
		switch (marksControls.colorOption) {
			case "smoker":
				if (d.smoker == "Yes") {
					color = colors.LIGHT_PINK
				} else {
					color = colors.LIGHT_GREEN
				}
				break;
			case "gender":
				if (d.gender == "Male") {
					color = colors.LIGHT_PINK
				} else {
					color = colors.LIGHT_GREEN
				}
				break;
		}
		return color;
	} else {
		return colors.BLACK;
	}
}

marksFunctions.sizeOptions = function(d) {
	var size = squareSize.ZERO;
	if (marksControls.shapeOption != "none") {
		switch (marksControls.shapeOption) {
			case "smoker":
				if (d.smoker == "Yes") {
					size = squareSize.SMALL;
				}
				break;
			case "gender":
				if (d.gender == "Female") {
					size = squareSize.SMALL;
				}
				break;
		}
	}

	if (size == squareSize.SMALL && marksControls.sizeOption != "none") {
		switch (marksControls.shapeOption) {
			case "smoker":
				if (d.smoker == "Yes") {
					size = squareSize.LARGE;
				}
				break;
			case "gender":
				if (d.gender == "Female") {
					size = squareSize.LARGE;
				}
				break;
		}
	}

	return size;
}