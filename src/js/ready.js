var $ = require('jquery');
var LikeCounter = require('./LikeCounter');
var DateControl = require('./DateControl');

var like = $('.likes');
var nolike = $('.no-likes');


$(document).ready(function() {

    // manejador de control de fechas
    DateControl.calcDate();

    // manejador del contador "likes" 
    var ids = $(this).find(".no-likes").each(function(i) {
        var id = this;
    });

/*
    for(var i=0; i<3; i++) {
        var c = localStorage.getItem('clickcount' + i);
    }
*/
    LikeCounter.counter();
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