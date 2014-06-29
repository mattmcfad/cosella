

// 120 seconds
var count = 115000;
var timer = $.timer(function() {
    $('#countdown').html(formatTime(count));

    if (count === 0){
    	timer.stop();
    	app.gameOver();
    }
    count -= 10;
    if (count < 0) count = 0;

});

function formatTime(ms) {
    return ms / 1000;
}