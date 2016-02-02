# coding: utf-8

import sys
import numpy as np
import pandas as pd

# set path to tools library and import

sys.path.append(r'tide_tools')
from tide_tools import tide_tools

# setup API endpoint

base_url = 'http://tidesandcurrents.noaa.gov/api/datagetter?'

# dict of NOAA query parameters/arguments

query_args = {
    'begin_date': '20150821 00:00',
    'end_date': '20160820 23:00',
    'station': '9447130',
    'product': 'predictions',
    'datum': 'mllw',
    'units': 'english',
    'time_zone': 'lst_ldt',
    'format': 'json'
}

# get and process 6 minute tide prediction data

df_sixmin = tide_tools.get_COOPS_json(query_args, base_url)


# lambda function to calculate sunrise and sunset times and populate df columns

df_sixmin['Sunrise_dt'] = df_sixmin.Date.apply(lambda x: tide_tools.get_sunrise_sunset(x)['sunrise'])
df_sixmin['Sunset_dt'] = df_sixmin.Date.apply(lambda x: tide_tools.get_sunrise_sunset(x)['sunset'])

# lambda functions to calculate time until sunrise and sunset for each dt object

df_sixmin['Delta_Sunrise'] = (df_sixmin.index - df_sixmin.Sunrise_dt)
df_sixmin['Delta_Sunset'] = (df_sixmin.index - df_sixmin.Sunset_dt)

# lambda functions to convert Timedelta to integer number of hours

df_sixmin.Delta_Sunset = df_sixmin.Delta_Sunset.apply(lambda x: x/np.timedelta64(1, 's')/3600)
df_sixmin.Delta_Sunrise = df_sixmin.Delta_Sunrise.apply(lambda x: x/np.timedelta64(1, 's')/3600)

# lambda function to determine if there is at least 1 hour of light left for a dt object

df_sixmin['enough_light'] = df_sixmin.apply(lambda x: tide_tools.enough_light(x), axis =1)

# create dt object shifted 1 hour forward from dt index

shift_ts = df_sixmin.index + pd.Timedelta('1h')

# shift_ts.isin(df_sixmin.index) is boolean to determine iif shifted value exists in the dt index
# several rows on the tail will have a shift_ts that is not in the index

# lambda function to determine if shifted_ts is in bounds or not

df_sixmin['inbounds_ts'] = df_sixmin.apply(lambda x: shift_ts.isin(x.index)).Level

# accessing the index for axis = 1 lambda functions can be a challenge
# this is being handled by creating a column that matches the dt object
# index values.

df_sixmin['temp_index'] = df_sixmin.index

# lambda function to create a column with index dt + Timdedelta('1h')

df_sixmin['shift_ts'] = df_sixmin.apply(lambda x: tide_tools.shift_ts(x), axis=1)

# lambda function to create a column with the tide level 1 hour from the dt index

df_sixmin['shift_level'] = df_sixmin[['Level', 'shift_ts']].apply(lambda x: df_sixmin.loc[x[1]], axis=1).Level

# select columns of interest

cols = ['Level', 'Delta_Sunset', 'Delta_Sunrise', 'enough_light', 'shift_level','Sunrise_dt', 'Sunset_dt']

df_sixmin = df_sixmin[cols]

# lambda function to determine if there is enough beach (tide <=2ft)
# at time 1 hour out from current row/dt index

df_sixmin['enough_beach'] = df_sixmin.apply(lambda x: tide_tools.enough_beach(x), axis=1)

# lambda function which populates DF column with the result
# of stay (stay at park) or go (enough light and beach to make hike)

df_sixmin['go_stay'] = df_sixmin.apply(lambda x: tide_tools.go_stay(x), axis=1)

# create dt object shifted 6 minutes forward from dt index

shift_6min_ts = df_sixmin.index + pd.Timedelta('6m')

# shift_6min_ts.isin(df_sixmin.index) is boolean to determine if shifted value exists in the dt index
# several rows on the tail will have a shift_6min_ts that is not in the index

# lambda function to determine if shifted_6min_ts is in bounds or not

df_sixmin['inbounds_6min_ts'] = df_sixmin.apply(lambda x: shift_6min_ts.isin(x.index)).Level

# accessing the index for axis = 1 lambda functions can be a challenge
# this is being handled by creating a column that matches the dt object
# index values.

df_sixmin['temp_index'] = df_sixmin.index

# lambda function to create a column with index dt + Timdedelta('6m')

