var $ = require('jquery');

var API_URL = "api/comments/";

module.exports = {

    //recuperar todos los comentarios
    list: function(successCallback, errorCallback) {
        $.ajax({
            url: API_URL,
            type: "get",   //get => recuperar datos en un API REST
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.log("CommsServiceError", error);
            }
        });    
    },

    //guardar un comentario
    save: function(comment) {
        $.ajax({
            url: API_URL,        
            type: "post",       // post => Crear una canción
            data: comment,
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.log("CommsServiceError", error);
            }
        });
    }
};