var $ = require('jquery');

module.exports = {
    counter: function() {
        var count = localStorage.getItem('clickcount');
        $('#idLikes').text(Number(count));

        $(".likes").on("click", function() {            
            if(typeof(Storage) !== "undefined") {            
                if (localStorage.clickcount) {
                    localStorage.clickcount = Number(localStorage.clickcount)+1;
                } else {
                    localStorage.clickcount = 1;
                }
                $('#idLikes').text(localStorage.clickcount);
            } else {
                alert("Sorry, your browser does not support web storage...");
            } 
        });
              
    }
};