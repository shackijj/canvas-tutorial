export function canvasApp() {
    const appElement = document.getElementById('app');

    const appTemplate = 
        `<canvas id="canvasOne" width="500" height="500">
        Your browser doesn't support HTML5 canvas.
        </canvas>`;

    appElement.innerHTML = appTemplate;
    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");

    if (!Modernizr.canvas) {
        return;
    }

    function drawScreen() {
        context.fillStyle = '#000000';
        context.strokeStyle = '#ff00ff';
        context.lineWidth = 2;
        context.fillRect(10, 10, 40, 40);
        context.strokeRect(0, 0, 60, 60);
        context.clearRect(20, 20, 20, 20);
    }

    drawScreen();
}