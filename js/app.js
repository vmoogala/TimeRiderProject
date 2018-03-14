// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
// slider.oninput = function() {
//     output.innerHTML = this.value;
// }
function getHtmlStringForToolTip(d){
	var html = '<div class="heading-tooltip"><p>Date: <b>' + '2009-01-28' +
	'</b><br/><b>' + '10009: John Doe' +
	'</b>, ' + 'male' + 
	'<br/>Date of birth: ' + '1996-01-01' + 
	'</p></div><div class="left-tooltip"><div><span class="header-text-tooltip">Biometric data</span><div class ="key-names-tooltip"> Body Mass Index <br/>Size[cm] <br/>Weight[kg] <br/>BP syst. [mmHg] <br/>BP diast. [mmHg] <br/>Smoker <br/></div><div class ="value-names-tooltip">' + 
	'22.9' + ' <br/>' + '175'+' <br/>' + '70' + '<br/>' + '125' + '<br/>' + '80' + '<br/>' + 'X' + 
	'<br/></div></div><div><span class="header-text-tooltip">OAD therapy</span><div class ="key-names-tooltip">SH <br/>Met <br/>Glit <br/>DPP4 <br/>Acarb <br/></div><div class ="value-names-tooltip">' +  
	'22.9' + ' <br/>' + '175'+' <br/>' + '70' + '<br/>' + '125' + '<br/>' + '80' + '<br/>' + 
	'</div></div><div><span class="header-text-tooltip">Concomitant medication</span><div class ="key-names-tooltip">ACE <br/>Bbl <br/>BP Other <br/>Statin <br/>ASS <br/></div><div class ="value-names-tooltip">' + 
	'22.9' + ' <br/>' + '175'+' <br/>' + '70' + '<br/>' + '125' + '<br/>' + '80' + '<br/>' + 
	'</div></div></div><div class="right-tooltip"><div><span class="header-text-tooltip">Laboratory</span><div class ="key-names-tooltip">Blood sugar [mg/dl] <br/>HbA1c[%] <br/>Cholesterol [mg/dl] <br/>Triglyceride [mg/dl] <br/>Creatinine [mg/dl] <br/>Protein in urine <br/></div><div class ="value-names-tooltip">' + 
	'246' + ' <br/>' + '10'+' <br/>' + '163' + '<br/>' + '72' + '<br/>' + '0.8' + '<br/>' + '' + 
	'<br/></div></div><div><span class="header-text-tooltip">Insulin therapy</span><div class ="key-names-tooltip">VZI <br/>ALT <br/>Misch <br/></div><div class ="value-names-tooltip">' + 
	'' + '<br/>' + '' + '<br/>' + '' + '<br/>' + 
	'</div></div><div><span class="header-text-tooltip">Organ Damages</span><div class ="key-names-tooltip">Retinopathy <br/>Stroke <br/>Coronary Heart D. <br/>PAOD <br/>Polyneuropathy <br/>Nephropathie <br/></div><div class ="value-names-tooltip">' + 
	'22.9' + ' <br/>' + '175'+' <br/>' + '70' + '<br/>' + '125' + '<br/>' + '80' + '<br/>' + '80' + 
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

d3.json("/data/my_data.json", function(data) {
	chartProperties.data = data;
});

d3.csv("/data/TimeRider-Data.csv", function(data) {
	chartProperties.data = data;
	console.log(chartProperties.data);
});

console.log(chartProperties.data);
d3.select("#tooltip1").style("visibility", "hidden")


chartProperties.width = chartProperties.outerWidth - chartProperties.margin.left - chartProperties.margin.right;
chartProperties.height = chartProperties.outerheight - chartProperties.margin.top - chartProperties.margin.bottom;

// var data = [87, 34, 45, 67, 21, 94, 18];

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
// svg.selectAll("circle")
// 	.data(chartProperties.data)
// 	.enter()
// 	.append("circle")
// 	.attr("class", "dot")
// 	.attr("r", 5)
// 	.attr("cx", function(d) {
// 		console.log(+d.bmi);
// 		return xScale(+d.bmi);
// 	})
// 	.attr("cy", function(d) {
// 		return yScale(+d.hba1c);
// 	});
svg.append("circle")
	.attr("r", 5)
	.attr("cx", 700)
	.attr("cy", 90)
	.on("mouseover", mouseover)
	.on("mouseout", mouseout);

function mouseover(d) {
	console.log("mouseover");
	// tooltip.style("display", "inline");
	tooltip.html(getHtmlStringForToolTip("x"))
		.style("left", (d3.event.pageX + 3) + "px")
		.style("top", (d3.event.pageY + 3) + "px")
		.style("display", "inline")
		.transition()
		.duration(200) // ms
		.style("opacity", .9);

}

// function mousemove() {
// 	console.log("mousemove");
// 	// tooltip.text(d3.event.pageX + ", " + d3.event.pageY)
// 	// 	.style("left", (d3.event.pageX - 34) + "px")
// 	// 	.style("top", (d3.event.pageY - 12) + "px");
// }

function mouseout() {
	console.log("mouseout");
	// tooltip.style("display", "none")
	tooltip
	.transition()
	.duration(200) // ms
	.style("opacity", 0);;
}


// // Visual Encodings
// svg.selectAll("circles")
// 	.data(data)
// 	.enter()
// 	.append("circle")
// 	.attr("cx", function(d) {
// 		return scale(d);
// 	})
// 	.attr("cy", 100)
// 	.attr("r", 5)
// 	.attr("fill", "blue");