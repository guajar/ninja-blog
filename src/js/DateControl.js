var $ = require('jquery');
var moment = require('moment');
var dateHTML =  $('.postDate').attr('datetime');

module.exports = {
    calcDate: function() {

        var update = function() {
            var now = moment();
            var datemoment = moment(dateHTML, 'YYYY-M-D HH:mm:ss');            
            var timeAgo = now.diff(datemoment, 's');

            if (timeAgo < 60) {
                $('.postDate').text(timeAgo + " seconds");
            } else if (timeAgo < 3600) {  
                timeAgo = now.diff(datemoment, 'm');              
                $('.postDate').text(imeAgo + " minutes");
            } else if (timeAgo < 86400) {
                timeAgo = now.diff(datemoment, 'h');
                $('.postDate').text(timeAgo + " hours");
            }  else if (timeAgo < 604800)  {
                timeAgo = now.diff(datemoment);
                $('.postDate').text(datemoment.format('dddd'));
            }  else {
                timeAgo = now.diff(datemoment);
                $('.postDate').text(datemoment.format('YYYY-MM-DD HH:mm:ss'));
            }
            
        };

        update();
        setInterval(update, 1000);
        
    }
};