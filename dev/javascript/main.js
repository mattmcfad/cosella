var app = {

	init: function(){
		
		app.totCells = 144;
		var gamegrid = $('#gamegrid');

		var cellStart = '<div class=cell id=';
		var cellEnd = "></div>";
		var cellHTML = '';

		for (var i = 1; i < app.totCells+1; i++) {
			cellHTML =  cellStart+i+cellEnd;
			gamegrid.append(cellHTML);
			cellHTML = cellStart;
		}
		app.reOrder(1);
	},

	reOrder: function(level){

		if (level === 1) {
			
			var start = 27, sum; 
			var selector = '#';

			for (var i = 0; i < 8; i++) {
				for(var j = 0; j < 8; j++){
					sum = start + i + j*12;
					var sel = $(selector+sum);
					var color = app.getColor();
					sel.css('background-color',color);
					sel.data('id',color);
					sel.data('solved','false');
				}	
			}
		}	
	},

	getColor: function() {
		var rand = Math.floor((Math.random() * (icons.length)));
		return icons[rand].color;
	}
};



$(document).ready(function(){
	
	app.level = 1;
	app.init();

	$('.cell').on('click', function(){
		console.log($(this).data());
	});

});