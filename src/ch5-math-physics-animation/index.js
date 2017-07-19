export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<canvas id="canvasOne" width="500" height="500" style="display: block;">
        Your browser doesn't support HTML5 canvas.
        </canvas>`;

    appElement.innerHTML = appTemplate;



    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");

    let speed = 5;
    let y = 10;
    let x = 250;

    function drawScreen() {
        y += speed;
        context.fillStyle = '#EEEEEE';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);

        context.strokeStyle = '#000000';
        context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

        context.fillStyle = '#000000';
        context.beginPath();
        context.arc(x, y, 15, 0, Math.PI*2, true);
        context.closePath();
        context.fill();
    }

    function gameLoop() {
        drawScreen();
        window.requestAnimationFrame(gameLoop);
    }

    window.requestAnimationFrame(gameLoop);
}
