export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<canvas id="canvasOne" width="500" height="500">
        Your browser doesn't support HTML5 canvas.
        </canvas>`;

    appElement.innerHTML = appTemplate;



    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");

    const windowWidth = 500;
    const windowHeight = 500;
    let windowX = 2284;
    let windowY = 286;
    let viewPortWidth = 500;
    let viewPortHeight = 500;

    const photo = new Image();
    photo.addEventListener('load', drawScreen);
    photo.src = 'images/large-image-4444x3136.jpg';

    function drawScreen() {
        context.drawImage(
            photo,
            windowX,
            windowY,
            windowWidth * 2,
            windowHeight * 2,
            0,
            0,
            viewPortWidth,
            viewPortHeight);
    }
}
