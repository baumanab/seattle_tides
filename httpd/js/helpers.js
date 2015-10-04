			
function change(button_id, change_value) {
  document.getElementById(button_id).value = change_value;

  };
  
  
function handleSubmit(event){
  d3.selectAll("svg > *").remove(); // remove previous chart
  //console.log(document.getElementById("myVal").value)
  // initialize vars
  var date_selection = document.getElementById("myVal").value;
  draw_charts(date_selection);          				
  return false;
  };	
			
			
function handleButton(clicked_id){
  d3.selectAll("svg > *").remove(); // remove previous chart
  var date_selection = document.getElementById("myVal").value;
  var button_id = document.getElementById(clicked_id).value;
  var default_date = moment().format("YYYY-MM-DD");
  console.log(typeof date_selection);  
  if (date_selection.length > 0) {
    draw_charts(date_selection, button_id); 
  } else {
      draw_charts(default_date, button_id);
  }
  
  return false;
  };
  


  

  
  