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
        context.fillStyle = 'red';

        context.shadowOffsetX = 4;
        context.shadowOffsetY = 4;
        context.shadowColor = 'black';
        context.shadowBlur = 4;
        context.fillRect(10, 10, 100, 100);

        context.shadowOffsetX = -4;
        context.shadowOffsetY = -4;
        context.shadowColor = 'black';
        context.shadowBlur = 4;
        context.fillRect(150, 10, 100, 100);


        context.shadowOffsetX = 10;
        context.shadowOffsetY = 10;
        context.shadowColor = 'rgb(100, 100, 100)';
        context.shadowBlur = 8;
        context.arc(200, 300, 100, 0, 2 * Math.PI, false);
        context.fill();
    }

    drawScreen();
}
