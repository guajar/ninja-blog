var $ = require('jquery');
var moment = require('moment');

module.exports = {
    calcDate: function(timeId) {

        var clock = setInterval(function(){ 
            update(timeId);
        }, 1000);   

            var update = function(timeId) {
                var now = moment();
                var dateHTML =  $('#'+timeId).attr('datetime');
                var datemoment = moment(dateHTML, 'YYYY-M-D HH:mm:ss');            
                var timeAgo = now.diff(datemoment, 's');

                if (timeAgo < 60) {
                    $('#'+timeId).text(timeAgo + " seconds");
                } else if (timeAgo < 3600) {  
                    timeAgo = now.diff(datemoment, 'm');              
                    $('#'+timeId).text(timeAgo + " minutes");
                } else if (timeAgo < 86400) {
                    timeAgo = now.diff(datemoment, 'h');
                    $('#'+timeId).text(timeAgo + " hours");
                }  else if (timeAgo < 604800)  {
                    timeAgo = now.diff(datemoment);
                    $('#'+timeId).text(datemoment.format('dddd'));
                }  else {
                    timeAgo = now.diff(datemoment);
                    $('#'+timeId).text(datemoment.format('YYYY-MM-DD HH:mm:ss'));
                }                 
            };       
    }
};