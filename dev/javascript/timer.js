
//--------------------
// Countdown timers that uses jQuery-timer library
// Inside function is ran every iteration
// This object was initialized in app.init()
var timer = $.timer(function() {
    $('#countdown').html(formatTime(app.count));

    if (app.count === 0){
    	timer.stop();
    	app.gameOver();
    }
    // Decrement time by 10 milliseconds each iteration
    app.count -= 10;

    // Make sure we hit and stop at 0
    if (app.count < 0) 
    	app.count = 0;

});
//--------------------
// Convert to seconds
function formatTime(ms) {
    return ms / 1000;
}