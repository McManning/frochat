/*!
 *  frojs is a Javascript based visual chatroom client.
 *  Copyright (C) 2015 Chase McManning <cmcmanning@gmail.com>
 *
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License along
 *  with this program; if not, write to the Free Software Foundation, Inc.,
 *  51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

define([
    
], function() {

    function timestamp() {
        var date = new Date();
        var hour = date.getHours();
        var min = ('00' + date.getMinutes()).slice(-2);
        var sec = ('00' + date.getSeconds()).slice(-2);
        
        return hour + ":" + min + ":" + sec;
    }
    
    function Plugin(context, options) {
        this.context = context;
        this.options = options;

        this.el = options.element;
        this.minWidth = options.minWidth || 200;
        this.minHeight = options.minHeight || 100;
        this.placeholder = options.placeholder || '';
        this.maxHistory = options.maxHistory || 100;

        //wrap(this.element);

        this.onKeyDown = this.onKeyDown.bind(this);

        this.onDraggerMouseDown = this.onDraggerMouseDown.bind(this);
        this.onDraggerMouseUp = this.onDraggerMouseUp.bind(this);
        this.onDraggerMouseMove = this.onDraggerMouseMove.bind(this);

        this.onResizerMouseDown = this.onResizerMouseDown.bind(this);
        this.onResizerMouseUp = this.onResizerMouseUp.bind(this);
        this.onResizerMouseMove = this.onResizerMouseMove.bind(this);

        // Bind event listeners to our various components
        this.el.querySelector('input').addEventListener('keydown', this.onKeyDown);
        this.el.querySelector('.header').addEventListener('mousedown', this.onDraggerMouseDown);
        this.el.querySelector('.resizer').addEventListener('mousedown', this.onResizerMouseDown);
    }

    Plugin.prototype.append = function(message) {
        var el = document.createElement('P'),
            output = this.el.querySelector('.output-container');

        var now = timestamp();

        el.innerHTML = '<span class="timestamp">' + now + '</span> ' + message;

        // Append and scroll the div to the bottom
        output.appendChild(el);
        output.scrollTop = output.scrollHeight;

        // If we have too many messages, delete the oldest
        var lines = output.querySelectorAll('p');
        if (lines.length > this.maxHistory) {
            output.removeChild(lines[0]);
        }
    };

    Plugin.prototype.onKeyDown = function(evt) {
        evt = evt || window.event;

        if (evt.keyCode === 13 && evt.target.value.length > 0) {
            this.append(evt.target.value);
            evt.target.value = '';
        }
    };

    Plugin.prototype.onResizerMouseDown = function(evt) {
        evt = evt || window.event;

        this.rx = evt.clientX;
        this.ry = evt.clientY;

        this.rw = parseInt(document.defaultView.getComputedStyle(this.el).width);
        this.rh = parseInt(document.defaultView.getComputedStyle(this.el).height);

        document.addEventListener('mousemove', this.onResizerMouseMove, false);
        document.addEventListener('mouseup', this.onResizerMouseUp, false);
    };

    Plugin.prototype.onResizerMouseUp = function(evt) {
        evt = evt || window.event;

        document.removeEventListener('mousemove', this.onResizerMouseMove, false);    
        document.removeEventListener('mouseup', this.onResizerMouseUp, false);
    };

    Plugin.prototype.onResizerMouseMove = function(evt) {
        evt = evt || window.event;

        var w = this.rw + evt.clientX - this.rx,
            h = this.rh + evt.clientY - this.ry;

        if (w > this.minWidth) {
            this.el.style.width = w + 'px';
        }

        if (h > this.minHeight) {
            this.el.style.height = h + 'px';
        }
    };

    Plugin.prototype.onDraggerMouseDown = function(evt) {
        evt = evt || window.event;

        var x = evt.clientX,
            y = evt.clientY,
            top = this.el.style.top.replace('px', ''),
            left = this.el.style.left.replace('px', '');

        this.dx = x - left;
        this.dy = y - top;

        var container = this.el.parentNode;

        container.style.cursor='move';

        document.addEventListener('mousemove', this.onDraggerMouseMove, false);
        document.addEventListener('mouseup', this.onDraggerMouseUp, false);
    };

    Plugin.prototype.onDraggerMouseUp = function() {
        var container = this.el.parentNode;

        container.style.cursor = 'default';

        document.removeEventListener('mousemove', this.onDraggerMouseMove, false);    
        document.removeEventListener('mouseup', this.onDraggerMouseUp, false);
    };

    Plugin.prototype.onDraggerMouseMove = function(evt) {
        evt = evt || window.event;

        var container = this.el.parentNode,
            x = evt.clientX - this.dx,
            y = evt.clientY - this.dy,
            ew = parseInt(this.el.style.width),
            eh = parseInt(this.el.style.height),
            cw = parseInt(container.style.width),
            ch = parseInt(container.style.height);

        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x + ew > cw) x = cw - ew;
        if (y + eh > ch) y = ch - eh;

        this.el.style.left = x + 'px';
        this.el.style.top = y + 'px';
    };

    //fro.plugins.Frochat = Plugin;
    return Plugin;
});
