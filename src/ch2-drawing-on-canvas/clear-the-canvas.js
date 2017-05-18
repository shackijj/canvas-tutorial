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

    /**
     * There are three methods to clear canvas
     */
    function sampleFill() {
        context.fillStyle = '#000000';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);
    }

    function resetWidthAndHeight() {
        const { width, height } = theCanvas;
        theCanvas.width = width;
        theCanvas.height = height;
    }
    
    function clearRect() {
        const { width, height } = theCanvas;
        context.clearRect(0, 0, width, height);
    }

    let yOffset = 0;
    function drawScreen() {
        clearRect();

        const currentPath = context.beginPath();
        context.stokeStyle = 'red';
        context.lineWidth = 5;
        context.moveTo(0, 0 + yOffset);
        context.lineTo(50, 0 + yOffset);
        context.lineTo(50, 50 + yOffset);
        context.stroke();
        context.closePath();

        yOffset += 1;
    }

    function gameLoop() {
        window.setTimeout(gameLoop, 20);
        drawScreen();
    }

    gameLoop();
}
