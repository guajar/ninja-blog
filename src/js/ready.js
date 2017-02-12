var $ = require('jquery');
var LikeCounter = require('./LikeCounter');
var DateControl = require('./DateControl');
var CommsListManager = require('./CommsListManager');

var like = $('.likes');
var nolike = $('.no-likes');


$(document).ready(function() {

    // cargar las canciones
    CommsListManager.loadComms();
    
    // manejador de control de fechas
    DateControl.calcDate();

    // manejador del contador "likes" 
    //LikeCounter.counter();
    $(".art-social").on("click", ".likes" || ".no-likes", function() {
        var likeId = $(this).data("id");
        if(typeof(Storage) !== "undefined") {  
            if (localStorage.clickcount) {  
                if (localStorage.clickcount == 1) {
                    like.removeClass().addClass('.likes');
                } else {
                    nolike.removeClass().addClass('.no-likes');
                }
            }
             
        } else {
            alert("Sorry, your browser does not support web storage...");
        }
    });
    
});