// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
// slider.oninput = function() {
//     output.innerHTML = this.value;
// }

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


function getHtmlStringForToolTip(d) {
	var html = '<div class="heading-tooltip"><p>Date: <b>' + d.admission_date +
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
	data: []
};

// d3.json("/data/my_data.json", function(data) {
// 	chartProperties.data = data;
// });

d3.csv("/data/TimeRider-Data.csv", function(data) {
	drawChart(data);
});

chartProperties.width = chartProperties.outerWidth - chartProperties.margin.left - chartProperties.margin.right;
chartProperties.height = chartProperties.outerheight - chartProperties.margin.top - chartProperties.margin.bottom;


var svg = d3.select("#svg-div")
	.append("svg")
	.attr("width", chartProperties.width + chartProperties.margin.left + chartProperties.margin.right)
	.attr("height", chartProperties.height + chartProperties.margin.top + chartProperties.margin.bottom)
	.append("g")
	.attr("transform", "translate(" + chartProperties.margin.left + "," + chartProperties.margin.top + ")");

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

svg.append("g")
	.attr("transform", "translate(" + 0 + "," + chartProperties.height + ")")
	.call(xAxis);

svg.append("g")
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

svg.append("g")
	.attr("class", "grid")
	.call(ygridlines);

svg.append("g")
	.attr("class", "grid")
	.call(xgridlines);

//Tooltip
var tooltip = d3.select("body").append("div")
	.attr("class", "tooltip1")
	.attr("id", "tooltip1")
	.style("opacity", 0);
// .style("display", "none");


// Scatter points
function drawChart(data) {
	chartProperties.data = data;
	console.log(chartProperties.data);
	svg.selectAll("circle")
		.data(chartProperties.data)
		.enter()
		.append("circle")
		.attr("class", "dot")
		.attr("r", 5)
		.attr("cx", function(d) {
			// if(d.bmi == Nan){
			// 	d.bmi = 0;
			// }
			console.log(+d.bmi * 50);
			return xScale(+d.bmi * 10);
		})
		.attr("cy", function(d) {
			return yScale(+d.hba1c * 10);
		})
		// svg.append("circle")
		// .attr("r", 5)
		// .attr("cx", 700)
		// .attr("cy", 90)
		.on("mouseover", function(d) {
			// console.log(d);
			// console.log("mouseover");
			// tooltip.style("display", "inline");
			tooltip.html(getHtmlStringForToolTip(d))
				.style("left", (d3.event.pageX + 3) + "px")
				.style("top", (d3.event.pageY + 3) + "px")
				// .style("display", "inline")
				.transition()
				.duration(200) // ms
				.style("opacity", .9);
		})
		.on("mouseout", function() {
			// console.log("mouseout");
			// tooltip.style("display", "none")
			tooltip
				.transition()
				.duration(200) // ms
				.style("opacity", 0);
		});
}