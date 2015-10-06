# Data Visualization of the Viable Low Tide Exposed Beach Hiking Window Between Seattle's Carkeek and Golden Garden's Parks.

## Summary

This explanatory data visualization is in fulfilment of the requirements for Udacity's Data Analyst Nanodegree Project 6: "Make an Effective Data Visualization." The visualization shows the user viable windows to make the ~2 mile hike between Seattle's Carkeek and Golden Gardens parks, via beach exposed at low tide, as well as to understand how the viable hiking window is determined.  A chart is displayed for each of the next four viable days, from the selected day (initial visualization is the current day).  The tide data in feet relative to MLLW (Mean Lower Low Water) as a function of time (local) is represented by the solid grey line.  The viable hiking window is bracketed by two red vertical lines and highlighted in orange, with the blue circle representing the latest start time for a viable hike.  Interactive features consist of a tooltip (active when mousing over line plot) and 3 buttons which either show the tide cutoff (~ 2 feet relative to MLLW) as a blue line, sunrise/sunset by orange/grey lines, or both.

**View a live version of the visualization here:** [this](http://seattalytics.com)

## The Hike:

### Viable Hiking Window ##

**What are the criteria for a viable hike? I'm so glad you asked...** 

- 1 hour of daylight
- 1 hour of exposed beach (tide level NGT 2 feet).

 You can learn more about this hike, here: [Seattle Metro Bus Hiking](https://sites.google.com/site/seattlemetrobushiking/main-page/in-city-hikes/carkeek-park-and-beach-walk-to-ballard).


 ### The Data

 Read more about the data that generated this visualization here: [ReadMe and Data](https://github.com/baumanab/seattle_tides/tree/master/data)
 The source data acqusition and subsequent wrangling is documented here: [Data Wrangling Notebook](https://github.com/baumanab/seattle_tides/blob/master/sandbox.ipynb)

### The general data acquisition and processing steps are: ###

1. Query NOAA data (NOAA COOPS API) for the main Seattle station, returning tide level predictions (feet relative to MLLW) for 1 year, at 6 minute intervals, as a JSON (Javascript Object Notation) object.
2. Convert tide data to a PANDAS DataFrame (DF) and clean the data.
3. Transform tide levels to those at Carkeek park (main station level + 5.5%)
4. Calculate sunrise and sunset times at Carkeek park
5. Determine when hiking criteria are met (1 hour of daylight, 1 hour of exposed beach) as well as latest start time.
6. Export the data as a TSV (Tab Separated Values)



## Design and Narrative

While several representations of the data were considered, a line plot was the natural result of the decision to visualize the tide data as a function of time.  The narrative is primarily author driven with some viewer driven elements.

The sections below detail how I arrived at the current state of the visualization.   

### Sketches 

These sketches and markups are of amazing quality had they been created by a 3 year old, they are less impressive in consideration of my adulthood.  In any case, the first three sketches represent my initial thoughts prior to really digging into the data and visualization concept.  I simply wanted to find a way to help would-be hikers to know when a good general set of days would be to attempt the hike.  I thought about using an index imposed on a calendar or as function of time (aggregated by month).  This is fairly primitive so I consulted a Udacity Coach for guidance.

![Sketch 1](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/cal_index.png)

![Sketch 2](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/index.png)

![Sketch 3](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/cal_tide.png)

My discusson with a Udacity Coach was very helpful.  We talked about ideas, concepts, and how best a visualization might serve the user.  Several ideas were put forward to be considered as the source data was explored and transformed (only cursory data analysis had been done at this point).  The next two sketches represent the two main concepts we arrived at.  We both agreed that a useful visualization would be a plot of the tide as a function of time, creating a window of viable hiking, based on tide and light/dark status.  We decided that the continuity of the plot should be based on the data, that is whether to show the user a single day, a group of days, a week, a month, or even a seasonal period.  We also discussed adding an interactive elements where the next time period of visualization would be shown to the user through some mode of interaction (i.e. a button).


![Sketch 4](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/tide_time.png)

![Sketch 5](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/tide_week.png)


Upon acquiring and wrangling the data, I performed basic Exploratory Data Analysis (EDA) and found the for the time period I examined (Late August 2015 --> Late August 2016) the data broke down as follows:

* 155 viable days
* 9 months contained viable days
* 35 weeks contained viable days
* Many viable days are not contiguous

This informed my design in the following ways:

* The number of days is impractical to view all days in a single visualization
* While the data could be viewed by week, those with non-contiguous days will contain gaps or show days with no window

**One Viable Day**

![EDA 1: 1 viable day](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/single_day_EDA.png)

**Two Contiguous Viable Days**

![EDA 2: 2 contiguous viable days](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/two_contiguous_days_EDA.png)

**Two Non-Contiguous Viable Days**

![EDA 3: 2 non-contiguous viable days](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/two_noncontiguous_days_EDA.png)


This along with thinking about my own needs, as a user of this visualization led me to design a visualization which shows the next 4 viable days in a trellis, with the hiking window emphasized.  An interactive feature allows the user to input a date or select from a calendar drop down (browser dependent), to see the next 4 viable days from the selection.

Feedback from reviewers, as described in the Feedback section led the expansion of the viewer driven narrative through three additional interactive feature, a button that draws a horizontal line indicating the approximate tide level at which no hike attempt should be made, a button which shows sunrise/sunset, and a button which show both elements.  These function to better inform the user how the hike window limits are selected.


### Encoding ###

| variable/series | visual encoding(s) |
-------------------|-----------------|
| hour of day | distance x |
| tide level | distance y |
| latest start | shape, color, distance x, distance y |
| viable hiking window | color, distance x, distance y |
| sunrise/sunset time | shape, color, distance x |
| tide limit | shape, color, distance y | 


## Feedback

### Feedback from Version 1 ###

Version 1 lacked the tide limit and sunrise/sunset interactive features amongst other things (see table below).

Nine reviewers were directed to my live project site (seattalytics.com) and invited to give feedback.  Six reviewers responded prior to project submission, 2 residing in the Great Lakes Region, 2 in OR, and 2 in the Seattle area.  The comments are generally positive with all reviewers finding the visualization a useful planning tool for determining when to embark on the low tide hike.  All reviewers noticed that the viable hiking window span varied by time of year or season.  What was not apparent to reviewers was the impact sunrise and sunset times (light dependent visibility) have on the window.  While each reviewer enjoyed the interactive features (tool-tip and date submission at the time of review), there were some browser specific difficulties with date entry.  

One reviewer was selected, in part, because he is completely color blind.  I solicited not only his general review, but also inquired specifically if the encoding I used to draw focus (pre-attentive processing) to the hiking window, as well as other color choices were discernible to him.  He indicated that the colors and shades selected provided sufficient contrast for him to recognize the differences.  This same reviewer also pointed out that the visualization could not only serve hikers, but may also be useful for fisherman, gatherers (shells, clams, [geoduck](https://en.wikipedia.org/wiki/Geoduck)), and tidal pool enthusiasts.  This particular comment is very insightful and highlights the importance of seeking diverse perspectives for data product feedback.  Comments aggregated from all reviewers and associated actions are tabulated below.

Total Reviewers: 6

| Comment/Observation | # Reviewers | Action | Notes
----------|---------|-------|----------|
| Add units to x axis | 4 | units added | my rookie mistake |
| Add time values to first row | 4 | time values added | previous state: tick marks only for first row |
| Difficulty determing format for date entry | 3 | added html placeholder for date format | IE & Firefox limitation |
| Tooltip took a few minutes to understand  | 2 | none planned | none |
| Change time format from 24 hour clock to period | 1 | none | difficult to see AM/PM |
| Add graphics\+, icons++, background colors+++ | 3 | see footnote and discussion | none |
| indicate water level threshold | 2 | add toggle feature for horizontal line @ ~ 2' | none |
| indicate sunrise and sunset | 3 | add toggle feature for sunrise and sunset markers | none |
| Use more descriptive label than "All" for main series | 2 | Changed to Tide | none |

\+ graphics to indicate: low tide, high tide

++ icons to indicate: latest start (i.e. crosswalk signal), sunrise/sunset (i.e. sun/moon icons)

+++ background colors to indicate: Sunrise/Sunset or amount of light

Certain changes were implemented immediately (units, placeholder for date format, x-axis values, tide data label), others required further consideration.  After contemplation on how best to resolve icon requests as well as information about sunrise/sunset, I decided to bucket the requests.  The first bucket are those requests which I chose not take action on, but did address with reviewers. That is adding icons or background colors.  Fulfilling these feature requests would clutter the visualization and jeopardize the experience of color blind users, without adding significant value the visualization.  The next bucket is somehow indicating the water level point of no return to make it really obvious that ["Here thar be dragons"](https://en.wikipedia.org/wiki/Here_be_dragons).  The final bucket is helping users understand the role amount of light plays in the hike window using sunrise/sunset as a surrogate.  The last two request buckets are reasonable and would add value, but I had reservations about simply adding indicators to the visualization as it may cause clutter and draw focus away from the hike window.  I decided to have the best of both worlds by adding buttons to toggle indicators on/off (? describe indicators here before final).

### Post Modification Reviews and Feedback

Three reviewers were approached for additional feedback after modification and were satisfied with the changes. 

One of these reviewers is color-blind and I solicted his input to determine if the modifications had impacted the quality of his experience with the visualization.  He indicated that:

> All of the colors and buttons are easily understood and color separation/overlap show up very well for a color blind guy. The date format addition is very helpful too.

**Regarding questions about the buttons:**

> 1.   The buttons speak for themselves and I like the choices that you have given. even when using all of the options the graph is not busy or confusing. 
> 2.   I can easily discern all of the elements of the new lines and the original plot elements. 

## Resources

- [PANDAS](http://pandas.pydata.org/)
- [Stack overflow](http://stackoverflow.com/questions/tagged/javascript)
- [Moment.js](http://momentjs.com/)
- [Aligned Left](http://alignedleft.com/)
- Charlie Turner (Udacity Coach)
- [D3.js](http://d3js.org/)
- [Learn JS Data](http://learnjsdata.com/)
- [D3 tips and tricks](http://www.d3noob.org/)
- [Dimple.js](http://dimplejs.org/)
- [Udacity Forums](https://discussions.udacity.com/users/ctrlaltdel/activity)
- Carl Ward (Udacity Coach)
- [W3 Schools](http://w3schools.com)
- [NOAA COOPS API](https://tidesandcurrents.noaa.gov/api/)
- [Coderunner Moment Example](http://code.runnable.com/Um0fYqDLgQlNAAXE/use-moment-js-to-format-time)
- [Udacity's Data Visualization with D3.js](https://www.udacity.com/course/data-visualization-and-d3js--ud507)
- [Udacity's Intro to HTML and CSS](https://www.udacity.com/course/intro-to-html-and-css--ud304)
- [Udacity's Javascript Basics](https://www.udacity.com/course/javascript-basics--ud804-nd)

## Future Work ##

**This project is still ongoing and the to-do list includes:**

- Refactor JS, particularly breaking the charting function into pieces
- Refactor and repackage python code for server execution. The sandbox code is in the order I took to solve particular data processing challenges and should be reorganized and aggregated for efficiency and readability.
- Extend the exploratory data analysis (EDA) using R to summarize and visually explore the data, with particular focus on distribution of viable days.
- Add a color code to the drop down calendar indicating viable days, to help the user select a start day.
- Increase the precision of the tide level tool tip to 1 floating decimal
- Set up the query and data processing on this server to update the data each week.
- Apply a responsive web framework (bootstrap or flexbox) and re-style this site.
- Re-work the chart svg and draw function for responsiveness.

## Disclaimer, Assumptions, and Caveats ##

- Daylight estimated as 30 minutes from sunrise to sunset
- Sufficient exposed beach: tide level NGT 2ft
- Weather and wave conditions were not considered
- Distance of hike is ~ 2 miles
- Time to make the hike estimated at ~ 1 hour based on distance and the length of time it takes an average adult to walk a mile (15 minutes) + time to smell the roses, or geoducks as the case may be.
- Use this data at your own risk, the results and assumptions need testing. I plan to test them personally on nice, sunny days :)
- Start times were calculated as 6 minutes until the tide level relative to MLLW is NGT 2 feet, so, the water level may be predicted to be slightly higher than 2 feet at start.