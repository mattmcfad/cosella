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
		var twitterUrl = "https://twitter.com/" + twitterHandle;
		firebase.db.push({'name': name , 'twitter': twitterUrl, 'level': level, 'score': score});
	},

	
	getHighscores: function() {


		firebase.localDB.sort(function(a,b) {
			return b.score - a.score;
		});
		var selector = $('ol');
		for (var i = 0; i < firebase.localDB.length; i++) {
	

			selector.append("<li>Name: "+
			firebase.localDB[i].name + 
			 " " +   firebase.localDB[i].twitter + 
			 " lvl:"+firebase.localDB[i].level + 
			 " <span class='score'>" + firebase.localDB[i].score + "</span></li>");

		}
	}

};