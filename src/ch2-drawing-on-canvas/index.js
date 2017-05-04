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

    function simplePaths() {
        context.strokeStyle = 'black';
        context.lineWidth = 10;

        context.lineJoin = 'bevel';
        context.lineCap = 'round';
        // sample 1 round, bevel

        context.beginPath();
        context.moveTo(10, 10);
        context.lineTo(35, 10);
        context.lineTo(35, 35);
        context.stroke();
        context.closePath();

        // sample 2 round, bevel
        context.beginPath();
        context.moveTo(10, 60);
        context.lineTo(35, 60);
        context.lineTo(35, 85);
        context.stroke();
        context.closePath();

        // sampe 3 round, butt
        context.lineJoin = 'round';
        context.lineCap = 'butt';
        context.beginPath();
        context.moveTo(10, 110);
        context.lineTo(35, 110);
        context.lineTo(35, 135);
        context.stroke();
        context.closePath();
    }

    function advancedPaths() {
        // arc
        context.beginPath();
        context.strokeStyle = 'red';
        context.lineWidth = 5;
        context.arc(250, 250, 20, (Math.PI / 180) * 30, (Math.PI / 180) * 150, true);
        // fill
        context.stroke();
        context.closePath();

        context.beginPath();
        context.strokeStyle = 'green';
        context.moveTo(0, 0);
        context.lineTo(100, 200);
        context.arcTo(350, 350, 100, 100, 20);
        context.stroke();
        context.closePath();
    }

    function drawScreen() {
        advancedPaths();
    }

    drawScreen();
}