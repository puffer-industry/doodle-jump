(function(window, document) {
    "use strict"

    function RandSteps(doodle) {
        this.bottom = app.height - 100;
        this.ground = app.height + 100;
        this.doodle = doodle;
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
                    var bottomValue = this.bottom - sp.y;
                    if (sp.y < app.height / 2) {
                        this.doodle.onBottomChange(bottomValue);
                        for (var index in app.steps) {
                            var s = app.steps[index];
                            s.setBottom(bottomValue);
                            if (s.getPosition().y > app.height) {
                                s.terminate();
                                delete app.steps[index];
                            }
                        }
                    }
                    break;
                }
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
