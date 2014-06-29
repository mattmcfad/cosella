var case2 = {

	// U shapes
	test: function(first,second) {
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

				// While we haven't reached the top of the board
				while (cordY > 1 && solved !== true) {
					cordY--;// Move up 1 row
					console.log("moved up to:("+cordX+","+cordY+")");
					// Get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					// If the cell just moved up to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						// While we haven't reached the same columm
						while(cordX < second.x) {
							cordX++; // Move right 1 column
							console.log("moved right to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							// If we have moved up and right to the location
							if(cordY === second.y && cordX === second.x) {
								console.log("MATCH!!!! via Case A");
								solved = true;
								break;
							}
							// If the column we just moved to is not occupied
							if(cell.data().solved === true || cell.data().solved === undefined){
								// If reached same column, iterate down.
								if(cordX === second.x){
									// When we iterate down we change cordY, cache it to prevent infinite loop
									tempY = cordY;
									// While we haven't moved down far enough
									while (cordY < second.y){
										cordY++; // Move down
										console.log("moved down to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										// If we reached the same x and y position, solved
										if(cordY === second.y) {
											console.log("MATCH!!!! via Case A");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match;");
											break;
										}
									}// Third while
									// Reset to same cordY before going right and down.
									cordY = tempY;
								}	
							}
							// Else column moved to the right is occupied
							else
								break;
							
						}// 2nd while
						// Reset cordX since iterated to new cordY
						cordX = first.x;
					}
					// Else the cell above is occupied, break
					else
						break;
				}// First while
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


				// While we haven't reached the bottom of the board
				while (cordY < 12 && solved !== true) {
					cordY++;// Move down 1 row
					console.log("moved down to:("+cordX+","+cordY+")");
					// Get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					// If the cell just moved down to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						// While we haven't reached the same column
						while(cordX < second.x) {
							cordX++; //move right  M column
							console.log("moved right to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							//if we have moved down and right to the location
							if(cordY === second.y && cordX === second.x) {
								console.log("MATCH!!!! via Case B");
								solved = true;
								break;
							}
							// If the column we just moved to is not occupied
							if(cell.data().solved === true || cell.data().solved === undefined){
								// If reached same column, iterate up.
								if(cordX === second.x){
									// When we iterate up we change cordY, cache it to prevent infinite loop
									tempY = cordY;
									// While we haven't moved up far enough
									while (cordY > second.y){
										cordY--; // Move up
										console.log("moved up to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										// If we reached the same x and y position, solved
										if(cordY === second.y) {
											console.log("MATCH!!!! via Case B");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match;");
											break;
										}
									}// Third while
									// Reset to same cordY before going right and up.
									cordY = tempY;
								}	
							}
							// Else column moved to the right is occupied
							else
								break;
							
						}// 2nd while
						// Reset cordX since iterated to new cordY
						cordX = first.x;
					}
					// Else the cell above is occupied, break
					else
						break;
				}// First while	

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
										// If we reached the same x and y position, solved
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
										// If we reached the same x and y position, solved
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
					cordY--;//move up  M row
					console.log("moved up to:("+cordX+","+cordY+")");
					// Get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					//if the cell just moved up to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						// While we haven't reached the same column
						while(cordX > second.x) {
							cordX--; //move left  M column
							console.log("moved left to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							//if we have moved up and left to the location
							if(cordY === second.y && cordX === second.x) {
								console.log("MATCH!!!! via Case E");
								solved = true;
								break;
							}
							// If the column we just moved to is not occupied
							if(cell.data().solved === true || cell.data().solved === undefined){
								//if reached same column, iterate down.
								if(cordX === second.x){
									//when we iterate down we change cordY, cache it to prevent infinite loop
									tempY = cordY;
									//while we haven't moved down far enough
									while (cordY < second.y){
										cordY++; // Move down
										console.log("moved down to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										// If we reached the same x and y position, solved
										if(cordY === second.y) {
											console.log("MATCH!!!! via Case E");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match;");
											break;
										}
									}// Third while
									// Reset to same cordY before going left and down.
									cordY = tempY;
								}	
							}
							// Else column moved to the left is occupied
							else
								break;
							
						}// 2nd while
						// Reset cordX since iterated to new cordY
						cordX = first.x;
					}
					// Else the cell above is occupied, break
					else
						break;
				}// First while
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


				// While we haven't reached the bottom of the board
				while (cordY < 12 && solved !== true) {
					cordY++;// Move down 1 row
					console.log("moved down to:("+cordX+","+cordY+")");
					// Get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					// If the cell just moved down to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						// While we haven't reached the same column
						while(cordX > second.x) {
							cordX--; //move left  M column
							console.log("moved left to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							//if we have moved down and left to the location
							if(cordY === second.y && cordX === second.x) {
								console.log("MATCH!!!! via Case F");
								solved = true;
								break;
							}
							// If the column we just moved to is not occupied
							if(cell.data().solved === true || cell.data().solved === undefined){
								// If reached same column, iterate up.
								if(cordX === second.x){
									// When we iterate up we change cordY, cache it to prevent infinite loop
									tempY = cordY;
									// While we haven't moved up far enough
									while (cordY > second.y){
										cordY--; // Move up
										console.log("moved up to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										// If we reached the same x and y position, solved
										if(cordY === second.y) {
											console.log("MATCH!!!! via Case F");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match;");
											break;
										}
									}// Third while
									// Reset to same cordY before going left and up.
									cordY = tempY;
								}	
							}
							// Else column moved to the left is occupied
							else
								break;
							
						}// 2nd while
						// Reset cordX since iterated to new cordY
						cordX = first.x;
					}
					// Else the cell above is occupied, break
					else
						break;
				}// First while	

			}// ---- CASE F ----


		}// CASE E & F

		// CASE G & H
		if (first.y < second.y){
			console.log("hit case G & H");

			// *********    CASE G    ********** 
			//
			//   [1].......  [1].....
			// 	 [X][X][X]:  [X][X] :
			//	 [X][2]...:  [X][X][2]
			if(!solved) {
				console.log("Case G");
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
						while(cordY < second.y) {
							cordY++; // Move down 1 row
							console.log("moved down to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							// If we have moved right and down to the location
							if(cordY === second.y && cordX === second.x) {
								console.log("MATCH!!!! via Case G");
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
										// If we reached the same x and y position, solved
										if(cordX === second.x) {
											console.log("MATCH!!!! via Case G");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match via G");
											break;
										}

									}// Third while
									// Reset to same cordY before going down and left
									cordX = tempX;
								}
							}
							// Else row moved down to is occupied
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
			}// ---- CASE G -----

			// *********    CASE H    ********** 
			//
			//   .......[1]   ....[1]
			// 	 :[X][X][X]   :[X][X]
			//	 :......[2]  [2]

			if(!solved) {
				console.log("Case H");
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
						while(cordY < second.y) {
							cordY++; // Move down 1 row
							console.log("moved down to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							// If we have moved left and down to the location
							if(cordY === second.y && cordX === second.x) {
								console.log("MATCH!!!! via Case H");
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
										// If we reached the same x and y position, solved
										if(cordX === second.x) {
											console.log("MATCH!!!! via Case H");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match via H");
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



		}// Case G & H

		//final
		if (solved) {
			app.matchSuccess(first,second);
			return true;
		}
		else
			return false;

	}//case2
};