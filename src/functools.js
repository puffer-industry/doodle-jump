(function(window, document) {
    "use strict"

    var functools = {};

    /**
     * Extend child from superclass.
     * need call superclass.call(this) in subclasses
     * 
     * @param { Function } subclass
     * @param { Function } superclass
     * 
     * @return { Function } extended subclass
     */
    functools.extends = function(subclass, superclass, propertiesObject) {
        subclass.prototype = Object.create(superclass.prototype, propertiesObject);
        subclass.prototype.constructor = subclass;
        return subclass;
    };

    /**
     * Reverse image.
     * 
     * @param { Image } image
     * @return { HTMLCanvasElement }
     */
    functools.imageReverse = function(image) {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var ctx = canvas.getContext('2d');
        for (var pixel = 1; pixel <= image.width; pixel++) {
            ctx.drawImage(image, image.width - pixel, 0, 1, image.height, pixel, 0, 1, image.height);
        }
        return canvas;
    };

    /**
     * Cut out the image.
     * @param { Image } image
     * @param { Number } x
     * @param { Number } y
     * @param { Number } w
     * @param { Number } h
     * @return { HTMLCanvasElement }
     */
    functools.imageCut = function(image, x, y, w, h, dx, dy, dw, dh) {
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, x, y, image.width, image.height, dx, dy, dw, dh);
        return canvas;
    };

    /**
     * Get position of canvas from window position.
     * 
     * @param { HTMLCanvasElement } canvas
     * @param { Number } x
     * @param { Number } y
     * @return { Object }
     */
    functools.windowToCanvasPosition = function(canvas, x, y) {
        var bbox = canvas.getBoundingClientRect();
        return {
            x: (x - bbox.left) * (canvas.width / bbox.width),
            y: (y - bbox.top) * (canvas.height / bbox.height)
        };
    };

    /**
     * Get a random number.
     * @param { Number } max
     * @return { Number }
     */
    functools.getRandomNumber = function(max){
        return Math.floor(Math.random() * (max + 1));
    };

    window.functools = functools;

})(window, window.document);