(function(window, document) {
    "use strict"

    /**
     * Doodle client.
     * @param {Layer} layer
     * 
     * @property {Layer} layer
     */
    function StepClient(layer, x, y) {
        BaseClient.call(this, layer, app.getData('images').step_green);
        this.ctx = this.layer.getCtx();
        this.lock = false;
        this.state = {
            timestamp: 0,
            x: x,
            y: y,
            lastX: x,
            lastY: y,
            bottom: y
        };
    };

    StepClient = functools.extends(StepClient, BaseClient);

    StepClient.prototype.update = function(timestamp) {
        this.clearRendering(this.ctx, this.state.lastX, this.state.lastY);
        this.render(this.ctx, this.state.x, this.state.y);
        this.layer.updateScreen();
        this.state.lastX = this.state.x;
        this.state.lastY = this.state.y;
        if (this.state.y < this.state.bottom) {
            this.state.y += 15;
        } else {
            this.lock = false;
        }
    };

    /**
     * Get current position.
     * @return { Object }
     */
    StepClient.prototype.getPosition = function() {
        return {
            x: this.state.x,
            y: this.state.y
        }
    };

    StepClient.prototype.setBottom = function(value) {
        if (! this.lock) {
            this.lock = true;
            this.state.bottom += value;
        }
    };

    /**
     * Get body width.
     * @return { Number }
     */
    StepClient.prototype.getWidth = function() {
        return this.image.width;
    };

    StepClient.prototype.terminate = function() {
        this.ctx.clearRect(this.state.x, this.state.y, this.image.width, this.image.height)
        app.detach(this);
    };

    window.StepClient = StepClient;

})(window, window.document);
