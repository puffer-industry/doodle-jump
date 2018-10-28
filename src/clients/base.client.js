(function(window, document) {
    "use strict"

    /**
     * Abstruct client.
     * @param {Layer} layer
     * 
     * @property {Layer} layer
     */
    function BaseClient(layer, image) {
        this.layer = layer;
        this.image = image;
    };

    BaseClient.prototype.render = function(ctx, x, y) {
        ctx.drawImage(this.image, Math.ceil(x), Math.ceil(y));
    };

    BaseClient.prototype.clearRendering = function(ctx, x, y) {
        ctx.clearRect(Math.ceil(x), Math.ceil(y), this.image.width, this.image.height);
    };

    BaseClient.prototype.constructor = BaseClient;
    window.BaseClient = BaseClient;

})(window, window.document);
