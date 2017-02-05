var $ = require('jquery');

var LikeCounter = require('./LikeCounter');

$(document).ready(function() {

    // manejador del contador "likes"
    $(".likes").on("click", function() {
        LikeCounter.counter();
    });
});