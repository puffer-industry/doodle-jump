(function(window, document) {
    "use strict"

    /**
     * Doodle client.
     * @param {Layer} layer
     * 
     * @property {Layer} layer
     */
    function DoodleClient(layer) {
        var images = app.getData('images');
        BaseClient.call(this, layer, images.doodle_right);
        this.image_left = images.doodle_left;
        this.image_right = images.doodle_right;
        this.ctx = this.layer.getCtx();

        this.state = {
            timestamp: 0,
            x: app.width / 2,
            y: app.height/4,
            lastX: app.width / 2,
            lastY: app.height/4,
            g: 1,
            speedX: 0,
            speedY: 0,
            jumpHight: app.height - this.image.height,
            fixedHeight: 0
        };
    };

    DoodleClient = functools.extends(DoodleClient, BaseClient);

    DoodleClient.prototype.update = function(timestamp) {
        if (this.state.fixedHeight > 0) {
            this.state.fixedHeight -= 15;
            if (this.state.fixedHeight < 0) {
                this.state.fixedHeight = 0;
            }
        }

        this.clearRendering(this.ctx, this.state.lastX, this.state.lastY);
        if (this.state.fixedHeight > 0) {
            this.render(this.ctx, this.state.x, this.state.y);
        } else {
            this.render(this.ctx, this.state.x, this.state.y);
        }
        this.layer.updateScreen();

        this.state.lastX = this.state.x;
        this.state.lastY = this.state.y;

        this.state.x += this.state.speedX;
        this.state.y += this.state.speedY;
        this.state.speedY += this.state.g;
        if(this.state.y >= this.state.jumpHight) {
            this.state.speedY = -20;
            this.state.y = this.state.jumpHight;
        }
        if (this.state.x + this.image.width <= 0) {
            this.state.x = app.width;
        } else if (this.state.x > app.width) {
            this.state.x = 0;
        }

        // 加速度递减 纵坐标减小
        if (this.state.fixedHeight > 0 && this.state.speedY < 0) {
            this.state.y += this.state.fixedHeight / 15;
            this.state.speedY += this.state.fixedHeight / 15;
        }
    };

    /**
     * If gamma changed, reset the states.
     * 
     * @param { Number } gamma
     */
    DoodleClient.prototype.onGammaChange = function(gamma) {
        this.state.speedX = gamma / 3;
        if (this.state.speedX < 0) {
            this.image = this.image_left;
        } else {
            this.image = this.image_right;
        }
    };

    DoodleClient.prototype.onBottomChange = function(value) {
        this.state.fixedHeight = value;
    };

    /**
     * Get current position.
     * @return { Object }
     */
    DoodleClient.prototype.getPosition = function() {
        return {
            x: this.state.x,
            y: this.state.y
        }
    };

    /**
     * Get body width.
     * @return { Number }
     */
    DoodleClient.prototype.getWidth = function() {
        return this.image.width;
    };

    /**
     * Get body width.
     * @return { Number }
     */
    DoodleClient.prototype.getHeight = function() {
        return this.image.height;
    };

    /**
     * Set current step.
     * @param { Number } step
     */
    DoodleClient.prototype.setStep = function(step) {
        this.state.jumpHight = step;
    };

    DoodleClient.prototype.terminate = function() {
        this.ctx.clearRect(this.state.x, this.state.y, this.image.width, this.image.height)
        app.detach(this);
        this.layer.terminate();
    };

    window.DoodleClient = DoodleClient;

})(window, window.document);
