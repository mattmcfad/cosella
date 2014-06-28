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
						
						solved = true;
						break;
					}
					else if (cell.data().solved === false){

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
						
						solved = true;
						break;
					}
					else if (cell.data().solved === false){
						
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
						
						solved = true;
						break;
					}

					if (cell.data().solved === false){
						
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
			
			return false;
		}
	},//case1

	case2: function(first,second) {
		var cordX = first.x, cordY = first.y, tempX, tempY, solved = false, cell;
		console.log("=================================");
		
		function init() {
			cordX = first.x; 
			cordY = first.y;
			solved = false;
		}

		// CASE A & B
		if (first.x < second.x){
			console.log("hit case A & B");


			// *********    CASE A    **********   
			//
			//  ............. 	 .....[2]    ..........
			//  : [X][X][X] :    : [X][X]    : [X][X] :
			// [1][X][X][X][2]  [1][X][X]   [1][X][X] :
			//                              [X][X][X][2]
	        if (!solved) {
	        	console.log("Case A");
	        	init();

				//while we haven't reached the top of the board
				while (cordY > 1 && solved !== true) {
					cordY--;//move up 1 row
					console.log("moved up to:("+cordX+","+cordY+")");
					//get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					//if the cell just moved up to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						//while we haven't reached the same columm
						while(cordX < second.x) {
							cordX++; //move right 1 column
							console.log("moved right to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							//if we have moved up and right to the location
							if(cordY === second.y && cordX === second.x) {
								console.log("MATCH!!!! via Case A");
								solved = true;
								break;
							}
							//if the column we just moved to is not occupied
							if(cell.data().solved === true || cell.data().solved === undefined){
								//if reached same column, iterate down.
								if(cordX === second.x){
									//when we iterate down we change cordY, cache it to prevent infinite loop
									tempY = cordY;
									//while we haven't moved down far enough
									while (cordY < second.y){
										cordY++; //move down
										console.log("moved down to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										//if we reached the same x and y position, solved
										if(cordY === second.y) {
											console.log("MATCH!!!! via Case A");
											solved = true;
											break;
										}
										//else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match;");
											break;
										}
									}//third while
									//reset to same cordY before going right and down.
									cordY = tempY;
								}	
							}
							//else column moved to the right is occupied
							else
								break;
							
						}//2nd while
						//reset cordX since iterated to new cordY
						cordX = first.x;
					}
					//else the cell above is occupied, break
					else
						break;
				}//first while
			}// ---- CASE A ----

			// *********    CASE B    **********   
			//
			//	[1][X][X]     [1][X][X]   [X][X][2]
			//	 : [X][X][2]   : [X][X]   [1][X] :
			//	 : [X][X] :    : [X][X]	   : [X] :
			//   :........:    :... [2]    :.....:              
			if (!solved){
				console.log("Case B");
				init();


				//while we haven't reached the bottom of the board
				while (cordY < 12 && solved !== true) {
					cordY++;//move down 1 row
					console.log("moved down to:("+cordX+","+cordY+")");
					//get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					//if the cell just moved down to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						//while we haven't reached the same column
						while(cordX < second.x) {
							cordX++; //move right 1 column
							console.log("moved right to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							//if we have moved down and right to the location
							if(cordY === second.y && cordX === second.x) {
								console.log("MATCH!!!! via Case B");
								solved = true;
								break;
							}
							//if the column we just moved to is not occupied
							if(cell.data().solved === true || cell.data().solved === undefined){
								//if reached same column, iterate up.
								if(cordX === second.x){
									//when we iterate up we change cordY, cache it to prevent infinite loop
									tempY = cordY;
									//while we haven't moved up far enough
									while (cordY > second.y){
										cordY--; //move up
										console.log("moved up to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										//if we reached the same x and y position, solved
										if(cordY === second.y) {
											console.log("MATCH!!!! via Case B");
											solved = true;
											break;
										}
										//else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match;");
											break;
										}
									}//third while
									//reset to same cordY before going right and up.
									cordY = tempY;
								}	
							}
							//else column moved to the right is occupied
							else
								break;
							
						}//2nd while
						//reset cordX since iterated to new cordY
						cordX = first.x;
					}
					//else the cell above is occupied, break
					else
						break;
				}//first while	

			}// ---- CASE B ----

		}// CASE A & B

		
		// CASE C & D
		if (first.y > second.y){
			console.log("hit case C & D");

			// *********    CASE C    ********** 
			//
			//   [2].......  [X][X][2]
			// 	 [X][X][X]:  [X][X] :
			//	 [X][1]...:  [1]....:
			if(!solved) {
				console.log("Case C");
				init();

				// While we haven't reached the far right of the board
				while (cordX < 12 && solved !== true) {
					cordX++;// Move right 1 column
					console.log("moved right to:("+cordX+","+cordY+")");
					// Get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					// If the cell just moved right to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						// While we haven't reached the same row
						while(cordY > second.y) {
							cordY--; // Move up 1 row
							console.log("moved up to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							// If we have moved right and up to the location
							if(cordY === second.y && cordX === second.x) {
								console.log("MATCH!!!! via Case E");
								solved = true;
								break;
							}
							// If the row we just moved to is not occupied
							if(cell.data().solved === true || cell.data().solved === undefined){
								// If reached same row, iterate left
								if(cordY === second.y){
									// When we iterate left we change cordX, cache it to prevent infinite loop
									tempX = cordX;
									// While we haven't moved left far enough
									while (cordX > second.x){
										cordX--; // Move left
										console.log("moved left to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										//if we reached the same x and y position, solved
										if(cordX === second.x) {
											console.log("MATCH!!!! via Case C");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match via C");
											break;
										}

									}// Third while
									// Reset to same cordY before going up and left
									cordX = tempX;
								}
							}
							// Else row moved up to is occupied
							else
								break;

						}// 2nd while
						// Reset cordX since iterated to new cordY
						cordY = first.y;
					}
					// Else the cell to left is occupied, break
					else
						break;
				}// 1st while
			}// ---- CASE C -----


			// *********    CASE D    ********** 
			//
			//   .......[2]  [2][X][X]
			// 	 :[X][X][X]   :[X][X]
			//	 :......[1]   :...[1]

			if(!solved) {
				console.log("Case D");
				init();

				// While we haven't reached the far left of the board
				while (cordX > 1 && solved !== true) {
					cordX--;// Move left 1 column
					console.log("moved left to:("+cordX+","+cordY+")");
					// Get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					// If the cell just moved left to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						// While we haven't reached the same row
						while(cordY > second.y) {
							cordY--; // Move up 1 row
							console.log("moved up to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							// If we have moved left and up to the location
							if(cordY === second.y && cordX === second.x) {
								console.log("MATCH!!!! via Case E");
								solved = true;
								break;
							}
							// If the row we just moved to is not occupied
							if(cell.data().solved === true || cell.data().solved === undefined){
								// If reached same row, iterate right
								if(cordY === second.y){
									// When we iterate right we change cordX, cache it to prevent infinite loop
									tempX = cordX;
									// While we haven't moved right far enough
									while (cordX < second.x){
										cordX++; // Move right
										console.log("moved right to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										//if we reached the same x and y position, solved
										if(cordX === second.x) {
											console.log("MATCH!!!! via Case D");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match via D");
											break;
										}
									}// Third while
									// Reset to same cordY before going up and right
									cordX = tempX;
								}
							}
							// Else row moved up to is occupied
							else
								break;

						}// 2nd while
						// Reset cordX since iterated to new cordY
						cordY = first.y;
					}
					// Else the cell to left is occupied, break
					else
						break;
				}// 1st while
			}// ---- CASE D -----


		} // CASE C & D


		// CASE E & F
		if (first.x > second.x){
			console.log("hit case E & F");
			

			// *********    CASE E    **********   
			//
			//  ............. 	[2].....    ..........
			//  : [X][X][X] :   [X][X] :    : [X][X] :
			// [2][X][X][X][1]  [X][X][1]   [2][X][X] :
			//                              [X][X][X][1]
	        if (!solved) {
	        	console.log("Case E");
	        	init();

				//while we haven't reached the top of the board
				while (cordY > 1 && solved !== true) {
					cordY--;//move up 1 row
					console.log("moved up to:("+cordX+","+cordY+")");
					//get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					//if the cell just moved up to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						//while we haven't reached the same column
						while(cordX > second.x) {
							cordX--; //move left 1 column
							console.log("moved left to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							//if we have moved up and left to the location
							if(cordY === second.y && cordX === second.x) {
								console.log("MATCH!!!! via Case E");
								solved = true;
								break;
							}
							//if the column we just moved to is not occupied
							if(cell.data().solved === true || cell.data().solved === undefined){
								//if reached same column, iterate down.
								if(cordX === second.x){
									//when we iterate down we change cordY, cache it to prevent infinite loop
									tempY = cordY;
									//while we haven't moved down far enough
									while (cordY < second.y){
										cordY++; //move down
										console.log("moved down to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										//if we reached the same x and y position, solved
										if(cordY === second.y) {
											console.log("MATCH!!!! via Case E");
											solved = true;
											break;
										}
										//else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match;");
											break;
										}
									}//third while
									//reset to same cordY before going left and down.
									cordY = tempY;
								}	
							}
							//else column moved to the left is occupied
							else
								break;
							
						}//2nd while
						//reset cordX since iterated to new cordY
						cordX = first.x;
					}
					//else the cell above is occupied, break
					else
						break;
				}//first while
			}// ---- CASE E ----

			// *********    CASE F    **********   
			//
			//	[1][X][X]     [1][X][X]   [X][X][2]
			//	 : [X][X][2]   : [X][X]   [1][X] :
			//	 : [X][X] :    : [X][X]	   : [X] :
			//   :........:    :... [2]    :.....: 
			if (!solved){
				console.log("Case B");
				init();


				//while we haven't reached the bottom of the board
				while (cordY < 12 && solved !== true) {
					cordY++;//move down 1 row
					console.log("moved down to:("+cordX+","+cordY+")");
					//get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					//if the cell just moved down to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						//while we haven't reached the same column
						while(cordX > second.x) {
							cordX--; //move left 1 column
							console.log("moved left to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							//if we have moved down and left to the location
							if(cordY === second.y && cordX === second.x) {
								console.log("MATCH!!!! via Case F");
								solved = true;
								break;
							}
							//if the column we just moved to is not occupied
							if(cell.data().solved === true || cell.data().solved === undefined){
								//if reached same column, iterate up.
								if(cordX === second.x){
									//when we iterate up we change cordY, cache it to prevent infinite loop
									tempY = cordY;
									//while we haven't moved up far enough
									while (cordY > second.y){
										cordY--; //move up
										console.log("moved up to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										//if we reached the same x and y position, solved
										if(cordY === second.y) {
											console.log("MATCH!!!! via Case F");
											solved = true;
											break;
										}
										//else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match;");
											break;
										}
									}//third while
									//reset to same cordY before going left and up.
									cordY = tempY;
								}	
							}
							//else column moved to the left is occupied
							else
								break;
							
						}//2nd while
						//reset cordX since iterated to new cordY
						cordX = first.x;
					}
					//else the cell above is occupied, break
					else
						break;
				}//first while	

			}// ---- CASE F ----


		}// CASE E & F

		//final
		if (solved) {
			console.log("here");
			app.matchSuccess(first,second);
		}

	},//case2

	case3: function() {


	}//case3



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
		} 
		else {

			if ( app.getId( $(this).data().x,$(this).data().y) === app.getId( app.first.x, app.first.y) ){
				console.log('no same onez1!!');
				app.select = false;
			}
			else{
				app.select = false;
				app.second = $(this).data();

				app.checkMatch();
			}
		}

	});

});