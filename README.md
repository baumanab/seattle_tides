# Data Visualization - Carkeek Park to Golden Gardens Low Tide Exposed Beach Hiking Windows

## Summary

This explanatory data visualization is in fulfilment of the requirements for Udacity's Data Analyst Nanodegree Project 6: "Make an Effective Data Visualization." The visualization is designed to help the user determine when to make the ~2 mile hike between two Seattle Parks, Carkeek and Golden Gardens, via beach exposed at low tide.  A chart is displayed for each of the next four viable days, from the selected day (initial visualization is the current day).The tide data in feet as a function of time (local) is represented by the solid line.  The viable hiking window is bracketed by two vertical lines and highlighted, with the circle representing the latest start time for a viable hike.  What are the criteria for a viable hike? I'm so glad you asked. They are 1 hour of daylight and 1 hour of exposed beach (tide level NGT 2 feet).

 You can learn more about this hike, here: [Seattle Metro Bus Hiking](https://sites.google.com/site/seattlemetrobushiking/main-page/in-city-hikes/carkeek-park-and-beach-walk-to-ballard).


 ### The Data

 Read more about the data that generated this visualization here: [ReadMe and Data](https://github.com/baumanab/seattle_tides/tree/master/data)
 The source data acqusition and subsequent wrangling is documented here: [Data Wrangling Notebook](https://github.com/baumanab/seattle_tides/blob/master/sandbox.ipynb)



## Design

### Sketches 

These sketches and markups are of amazing quality had they been created by a 3 year old, they are less impressive in consideration of my adulthood.  In any case, the first three sketches represent my initial thoughts prior to really digging into the data and visualization concept.  I simply wanted to find a way to help would-be hikers to know when a good general set of days would be to attempt the hike.  I thought about using an index imposed on a calendar or as function of time (aggregted by month).  This is fairly primitive so I consulted a Udacity Coach for guidance.

![Sketch 1](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/cal_index.png)

![Sketch 2](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/index.png)

![Sketch 3](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/cal_tide.png)

My discusson with a Udacity Coach was very helpful.  We talked about ideas, concepts, and how best a visualization might serve the user.  Several ideas were put forward to be considred as the source data was explored and transformed (only cursory data analysis had been done at this point).  The next two sketches represent the two main concepts we arrived at.  We both agreed that a useful visualization would be to plot the tide as a function of time, creating a window of viable hiking, based on tide and light/dark status.  We decided that the continuity of the plot should be based on the data, that is whether to show the user a single day, a group of days, a week, a month, or even a seasonal period.  We also discussed adding an interactive elements where the next time period of visualization would be shown to the user through some mode of interaction (i.e. a button).


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

*** One Viable Day **

![EDA 1: 1 viable day](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/single_day_EDA.png)

** Two Contiguous Viable Days **

![EDA 2: 2 contiguous viable days](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/two_contiguous_days_EDA.png)

** Two Non-Contiguous Viable Days **

![EDA 3: 2 non-contiguous viable days](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/two_noncontiguous_days_EDA.png)



This along with thinking about my own needs, as a user of this visualziation led me to design a visualiation with shows the next 4 viable days in a trellis, with the hiking window emphasized.  An interactive feature allows the user to input a date or select from a calendar drop down (browser dependent), to see the next 4 viable days from the selection.

Feedback from reviwers, as described in the Feedback section led to the addition of a 3rd and 4th interactive feature, a button that draws a horizontal line indicating the tide level at which no hike attempt should be made, and a button shows sunset/sunshine to help inform the user how the hike window limits where chosen.






### Line Chart


| visual encoding | variable/series |
-------------------|-----------------|
| distance x | hour of day |
| distance y | tide level |
| shape and color | latest start |
| shape and color? | viable hiking window |
| shape and color | sunrise/sunset time |





gg:

> gg



### Layout and Narrative

#### Sketch
![Sketch]()

*gg*

#### Version 1


*gg* **gg** *gg.*


### gg

## Feedback

9 reviewers were directed to my live project site (seattalytics.com) and invited to give feedback.  6 reviewers responsed prior to project submission, 2 residing in the Great Lakes Region, 2 in OR, and 2 in the Seattle area.  The comments are generally positive with all reviewers finding the visualizatoin a useful planning tool for determining when to embark on the low tide hike.  All reviewers noticed that the viable hiking window span varied by time of year or season.  What was not apparent to reveiwers was the impact sunrise and sunset times (light dependent visibility) have on the window.  While each reviewer enjoyed the interactive features (tooltip and date submission at the time of review), there were some browser specific difficulties with date entry.  

One reviewer was selected, in part, because he is completely color blind.  I solicited not only his general review, but also inquired specifically if the encoding I used to draw focus (pre-attentive processing) to the hiking window, as well as other color choices were discernable to him.  He indicated that the colors and shades selected provided sufficient contrast for him to recognize the differences.  This same reviewer also pointed out that the visualization could not only serve hikers, but may also be useful for fisherman, gatherers (shells, clams, geoduck), and tidel pool enthusiasts.  This particular comment is very insightful and highlights the importance of seeking diverse perspectives for data product feedback.  Comments aggregated from all reviewers and associated actions are tabulated below.

Total Reviewers: 6

| Comment/Observation | # Reviewers | Action | Notes
----------|---------|-------|----------|
| Add units to x axis | 4 | units added | my rookie mistake |
| Add time values to first row | 4 | time values added | previous state: tick marks only for first row |
| Difficulty determing format for date entry | 3 | added html placeholder for date format | IE & Firefox limitation |
| Tooltip took a few minutes to understand  | 2 | none planned | none |
| Change time format from 24 hour clock to period | 1 | none | difficult to see AM/PM |
| Add graphics\+, icons++, background colors+++ | 3 | see footnote and discussion |  |
| indicate water level threshold | 2 | add toggle feature for horizontal line @ 2' | none |
| indicate sunrise and sunset | 3 | add toggle feature for sunrise and sunset markers | none |
| Use more descriptive label than "All" for main series | 2 | Changed to Tide | none |

\+ graphics to indicate: low tide, high tide

++ icons to indicate: latest start (i.e. crosswalk signal), sunrise/sunset (i.e. sun/moon icons)

+++ background colors to indicate: Sunrise/Sunset or amount of light

Certain changes were implemented immediately (units, placeholder for date format, x-axis values, tide data label), others required further consideration.  After contemplation on how best to resolve icon requests as well as information about sunrise/sunset, I decided to bucket the requests.  The first bucket are those requests which I chose not take action on, but did address with reviewers. That is adding icons or background colors.  Fulfilling these feature requests would clutter the visualization and jeapordize the experience of color blind users, without adding significant value the visualization.  The next bucket is somehow indicating the water level point of no return to make it really obvious that "here thar be dragons.".  The final bucket is helping users understand the role amount of light plays in the hike window using sunrise/sunset as a surrogate.  The last two request buckets are reasonable and would add value, but I had reservations about simply adding indicators to the visualization as it may cause clutter and draw focus away from the hike window.  I decided to have the best of both worlds by adding buttons to toggle indicators on/off (? describe indicators here before final).

## Resources
