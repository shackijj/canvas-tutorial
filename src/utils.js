function getRequestAnimationFrame() {
    function requestAnimationFrameFallback(cb) {
        window.setTimeout(cb, 1000 / 60);
    }

    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        requestAnimationFrameFallback;
}

const requestAnimFrame = getRequestAnimationFrame();

function FrameRateCounter() {
    this.lastFrameCount = 0;
    this.frameLast = Date.now();
    this.frameCtr = 0;
}

FrameRateCounter.prototype.countFrames = function() {
    this.frameCtr++;
    if (Date.now() >= this.frameLast + 1000) {
        this.lastFrameCount = this.frameCtr;
        this.frameLast = Date.now();
        this.frameCtr = 0;
    }
}

export { FrameRateCounter, requestAnimFrame };