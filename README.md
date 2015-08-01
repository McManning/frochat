# frojs-chat
Interactive chatbox plugin for Frojs. Automatically displays messages from other Actors (including other connected clients) as well as allowing the local player to send messages through the chatbox. 

# Installation
Include `frojs.chat.css` with your stylesheets, and add `frojs.chat.js` in your scripts file alongside `fro.js`.

In your application's `require` block, where you include `fro`, add `frojs.chat` and create a new instance:
```javascript
require([
  'fro',
  'frojs.chat'
], function(fro, Chat) {
  
  var world = new fro.World({
    plugins: {
      // Configuration for the Chat plugin
      Chat: {
          // Chat plugin setup here (see Configuration below)
      }
      // Additional plugins here
    },
    // Other world setup here
  });
  
});
```

# Customization
Chat supports a number of options for the second configuration parameter (e.g. `new Chat(world, { ... })`)

* **element** - DOM element to convert into a chatbox (will create a new one if null)
 * default: null
* **placeholder** - Placeholder text for the chatbox input
 * default: empty string
* **minWidth** - minimum width (in pixels) of the chatbox when resizing
 * default: 200
* **minHeight** - minimum height (in pixels) of the chatbox when resizing
 * default: 100
* **maxHistory** - maximum messages to retain the chatbox. Lower values perform better
 * default: 100 

