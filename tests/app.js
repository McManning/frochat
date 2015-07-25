
requirejs.config({
    paths: {
        'frochat': '../src/frochat' //'../dist/frochat'
    }
});

require([
    'frochat'
], function(Frochat) {

    var context = false;

    var chat = new Frochat(context, {
        element: document.getElementById('chatbox'),
        placeholder: 'Tab to start typing ...', // Input placeholder
        minWidth: 200, // Minimum dimensions when resizing
        minHeight: 100, // Minimum dimensions when resizing
        maxHistory: 10
    });


});
