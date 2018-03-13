d3.json("/data/my_data.json", function(data) {
  console.log(data);
});

d3.csv("/data/TimeRider-Data.csv", function(data) {
  console.log(data);
});

d3.select("#tooltip1").style("visibility", "hidden")


var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
// slider.oninput = function() {
//     output.innerHTML = this.value;
// }


var svg = d3.select("#svg-div")
    .append("svg")
    .attr("width", "900")
    .attr("height","500");
