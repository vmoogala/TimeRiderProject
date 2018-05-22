## TimeRiderProject

Project Demo available at: [https://web.cs.dal.ca/~moogala/Visualization/](https://web.cs.dal.ca/~moogala/Visualization/)

Installation Instructions:
Please run a local HTTP server in project location and navigate to index.html file

**Introduction**

Diabetes mellitus is a condition in which patients will face difficulties in managing their blood sugar levels. Patients suffering from this condition will visit the physicians regularly. Physicians face problems to understand the developments of patients over time due to the significant amount of data and the time span in which the data is spread across. This project solves this problem by using a visualization system to represent the data. The visualization uses animations along with scatter plots. This will help the physicians to observe the development of various parameters over a period of time.


**Visualization**

This section describes the functioning of the developed TimeRider[1] visualization, the
information about the dataset, the implementation details, interactions to the visualization, features of the visualization, the milestones and difficulties faced in developing the project.


**Dataset**

The Dataset used in this visualization comprises of data pertaining to 35 patients collected at a clinic over a span of 4 years. A specific data for a patient can vary from 6 weeks to 3 months. It contains data for every single visit of the patient. For every visit, there are 10 Quantitative variables (BMI, Blood Sugar, Size, Weight, etc.,) and 22 binary variables (Gender, Smoker or not, undergoing other treatments etc.,). The patient names are anonymized for privacy concerns.

**Visualization overview**

The TimeRider visualization is shown below in figure1. The main component of the visualization is the scatter plot which is shown in the center of the visualization. In the figure below, the scatter plot is plotted between HbA1c levels on the Y-axis to that of the BMI levels on the X-axis. This scatter plot corresponds to a single date (18th May 2008). The visualization is filtered by color shape and size which are shown on the left. All the patients who have visited in this time period are shown in the visualization.

![alt text](https://github.com/vmoogala/TimeRiderProject/blob/master/images/figure1.png "figure 1")
```
Figure 1: TimeRider Visualization showing the components in the visualization
```
The Other features of the visualization include the controls for the axes (X-axis controls are shown at the bottom right of the scatter plot and Y-axis controls are shown at the top left of the scatter plot). Filters are shown at the left window which contains filters based on shape, size, and color.
The other main part of the visualization is the timeline control shown at the bottom of the visualization. Other functionalities of the visualization include a tooltip which is displayed on hovering over a point on the scatter plot. A line chart will also be displayed on hovering over a point. The interactions to the visualization and components are discussed below.

**Technical Details**

The visualization is implemented using d3.js and HTML. Open Source Libraries Bootstrap[8] and
JQuery[9] are also used for developing the UI. Programming language Python is used to
preprocess the data for animation purpose. The data is present in a CSV file and parsed using
d3.csv() method and visualization is generated.

**Interactions and Features**

**Axis Controls**

Both the X-Axis and Y-axis have list boxes from which user can select an option for which the scatter plot is plotted. The hint grid lines will also be updated dynamically on the change in axes.

**Filters**

Filters are provided to classify the scatter points on the graph. The three filters are color shape
and size. All these filters can only be applied to binary data values (True or False data) such as
gender and smoking preferences. Figure1 shows filters being applied Smoker, Gender, and
Protein in Urine parameters.

![alt text](https://github.com/vmoogala/TimeRiderProject/blob/master/images/figure2.png "figure 2")
```
Figure 2: TimeRider Visualization showing the pop-up, opacity animation, linechart and the
range boxes
```

**Media Controls**

The Media controls are used to control the animation in the graph and are present at the bottom
of the visualization. Clicking on the “play” will start the graph to be updated for every day starting
from the minimum date to the maximum date in the data set. Clicking on “pause” will stop the
animation and displays the scatter plot for the day at which animation is stopped on the timeline.
In every frame of the playing, scatter plot for one day is being shown. Using the “forward” and
“rewind” buttons will increase/decrease the timeline by one day. “Fast forward” and “Fast
Rewind” will increase/decrease the timeline by 10 days. The user can also use the slider to
explore the data for the specific day. An indicator is shown on top of the slider to indicate the
current date for which the scatter plot is being shown. There is a slider on the left of media
controls that are used to control the tempo of the animation (By default 50 milliseconds is used
for displaying the rate at which data is being plotted).

**Range Boxes**

The range boxes are used to filter quantitative(numeric) values. The range boxes are used to
highlight the normal and risk ranges for a parameter represented on X or Y axes. Clicking the
“range” checkbox will draw the range box on the graph. If the user selects color risk ranges. There
are input boxes for the upper and lower thresholds for each axis. By default, predefined risk
values are populated in them. But modifying these details will modify the range boxes that is
being shown on the scatterplot. Figure 2 shows range boxes drawn for X-Axis and risk range boxes
for Y-Axis. These boxes will be helpful for physicians to identify patients whose values fall under
a certain level.

**Opacity for values and Animations**

For showing the transition between dates instead of jumping to a point, opacity is used to
represent data. i.e., if data is not present on a specific date, the value of the parameter is
predicted linearly based on the previous and next values at the date which has a value, and the
point is represented by using opacity which is calculated based on the distance between the
current date and the next date at which data is present. The transparency level of the point on
the scatter plot indicates the farther it is from a date which has a value. Eg: if BMI value is 1 on
1st January and the BMI value is next present on 7th January as 7, a point is shown on scatter
plot even on 2nd January with a value of 2 with opacity 2/7th of the full opacity.

This helps in clearly analyzing the data and predicting developments.

**Tooltips**

A tooltip is shown to the user when hovering over a scatter point on the plot. The tooltip contains details about all the parameters that are present on that date. If the point does not contain any data, data is predicted based on previous and next values and is shown (An indicator saying, “predicted data” is shown on the top for these). For Binary values (is a smoker or not) ‘X’ is shown if true else nothing is shown. If there is no data ‘?’ is shown. In figure2, the patient is a smoker, so ‘x’ is indicated for the smoker option and protein in urine is indicated with ‘?’ to indicate that data is not present.

**Line chart on hover**

A line chart is also shown on hovering over a point on scatter plot. The line chart shows the path
of all previous data of the patient and indicates points at which data is present. The tooltip is also
shown for every point on the line chart.

**Other Functions**

The visualization has other features which allow taking a screenshot of the visualization and the other is to reset the chart to its initial state. Screenshot functionality is implemented using the html2canvas library which converts the HTML page to a canvas and then canvas can be imported as an image. Reset functionality is performed simply by reloading the webpage.

**Issues faced**

In implementing this project, I have faced several issues. Significant issues encountered are discussed as follows. In Data preprocessing section, generating the data by calculating the previous and next available data was a challenge I faced. This was due to the “call by reference” method employed in JavaScript which I was not aware of. To overcome this issue, I rewrote the implementation using python which had copy.deepcopy() method which made the job easier.

Another issue I faced was to implement the filter by shape functionality in scatter plots. I have not been able to show null checking for filtering by shape. (For color and size, I indicate the scatter points using a different color or size when a specific data point does not match the filter). For shape, only two shapes are used (either a circle or a square) which will not be sufficient to represent non-matching data.

I could not get the data set initially which made me mock data at first. When I got access to the dataset at a later point from an URL provided in a jnlp application released by authors, I had to rewrite the code at some places to match the new dataset. This process consumed my time.

**Limitations**

Overlapping points are not been handled effectively by this visualization. Users will not be able
to differentiate points in a cluster when more data is present.

**Conclusions and Future Work**

To overcome the problem of overlapping of points, Authors have used zoom functionality in the visualization to differentiate the scatter points. This would be considered as the future work for this project. The future work also includes the addition of filters for the quantitative variables in the dataset.

This project shows an effective way to use animation in visualizations to explore the data which
is spread across a timeline. This project also shows how predicting data and displaying on the
visualization can help the users better analyze the data and understand the trend of
developments of factors over time.

