
// ridiculously large function to read in data and render charts
function draw_charts(val) {
		// read in data and transform Day and Level to numbers
		d3.tsv("data/tide_days.tsv", function (data) {	
		  data.forEach(function(d) {
			d.Day = +d.Day;
			d.Level = +d.Level;
		  });
		  
		  console.log(typeof data[0].Level);
		
		  // assign data to value of user form input
		  var date = val	
		
		  // convert user date input to day of year (0-366)	
		  var user_date = new moment(date);
		  var day_year = user_date.format('DDDD');
		  console.log(day_year);
		  
		  // Set the bounds for the charts
		  var row = 0,
			  col = 0,
			  top = 25,
			  left = 60,
			  inMarg = 40,
			  width = 500,
			  height = 240,
			  totalWidth = parseFloat(svg.attr("width"));
		
		  // get nearest n days of year
		  
		  // extract unique days into array, note that dimple changes
		  // the values back to strings
		  var unique_days = dimple.getUniqueValues(data, "Day");
		  console.log(unique_days);
		  
		  // filter for days >= user input as converted to day of year
		  // note that +d converts the string to a number 
		  var days_filter = unique_days.sort()
			.filter(function(d) {return +d >= day_year
			});
		  console.log(days_filter);
		  
		  // get n days of year from user input as converted to day of year
		  
		  n_days = 4;
		  
		  var the_days = days_filter.slice(0,n_days);
		  console.log(the_days);
		  
		  
		  // Draw a chart for each of the n dates
		  the_days.forEach(function (day) {
		  
			// Wrap to the row above
				if (left + ((col + 1) * (width + inMarg)) > totalWidth) {
				  row += 1;
				  col = 0;
				}
		  
		
			// Filter for a single day of year 
			data_day = dimple.filterData(data, "Day", day);
			
			// Use d3 to draw a text label for the day
			  svg
				.append("text")
					.attr("x", left + (col * (width + inMarg)) + (width / 1.8))
					.attr("y", top + (row * (height + inMarg)) + (height / 6) + n_days)
					.style("font-family", "sans-serif")
					.style("text-anchor", "middle")
					.style("font-size", "28px")
					.style("opacity", 0.2)
					.text(moment(data_day[0].Date).format('MMM-DD-YYYY')); //extract and format dates 
					
					
			// Filter single day data for start and hike completion attributes
			data_startstop = dimple.filterData(data_day,"start_stop",["earliest_start","latest_start","complete_hike"]);
			console.log(data_day[0].Time);
			console.log(data_startstop);

			data_latest_start = dimple.filterData(data_day,"start_stop","latest_start");
			console.log(data_latest_start);		
		  
		  
			// convert start times from string to datetime object
			// these values will ultimately be used to draw vertical lines
			// and to slice the single day data	  
			start_dt = data_startstop[0].DateTime;	  
			console.log(start_dt);
			// get the index
			var start_index = data_day.map(function(d) {return d.DateTime})
			  .indexOf(start_dt);
			console.log(start_index);
		  
			stop_dt = data_startstop[1].DateTime;	  
			console.log(stop_dt);	
			// get the index
			var stop_index = data_day.map(function(d) {return d.DateTime})
			  .indexOf(stop_dt);
			console.log(stop_index);

			complete_dt = data_startstop[2].DateTime;
			console.log(complete_dt);
			// get the index
			var complete_index = data_day.map(function(d) {return d.DateTime})
			  .indexOf(complete_dt);
			console.log(complete_index);	  
		  
		  
			// parse/format hike bounds strings to datetime objects	  
			var dt_parser = d3.time.format("%Y-%m-%d %H:%M:%S");
			var start_dt_parsed = dt_parser.parse(start_dt);
			var stop_dt_parsed = dt_parser.parse(stop_dt);
			console.log(start_dt_parsed);
			console.log(stop_dt_parsed);
		  
			// calculate latest hike completion time (1 hour from latest start)
			// this value is available in the data set extract as the third element
			// but I have decided to calculate it
			var extended = d3.time.hour.offset(stop_dt_parsed,1);
			console.log(extended);	  
		 
			// slice data bound by earliest start and 1 hour beyond latest start (complete hike), inclusive
			var bounds = data_day.slice(start_index,complete_index + 1);
			console.log(bounds);
		  
			// Create and Position a Chart
			var myChart = new dimple.chart(svg);
			myChart.setBounds(
				left + (col * (width + inMarg)),
				top + (row * (height + inMarg)),
				width,
				height);
			var x = myChart.addTimeAxis("x", "DateTime","%Y-%m-%d %H:%M:%S","%H:%M");
			var y = myChart.addMeasureAxis("y", "Level");
			
			y.title = "Tide Level"
			
		  
			// Draw a label for each hour
			x.timePeriod = d3.time.hours;
			x.timeInterval = 1;	  
		  

			// Add a thick line without markers
			var lines = myChart.addSeries(null, dimple.plot.line); 
			lines.lineWeight = 3;
			lines.lineMarkers = false;	  
		  
			// Link the date selected data
			lines.data = data_day;
		  
			// Add bubble for latest hike start time
			var bubble_startstop = myChart.addSeries("Latest_Start",dimple.plot.bubble);
		
		  
			// Link the start_stop selected data
		   bubble_startstop.data = data_latest_start;
		  
			// plot the earliest start and complete hike bound data as line
			var bounds_line = myChart.addSeries("Hike Window",dimple.plot.line);
			bounds_line.lineWeight = 3;
			bounds_line.lineMarkers = false;
		  
			
		  
			// link the bounds data to the bounds line series
			bounds_line.data = bounds;
			
			myChart.addLegend(-800, 0, 300, 100, "right");
			
			
			// colorblind palette mostly for my dad who is totally color blind
			myChart.defaultColors = [
			new dimple.color("#999999"),
			new dimple.color("#56B4E9"),
			new dimple.color("#D55E00"),
			new dimple.color("#0072B2"),
			new dimple.color("#000000")
			]; 
			
			
			
			"#999999", "#E69F00", "#56B4E9", "#009E73", "#F0E442", "#0072B2", "#D55E00", "#CC79A7"
		  
			// Draw the chart
			myChart.draw();
		  
			// draw vertical lines for start and hike completion values
			// using dt objects calculated above
		  
			svg.append("line")
			  .attr("id", "start_line")
			  .attr("class","marker_line")
			  .attr("x1", x._scale(start_dt_parsed)) // this line uses calculated dt values
			  .attr("x2", x._scale(start_dt_parsed)) // this line uses calculated dt values
			  .attr("y1", myChart._yPixels())
			  .attr("y2", myChart._yPixels() + myChart._heightPixels())
			  .style("stroke", "red")
			  .style("stroke-dasharray", "3");
		
		
			svg.append("line")
			  .attr("id", "complete_line")
			  .attr("class","marker_line")
			  .attr("x1", x._scale(extended)) // this line uses calculated dt values
			  .attr("x2", x._scale(extended)) // this line uses calculated dt values
			  .attr("y1", myChart._yPixels())
			  .attr("y2", myChart._yPixels() + myChart._heightPixels())
			  .style("stroke", "red")
			  .style("stroke-dasharray", "3");
			  
			  
			   // Once drawn we can access the shapes
		  
			  // If this is not in the last row remove the x text
			  if (row < 1) {
				 x.shapes.selectAll("text").remove();
				 x.titleShape.remove();
			  };
			  
			  // create a title on the first pass
			  if (row === 0 & col === 0) {
			  // create a title
			d3.select('p').append('h2').text('Carkeek to Golden Gardens Hike Time Window Next Viable ' + n_days + ' Days from ' +
			moment(val).format('MMM-DD-YYYY') )
			.attr("id", "custom-title")
			.attr("class","custom-title");
			}
			  
			  // Move to the next column
			  col += 1;

			  
			  
			
		  }, this);
		});
	};