(function(window, document) {
    "use strict"


    function getStepMap(num, initY) {
        var images = app.getData('images');
        var width = app.width - images.step_green.width;

        var stepClient = new StepClient(layer_step, width / 2, initY);
        app.attach(stepClient);
        app.steps.push(stepClient);
        initY -= 100;

        var stepClient = new StepClient(layer_step, 0, initY);
        app.attach(stepClient);
        app.steps.push(stepClient);
        initY -= 100;

        var stepClient = new StepClient(layer_step, width, initY);
        app.attach(stepClient);
        app.steps.push(stepClient);
        initY -= 100;

        var stepClient = new StepClient(layer_step, 100, initY);
        app.attach(stepClient);
        app.steps.push(stepClient);
        initY -= 100;

        for (var i = 0; i < num; i++) {
            var x = functools.getRandomNumber(width);
            var stepClient = new StepClient(layer_step, x, initY);
            app.attach(stepClient);
            app.steps.push(stepClient);
            var random = functools.getRandomNumber(20);
            initY -= 90 + random;
        }
    }

    window.getStepMap = getStepMap;

})(window, window.document);
