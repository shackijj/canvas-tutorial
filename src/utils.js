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

export const requestAnimFrame = getRequestAnimationFrame();