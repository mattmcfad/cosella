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
					sel.data('solved',false);
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
			if (app.case1(app.first,app.second) === false)
				app.case2(app.first,app.second);
		}
		else 
			console.log("nooo match");
	},

	matchSuccess: function(first,second) {
		cell1 =  $('#'+app.getId(first.x,first.y));
		cell2 =  $('#'+app.getId(second.x,second.y));

		cell1.data('solved',true);
		cell1.data('id',null);
		cell2.data('solved',true);
		cell2.data('id',null);
		cell1.css('background-color','black');
		cell2.css('background-color','black');
	},

	//make sure both cells are actually same type of icon
	case0: function(first,second) {
		//if either id has matched 
		if (first.solved === true || second.solved === true)
			return false;
		return (first.id === second.id) ? true : false;
	},

	//two cells in either the same row or column
	case1: function(first,second) {
		
		var cordX = first.x, cordY = first.y, solved = false, cell;

		/*************************/

		//if they are both on same column
		if (first.x === second.x) {

			//if selected [1]
			//			   .
			//			   .
			//			  [2]
			if (first.y < second.y){
				while (cordY < second.y){
					cordY++;
					cell = $('#'+app.getId(cordX,cordY));
					if(cordY === second.y){
						console.log('match!');
						solved = true;
						break;
					}
					else if (cell.data().solved === false){
						console.log('noz match');
						solved = false;
						break;
					}
				}
			}

			//if selected [2]
			//			   .
			//			   .
			//			  [1]
			if (first.y > second.y){
				while (cordY > second.y){
					cordY--;
					cell = $('#'+app.getId(cordX,cordY));
					if(cordY === second.y){
						console.log('match!');
						solved = true;
						break;
					}
					else if (cell.data().solved === false){
						console.log('noh match');
						solved = false;
						break;
					}
				}
			}
		}

		/*************************/

		//if they are both on the same row
		else if (first.y === second.y){
			//
			//if selected [1] .... [2]
			//
			if (first.x < second.x){
				while (cordX < second.x){
					cordX++;
					cell = $('#'+app.getId(cordX,cordY));
					if (cordX === second.x){
						console.log('match!');
						solved = true;
						break;
					}

					if (cell.data().solved === false){
						console.log('noe match');
						solved = false;
						break;
					}
				}
			}
			//
			//else selected [2] .... [1]
			//
			else if (first.x > second.x){
				while (cordX > second.x){
					cordX--;
					cell = $('#'+app.getId(cordX,cordY));
					if (cordX === second.x){
						console.log('match!');
						solved = true;
						break;
					}
					if (cell.data().solved === false){
						console.log('noa match');
						solved = false;
						break;
					}
				}
			}
		}
		if (solved === true){
			app.matchSuccess(first,second);
			return true;

		}
		else {
			console.log("no_match");
			return false;
		}
	},//case1

	case2: function(first,second) {
		var cordX = first.x, cordY = first.y, solved = false, cell;
		console.log("runz");
		//  .............
		//  : [X][X][X] :
		// [1][X][X][X][2]

		//if they 
		if (cordX === second.x) {

		}

		else if (cordY === second.y) {
			//while we haven't reached the top of the board
			while (cordY > -1 && solved !== true) {
				cordY--;
				console.log("moved up to:("+cordX+","+cordY+")");
				cell = $('#'+app.getId(cordX,cordY));
				//if the cell just moved up towards is empty
				if (cell.data().solved === true || cell.data().solved === undefined){
					//while we haven't reached the same columm
					while(cordX < second.x) {
						cordX++; //move right 1 column
						console.log("moved right to:("+cordX+","+cordY+")");
						cell = $('#'+app.getId(cordX,cordY));
						//if the column we just moved to is not occupied
						
						if(cell.data().solved === true || cell.data().solved === undefined){
							//if reached same colum, iterate down.
							if(cordX === second.x){
								//while we haven't moved down far enough
								while (cordY < second.y){
									cordY++;
									console.log("moved down to:("+cordX+","+cordY+")");
									cell = $('#'+app.getId(cordX,cordY));

									//if we reached the same x and y position, solved
									if(cordY === second.y) {
										console.log("MATCH!!!!");
										//app.matchSuccess(first,second);
										solved = true;
										break;
									}
									//else if cell we just went to is occupied, break
									else if (cell.data().solved === false){
										console.log("no match;");
										break;
									}
								}//third while
							}	
						}
						//else colum moved to the right is occuped
						else
							break;
						
					}//2nd while
				}
				//else the cell above is occupied, break
				else
					break;
			}//first while
		}
		if (solved === true) {
			app.matchSuccess(first,second);
		}

	}//case2

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