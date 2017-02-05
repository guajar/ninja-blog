var $ = require('jquery');

module.exports = {
    counter: function() {
        if(typeof(Storage) !== "undefined") {
            if (localStorage.clickcount) {
                localStorage.clickcount = Number(localStorage.clickcount)+1;
            } else {
                localStorage.clickcount = 1;
            }
            document.getElementById("idLikes").innerHTML = localStorage.clickcount;
        } else {
            alert("Sorry, your browser does not support web storage...");
        }  
    }
};