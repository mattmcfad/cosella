//--------------------
// Test if two cells are on same row or column
var case1 = {
	
	test: function(first,second) {
		
		var cordX = first.x, cordY = first.y, solved = false, cell;

		// If they are both on same column
		if (first.x === second.x) {

			// If selected [1]
			//			    .
			//	       		.
			//	 		   [2]
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
			// If selected [1] .... [2]
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
			// Else selected [2] .... [1]
			//
			else if (first.x > second.x){
				while (cordX > second.x){
					cordX--;
					cell = $('#'+app.getId(cordX,cordY));
					if (cordX === second.x){
						//console.log('match!');
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
	}// case1
};