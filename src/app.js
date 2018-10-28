(function(window, document) {
    "use strict"

    var counter = 0;
    var data = {};

    /**
     * Enture of the game
     * 
     * @param {HTMLElement} element 
     * 
     * @property {HTMLElement} element 
     * @property {Array} clients
     * @property {Object} state
     */
    function App(element) {
        this.clients = [];
        this.steps = [];
        this.element = element;
        this.width = document.body.clientWidth;
        this.height = document.body.clientHeight;
        this.state = {on: false};
    }

    /**
     * Set data.
     * 
     * @param {String} key
     * @param {any} value
     */
    App.prototype.setData = function(key, value) {
        data[key] = value;
    };

    /**
     * Get data.
     * 
     * @param {String} key
     * @return {any}
     */
    App.prototype.getData = function(key) {
        return data[key];
    };

    /**
     * Append a element to app dom.
     * 
     * @param {HTMLElement} htmlElement
     */
    App.prototype.appendChild = function(htmlElement) {
        this.element.appendChild(htmlElement);
    };

    /**
     * Attach a client to list and set client id.
     * 
     * @param {Object} client
     */
    App.prototype.attach = function(client) {
        client.id = counter++;
        this.clients[client.id] = client;
    };

    /**
     * Delete a client from clients list.
     * 
     * @param {Object} client
     */
    App.prototype.detach = function(client) {
        delete this.clients[client.id];
    }

    /**
     * Get client from client id.
     * 
     * @param {Number} clientId
     * @return {Object}
     */
    App.prototype.getClientFromId = function(clientId) {
        return this.clients[clientId];
    };

    /**
     * Terminate all clients and clear clients list.
     */
    App.prototype.clearClients = function() {
        for (var key in this.clients) {
            if (this.clients[key].terminate) {
                this.clients[key].terminate();
            }
        }
        this.clients = [];
        window.layer_step.terminate();
    };

    App.prototype.step = function() {
        var step = (function(timestamp) {
            if (this.state.on) {
                for (var key in this.clients) {
                    this.clients[key].update(timestamp);
                }
                window.requestAnimationFrame(step);
            }
        }).bind(this);
        return step;
    };

    App.prototype.start = function() {
        this.state.on = true;
        window.requestAnimationFrame(this.step());
    };

    App.prototype.stop = function() {
        this.state.on = false;
    };

    App.prototype.constructor = App;

    window.App = App;
})(window, window.document);
