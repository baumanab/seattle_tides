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

9 reviewers were directed to my live project site (seattalytics.com) and invited to give feedback.  6 reviewers responsed prior to project submission, 2 residing in the Great Lakes Region, 2 in OR, and 2 in the Seattle area.  The comments are generally positive with all reviewers finding the visualizatoin a useful planning tool for determining when to embark on the low tide hike.  All reviewers noticed that the viable hiking window span varied by time of year or season.  What was not apparent to reveiwers was how the interplay between tide level and sunrise/sunset times (light dependent visibility) affected this window.  
While each reviewer enjoyed the interactive features (tooltip and date submission at the time of review), there were some browser specific difficulties with date entry in the HTML date form as well as some requests to increase clarity and to better understad the hiking window in the context of sunrise/sunset.  
One reviewer was selected, in part, because he is completely color blind.  I solicited not only his general review, but also inquired specifically if the encoding I used to draw focus (pre-attentive processing) to the hiking window, as well as other color choices were discernable to him.  He indicated that the colors and shades selected provided sufficient contrast for him to recognize the differences.  This same reviewer also pointed out that the visualization could not only serve hikers, but may also be useful for fisherman and gatherers (shells, clams, geoduck).  This particular comment is very insightful and highlights the importance of seeking diverse perspectives for data products.  Comments aggregated from all reviewers and associated actions are tabulated below.

Total Reviewers: 6

| comment/observation | # reviewers | action | notes
----------|---------|-------|----------|
| Add units to x axis | 4 | units added | my rookie mistake |
| Add time values to first row | 4 | time values added | previous state: tick marks only for first row |
| Difficulty determing format for date entry | 3 | added html placeholder for date format | IE & Firefox limitation |
| Tooltip took a few minutes to understand  | 2 | none planned | none |
| Change time format from 24 hour clock to period | 1 | none | difficult to see AM/PM |
| Add graphics\+, icons++, background colors+++ | 3 | see footnote and discussion |  |
| indicate water level threshold | 2 | add toggle feature for horizontal line @ 2' | none |
| indicate sunrise and sunset | 3 | add toggle feature for sunrise and sunset markers | none |
| Use more desriptive label than "All" for main series | 2 | Changed to Tide | none |

\+ graphics to indicate: low tide, high tide
++ icons to indicate: latest start (i.e. crosswalk signal), sunrise/sunset (i.e. sun/moon icons)
+++ background colors to indicate: Sunrise/Sunset or amount of light

Certain changes were implemented immediately (units, placeholder for date format, x-axis values, tide data label), others required further consideration.  After contemplation on how best to resolve icon requests as well as informatoin about sunrise/sunset, I decided to bucket the requests.  The first bucket are those requests which I choose not to take action on.  That is adding icons or background colors.  Fulfilling these feature requests would clutter the visualization and jeapordize the experience of color blind users.  The next bucket is somehow indicating the water level point of no return to make it really obvious that "here thar be dragons.".  The final bucket is helping users understand the role amount of light plays in the hike window using sunrise/sunset as a surrogate.  The requests are reasonable and I think would be useful, but I had reservations about simply adding indicators to the visualization as it may cause clutter and draw focus away from the hike window.  I decided to have the best of both worlds by adding buttons to toggle indicators on and off (? describe indicators here before final).
