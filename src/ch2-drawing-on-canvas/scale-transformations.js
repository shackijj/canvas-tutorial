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

    function drawScreen() {
        context.setTransform(1, 0, 0, 1, 0, 0);
        const x = 100;
        const y = 100;
        const width = 50;
        const height = 100;
        const angleInRadians = 45 * Math.PI / 180;
        context.translate(x + 0.5 * width, y + 0.5 * height);
        context.scale(2, 2);
        context.rotate(angleInRadians);
        context.fillStyle = 'red';
        context.fillRect(-0.5 * width, -0.5 * height, width, height);
    }

    drawScreen();
}
