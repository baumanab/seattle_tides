//var expense = {"name":"jim","amount":34,"date":"11/12/2015"};

//var parser = d3.time.format("%m/%d/%Y");

//expense.date = parser.parse(expense.date);
//console.log(expense);

//var hourParser = d3.time.format("%I:%M%p");
//var time = hourParser.parse("10:34pm");
//var hour = d3.time.hour.round(time);
//console.log(hour);

//console.log(hourParser(hour));

var test = d3.tsv("data/tide_days.tsv", function(data) {test = data });
console.log(test[0]);


var data = [
  {"city":"seattle", "state":"WA", "population":652405, "land_area":83.9},
  {"city":"new york", "state":"NY", "population":8405837, "land_area":302.6},
  {"city":"boston", "state":"MA", "population":645966, "land_area":48.3},
  {"city":"kansas city", "state":"MO", "population":467007, "land_area":315}
];

//var bigCities = data.filter(function(d) { return d.population > 500000; })
  //.sort(function(a,b) { return a.population - b.population; })
  //.map(function(d) { return d.city; });
//console.log(bigCities);

var large_land = data.filter(function(d) { return d.land_area > 200; });
console.log(large_land);

console.log(large_land[0]);





