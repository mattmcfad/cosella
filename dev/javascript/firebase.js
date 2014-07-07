//--------------------
// Handle database Create and Read commands with Firebase
var firebase = {

    //--------------------
	// create link to Firebase
	init: function() {
		firebase.db = new Firebase('https://cosella.firebaseio.com/highscores');
		
		// Create local DB for sorting highest score
		firebase.localDB = Array();


		// Pull in data from Firebase DB
		firebase.db.on('child_added', function(snapshot) {
			var obj = snapshot.val();
			// populate a local database to manipulate
			firebase.localDB.push(obj);
		});

	},

    //--------------------
	// Add a high score to Firebase DB
	// @param name - String user entered
	// @param twitterHandle - String user entered, default @mattmcfad
	// @param level - int Highest level the user reached
	// @param score - int Total Score that user acquired
	push: function(name, twitterHandle, level, score) {
		// push to firebase database
		firebase.db.push({'name': name , 'twitter': twitterHandle, 'level': level, 'score': score});
	},

    //--------------------
	// Add new score to Database, determine rank based on score
	parseScore: function(score, level) {

		$('#usrlvl').text(level);
		$('#usrpoints').text(score);

		// Use You! and @yourTwitterHandle as placeholders, to be retrieved through firebase.getRank()
		var obj = { 'name': 'You!', 'twitter': '@yourTwitterHandle', 'level': level, 'score' :score};

		// push to local DB to sort amongst firebase DB
		firebase.localDB.push(obj);

		// Get rank and set user's rank
		$('#usrRank').text(firebase.getRank());

	},
    
    //--------------------
	// Iterate through local DB to determine your rank in database
	// @return int - Rank in highscore database 
	getRank: function() {
		
		firebase.sortDB();

		// Find placeholder name of "You!" return iteration = rank
		for (var i = 0; i < firebase.localDB.length; i++){
			if(firebase.localDB[i].name === "You!")
				return (i+1); // rank ordering start at 1
		}

		return '99';
	},

    //--------------------
	// Sort the local DB based on highest to lowest Score
	sortDB: function() {
		firebase.localDB.sort(function(a,b) {
			return b.score - a.score;
		});
	},
	
	//--------------------
	// Populate High scores page
	getHighscores: function() {

		var selector = $('ol');
		selector.html('');
		// Iterate through all the local database which has already been ordered highest to lowest rank
		for (var i = 0; i < firebase.localDB.length ; i++) {
			var twitterHandle = firebase.localDB[i].twitter;
			// Ensure @ is on front of twitter handle
			if (twitterHandle.charAt(0) !== '@')
				twitterHandle = '@' + twitterHandle;
			var twitterUrl = "https://twitter.com/" + twitterHandle;

			// Append this lovely looking HTML... 
			// which should be tabular data... I KNOW!
			selector.append("<li class='scoreListItem'><div class='middle'>"+
			 "<div class='top'>"+firebase.localDB[i].name + "<span class='usrlvl'> Level</span></div>" + 
			 "<div class='bottom'><a href='"+twitterUrl+"'target='_blank'>"+twitterHandle+"</a><span class='usrlvl'>"+ firebase.localDB[i].level + "</span></div></div>" + 
			 " <p class='right'>" + firebase.localDB[i].score + "</p></li>");

		}
	},

};