#Cosella

##[Live demo](http://mmcfadyen.ca/cosella)

##About

Recreating [a flash game](http://www.g12345.com/2042.html) to test my skills in JavaScript & jQuery. Built multiple algorithms to check different kinds of matches available. The game includes instructions on how to match squares, multiple levels, 'MORE TIME' Power Up, 'RE-ORDER' the unsolved squares, and a Highscore system built in Firebase.

##Instructions

The goal of the game is to match squares that contain the same icon. You can match squares by clicking on them. There are 4 different paths you can take to match a square. The path needs to be free of other unsolved squares. The path you can take can change direction 3 times.

* Different Paths you can Match Squares.
	1. Straight line
		
		```
		[X]---[X]
		
			or
		
			[X]
			 |
			 |
			[X]
		```

	2. "L" shaped Path in any direction for example:
		
		```
			 [X]      ----[X]
			  |      |
			  |	     |
		[X]----     [X]
		```

	3. "U" Shaped Path in any direction for example:
		
		```
		[X]   [X]   [X]---
		 |     |          |
		 |_____|    [X]---
		```

	4. "Zig-Zag" Path in any direction for example:
		
		```
		[X]----             [X]
			   |           ___|
			   ----[X]    |
	   		             [X]
	    ```

* 'MORE TIME' Power Up
	* Adds 10 seconds to the game clock
	* Match a Green Robots to add an additional Power-Up
	* Start game with 3

* 'RE-ORDER' Button
	* re-arrange all the unsolved squares on cells that haven't been solved
	* You can use RE-ORDER twice per level
	* Resets back to 2 every level.


##Technologies

* JavaScript & jQuery
* Firebase
* Jade
* SASS
* Grunt
* Bower

##Getting Started

1. Grunt installation
	
	```
	sudo npm install
	```
2. Development with Grunt

	* Work out of dev/ folder 
	```
	grunt
	```
3. Deploy to server
	
	* Mangle Js file with uglify task for.
	* Use all files in dist/ folder
	```
	grunt deploy
	```
