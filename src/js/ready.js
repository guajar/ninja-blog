var $ = require('jquery');
var LikeCounter = require('./LikeCounter');
var DateControl = require('./DateControl');


$(document).ready(function() {

    // manejador de control de fechas
    DateControl.calcDate();

    // manejador del contador "likes"
    $(".likes").on("click", function() {
        LikeCounter.counter();
    });
});