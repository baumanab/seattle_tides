import urllib
# set up query paramaters
base_url = 'http://tidesandcurrents.noaa.gov/api/datagetter?'

query_args = {    
'begin_date':'20150821',
'end_date':'20160820',
'station':'9447130',
'product':'predictions',
'datum':'mllw',
'units':'english',
'time_zone':'lst_ldt',
'interval':'h',
'format':'json'
}

# encode arguments

encoded_args = urllib.urlencode(query_args)

# create query from base url and encoded arguments

noaa_query = base_url + encoded_args