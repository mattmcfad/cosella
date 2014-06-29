
/*	Global Variables
 *	app.totCells     - Total # of cells on board
 *  app.currentLevel - Current level (out of 4)
 *  app.totSolved    - Total # of solved Icons for current level
 *  app.totIcons     - Total # of Icons on board for current level
 *  app.First        - Object containing Data of first cell selected
 *  app.second       - Object containing Data of second cell selected
 */



var app = {

	init: function(){
		
		app.totCells = 144;
		app.currentLevel = 1;
		var gamegrid = $('#gamegrid');

		var cellStart = '<div class=cell style="background-color: rgb(189,195,199)" id=';
		var cellEnd = "></div>";
		var cellHTML = '';

		// Append all the cells to the DOM
		for (var i = 1; i < app.totCells+1; i++) {
			cellHTML =  cellStart+i+cellEnd;
			gamegrid.append(cellHTML);
			cellHTML = cellStart;
		}

		app.buildIcons(app.currentLevel);
	},

	eventListeners: function(){
		
		var select = false; // Test if selected

		$('.cell').on('click', function(event){
				
			event.preventDefault();

			if (select === false){
				select = true;
				app.first = $(this).data();
			} 
			else {

				if ( app.getId( $(this).data().x,$(this).data().y) === app.getId( app.first.x, app.first.y) ){
					console.log('no same onez1!!');
					select = false;
				}
				else{
					select = false;
					app.second = $(this).data();

					app.checkMatch();
				}
			}
		});

		function closeModal() {
			$(".overlay").fadeOut();
		}

		$(".overlay").on("click", function(){
			if ($(this).hasClass("close")) {
				closeModal();
			}
		});

		$(document).on("keydown", function(e){
			// ESC 
			if(e.which == 27) 
				closeModal();
		});

	},// eventListeners

	buildIcons: function(level){

		app.totSolved = 0;  // Reset # of solved icons

		var distribution,   // Array representing # of times each icon has been Drawn
		    totDistributed, // Int keeps track of total number of icons drawn
		    totalOutput,    // Int Total # of icons to be outputed
		    rows, columns,  // Int rows & columns on grid
		    icon,           // Object retrieved from icons.js containing id and color/background
		    odd,            // Boolean determining if found any odd icons
		    start,          // Starting location of where to start drawing icons
		    selector,       // String representing # for jQuery calls
		    sum;            // Int that determines which id on board to target

		function init(level){

			distribution = new Array(icons.length);
			for (var k = 0; k < icons.length; k++) {
				distribution[k] = 0;
			}

			switch(level) {
				case 1: 
					start = 40;
					rows = 6;
					columns = 6;
					break;
				case 2:
					start = 27;
					rows = 8;
					columns = 8;
					break;
				case 3:
					start = 26;
					rows = 8;
					columns = 10;
					break;
				case 4:
					start = 14;
					rows = 10;
					columns = 10;
					break;
			}

			totalOutput =  rows * columns;
			app.totIcons = totalOutput; // Total # of icons to be solved
			totDistributed = 0;
			selector = '#';
		}
			
		init(level);

		for (var i = 0; i < columns; i++) {
			for(var j = 0; j < rows; j++){
				sum = start + i + j*12; //id on grid
				var sel = $(selector+sum);
				

				// Ensure everything has a match when close to limit
				if (totalOutput - totDistributed <= icons.length){

					odd = false; // Test if found odd # of a distributed icon
					
					// Iterate through distribution and test to see what is odd
					for (var k = 0; k < distribution.length; k++){

						// If odd number distributed, get that icon to even out
						if (distribution[k] % 2 === 1 ){
							icon = icons[k];
							
							odd = true;
							break;
						}
					}
					// Else all icons are evenly distributed
					if (odd === false){
						// Get random icon
						icon = app.getIcon();						
					}
				}

				else 
					icon = app.getIcon();

				// Increase tot distributed for that particular Icon
				distribution[icon.id]++; 
				// Increase total icons distributed
				totDistributed++;
				
				var color = icon.color;
				sel.css('background-color',color);
				sel.data('id',color);
				sel.data('solved',false);
				sel.data('x',app.getX(sum));
				sel.data('y',app.getY(sum));
			}	
		}
	},

	// Randomly select and Icon
	// @return Object - Icon from Icons.js
	getIcon: function() {
		var rand = Math.floor((Math.random() * (icons.length)));
		return icons[rand];
	},

	// If id % 12 = 0 then on 12th column, return 12, else return id % 12
	// @param id - represents an position on the grid from 1-144
	// @return int - An x coordinate representing which column the icon is on 
	getX: function(id) {
		return (id % 12 === 0) ? 12 : id % 12; 
	},

	// Return which row cell falls on based on 12 cells in a row
	// @param id - represents an position on the grid from 1-144
	// @return int - An y coordinate representing which row the icon is on
	getY: function(id) {
		return Math.ceil(id/12);
	},

	getId: function(x,y){
		// Y ordering starts at 1, account for this
		return(x + 12 * (y-1));
	},

	checkMatch: function(){
		
		// If they are both the same icon
		if (case0.test(app.first,app.second) === true){
			// If they are both on same X or Y axis
			if (case1.test(app.first,app.second) === false)
				// If they can be matched through U or L shaped paths
				if(case2.test(app.first,app.second) === false)
					// Attempt to match through Zig-Zag pattern
					case3.test(app.first,app.second);
		}
		else 
			console.log("Try to select the same Icon"); // Not same Icon
	},

	matchSuccess: function(first,second) {
		cell1 =  $('#'+app.getId(first.x,first.y));
		cell2 =  $('#'+app.getId(second.x,second.y));

		cell1.data('solved',true);
		cell1.data('id',null);
		cell2.data('solved',true);
		cell2.data('id',null);
		cell1.css('background-color','rgb(189,195,199)');
		cell2.css('background-color','rgb(189,195,199)');

		// Just matched two squares.
		app.totSolved = app.totSolved + 2;

		app.testLevelCompletion();

	},

	testLevelCompletion: function() {

		if (app.totSolved === app.totIcons) {
			console.log("win");
			// if you beat level 4 keep playing it
			if (app.currentLevel !== 4 )
				app.currentLevel++;
			app.buildIcons(app.currentLevel);
		}
	}, 

}; // app

$(document).ready(function(){
	
	app.init();
	app.eventListeners();

});