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

    function doCoolStuff() {
        alert('Cool stuff');
    }

    function mediaSuccess(userMedia) {
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        const video = document.getElementById('theVideo');
        video.src = window.URL.createObjectURL(userMedia);
        video.onloadedmetadata = doCoolStuff;
    }

    function mediaFail({code}) {
        alert(`Failed to get user media: ${code}`);
    }

    function startVideo() {
        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

        navigator.getUserMedia({video: true, audio: false}, mediaSuccess, mediaFail);
    }

    startVideo();
}
