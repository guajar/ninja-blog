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
    $(this).find(".postDate").each(function() { 
        var element = this;
        var timeId = $(this).attr("id");
        DateControl.calcDate(timeId);
    });


    // manejador del contador "likes" 
    if(typeof(Storage)!=="undefined") {
        $(".art-social").on("click", ".like-button", function() {
            var likeId = $(this).attr("id");
            LikeCounter.counter(likeId);
        });
    } else {
        alert ("Sorry, your browser does not support web storage");
    } 

    $(this).find(".like-button").each(function() {
        var likeId = $(this).attr("id");
        LikeCounter.checkIsLiked(likeId);
    }); 
});
