var case3 = {

	//Zig Zagz
	test: function(first,second) {
		var cordX = first.x, cordY = first.y, tempX, tempY, solved = false, cell;
		console.log("---------------------------------");
		
		function init() {
			cordX = first.x; 
			cordY = first.y;
			solved = false;
		}
		
		// Case I & J
		if (first.x < second.x){
			console.log("Entered Case I & J");

			// Case I
			//		  .....[2]
			//        :
			// [1]....:

			if (!solved){
				console.log("Case I");
				init();

				// While we reached the same column 
				while (cordX < second.x && !solved) {
					cordX++; // Go right one column
					console.log("moved right to:("+cordX+","+cordY+")");
					// Get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					// If the cell just moved right to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						// While we haven't reached the same row
						while (cordY > second.y) {
							cordY--; // Go up one row
							console.log("moved up to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							// If we have moved right and up to the location
							if (cordY === second.y && cordX === second.x) {
								console.log("Match! via Case I");
								solved = true;
								break;
							}
							// If the row we just moved up to is empty
							if (cell.data().solved === true || cell.data().solved === undefined) {
								// If we reached same row
								if (cordY === second.y) {
									// When we iterate across we change cordX, cache it to prevent havoc
									tempX = cordX;
									// While we haven't moved far enough right
									while (cordX < second.x) {
										cordX++; // Move right
										console.log("moved right to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										// If we reached the same x and y position, solved
										if (cordX === second.x && cordY === second.y) {
											console.log("Match! via Case I");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match via I");
											break;
										}
									}// Third while
									// Reset to same cordX before going right and up
									cordX = tempX;				
								}
							}
							// Else row moved up to is occupied
							else
								break;
						}// 2nd while
						// Reset y cord after iterating up and right
						cordY = first.y;
					}
					// Else the cell to the right is occupied
					else
						break;

				}// first while

			}


			// Case J
			// [1].....
			//        :
			//        :....[2]

			if (!solved){
				console.log("Case J");
				init();

				// While we reached the same column 
				while (cordX < second.x && !solved) {
					cordX++; // Go right one column
					console.log("moved right to:("+cordX+","+cordY+")");
					// Get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					// If the cell just moved right to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						// While we haven't reached the same row
						while (cordY < second.y) {
							cordY++; // Go down one row
							console.log("moved down to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							// If we have moved right and down to the location
							if (cordY === second.y && cordX === second.x) {
								console.log("Match! via Case J");
								solved = true;
								break;
							}
							// If the row we just moved down to is empty
							if (cell.data().solved === true || cell.data().solved === undefined) {
								// If we reached same row
								if (cordY === second.y) {
									// When we iterate across we change cordX, cache it to prevent havoc
									tempX = cordX;
									// While we haven't moved far enough right
									while (cordX < second.x) {
										cordX++; // Move right
										console.log("moved right to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										// If we reached the same x and y position, solved
										if (cordX === second.x && cordY === second.y) {
											console.log("Match! via Case J");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match via J");
											break;
										}
									}// Third while
									// Reset to same cordX before going right and down
									cordX = tempX;				
								}
							}
							// Else row moved down to is occupied
							else
								break;
						}// 2nd while
						// Reset y cord after iterating down and right
						cordY = first.y;
					}
					// Else the cell to the right is occupied
					else
						break;

				}// first while

			}
		}// Case I & J

		// Case K & L
		if (first.y > second.y){


			// Case K
			// 	   [2]
			//  ....:
			//	:
			// [1]
			if(!solved){
				console.log("Case K");
				init();

				// While we reached the same row 
				while (cordY > second.y && !solved) {
					cordY--; // Go up one row
					console.log("moved up to:("+cordX+","+cordY+")");
					// Get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					// If the cell just moved up to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						// While we haven't reached the same column
						while (cordX < second.x) {
							cordX++; // Go right one column
							console.log("moved right to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							// If we have moved up and right to the location
							if (cordY === second.y && cordX === second.x) {
								console.log("Match! via Case K");
								solved = true;
								break;
							}
							// If the column we just moved down to is empty
							if (cell.data().solved === true || cell.data().solved === undefined) {
								// If we reached same row
								if (cordX === second.x) {
									// When we iterate across we change cordY, cache it to prevent havoc
									tempY = cordY;
									// While we haven't moved far enough up
									while (cordY > second.y) {
										cordY--; // Move up
										console.log("moved up to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										// If we reached the same x and y position, solved
										if (cordX === second.x && cordY === second.y) {
											console.log("Match! via Case K");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match via K");
											break;
										}
									}// Third while
									// Reset to same cordY before going up and right
									cordY = tempY;				
								}
							}
							// Else row moved down to is occupied
							else
								break;
						}// 2nd while
						// Reset x cord after iterating right and up
						cordX = first.x;
					}
					// Else the cell up is occupied
					else
						break;

				}// first while



			}

			// Case L
			// [2]
			//  :....
			//	    :
			// 	   [1]
			if(!solved){
				console.log("Case L");
				init();

				// While we reached the same row 
				while (cordY > second.y && !solved) {
					cordY--; // Go up one row
					console.log("moved up to:("+cordX+","+cordY+")");
					// Get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					// If the cell just moved up to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						// While we haven't reached the same column
						while (cordX > second.x) {
							cordX--; // Go left one column
							console.log("moved left to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							// If we have moved up and left to the location
							if (cordY === second.y && cordX === second.x) {
								console.log("Match! via Case L");
								solved = true;
								break;
							}
							// If the column we just moved down to is empty
							if (cell.data().solved === true || cell.data().solved === undefined) {
								// If we reached same row
								if (cordX === second.x) {
									// When we iterate across we change cordY, cache it to prevent havoc
									tempY = cordY;
									// While we haven't moved far enough up
									while (cordY > second.y) {
										cordY--; // Move up
										console.log("moved up to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										// If we reached the same x and y position, solved
										if (cordX === second.x && cordY === second.y) {
											console.log("Match! via Case L");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match via L");
											break;
										}
									}// Third while
									// Reset to same cordY before going up and left
									cordY = tempY;				
								}
							}
							// Else row moved down to is occupied
							else
								break;
						}// 2nd while
						// Reset x cord after iterating left and up
						cordX = first.x;
					}
					// Else the cell up is occupied
					else
						break;

				}// first while

			}
		}

		// Case M & N
		if (first.x > second.x){
			
			// Case M
			// [2].....
			//        :
			//        :....[1]
			if(!solved){
				console.log("Case M");
				init();

				// While we reached the same column 
				while (cordX > second.x && !solved) {
					cordX--; // Go left one column
					console.log("moved left to:("+cordX+","+cordY+")");
					// Get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					// If the cell just moved left to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						// While we haven't reached the same row
						while (cordY > second.y) {
							cordY--; // Go up one row
							console.log("moved up to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							// If we have moved left and up to the location
							if (cordY === second.y && cordX === second.x) {
								console.log("Match! via Case M");
								solved = true;
								break;
							}
							// If the row we just moved up to is empty
							if (cell.data().solved === true || cell.data().solved === undefined) {
								// If we reached same row
								if (cordY === second.y) {
									// When we iterate across we change cordX, cache it to prevent havoc
									tempX = cordX;
									// While we haven't moved far enough left
									while (cordX > second.x) {
										cordX--; // Move left
										console.log("moved left to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										// If we reached the same x and y position, solved
										if (cordX === second.x && cordY === second.y) {
											console.log("Match! via Case M");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match via M");
											break;
										}
									}// Third while
									// Reset to same cordX before going left and up
									cordX = tempX;				
								}
							}
							// Else row moved up to is occupied
							else
								break;
						}// 2nd while
						// Reset y cord after iterating up and left
						cordY = first.y;
					}
					// Else the cell to the left is occupied
					else
						break;

				}// first while


			}

			// Case N
			//		  .....[1]
			//        :
			// [2]....:
			if(!solved){
				console.log("Case N");
				init();

				// While we reached the same column 
				while (cordX > second.x && !solved) {
					cordX--; // Go left one column
					console.log("moved left to:("+cordX+","+cordY+")");
					// Get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					// If the cell just moved left to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						// While we haven't reached the same row
						while (cordY < second.y) {
							cordY++; // Go down one row
							console.log("moved down to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							// If we have moved left and down to the location
							if (cordY === second.y && cordX === second.x) {
								console.log("Match! via Case N");
								solved = true;
								break;
							}
							// If the row we just moved down to is empty
							if (cell.data().solved === true || cell.data().solved === undefined) {
								// If we reached same row
								if (cordY === second.y) {
									// When we iterate across we change cordX, cache it to prevent havoc
									tempX = cordX;
									// While we haven't moved far enough left
									while (cordX > second.x) {
										cordX--; // Move left
										console.log("moved left to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										// If we reached the same x and y position, solved
										if (cordX === second.x && cordY === second.y) {
											console.log("Match! via Case N");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match via N");
											break;
										}
									}// Third while
									// Reset to same cordX before going left and down
									cordX = tempX;				
								}
							}
							// Else row moved down to is occupied
							else
								break;
						}// 2nd while
						// Reset y cord after iterating down and left
						cordY = first.y;
					}
					// Else the cell to the left is occupied
					else
						break;

				}// first while

			}
		}

		// Case O & P
		if (first.y < second.y){

			//Case O
		    // [2]
			//  :....
			//	    :
			//     [1]

			if(!solved){
				console.log("Case O");
				init();

				// While we reached the same row 
				while (cordY < second.y && !solved) {
					cordY++; // Go down one row
					console.log("moved down to:("+cordX+","+cordY+")");
					// Get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					// If the cell just moved down to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						// While we haven't reached the same column
						while (cordX < second.x) {
							cordX++; // Go right one column
							console.log("moved right to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							// If we have moved down and right to the location
							if (cordY === second.y && cordX === second.x) {
								console.log("Match! via Case O");
								solved = true;
								break;
							}
							// If the column we just moved down to is empty
							if (cell.data().solved === true || cell.data().solved === undefined) {
								// If we reached same row
								if (cordX === second.x) {
									// When we iterate across we change cordY, cache it to prevent havoc
									tempY = cordY;
									// While we haven't moved far enough down
									while (cordY < second.y) {
										cordY++; // Move down
										console.log("moved down to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										// If we reached the same x and y position, solved
										if (cordX === second.x && cordY === second.y) {
											console.log("Match! via Case O");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match via O");
											break;
										}
									}// Third while
									// Reset to same cordY before going down and right
									cordY = tempY;				
								}
							}
							// Else row moved down to is occupied
							else
								break;
						}// 2nd while
						// Reset x cord after iterating right and down
						cordX = first.x;
					}
					// Else the cell down is occupied
					else
						break;

				}// first while



			}

			//Case P
			// 	   [1]
			//  ....:
			//	:
			// [2]

			if(!solved){
				console.log("Case P");
				init();


				// While we reached the same row 
				while (cordY < second.y && !solved) {
					cordY++; // Go down one row
					console.log("moved down to:("+cordX+","+cordY+")");
					// Get the new cell that we moved to.
					cell = $('#'+app.getId(cordX,cordY));
					// If the cell just moved down to is empty
					if (cell.data().solved === true || cell.data().solved === undefined){
						// While we haven't reached the same column
						while (cordX > second.x) {
							cordX--; // Go left one column
							console.log("moved left to:("+cordX+","+cordY+")");
							cell = $('#'+app.getId(cordX,cordY));
							// If we have moved down and left to the location
							if (cordY === second.y && cordX === second.x) {
								console.log("Match! via Case P");
								solved = true;
								break;
							}
							// If the column we just moved down to is empty
							if (cell.data().solved === true || cell.data().solved === undefined) {
								// If we reached same row
								if (cordX === second.x) {
									// When we iterate across we change cordY, cache it to prevent havoc
									tempY = cordY;
									// While we haven't moved far enough down
									while (cordY < second.y) {
										cordY++; // Move down
										console.log("moved down to:("+cordX+","+cordY+")");
										cell = $('#'+app.getId(cordX,cordY));
										// If we reached the same x and y position, solved
										if (cordX === second.x && cordY === second.y) {
											console.log("Match! via Case P");
											solved = true;
											break;
										}
										// Else if cell we just went to is occupied, break
										else if (cell.data().solved === false){
											console.log("no match via P");
											break;
										}
									}// Third while
									// Reset to same cordY before going down and left
									cordY = tempY;				
								}
							}
							// Else row moved down to is occupied
							else
								break;
						}// 2nd while
						// Reset x cord after iterating left and down
						cordX = first.x;
					}
					// Else the cell down is occupied
					else
						break;

				}// first while

			}
		}


		//final
		if (solved) {
			app.matchSuccess(first,second);
			return true;
		}
		else
			return false;


	}//case3
};