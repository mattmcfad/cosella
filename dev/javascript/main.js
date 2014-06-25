var app = {

	init: function(){
		
		app.totCells = 144;
		var gamegrid = $('#gamegrid');

		var cellStart = '<div class=cell id=';
		var cellEnd = "></div>";
		var cellHTML = '';

		//append all the cells to the DOM
		for (var i = 1; i < app.totCells+1; i++) {
			cellHTML =  cellStart+i+cellEnd;
			gamegrid.append(cellHTML);
			cellHTML = cellStart;
		}
		app.buildIcons(1);
	},

	buildIcons: function(level){

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
					sel.data('x',app.getX(sum));
					sel.data('y',app.getY(sum));
				}	
			}
		}	
	},

	getColor: function() {
		var rand = Math.floor((Math.random() * (icons.length)));
		return icons[rand].color;
	},
	//if id % 12 = 0 then on 12th column, return 12, else return id % 12
	getX: function(id) {
		return (id % 12 === 0) ? 12 : id % 12; 
	},
	//return which row cell falls on based on 12 cells in a row
	getY: function(id) {
		return Math.ceil(id/12);
	},

	getId: function(x,y){
		//Y ordering starts at 1, account for this
		return(x + 12 * (y-1));
	},

	checkMatch: function(){
		//if (app.case0(app.first,app.second)) ? app.case1(app.first,app.second) : console.log("no match");

		if (app.case0(app.first,app.second) === true){
			app.case1(app.first,app.second);
		}
		else 
			console.log("nooo match");
	},

	//make sure both cells are actually same type of icon
	case0: function(first,second) {
		return (first.id === second.id) ? true : false;
	},

	//two cells in either the same row or column
	case1: function(first,second) {
		
		var cordX = first.x, cordY = first.y, solved = false, cell;

		//if they are both on same column
		if (first.x === second.x) {

			while (cordY < second.y){
				cell = $('#'+app.getId(cordX,cordY));
				console.log(cell.data());
				cordY++;
			}
		}

		/*************************/

		//if they are both on the same row
		else if (first.y === second.y){
			console.log("on same row");

			//if selected [1] .... [2]
			if (first.x < second.x){
				while (cordX < second.x){
					cordX++;
					cell = $('#'+app.getId(cordX,cordY));
					//console.log("Cell at ("+cordX+","+cordY+") "+cell.data().solved);
					if (cordX === second.x){
						console.log('match!');
						solved = true;
						break;
					}

					if (cell.data().solved === "false"){
						console.log('no match');
						solved = false;
						break;
					}
				}
			}
			//else selected [2] .... [1]
			else if (first.x > second.x){
				while (cordX > second.x){
					cordX--;
					cell = $('#'+app.getId(cordX,cordY));
					//console.log("Cell at ("+cordX+","+cordY+") "+cell.data().solved);
					if (cordX === second.x){
						console.log('match!');
						solved = true;
						break;
					}
					if (cell.data().solved === "false"){
						console.log('no match');
						solved = false;
						break;
					}
				}
			}
		}
	}//case1
};



$(document).ready(function(){
	
	app.level = 1;
	app.init();
	app.select = false;

	$('.cell').on('click', function(event){
		
		event.preventDefault();

		if (app.select === false){
			app.select = true;
			app.first = $(this).data();
		} else {
			app.select = false;
			app.second = $(this).data();

			app.checkMatch();
		}

	});

});