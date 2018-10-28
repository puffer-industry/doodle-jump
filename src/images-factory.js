(function(window, document) {
    "use strict"

    function imagesFactory(images) {
        var tools = images.tools;
        images.doodle_right = functools.imageCut(
            images.doodle_right, 16, 0, images.doodle_right.width-16, images.doodle_right.height, 0, 0, images.doodle_right.width, images.doodle_right.height
        );
        images.doodle_left = functools.imageReverse(images.doodle_right);
        images.step_green = functools.imageCut(
            tools, 2, 0, 58, 16, 0, 0, tools.width/2, tools.height/2
        );

        return images;
    };

    window.imagesFactory = imagesFactory;

})(window, window.document);
