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
            `<video autoplay id="theVideo" style="display: none"></video>
            <canvas id="theCanvas" width="640" height="480"></canvas>
            <form>
                <input type="button" id="createImageData" value="Take photo"/>
            </form>` :
            `<p>getUserMedia not supported</p>`;

    appElement.innerHTML = appTemplate;
    const video = document.getElementById('theVideo');
    const canvas = document.getElementById('theCanvas');
    const context = canvas.getContext('2d');
    const button = document.getElementById('createImageData');

    function drawScreen() {
        context.drawImage(video, 10, 10);
    }

    function gameLoop() {
        drawScreen();
        window.requestAnimationFrame(gameLoop);
    }

    function mediaSuccess(userMedia) {
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        video.src = window.URL.createObjectURL(userMedia);
        video.play();
        gameLoop();
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
    function createImageDataClicked() {
        const image = new Image();
        image.src = canvas.toDataURL();
        document.body.appendChild(image);
    }
    button.addEventListener('click', createImageDataClicked, false);
    startVideo();
}
