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
        context.strokeStyle = 'red';
        context.lineWidth = 1;
        context.moveTo(0, 0);
        context.lineTo(50, 0);
        context.lineTo(50, 50);


        const isPoint1InPath1 = context.isPointInPath(0, 0);
        const isPoint1InPath2 = context.isPointInPath(60, 10);

        context.stroke();

        console.log(isPoint1InPath1);
        console.log(isPoint1InPath2);
        context.closePath();
    }

    drawScreen();
}
