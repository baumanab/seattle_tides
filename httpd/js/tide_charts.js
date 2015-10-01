

//event listener called on submit from form
function handleClick(event){
                d3.selectAll("svg > *").remove(); // remove previous chart
                //console.log(document.getElementById("myVal").value)
                draw_charts(document.getElementById("myVal").value)
                return false;
            }	



function draw_charts(val) {
		// function draw charts reads in tide data and returns
		//charts = n_dates of viable hike days from val 
		//where val may be input by user through html form submission
		
		// read in data and transform Day and Level to numbers
		d3.tsv("data/tide_days2.tsv", function (data) {	
		  data.forEach(function(d) {
			d.Day = +d.Day;
			d.Level = +d.Level;
		  });
		  
		  //console.log(typeof data[0].Level);
		
		  // convert val date string to moment object
		  var user_date = moment(val);	
		  //console.log(user_date);
		
		 
		  
		  // Set the bounds for the charts
		  var row = 0,
			  col = 0,
			  top = 25,
			  left = 60,
			  inMarg = 40,
			  width = 500,
			  height = 240,
			  totalWidth = parseFloat(svg.attr("width"));
		
		  // get nearest viable date to val
		  
		  // extract unique date strings into array and convert to moment objects
		  var unique_dates = dimple.getUniqueValues(data, "Date")
		    .map(function(d) {return moment(d,"YYYY-MM-DD")
			});
		  //console.log(unique_dates);
		  
		  
		  // filter for dates >= val
		  var dates_filter = unique_dates.filter(function(d) {return moment(d,"YYYY-MM-DD") >= user_date
			                 });
		  //console.log(typeof dates_filter[0]);
		  //console.log(dates_filter.slice(0,10));
		  
		  
		  // get n dates of year from val		  
		  n_dates = 4;
		  
		  //slice the nearest n_dates to val from dates >= to val
		  var the_dates = dates_filter.slice(0,n_dates);
		  //console.log(the_dates);
		  
		  
		  // Draw a chart for each of the n dates
		  the_dates.forEach(function (date) {
		  
			// Wrap to the row above
				if (left + ((col + 1) * (width + inMarg)) > totalWidth) {
				  row += 1;
				  col = 0;
				}
		  
		
			// Filter for a single date 
			data_date = dimple.filterData(data, "Date", date._i);
			//console.log(data_date[0]);
			
			// Use d3 to draw a text label for the date
			  svg
				.append("text")
					.attr("x", left + (col * (width + inMarg)) + (width / 2.1))
					.attr("y", top + (row * (height + inMarg)) + (height / 6) + n_dates)
					.style("font-family", "sans-serif")
					.style("text-anchor", "middle")
					.style("font-size", "28px")
					.style("opacity", 0.3)
					.text(moment(data_date[0].Date).format('MMM-DD-YYYY')); //extract and format dates 
					
					
			// Filter single date data for start and hike completion attributes
			data_startstop = dimple.filterData(data_date,"start_stop",["earliest_start","latest_start","complete_hike"]);
			//console.log(data_date[0].Time);
			//console.log(data_startstop);

			data_latest_start = dimple.filterData(data_date,"start_stop","latest_start");
			//console.log(data_latest_start);		
		  
		  
			// convert start times from string to datetime object
			// these values will ultimately be used to draw vertical lines
			// and to slice the single date data	  
			start_dt = data_startstop[0].DateTime;	  
			//console.log(start_dt);
			// get the index
			var start_index = data_date.map(function(d) {return d.DateTime})
			  .indexOf(start_dt);
			//console.log(start_index);
		  
			stop_dt = data_startstop[1].DateTime;	  
			//console.log(stop_dt);	
			// get the index
			var stop_index = data_date.map(function(d) {return d.DateTime})
			  .indexOf(stop_dt);
			//console.log(stop_index);

			complete_dt = data_startstop[2].DateTime;
			//console.log(complete_dt);
			// get the index
			var complete_index = data_date.map(function(d) {return d.DateTime})
			  .indexOf(complete_dt);
			//console.log(complete_index);	  
		  
		  
			// parse/format hike bounds strings to datetime objects	  
			var dt_parser = d3.time.format("%Y-%m-%d %H:%M:%S"); //see the d3 datetime parser
			var start_dt_parsed = dt_parser.parse(start_dt); // see the d3 datetime parser parse
			var stop_dt_parsed = dt_parser.parse(stop_dt); //parse d3 dt parser parse, good parser
			//console.log(start_dt_parsed);
			//console.log(stop_dt_parsed);
		  
			// calculate latest hike completion time (1 hour from latest start)
			// this value is available in the data set extract as the third element
			// but I have decided to calculate it so it can be adjusted without changing the
			// date wrangling code
			var extended = d3.time.hour.offset(stop_dt_parsed,1);
			//console.log(extended);	  
		 
			// slice data bound by earliest start and 1 hour beyond latest start (complete hike), inclusive
			var bounds = data_date.slice(start_index,complete_index + 1);
			//console.log(bounds);
		  
			// Create and Position a Chart
			var myChart = new dimple.chart(svg);
			myChart.setBounds(
				left + (col * (width + inMarg)),
				top + (row * (height + inMarg)),
				width,
				height);
			var x = myChart.addTimeAxis("x", "DateTime","%Y-%m-%d %H:%M:%S","%H:%M");
			var y = myChart.addMeasureAxis("y", "Level");
			
			y.title = "Tide Level (feet)";
			x.title = "Time";
			
			
		  
			// Draw a label for each hour
			x.timePeriod = d3.time.hours;
			x.timeInterval = 1;	  
		  

			// Add a thick line without markers
			var lines = myChart.addSeries("Tide", dimple.plot.line); 
			lines.lineWeight = 3;
			lines.lineMarkers = false;	  
		  
			// Link the date selected data
			lines.data = data_date;
		  
			// Add bubble for latest hike start timel
			var bubble_startstop = myChart.addSeries("Latest_Start",dimple.plot.bubble);
		
		  
			// Link the start_stop selected data
		   bubble_startstop.data = data_latest_start;
		  
			// plot the earliest start and complete hike bound data as line
			var bounds_line = myChart.addSeries("Hike Window",dimple.plot.line);
			bounds_line.lineWeight = 3;
			bounds_line.lineMarkers = false;
		  
			
		  
			// link the bounds data to the bounds line series
			bounds_line.data = bounds;
			
			myChart.addLegend(-850, 4, 370, 200, "left");
			
			
			// colorblind palette mostly for my dad who is totally color blind
			// I don't mean blue green, I mean, can't see colors, just shades
			myChart.defaultColors = [
			new dimple.color("#999999"),
			new dimple.color("#56B4E9"),
			new dimple.color("#D55E00"),
			new dimple.color("#0072B2"),
			new dimple.color("#000000")
			]; 
			
		  
			// Draw the chart (sigh, finally)
			myChart.draw();
			
		     // chart is drawn, now we have access to chart shape objects
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
		  
			  // If this is not in the last row remove the x text
			  if (row < 1) {
				 //x.shapes.selectAll("text").remove();
				 x.titleShape.remove();
			  };
			  
			  
			  
			  // create a title on the first pass
			  if (row === 0 & col === 0) {
			  // create a title
			d3.selectAll("p#chart_title > *").remove(); //remove existing title
			d3.select('p#chart_title').append('h2').text('Carkeek to Golden Gardens Hike Time Window Next Viable ' + n_dates + ' Days from ' +
			moment(val).format('MMM-DD-YYYY'))
			.attr("id", "custom-title")
			.attr("class","custom-title");
			}
			  
			  // Move to the next column
			  col += 1;
			  
			  // If this is not in the first column remove the y text
			  if (col > 1) {
			     y.titleShape.remove();
				 y.shapes.selectAll("text").remove();
			  };

			  
			  
			
		  }, this);
		});
	};