var $ = require('jquery');
var moment = require('moment');
var dateHTML =  $('#date').attr('datetime');

module.exports = {
    calcDate: function() {

        var update = function() {
            var now = moment();
            var datemoment = moment(dateHTML, 'YYYY-M-D HH:mm:ss');            
            var timeAgo = now.diff(datemoment, 's');
            console.log(timeAgo);
            if (timeAgo < 60) {
                document.getElementById('date').innerHTML = timeAgo + " seconds";
            } else if (timeAgo < 3600) {  
                timeAgo = now.diff(datemoment, 'm');              
                document.getElementById('date').innerHTML = timeAgo + " minutes";
            } else if (timeAgo < 86400) {
                timeAgo = now.diff(datemoment, 'h');
                document.getElementById('date').innerHTML = timeAgo + " hours";
            }  else if (timeAgo < 604800)  {
                timeAgo = now.diff(datemoment, 'd');
                document.getElementById('date').innerHTML = timeAgo + " days";
            }  else {
                timeAgo = now.diff(datemoment, 'd');
                document.getElementById('date').innerHTML = timeAgo;
            }
        };

        update();
        
    }
};