df_sixmin['shift_6min_ts'] = df_sixmin.apply(lambda x: tide_tools.shift_ts_6min(x, '6m'), axis=1)

# lambda function to create a column with the go_stay status 6 minutes from the dt index

df_sixmin['next_status'] = df_sixmin[['go_stay','shift_6min_ts']].apply(lambda x: df_sixmin.loc[x[1]], axis=1).go_stay

# lambda function to populate the a start_stop DF column with the results
# of the start_stop function (returns wait/stay, stop, go, or start)

df_sixmin['start_stop'] = df_sixmin.apply(lambda x: tide_tools.start_stop(x), axis=1)

# df_sixmin[['go_stay','next_status','start_stop']]

# create dt object shifted 1 hour back from dt index

shift_neghour_ts = df_sixmin.index + pd.Timedelta('-1h')

# shift_neghour_ts.isin(df_sixmin.index) is boolean to determine if shifted value exists in the dt index
# several rows on the head will have a shift_6min_ts that is not in the index

# lambda function to determine if shifted_neghour_ts is in bounds or not

df_sixmin['inbounds_neghour_ts'] = df_sixmin.apply(lambda x: shift_neghour_ts.isin(x.index)).Level

# accessing the index for axis = 1 lambda functions can be a challenge
# this is being handled by creating a column that matches the dt object
# index values.

df_sixmin['temp_index'] = df_sixmin.index

# lambda function to create a column with index dt + Timdedelta('-1h')

df_sixmin['shift_neghour_ts'] = df_sixmin.apply(lambda x: tide_tools.shift_ts_neghour(x, '-1h'), axis=1)

# lambda function to create a column with the start_stop value 1 hour previous from the dt index

df_sixmin['prev_status'] = df_sixmin[['start_stop', 'shift_neghour_ts']].apply(lambda x: df_sixmin.loc[x[1]], axis=1).start_stop

# lambda function to populate the a start_stop DF column with the results
# of the start_stop function (returns wait/stay, stop, go, or start)

df_sixmin['start_stop'] = df_sixmin.apply(lambda x: tide_tools.complete_hike(x), axis=1)

# select columns of interest

cols = ['Level', 'Delta_Sunset', 'Delta_Sunrise', 'shift_level', 'start_stop', 'enough_light',
        'enough_beach', 'Sunrise_dt', 'Sunset_dt']

df_sixmin = df_sixmin[cols]

# Create datetime fields for downstream data visualization

df_sixmin['Month'] = df_sixmin.index.month
df_sixmin['Week'] = df_sixmin.index.week
df_sixmin['Date'] = df_sixmin.index.date
df_sixmin['Day'] = df_sixmin.index.dayofyear
df_sixmin['Time'] = df_sixmin.index.time
df_sixmin['DateTime'] = df_sixmin.index

# extract records with viable ("enough") time, light, and beach
# Will be used later to extract viable days and weeks

df_enough = df_sixmin[(df_sixmin.start_stop == 'earliest_start')]

# get good weeks (the entire week)

df_enough_weeks = df_sixmin[(df_sixmin.Week.isin(df_sixmin.Week.unique())) & (df_sixmin.Level < 100)]

# get good days (the entire day)

df_enough_days = df_sixmin[(df_sixmin.Date.isin(df_enough.Date.unique())) & (df_sixmin.Level < 100)]

# move this to a form that can be picked up by vis (d3.js, dimple.js) scripts

dimple_cols = ['Level', 'start_stop', 'Date', 'Time', 'DateTime', 'Day', 'Sunrise_dt', 'Sunset_dt']
df_dimple_days = df_enough_days[dimple_cols]
df_dimple_weeks = df_enough_weeks[dimple_cols]

# Strip microseconds from Sunrise_dt and Sunset_dt 
# .js code that will receive this data is set to parse for dt with precision at seconds
# use strftime to return a string with '%Y-%m-%d %H:%M:%S'

df_dimple_days.Sunrise_dt = df_dimple_days.Sunrise_dt.apply(lambda x: x.strftime('%Y-%m-%d %H:%M:%S'))
df_dimple_days.Sunset_dt = df_dimple_days.Sunset_dt.apply(lambda x: x.strftime('%Y-%m-%d %H:%M:%S'))

# Create a start stop DataFrame for later export and use in data visualization
df_dimple_startstop = df_dimple_weeks[(df_dimple_weeks.start_stop == 'earliest_start') | (df_dimple_weeks.start_stop == 'latest_start')]

# export TSV for pickup by .js

df_dimple_days.to_csv('data/tide_days.tsv', index=False, sep='\t')

