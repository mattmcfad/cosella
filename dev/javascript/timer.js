

var timer = $.timer(function() {
    $('#countdown').html(formatTime(app.count));

    if (app.count === 0){
    	timer.stop();
    	app.gameOver();
    }
    app.count -= 10;
    if (app.count < 0) 
    	app.count = 0;

});

function formatTime(ms) {
    return ms / 1000;
}