$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/skshetty94/skshetty94.github.io/master/data.csv",
        dataType: "text",
        success: function(csv) {renderContents(csv);}
     });
});

function renderContents(csv){
	var lines=csv.split("\n"); 
	var jsonData = [];
	var headers=lines[0].split(",");
    console.log(headers);
	var colHeaders = [];
	for(var i=1;i<lines.length;i++){
		var data = {};
		var currentline=lines[i].split(",");
		colHeaders[i] = currentline[0];
		for(var j=1;j<headers.length;j++){
			data[headers[j]] = currentline[j];
		}
	  jsonData.push(data);
	  }
	  var data = JSON.stringify(jsonData);
	  console.log (data);
	  var count = lines.length;
	  loadTable(colHeaders, headers, jsonData, count);
	  	  
	  var jsonDataForChart = [];
	  for(var i = 1; i< headers.length; i++){
		var data = {};
		var seriesData = [];
		for (var j = 0; j < count-2; j++) {
                seriesData.push(parseInt(jsonData[j][headers[i]]));
            }
			data['name'] = headers[i];
			data['data'] = seriesData;
			jsonDataForChart.push(data);
	  }
	  console.log(JSON.stringify(jsonDataForChart));
	  
	  loadChart(jsonDataForChart);
}


function loadTable(colHeaders, headers, jsonData, count){
		
        var table = document.createElement("table");

        var tr = table.insertRow(-1);                   
        var td = document.createElement("td");
		tr.appendChild(td);
        for (var i = 1; i < colHeaders.length-1; i++) {
            var th = document.createElement("th");      
            th.innerHTML = colHeaders[i];
		    th.setAttribute("scope", "col");
            tr.appendChild(th);
        }
  
        for (var i = 1; i < headers.length; i++) {

            tr = table.insertRow(-1);
			var th = document.createElement("th");      
            th.innerHTML = headers[i];
		    th.setAttribute("scope", "row");
            tr.appendChild(th);
            
            for (var j = 0; j < count-2; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = jsonData[j][headers[i]];
            }
        }

        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }
function loadChart(jdata){
Highcharts.chart('container', {
    
    title: {
        text: 'Students'
    },
	xAxis: {
		tickInterval: 1
    },
    yAxis: {
        title: {
            text: 'Year'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2014
        }
    },

    series: jdata,

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'center',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
}
