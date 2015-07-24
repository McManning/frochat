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

    function Plugin(context, options) {
        this.context = context;
        this.options = options;

        this.el = options.element;
        this.minWidth = options.minWidth || 200;
        this.minHeight = options.minHeight || 100;
        this.placeholder = options.placeholder || '';

        //wrap(this.element);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

        this.el.addEventListener('mousedown', this.onMouseDown);
        this.el.addEventListener('mouseup', this.onMouseUp);
    }

    Plugin.prototype.onMouseDown = function(evt) {
        evt = evt || window.event;
        var x = evt.clientX,
            y = evt.clientY,
            top = this.el.style.top.replace('px', ''),
            left = this.el.style.left.replace('px', '');

        this.dx = x - left;
        this.dy = y - top;

        var container = this.el.parentNode;

        container.style.cursor='move';

        document.addEventListener('mousemove', this.onMouseMove);
    };

    Plugin.prototype.onMouseUp = function() {

        var container = this.el.parentNode;
        container.style.cursor = 'default';

        // Remove move listener
        document.removeEventListener('mousemove', this.onMouseMove);
    };

    Plugin.prototype.onMouseMove = function(evt) {
        console.log('mousemove');

        evt = evt || window.event;
        var x = evt.clientX - this.dx,
            y = evt.clientY - this.dy;

        var container = this.el.parentNode;

        var eWi = parseInt(this.el.style.width),
            eHe = parseInt(this.el.style.height),
            cWi = parseInt(container.style.width),
            cHe = parseInt(container.style.height);

        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x + eWi > cWi) x = cWi - eWi;
        if (y + eHe > cHe) y = cHe - eHe;

        this.el.style.left = x + 'px';
        this.el.style.top = y + 'px';
    };

    //fro.plugins.Frochat = Plugin;
    return Plugin;
});
