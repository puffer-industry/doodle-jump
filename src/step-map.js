(function(window, document) {
    "use strict"

    var y = 0;

    function build(x) {
        var stepClient = new StepClient(layer_step, x, y);
        app.attach(stepClient);
        app.steps.push(stepClient);
        var random = functools.getRandomNumber(20);
        y -= 100 + random;
    }

    function getStepMap(initY) {
        var images = app.getData('images');
        var width = app.width - images.step_green.width;
        y = initY;
        var per = width / 5;

        build(width / 2);
        build(0);
        build(0);
        build(width);
        build(width - 2 * per);
        build(per);
        build(2 * per);
        build(width - 3 * per);
        build(per + 100);
    }

    window.getStepMap = getStepMap;

})(window, window.document);
