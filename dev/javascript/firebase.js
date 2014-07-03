var firebase = {



	init: function() {
		console.log("fb");
		firebase.db = new Firebase('https://cosella.firebaseio.com/highscores');

	},

	push: function(name, twitterHandle, level, score) {
		var twitterUrl = "https://twitter.com/" + twitterHandle;
		firebase.db.push({'name': name , 'twitter': twitterUrl, 'level': level, 'score': score});
	},

	getHighscores: function() {

	}

};