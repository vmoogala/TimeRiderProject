## TimeRiderProject

Project Demo available at: [https://web.cs.dal.ca/~moogala/Visualization/](https://web.cs.dal.ca/~moogala/Visualization/)

Installation Instructions:
Please run a local HTTP server in project location and navigate to index.html file

## Project Report Document

April 10 th, 2018

CSCI 6406 Visualization – Winter 2018

Vamshi Krishna Moogala

B00785801 (Vamshi@dal.ca)




**Base Paper:** Visually Exploring Multivariate Trends in Patient Cohorts Using Animated
Scatter Plots [1].

**Authors** : Alexander Rind, Wolfgang Aigner, Silvia Miksch, Sylvia Wiltner, Margit Pohl, Felix
Drexler MD, Barbara Neubauer, and Nikolaus Suchy

**1. Abstract**

Diabetes mellitus is a condition in which patients will face difficulties in managing their blood
sugar levels. Patients suffering from this condition will visit the physicians regularly. Physicians
face problems to understand the developments of patients over time due to the significant
amount of data and the time span in which the data is spread across. This project solves this
problem by using a visualization system to represent the data. The visualization uses animations
along with scatter plots. This will help the physicians to observe the development of various
parameters over a period of time.

**2. Introduction**

Understanding the patient data can help the physicians and medical personnel to better
understand the problem and also find any interesting factors that can affect the condition.
Visualization can be used to represent huge data in a meaningful way and help in analyzing the
data effectively, even for non-experts. Instead of just showing the development of measures over
time, being able to associate the development with various factors such as hobbies of the patient
or medication used during the time period and their relationship to the development of
conditions plays an important role. Using points in Scatter plots are effective in representing the
developments in a meaningful way. But for the diabetic patients, time is also an important
parameter that needs to be shown in visualization. Using a visualization to just show a value at
two points may not give a full picture, so animation can be used to show this increase/decrease
in values to have a better analysis. This project uses scatter plots and animations to represent
the diabetic patient data which spans over a significant time range.

With respect to widespread diabetic mellitus condition, the treatment of the patient is based on
several factors such as the type of diabetes and the previous experience of the patient. For every
patient visit, there will be around 30 parameters that can affect the condition and need to be
analyzed. If not treated properly, it may lead to severe conditions such as diabetic coma and


cardiovascular diseases. This visualization will help physicians in monitoring patient
developments and check whether the development of certain factors is linked with other factors.

The paper is organized into individual sections which follow. Section 3 discusses the related work,
Section 4 discusses the visualization system developed, Section 5 discusses the limitations of the
visualization and section 6 explains the conclusions and future work.

**3. Related Work**

Bartram [2] supports the use of animation in visualization and posits that animation is efficient,
easily interpretable, and can serve as an additional dimension which will help in visualizing large
multivariate datasets. She argues that animation is being underused and it's becoming easy with
time to technically implement animation in visualizations. The user studies conducted by
Nakakoji et al. [3] to understand the cognitive effect and the use of interactions in data
exploration using animations supported the conclusions of Bartram. Griffin et al.[4] in his study
found that using animation to help identify clusters in maps for map readers showed a positive
result for animation compared to that of using static small maps.

While the before mentioned studies support the use of animation, some studies show some
negative effects of using animations. One such effect is change blindness where users will not
notice the change that is occurred from a previous state. Tversky et al. [5] in his analysis, argues
that animation and graphics are helpful only when they are effectively designed so as to be
properly interpreted by the users. He argues that animations can be too fast to be meaningfully
interpreted by the users and cannot be helpful. He suggests that use of interactions such as
controls for the animation speed, starting, stopping the animation can be a good solution to solve
this problem and achieve good interception for users. Rosling [6] has applied animation to
scatterplots in his Gapminder Trendalyzer project. This was considered an important project in
this general area of visualization. Robertson et al. [7] compared the static visualizations using
traces of data in a single display compared to that of the traces being displayed in a single
visualization and indicated that animation can be complex for analysis compared to static traces.
The results of the study suggested that animation would be helpful for presenting the data to
users(non-experts).

From the above mentioned related work, We see that there are mixed views with respect to
using animations in visualizations and their effect.

**4. Visualization**

This section describes the functioning of the developed TimeRider[1] visualization, the
information about the dataset, the implementation details, interactions to the visualization,
features of the visualization, the milestones and difficulties faced in developing the project.


**4.1 Dataset**

The Dataset used in this visualization comprises of data pertaining to 35 patients collected at a
clinic over a span of 4 years. A specific data for a patient can vary from 6 weeks to 3 months. It
contains data for every single visit of the patient. For every visit, there are 10 Quantitative
variables (BMI, Blood Sugar, Size, Weight, etc.,) and 22 binary variables (Gender, Smoker or not,
undergoing other treatments etc.,). The patient names are anonymized for privacy concerns.

**4.2 Visualization overview**

The TimeRider visualization is shown below in figure1. The main component of the visualization
is the scatter plot which is shown in the center of the visualization. In the figure below, the
scatter plot is plotted between HbA1c levels on the Y-axis to that of the BMI levels on the X-
axis. This scatter plot corresponds to a single date (18th May 2008). The visualization is filtered
by color shape and size which are shown on the left. All the patients who have visited in this
time period are shown in the visualization.

![alt text](https://github.com/vmoogala/TimeRiderProject/blob/master/images/figure1.png "figure 1")
```
Figure 1: TimeRider Visualization showing the components in the visualization
```
The Other features of the visualization include the controls for the axes (X-axis controls are shown
at the bottom right of the scatter plot and Y-axis controls are shown at the top left of the scatter
plot). Filters are shown at the left window which contains filters based on shape, size, and color.
The other main part of the visualization is the timeline control shown at the bottom of the
visualization. Other functionalities of the visualization include a tooltip which is displayed on


hovering over a point on the scatter plot. A line chart will also be displayed on hovering over a
point. The interactions to the visualization and components are discussed below.

**4.3 Technical Details**

The visualization is implemented using d3.js and HTML. Open Source Libraries Bootstrap[8] and
JQuery[9] are also used for developing the UI. Programming language Python is used to
preprocess the data for animation purpose. The data is present in a CSV file and parsed using
d3.csv() method and visualization is generated.

**4.4 Interactions and Features**

**4.4.1 Axis Controls**

Both the X-Axis and Y-axis have list boxes from which user can select an option for which the
scatter plot is plotted. The hint grid lines will also be updated dynamically on the change in axes.

**4.4.2 Filters**

Filters are provided to classify the scatter points on the graph. The three filters are color shape
and size. All these filters can only be applied to binary data values (True or False data) such as
gender and smoking preferences. Figure1 shows filters being applied Smoker, Gender, and
Protein in Urine parameters.

![alt text](https://github.com/vmoogala/TimeRiderProject/blob/master/images/figure2.png "figure 2")
```
Figure 2: TimeRider Visualization showing the pop-up, opacity animation, linechart and the
range boxes
```

**4.4.3 Media Controls**

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

**4.4.4 Range Boxes**

The range boxes are used to filter quantitative(numeric) values. The range boxes are used to
highlight the normal and risk ranges for a parameter represented on X or Y axes. Clicking the
“range” checkbox will draw the range box on the graph. If the user selects color risk ranges. There
are input boxes for the upper and lower thresholds for each axis. By default, predefined risk
values are populated in them. But modifying these details will modify the range boxes that is
being shown on the scatterplot. Figure 2 shows range boxes drawn for X-Axis and risk range boxes
for Y-Axis. These boxes will be helpful for physicians to identify patients whose values fall under
a certain level.

**4.4.5 Opacity for values and Animations**

For showing the transition between dates instead of jumping to a point, opacity is used to
represent data. i.e., if data is not present on a specific date, the value of the parameter is
predicted linearly based on the previous and next values at the date which has a value, and the
point is represented by using opacity which is calculated based on the distance between the
current date and the next date at which data is present. The transparency level of the point on
the scatter plot indicates the farther it is from a date which has a value. Eg: if BMI value is 1 on
1st January and the BMI value is next present on 7th January as 7, a point is shown on scatter
plot even on 2nd January with a value of 2 with opacity 2/7th of the full opacity.

This helps in clearly analyzing the data and predicting developments.

**4.4.6 Tooltips**

A tooltip is shown to the user when hovering over a scatter point on the plot. The tooltip contains details about all the parameters that are present on that date. If the point does not contain any data, data is predicted based on previous and next values and is shown (An indicator saying, “predicted data” is shown on the top for these). For Binary values (is a smoker or not) ‘X’ is shown if true else nothing is shown. If there is no data ‘?’ is shown. In figure2, the patient is a smoker, so ‘x’ is indicated for the smoker option and protein in urine is indicated with ‘?’ to indicate that data is not present.

**4.4.7 Line chart on hover**

A line chart is also shown on hovering over a point on scatter plot. The line chart shows the path
of all previous data of the patient and indicates points at which data is present. The tooltip is also
shown for every point on the line chart.

**4.4.8 Other Functions**

The visualization has other features which allow taking a screenshot of the visualization and the other is to reset the chart to its initial state. Screenshot functionality is implemented using the html2canvas library which converts the HTML page to a canvas and then canvas can be imported as an image. Reset functionality is performed simply by reloading the webpage.

**4.5 Issues faced**

In implementing this project, I have faced several issues. Significant issues encountered are discussed as follows. In Data preprocessing section, generating the data by calculating the previous and next available data was a challenge I faced. This was due to the “call by reference” method employed in JavaScript which I was not aware of. To overcome this issue, I rewrote the implementation using python which had copy.deepcopy() method which made the job easier.

Another issue I faced was to implement the filter by shape functionality in scatter plots. I have not been able to show null checking for filtering by shape. (For color and size, I indicate the scatter points using a different color or size when a specific data point does not match the filter). For shape, only two shapes are used (either a circle or a square) which will not be sufficient to represent non-matching data.

I could not get the data set initially which made me mock data at first. When I got access to the dataset at a later point from an URL provided in a jnlp application released by authors, I had to rewrite the code at some places to match the new dataset. This process consumed my time.

**5. Limitations**

Overlapping points are not been handled effectively by this visualization. Users will not be able
to differentiate points in a cluster when more data is present.

**6. Conclusions and Future Work**

To overcome the problem of overlapping of points, Authors have used zoom functionality in the visualization to differentiate the scatter points. This would be considered as the future work for this project. The future work also includes the addition of filters for the quantitative variables in
the dataset.

This project shows an effective way to use animation in visualizations to explore the data which
is spread across a timeline. This project also shows how predicting data and displaying on the
visualization can help the users better analyze the data and understand the trend of
developments of factors over time.

**7. References:**

[1] Rind A. et al. (2011) Visually Exploring Multivariate Trends in Patient Cohorts Using
Animated Scatter Plots. In: Robertson M.M. (eds) Ergonomics and Health Aspects of Work
with Computers. EHAWC 2011. Lecture Notes in Computer Science, vol 6779. Springer,
Berlin, Heidelberg

[2] Bartram, L.: Perceptual and interpretative properties of motion for information visualization.
In: Proc. Workshop New Paradigms in Information Visualization and Manipulation. pp. 3-7.
ACM (1997)

[3] Nakakoji, K., Takashima, A., Yamamoto, Y.: Cognitive eects of animated visualization in exploratory visual data analysis. In: Proc. IEEE Conf. Information Visualization (IV). pp. 77- 84(2001)

[4] Griffin, A.L., MacEachren, A.M., Hardisty, F., Steiner, E., Li, B.: A comparison of animated with static small multiple maps for visually identifying space-time clusters. Annals of the
Association of American Geographers 96(4), 740-753 (2006).

[5] Tversky, B., Morrison, J.B., Betrancourt, M.: Animation: can it facilitate? Int. J. Human-Computer Studies 57, 247-262 (2002)

[6] Rosling, H.: Visual technology unveils the beauty of statistics and swaps policy from
dissemination to access. IAOS Statistical Journal 24(1{2), 103-104 (2007)

[7] Robertson, G., Fernandez, R., Fisher, D., Lee, B., Stasko, J.: Effectiveness of animation in trend visualization. IEEE Trans. Visualization and Computer Graphics 14(6), 1325-1332 (2008)

[8] Mark Otto, a. (2018). Bootstrap. [online] Getbootstrap.com. Available at:
https://getbootstrap.com/ [Accessed 11 Apr. 2018].

[9] jquery.org, j. (2018). jQuery. [online] Jquery.com. Available at: https://jquery.com/ [Accessed 11 Apr. 2018].

[10] Html2canvas.hertzen.com. (2018). html2canvas - Screenshots with JavaScript. [online]
Available at: https://html2canvas.hertzen.com/ [Accessed 11 Apr. 2018].
