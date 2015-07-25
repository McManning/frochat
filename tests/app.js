
requirejs.config({
    paths: {
        'fro': '../../frojs/dist/fro',
        'frochat': '../src/frochat', //'../dist/frochat',
        'emojify': '../src/vendor/emojify.min' // https://cdnjs.cloudflare.com/ajax/libs/emojify.js/0.9.5/emojify.min.js
    }
});

require([
    'fro',
    'frochat',
    'emojify'
], function(fro, Frochat, emojify) {

    // For Emojify information:
    // https://github.com/Ranks/emojify.js
    // http://www.emoji-cheat-sheet.com/

    var context = new fro.World({
        plugins: {
            // This is the part that matters: Configuration for the Frochat plugin.
            Frochat: {
                element: document.getElementById('chatbox'),
                placeholder: 'Tab to start typing ...', // Input placeholder
                minWidth: 200, // Minimum dimensions when resizing
                minHeight: 100, // Minimum dimensions when resizing
                maxHistory: 10
            }
            // Everything below this line is just boilerplate setup crap. :)
        },
        renderer: {
            canvas: document.getElementById('fro-canvas'),
            background: [145, 184, 101]
        },
        world: {
            entities: []
        },
        player: {
            type: 'Actor',
            id: 'player',
            position: [0, 0, 0],
            name: 'Local Player',
            direction: 2, // south
            action: 0, // idle
            avatar: {
                type: 'Animation',
                url: "http://i.imgur.com/MAT9aD2.png", // Original frojs default avatar
                autoplay: true,
                width: 32,
                height: 32,
                keyframes: {
                    move_2: {
                        loop: true,
                        frames: [0, 1000, 1, 1000]
                    },
                }
            }
        }
    });

});
