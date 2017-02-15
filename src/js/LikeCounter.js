var $ = require('jquery');

module.exports = {
    counter: function(likeId) { 
        if (!localStorage.getItem(likeId)) {
            localStorage.setItem(likeId, 1);
            $("#"+likeId).removeClass('no-likes').addClass('likes');                
        } else  {    
            $("#"+likeId).removeClass('likes').addClass('no-likes');  
            localStorage.removeItem(likeId);            
        }             
    }          
};
