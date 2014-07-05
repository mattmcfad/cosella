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
		
		firebase.db.push({'name': name , 'twitter': twitterUrl, 'level': level, 'score': score});
	},

	
	getHighscores: function() {


		firebase.localDB.sort(function(a,b) {
			return b.score - a.score;
		});
		var selector = $('ol');
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
	}

};