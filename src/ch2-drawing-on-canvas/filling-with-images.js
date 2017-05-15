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
        const fillImg = new Image();
        fillImg.src = 'images/fill_20x20.png';
        fillImg.onload = () => {
            const fillPattern1 = context.createPattern(fillImg, 'repeat');
            const fillPattern2 = context.createPattern(fillImg, 'repeat-x');
            const fillPattern3 = context.createPattern(fillImg, 'repeat-y');
            const fillPattern4 = context.createPattern(fillImg, 'no-repeat');
            
            context.fillStyle = fillPattern1;
            context.fillRect(0, 0, 200, 200);

            context.fillStyle = fillPattern2;
            context.translate(250, 0);
            context.fillRect(0, 0, 200, 200);

            context.fillStyle = fillPattern3;
            context.translate(-250, 250);
            context.fillRect(0, 0, 200, 200);

            context.fillStyle = fillPattern4;
            context.translate(250, 0);
            context.fillRect(0, 0, 200, 200);
        };
    }

    drawScreen();
}
