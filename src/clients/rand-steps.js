(function(window, document) {
    "use strict"

    function RandSteps(doodle) {
        this.bottom = app.height - 100;
        this.ground = app.height + 100;
        this.doodle = doodle;

        this.state = {
            
        };
    };

    RandSteps.prototype.update = function() {
        if (this.doodle.state.speedY > 0) {
            this.doodle.setStep(this.ground);
            var dp = this.doodle.getPosition();
            if (dp.y >= app.height) {
                this.gameover();
                return false;
            }
            for (var i in app.steps) {
                var step = app.steps[i];
                var sp = step.getPosition()
                if (sp.y > 0 && sp.y < app.height && this.isCollision(step)) {
                    this.doodle.setStep(sp.y - this.doodle.getHeight());
                    if (sp.y < app.height / 2) {
                        var bottomValue = this.bottom - sp.y;
                        this.moveDown(bottomValue);
                        this.prepareSteps(10);
                    }
                    break;
                }
            }
        }
    };

    RandSteps.prototype.moveDown = function(bottomValue) {
        this.doodle.onBottomChange(bottomValue);
        for (var index in app.steps) {
            var s = app.steps[index];
            s.setBottom(bottomValue);
            if (s.getPosition().y > app.height) {
                s.terminate();
                app.steps.splice(index, 1);
            }
        }
    };

    RandSteps.prototype.prepareSteps = function(minNumber) {
        if (app.steps.length < minNumber) {
            var initY = app.steps[app.steps.length - 2].getPosition().y;
            for (var n = 0; n < 15; n++) {
                var x = functools.getRandomNumber(app.width - 50);
                var stepClient = new StepClient(layer_step, x, initY);
                app.attach(stepClient);
                app.steps.push(stepClient);
                var random = functools.getRandomNumber(20);
                initY -= 90 + random;
            }
        }
    };

    RandSteps.prototype.gameover = function() {
        app.clearClients();
        app.stop();
        app.steps = [];
        window.location.reload(false);
    };

    RandSteps.prototype.isCollision = function(step) {
        var dp = this.doodle.getPosition();
        var dw = this.doodle.getWidth();
        var dh = this.doodle.getHeight();
        var sp = step.getPosition();
        var sw = step.getWidth();
        if (dp.x + dw > sp.x && dp.x <= sp.x + sw) {
            var bty = dp.y + dh;
            if (bty >= sp.y && bty <= sp.y + 25) {
                return true;
            }
        }
        return false;
    };

    RandSteps.prototype.constructor = RandSteps;
    window.RandSteps = RandSteps;

})(window, window.document);
