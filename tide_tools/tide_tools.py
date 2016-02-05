

def query_builder(begin_dt, end_dt, base_url):

    """Function accepts: a base url (API endpoint), a beginning and end datetime string in the form 'YYYYMMDD mm:ss'
    which are <= 1 year apart. Function assembles a query parameters/arguments dict
    and returns an API query and the query dictionary (query_dict). Note that NOAA COOPS API default is 6 minutes
    and no interval need be specified in the dict. The relevant base URL is the COOPS endpoint
    'http://tidesandcurrents.noaa.gov/api/datagetter?'."""

    import urllib

    base_url = base_url

    # dict of NOAA query parameters/arguments

    query_dict = dict(begin_date=begin_dt, end_date=end_dt, station='9447130', product='predictions', datum='mllw',
                      units='english', time_zone='lst_ldt', format='json')

    # encode arguments

    encoded_args = urllib.urlencode(query_dict)

    # create and return query from base url and encoded arguments
    return [base_url + encoded_args, query_dict]


def dt_periodizer(query_dict):

    """Function accepts a dictionary of query parameters (query_dict)  containing end and start dt objects and an
    interval and calculates  the number of periods that should be returned if all  periods of the requested
    interval are populated with  data. Note that NOAA COOPS API default is 6 minutes  and no interval need be
    specified in the dict"""

    import datetime

    begin = datetime.datetime.strptime(query_dict['begin_date'].replace(" ", ""), '%Y%m%d%H:%M')
    end = datetime.datetime.strptime(query_dict['end_date'].replace(" ", ""), '%Y%m%d%H:%M')

    d = end - begin

    hours = (d.seconds/60/60) + (d.days * 24)

    periods = hours * 10  # 10 6 minute periods per hour

    return periods, begin, end


def get_COOPS_json(begin_dt, end_dt, base_url):

    """Function accepts: a base url (API endpoint), a beginning and end datetime string in the form 'YYYYMMDD mm:ss'
    which are <= 1 year apart, passing these to the query_builder function.
    Function returns the hourly prediction data as a PANDAS DataFrame Object where the returned time becomes the
    datetime index."""

    # import dependencies

    import pandas as pd
    import numpy as np
    from pandas.io.common import urlopen
    from pandas.io import json

    # construct the query

    query, query_dict = query_builder(begin_dt, end_dt, base_url)

    # execute query and read response

    with urlopen(query) as response:
        data = response.read()

        # convert json object to python dictionary and extract time and values for predictions

        data = json.loads(data)['predictions']

        # read into PANDAS DataFrame, then manipulate DataFrame object
        data = pd.DataFrame(data)
        data.columns = ['Date_Time', 'Level']
        data.index = data.Date_Time
        data.index = pd.to_datetime(data.index)
        data = data.drop('Date_Time', axis=1)

        # reindex to fill in any missing time values, this needs
        # work to initialize the range on the data/query vs. hardcoding as it
        # currently stands.

        periods, begin, end = dt_periodizer(query_dict)

        begin_string = begin.strftime('%Y-%m-%d %H:%M:%S')

        rng = pd.date_range(begin_string, periods=periods, freq='6min')

        # the actual reindex itself needs to be reworked for a better fill
        # a good start might be the median of the points directly above and
        # below the missing dt index. Since this is very few points typically
        # I am filling them with 100 for easy removal later. I would rather
        # remove the points than fill in a non-measured value.

        data  = data.reindex(rng, fill_value=100)

        # convert value from string to float
        data.Level = data.Level.astype(float)

        # adjust level to account for distance of Carkeek from NOAA
        # monitoring station (+ 5.5%)
        data.Level = np.round(data.Level + (.05 * data.Level), decimals=2)

        # add date column to dataframe for later use with weather data
        data['Date'] = data.index.date

        # add a column for hourly re-sample

        # data['Hour'] = data.index.hour
        # data['Time'] = data.index.time

        # return DataFrame object

        return data


