(function(window, document) {
    "use strict"

    /**
     * Create a canvas layer.
     * 
     * @param {string} width canvas width
     * @param {string} height canvas height
     * @property {HTMLCanvasElement} canvas
     */
    function Layer(width, height) {
        this.width = width;
        this.height = height;
        this.canvasOffscreen = this.creatCanvas(width, height);
        this.ctxOffscreen = this.canvasOffscreen.getContext('2d');
        this.canvas = this.creatCanvas(width, height);
        this.ctx = this.canvas.getContext('2d');
        this.image = new Image(width, height);
    }

    Layer.prototype.creatCanvas = function(width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.style.position = 'fixed';
        canvas.style.top = 0;
        canvas.style.left = 0;
        return canvas;
    };

    /**
     * Get canvas dom.
     * 
     * @return {HTMLCanvasElement}
     */
    Layer.prototype.getCanvas = function() {
        return this.canvas;
    };

    /**
     * Get 2d content object.
     * 
     * @return { CanvasRenderingContext2D }
     */
    Layer.prototype.getCtx = function() {
        return this.ctxOffscreen;
    };

    /**
     * Get position of canvas from window position.
     * 
     * @param { Number } x
     * @param { Number } y
     * @return { Object }
     */
    Layer.prototype.getPosition = function(x, y) {
        return functools.windowToCanvasPosition(this.canvas, x, y);
    };

    /**
     * Update image with current canvas.
     */
    Layer.prototype.updateScreen = function() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.drawImage(this.canvasOffscreen, 0, 0, this.width, this.height);
    };

    /**
     * Terminate canvas dom.
     */
    Layer.prototype.terminate = function() {
        this.canvas.remove();
        this.canvasOffscreen.remove();
    };

    Layer.prototype.constructor = Layer;
    window.Layer = Layer;
})(window, window.document);
