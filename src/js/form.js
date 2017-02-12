var $ = require('jquery');
var CommsService = require('./CommsService');
var CommsListManager = require('./CommsListManager');

var inputName = $('#form-name')[0];
var inputEmail = $('#form-mail')[0];
var commentsTextArea = $("#comment");


$('.new-comm-form').on("submit", function() {
    var self = this;

    if(inputName.checkValidity() === false) {
        alert("Insert name correctly");
        inputName.focus();
        return false;
    } 

    if(inputEmail.checkValidity() === false) {
        alert("Insert email correctly");
        inputEmail.focus();
        return false;
    } 

    if (countWords(commentsTextArea.val()) > 120) {
        alert("120 words max.");
        commentsTextArea.focus();
        return false;
    }

    //Con todos los campos OK, guardamos en el Backend la canción
    var comment = {
        author: $('#form-name').val(),
        mail: $('#form-mail').val(),
        comentario: commentsTextArea.val()
    };

    // Antes de enviar el formulario, bloqueamos el botón de enviar
    $(this).find("button").text("Saving comment...").attr("disabled", true);

    CommsService.save(comment, function(data) {
        alert("Comment saved correctly");
        self.reset();   //Resetea el formulario
        $(self).find("button").text("Submit").attr("disabled", false);
        CommsListManager.loadComms();
    }, function(error) {
        alert("Error saving comment");
        $(self).find("button").text("Submit").attr("disabled", false);
    });

    return false;
});

function countWords (phrase) {
    var phraseReplaceSpaces = phrase.replace(/\s\s+/g, ' ').trim();
    var arrayOfWords = phraseReplaceSpaces.split(' ');
    var numberOfWords = arrayOfWords.length;
    return numberOfWords;
}








