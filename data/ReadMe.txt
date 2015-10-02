Thanks for your interst in my data.  This data was wrangled from a NOAA COOPS API query.  An iPython notebook detailing the data wrangling can be found here:  https://github.com/baumanab/seattle_tides/blob/master/sandbox.ipynb

The primary libraries used for acquiring and wrangling the data were urlib, urlib2, and PANDAS



Fields: All fields were exported to the .tsv as strings.  Each row represents a 6 minute time interval for a viable hiking day (a day in which the tide is NGT ~ 2 feet ~ between sunrise and sunset)

Level:  Water level in feet relative to MLLW (mean low level water)
start_stop: values indicating hike window [wait, walk, earliest_start, latest_start]
Date: The date 'YY-mm-dd'
Time: The time 'H:M:S'
DateTime: Full DateTime 
Day: integer day of year (1-365)
Sunrise_dt: The DateTime of Sunrise for a given day
Sunset_dt:  The DateTime of Sunset for a given day