def get_sunrise_sunset(date, lon= -122.3783, lat= 47.7128):

    """Function accepts a date string, and location float coordinates
    Function returns local, sunrise and sunset time
    datetime objects"""

    import ephem

    # Make an observer
    o = ephem.Observer()

    # PyEphem takes and returns only UTC times. 19:00 is Noon PDT, 20:00 is Noon PST
    # Using a string conversion and operation, which is probably slow
    # and could use optimization
    o.date = str(date) + ' 19:00'

    # Location of Carkeek Park
    o.lon = str(lon)  # Note that lon should be in string format
    o.lat = str(lat)  # Note that lat should be in string format

    # Elevation of the beach extending from Carkeek Park
    o.elev = 0

    sunrise=o.previous_rising(ephem.Sun())  # Sunrise
    sunset =o.next_setting(ephem.Sun())  # Sunset

    # convert sunrise and sunset to localtime (PDT/PST)
    local_sunrise = ephem.localtime(ephem.date(sunrise))
    local_sunset = ephem.localtime(ephem.date(sunset))

    return {'sunrise': local_sunrise, 'sunset': local_sunset}


def enough_light(df):

    """Function accepts a dataframe and
    returns a string, yes or no, where yes
    indicates there is at least 1 hour of daylight left"""

    if df['Delta_Sunrise'] >= -.5 and df['Delta_Sunset'] <= -1:
        return 'yes'
    else:
        return 'no'


def shift_ts(row):

    import pandas as pd

    '''Functions accepts a boolean row from a PANDAS DF,
    evaluates whether it is T or F and returns either
    the dt object or the 1 hour shifted dt object
    from a column representing the dt index'''

    if row.inbounds_ts == True:
        return row.temp_index + pd.Timedelta('1h')
    else:
        return row.temp_index


def enough_beach(row):
    """Function accepts a dataframe and
    returns a string, yes or no, where yes
    indicates there is at least 1 hour where
    the tide is <= 2 feet"""

    if row.shift_level <= 2 and row.Level <= 2:
        return 'yes'
    else:
        return 'no'


def go_stay(row):

    """Function accepts PANDAS DF row,
    evaluates the value of enough_light and enough_beach
    then returns a value of either wait or walk (stay
    at the park or travel to Golden Gardens)"""

    if row.enough_light == 'yes' and row.enough_beach == 'yes':
        return 'walk'
    else:
        return 'wait'


def shift_ts_6min(row, shift_string):

    """Functions accepts a boolean row from a PANDAS DF,
    and a time shift string (i.e. '1h', '1m')
    evaluates whether it is T or F and returns either
    the dt object or the time shifted dt object
    from a column represeting the dt index"""

    import pandas as pd

    if row.inbounds_6min_ts == True:
        return row.temp_index + pd.Timedelta(shift_string)
    else:
        return row.temp_index


def start_stop(row):

    """Function excepts a PANDAS DF row and determines
    the current condition (wait/stay or go), compares it
    to the condition at the next timedelta, and
    returns wait/stay, earliest start, walk/go, or latest start"""
    current_condition = row.go_stay
    next_condition = row.next_status

    if current_condition == next_condition:
        return current_condition
    elif current_condition != next_condition:
        if next_condition == 'walk':
            return 'earliest_start'
        else:
            return 'latest_start'


def shift_ts_neghour(row, shift_string):

    """Functions accepts a boolean row from a PANDAS DF,
    and a time shift string (i.e. '1h', '1m')
    evaluates whether it is T or F and returns either
    the dt object or the time shifted dt object
    from a column representing the dt index"""""

    import pandas as pd

    if row.inbounds_neghour_ts == True:
        return row.temp_index + pd.Timedelta(shift_string)
    else:
        return row.temp_index


# function to add value of complete hike

def complete_hike(row):

    """Function excepts a PANDAS DF row and determines
    the current condition of start_stop, compares it
    to the condition 1 hour previous, and
    returns either the current start_stop condition of
    complete_hike"""

    current_condition = row.start_stop
    prev_condition = row.prev_status

    if prev_condition == "latest_start":
        return "complete_hike"
    else:
        return current_condition
