
requirejs.config({
    paths: {
        'frochat': '../src/frochat', //'../dist/frochat',
        'emojify': '../src/vendor/emojify.min' // https://cdnjs.cloudflare.com/ajax/libs/emojify.js/0.9.5/emojify.min.js
    }
});

require([
    'frochat',
    'emojify'
], function(Frochat, emojify) {

    // For Emojify information:
    // https://github.com/Ranks/emojify.js
    // http://www.emoji-cheat-sheet.com/

    var context = false;

    var chat = new Frochat(context, {
        element: document.getElementById('chatbox'),
        placeholder: 'Tab to start typing ...', // Input placeholder
        minWidth: 200, // Minimum dimensions when resizing
        minHeight: 100, // Minimum dimensions when resizing
        maxHistory: 10
    });

});
