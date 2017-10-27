export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    function userMediaSupported() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        (userMediaSupported()) ?
            `<video autoplay id="theVideo"></video>` :
            `<p>getUserMedia not supported</p>`;

    appElement.innerHTML = appTemplate;


    function startVideo() {
        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

        navigator.getUserMedia({video: true, audio: true})
    }
}
