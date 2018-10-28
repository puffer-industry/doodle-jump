(function(window, document) {
    "use strict"

    function ImageLoader(files) {
        this.files = files;
        this._counter = 0;
        this.promises = [];
        this.eachLoadHandle = null;
        this.data = {};
        for (var key in this.files) {
            var fileName = this.files[key];
            this.attach(key, fileName);
        }

        this.onImageLoad = this.onImageLoad.bind(this);
    }

    ImageLoader.prototype.loadByFileName = function(key, fileName) {
        return new Promise((function(resolve, reject) {
            var image = new Image();
            image.setAttribute('src', fileName);
            image.onload = (function(event) {
                this.onImageLoad(event.target, key);
                return resolve(event.target);
            }.bind(this));

            image.onabort = (function(event) {
                reject(event);
            }.bind(this));
        }).bind(this));
    };

    ImageLoader.prototype.onImageLoad = function(image, key) {
        this._counter++;
        this.data[key] = image;
        if (typeof(this.eachLoadHandle) === 'function') {
            this.eachLoadHandle(image, key);
        }
    };

    ImageLoader.prototype.attach = function(key, fileName) {
        this.promises.push(this.loadByFileName(key, fileName));
    };

    ImageLoader.prototype.onEachLoaded = function(callback) {
        this.eachLoadHandle = callback.bind(this);
    };

    ImageLoader.prototype.load = function() {
        return Promise.all(this.promises).then((function(images) {
            return this.data
        }).bind(this));
    };

    ImageLoader.prototype.constructor = ImageLoader;
    window.ImageLoader = ImageLoader;
})(window, window.document);
