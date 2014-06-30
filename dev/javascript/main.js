
/*	Global Variables
 *	app.totCells     - Int Total # of cells on board
 *  app.currentLevel - Int Current level (1 - 4)
 *  app.totSolved    - Int Total # of solved Icons for current level
 *  app.totIcons     - Int Total # of Icons on board for current level
 *  app.first        - Object containing Data of first cell selected
 *  app.second       - Object containing Data of second cell selected
 *  app.score		 - Int Score in game
 *  app.gamePaused   - Boolean is the game paused.
 *	app.count        - Int time remaining in game
 *  app.start        - Int starting id location on grid for current level
 *  app.rows         - Int # of rows for current level
 *  app.columns      - Int # of columns for current level
 */



var app = {

	init: function(){
		
		// Initialize timer
		timer.set({ time : 10, autostart : false });



		// 100 seconds
		app.timeLimit = 100000;

		// Timer counter
		app.count = app.timeLimit;
		$('#countdown').html(formatTime(app.count));


		//Initialize score
		app.score = 0; 	

		$('.totscore').html(app.score);

		app.gamePaused = false;	

		app.totCells = 144;

		// Start at level 1
		app.currentLevel = 1;
		var gamegrid = $('#gamegrid');

		var cellStart = '<div class=cell data-id="null" style="background-color: rgb(189,195,199)" id=';
		var cellEnd = "></div>";
		var cellHTML = '';

		// Append all the cells to the DOM
		for (var i = 1; i < app.totCells+1; i++) {
			cellHTML =  cellStart+i+cellEnd;
			gamegrid.append(cellHTML);
			cellHTML = cellStart;
		}

		// Array to keep track of which Octocats have been used
		app.octocatTracker = Array();

		app.buildIcons(app.currentLevel);
	},

	eventListeners: function(){
		
		var select = false; // Have we selected one already?

		// Clicking on a cell

		$('.cell').on('click', function(event){
				
			event.preventDefault();
			var selectedCell = $(this);
			var selectedCellData = selectedCell.data();

			// If we clicked on a selectable cell
			// Data-id null if solved or empty
			if(selectedCellData.id !== null){
				// Make sure timer is running
				if (!timer.isActive){
					timer.play(true);
				}
				if (select === false){
					select = true;
					selectedCell.addClass("selected");
					app.first = selectedCellData;
				} 
				else { // Make sure not selecting same cell
					if (app.getId( selectedCellData.x,selectedCellData.y) === app.getId( app.first.x, app.first.y) ){
						// If selected same class, removed selected, reset to 1st click
						selectedCell.removeClass('selected');
						select = false;
					}
					else{
						select = false;
						app.second = selectedCellData;
						app.checkMatch();
					}
				}
			}

		});


		// Modal functionality
		//--------------------
		function closeModal() {
			// If game was paused, resume clock! no cheating
			if (app.gamePaused === true){
				timer.play();
			}
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

		// Next level
		//--------------------
		$('#nextLvl').on('click', function(){
			$('#nextLevel').fadeOut();
			app.buildIcons(app.currentLevel);
		});

		// Game Over

		$('#playAgain').on('click', function(){
			app.restartGame();
		});

		// Footer buttons

		$('#moreTime').on("click", function(){
			app.count += 10000;
		});

		$("#instruct").on("click", function(){
			app.instructions();
		});

		$('#reOrder').on("click", function(){
			app.reOrder(app.rows,app.columns,app.start);
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
			// Assign globaly for re-Order
			app.start = start;
			app.rows = rows;
			app.columns = columns; //
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
				
				// Change from Color to Background-Image
				//--------------------
				//var color = icon.color;
				//sel.css('background-color',color);
				//sel.data('id',color);

				var img = "url(../images/icons/" + icon.img+".png)";
				sel.css('background-image',img);

				sel.data('id',icon.img);

				sel.data('solved',false);
				sel.data('x',app.getX(sum));
				sel.data('y',app.getY(sum));

			}	
		}

		// We have even distribution but last 4-12 cells are repeats side by side
		// Re order so its more random
		app.reOrder(rows, columns, start);


	}, // BuildIcons

	// Randomly select and Icon
	// @return Object - Icon from Icons.js
	getIcon: function() {
		var rand = Math.floor((Math.random() * (icons.length)));
		return icons[rand];
	},

	getOctocat: function() {
		var rand = Math.floor((Math.random() * (octocats.length)));
		if (!app.octocatTracker.contains(rand)){
			app.octocatTracker.push(rand);
			return octocats[rand].img;
		}
		else
			return app.getOctocat();
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

	increaseScore: function(){
		app.score += 10;
		$('.totscore').html(app.score);
	},

	checkMatch: function(){

		// Remove selected Animation
		$('.cell').removeClass('selected');
		
		// If they are both the same icon
		if (case0.test(app.first,app.second) === true){
			// If they are both on same X or Y axis
			if (case1.test(app.first,app.second) === false)
				// If they can be matched through U or L shaped paths
				if(case2.test(app.first,app.second) === false)
					// Attempt to match through Zig-Zag pattern
					case3.test(app.first,app.second);
		}
		//else 
		//	console.log("Try to select the same Icon"); // Not same Icon
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
		cell1.css('background-image', 'none');
		cell2.css('background-image', 'none');


		// Just matched two squares.
		app.totSolved = app.totSolved + 2;

		app.increaseScore();

		app.testLevelCompletion();

	},

	testLevelCompletion: function() {

		if (app.totSolved === app.totIcons) {
			timer.stop();
			app.count = app.timeLimit;
			$('#countdown').html(formatTime(app.count));
			//console.log("win");
			// if you beat level 4 keep playing it
			if (app.currentLevel !== 4 )
				app.currentLevel++;

			app.nextLevel();
			
		}
	},

	nextLevel: function() {
		$('#nextLevel').fadeIn();
		var image = '../images/octocats/' + app.getOctocat();
		
		$('#octocat').attr('src',image);
	},

	reOrder: function(rows,columns,start) {
		var idsUsed = Array();
		var iconsUsed = Array();
		var iconsDistributed = Array();
		var sum, selector = '#';
		var count = 0;

		function randomNumber() {
			var rand = Math.floor((Math.random() * (iconsUsed.length)));
			//console.log(rand);

			if (!iconsDistributed.contains(rand)){
				iconsDistributed.push(rand);
				return rand;
			}
			else
				return randomNumber(length);
		}


		// Iterate through all cells and find all unsolved cells
		for (var i = 0; i < columns; i++) {
			for(var j = 0; j < rows; j++){
				sum = start + i + j*12; //id on grid
				var sel = $(selector+sum);

				// If the square has not been solved
				if (sel.data().id !== null){
					// Add id & Icon to arrays 
					
					//console.log("pushed:" + sum + " Icon: " + sel.data().id);
					idsUsed.push(sum);
					iconsUsed.push(sel.data().id);
				}
			}
		}

		for (var k = 0; k < idsUsed.length; k++){
		

			//console.log("sel:" + idsUsed[k]);
			
		 	var select = $(selector+idsUsed[k]);

		 	var icon = randomNumber();
		 	//console.log(idsUsed[k] + " col: " + iconsUsed[color]);
		 	select.data('id',iconsUsed[icon]);
		 	//select.css('background-icon', iconsUsed[icon]);
		 	var img = "url(../images/icons/" + iconsUsed[icon]+".png)";
		 	select.css('background-image', img);

		}

	},

	instructions: function() {
		app.gamePaused = true;
		timer.pause();
		$('#instructions').fadeIn();
	},

	gameOver: function() {
		$('#timesUp').fadeIn();
		$('#gameOverOcto').attr('src','../images/octocats/gameover.png');

	},

	restartGame: function() {
		// Reset Divs
		$('#gamegrid').html('');
		
		timer.pause();

		app.init();
		app.eventListeners();

		$('#timesUp').fadeOut();
	}
			

}; // app

$(document).ready(function(){
	
	app.init();
	app.eventListeners();

});

Array.prototype.contains = function ( needle ) {
		for (var i in this) {
			if (this[i] == needle) return true;
		}
		return false;
};