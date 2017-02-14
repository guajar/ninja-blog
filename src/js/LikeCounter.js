var $ = require('jquery');

var like = $('.likes');
var nolike = $('.no-likes');

module.exports = {
    counter: function(likeId) {
        var val = localStorage.getItem(likeId);
        if (val === null || val === undefined) {
            localStorage.setItem(likeId, 1);
            $("#"+likeId).removeClass().addClass('no-likes');  
                
        } else  {    
            $("#"+likeId).removeClass().addClass('likes');
            localStorage.removeItem(likeId);            
        }             
    }          
};
