/* function ConvertCSVToJSON(csv) {
        var lines=csv.split("\n"); 
		var jsonData = [];
		var headers=lines[0].split(",");
		for(var i=1;i<lines.length;i++){
			var data = {};
			var currentline=lines[i].split(",");
			for(var j=0;j<headers.length;j++){
				data[headers[j]] = currentline[j];
				}
	  jsonData.push(data);
	  }
	  return JSON.stringify(jsonData);
} */
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data.csv",
        dataType: "text",
        success: function(csv) {loadTable(csv);}
     });
});
function loadTable(csv){
		var lines=csv.split("\n"); 
		var jsonData = [];
		var headers=lines[0].split(",");
		for(var i=1;i<lines.length;i++){
			var data = {};
			var currentline=lines[i].split(",");
			for(var j=0;j<headers.length;j++){
				data[headers[j]] = currentline[j];
				}
	  jsonData.push(data);
	  }
		
		var data = JSON.stringify(jsonData);

        var col = [];
        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < data.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }