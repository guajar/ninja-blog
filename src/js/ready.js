var $ = require('jquery');
var LikeCounter = require('./LikeCounter');
var DateControl = require('./DateControl');
var CommsListManager = require('./CommsListManager');
var Scrollpoints = require('scrollpoints');
var elem = $('#section-comments')[0];


$(document).ready(function() {

    // cargar los commentarios
    if(elem !== undefined) {
        Scrollpoints.add(elem, function(domElement) {
            CommsListManager.loadComms();
        });
    }    
    
    // manejador de control de fechas
    DateControl.calcDate();

    // manejador del contador "likes" 
    $(".art-social").on("click", ".like, .no-likes", function() {
        var likeId = $(this).attr("id");
        LikeCounter.counter(likeId);
    });   
});
