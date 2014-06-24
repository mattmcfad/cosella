var app = {

	init: function() {
		
		app.totCells = 144;
		var gamegrid = $('#gamegrid');

		var cellStart = '<div class=cell id=';
		var cellEnd = "></div>";
		var cellHTML = '';

		for (var i = 1; i < app.totCells; i++) {
			cellHTML =  cellStart+i+cellEnd;
			gamegrid.append(cellHTML);
			cellHTML = cellStart;
		}
	}
};


$(document).ready(function(){
	app.init();
	console.log("sanity check");
});