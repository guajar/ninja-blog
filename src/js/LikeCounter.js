var $ = require('jquery');

module.exports = {
    counter: function(likeId) {                
        if (localStorage.clickcount) {                   
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
        $('.num-likes').text(Number(localStorage.clickcount));           
    }
};