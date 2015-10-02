# Data Visualization - Carkeek Park to Golden Gardens Low Tide Exposed Beach Hiking Windows

## Summary

This explanatory data visualization is in fulfilment of the requirements for Udacity's Data Analyst Nanodegree Project 6: "Make an Effective Data Visualization." The visualization is designed to help the user determine when to make the ~2 mile hike between two Seattle Parks, Carkeek and Golden Gardens, via beach exposed at low tide.  A chart is displayed for each of the next four viable days, from the selected day (initial visualization is the current day).The tide data in feet as a function of time (local) is represented by the solid line.  The viable hiking window is bracketed by two vertical lines and highlighted, with the circle representing the latest start time for a viable hike.  What are the criteria for a viable hike? I'm so glad you asked. They are 1 hour of daylight and 1 hour of exposed beach (tide level NGT 2 feet).

 You can learn more about this hike, here: [Seattle Metro Bus Hiking](https://sites.google.com/site/seattlemetrobushiking/main-page/in-city-hikes/carkeek-park-and-beach-walk-to-ballard).


 ## The Data

 Read more about the data that generated this visualization here: [ReadMe and Data](https://github.com/baumanab/seattle_tides/tree/master/data)
 The source data acqusition and subsequent wrangling is documented here: [Data Wrangling Notebook](https://github.com/baumanab/seattle_tides/blob/master/sandbox.ipynb)



## Design

### Sketches 
![Sketch 1](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/cal_index.png)

![Sketch 2](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/cal_tide.png)

![Sketch 3](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/index.png)

![Sketch 4](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/tide_time.png)

![Sketch 5](https://github.com/baumanab/seattle_tides/blob/master/httpd/img/tide_week.png)




### Line Chart


| visual encoding | variable |
-------------------|-----------------|
| distance x | hour of day |
| distance y | tide level |
| shape and color | latest start |
| shape and color? | viable hiking window |
| shape anc color | sunrise |
| shape and color | sunset |





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

9 reviwers were directed to the following site (seattalytics.com) and invited to give feedback.  6 reviewers responsed prior to project submission.  The comments are generally positive with all reviewers find the visualizatoin a useful planning tool for determining when to embark on the low tide hike.  All reviewers noticed that the viable hiking window span varied by time of year.  What was not apparent to reviwers was how the interplay between tide level and sunrise/sunset times (light dependent visibility) affected this window.  
While each reviwer enjoyed the interactive features, there were some browser specific difficulties with date entry in the HTML date form as well as some requests to increase clarity and to better understad the hiking window in the context off sunrise/sunset.  
One reviewer was selected, in part, because he is completely color blind.  I solicited not only his general review, but also inquired specifically if the encoding I used to draw focus (pre-attentive processing) to the hiking window, as well as other color choices were discernable to him.  He indicated that the colors and shades selected provided sufficient contrast for him to recognize the differences.  This same reviewer also pointed out that the visualization could not only server hikers, but also be useful for fisherman and gatherers (shells, clams, geoduck). Comments aggregated from all reviewers and associated actions are tabulated below.

6 reviewers

| comment/observation | # reviewers | action | notes
----------|---------|-------|----------|
| Add units to x axis | 4 | units added | my rookie mistake |
| Add time values to first row | 4 | time values added | previous state was just tick marks in first row |
| Difficulty determing format for date entry | 3 | added placeholder for date | IE & Firefox limitation |
| Add horizontal bar to determine 2 feet level | 1 | TBD| none |
| Tooltip took a few minutes to understand  | 2 | none planned | none |
| Change time format from 24 hour clock to period | 1 | none | difficulat to see AM/PM |
| Add graphics*, icons**, background colors*** | 3 | see footnote and discussion |  |
| gg | gg | gg | gg |
| gg | gg | gg | gg |
| gg | gg | gg | gg |
| gg | gg | gg | gg |
| gg | gg | gg | gg |
| gg | gg | gg | gg |
| gg | gg | gg | gg |
| gg | gg | gg | gg |

* graphics to indicate:
** icons to indicate:
*** background colors to indicate:


discuss how you resolved graphics and icons requests


..

