var $ = require('jquery');
var CommsService = require('./CommsService');

module.exports = {
    setUiIdeal: function() {
        $('.comms-list').removeClass().addClass('comms-list ideal');
    },

    setUiBlank: function() {
        $('.comms-list').removeClass().addClass('comms-list blank');
    },

    setUiError: function() {
        $('.comms-list').removeClass().addClass('comms-list error');
    },

    setUiLoading: function() {
        $('.comms-list').removeClass().addClass('comms-list loading');
    },

    loadComms: function() {
        var self = this;

        // mostrar Loading Icon
        self.setUiLoading();

        //cargamos los comentarios desde el backend
        CommsService.list(function(comms){ // si nos devuelve comentarios
            if (comms.length === 0) {
                self.setUiBlank(); // si no hay comentarios -> estado en blanco
            } else {
                // pintar las comentarios en el listado
                self.renderComms(comms);
                self.setUiIdeal(); // ponemos el estado ideal
            }
        }, function(error){ // si se produce algún error
            self.setUiError(); // ponemos el estado error
        });
    },

    renderComms: function(comms) {
        var html = '';
        for (var i in comms) {
            var comm = comms[i];
            html += '<article class="comment">';
            html += '<div class="author-name">' + comm.author + '</div>';
            html += '<div class="comm-text">' + comm.comentario + '</div>';
            html += '</div>';
            html += "</article>";
        }
        $(".comms-list .ui-ideal").html(html);
    }
};