var firebase = {


	// create link to Firebase
	init: function() {
		firebase.db = new Firebase('https://cosella.firebaseio.com/highscores');
		
		// Create local DB for sorting highest score
		firebase.localDB = Array();


		// Pull in data from Firebase DB
		firebase.db.on('child_added', function(snapshot) {
			var obj = snapshot.val();
			firebase.localDB.push(obj);
		});

	},


	// Add a high score to Firebase DB
	push: function(name, twitterHandle, level, score) {
		
		firebase.db.push({'name': name , 'twitter': twitterHandle, 'level': level, 'score': score});
	},

	parseScore: function(score, level) {

		$('#usrlvl').text(level);
		$('#usrpoints').text(score);

		var obj = { 'name': 'You!', 'twitter': '@yourTwitterHandle', 'level': level, 'score' :score};

		firebase.localDB.push(obj);

		$('#usrRank').text(firebase.getRank());

	},

	getRank: function() {
		
		firebase.sortDB();

		for (var i = 0; i < firebase.localDB.length; i++){
			if(firebase.localDB[i].name === "You!")
				return (i+1);
		}

		return '99';
	},

	sortDB: function() {
		firebase.localDB.sort(function(a,b) {
			return b.score - a.score;
		});
	},
	
	getHighscores: function() {

		var selector = $('ol');
		selector.html('');
		// || i < firebase.localDB.length
		for (var i = 0; i < 5 ; i++) {
			var twitterHandle = firebase.localDB[i].twitter;
			// Ensure @ is on front of twitter handle
			if (twitterHandle.charAt(0) !== '@')
				twitterHandle = '@' + twitterHandle;
			var twitterUrl = "https://twitter.com/" + twitterHandle;

			selector.append("<li class='scoreListItem'><div class='middle'>"+
			 "<div class='top'>"+firebase.localDB[i].name + "<span class='usrlvl'> Level</span></div>" + 
			 "<div class='bottom'><a href='"+twitterUrl+"'target='_blank'>"+twitterHandle+"</a><span class='usrlvl'>"+ firebase.localDB[i].level + "</span></div></div>" + 
			 " <p class='right'>" + firebase.localDB[i].score + "</p></li>");

		}
	},

};