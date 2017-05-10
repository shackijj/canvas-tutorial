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
        context.arc(300, 300, 20, (Math.PI / 180) * 30, (Math.PI / 180) * 150, true);
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

    function bezierCurves() {
        context.beginPath();
        context.moveTo(0, 0);
        context.quadraticCurveTo(100, 25, 0, 50);
        context.stroke();
        context.closePath();

        context.beginPath();
        context.moveTo(150, 0);
        context.bezierCurveTo(0, 125, 300, 175, 150, 300);
        context.stroke();
        context.closePath();

        context.beginPath();
        context.moveTo(150, 0);
        context.lineTo(150, 300);
        context.stroke();
        context.closePath();
    }

    function clippingRegion() {
        context.fillStyle = 'black';
        context.fillRect(10, 10, 200, 200);
        // Save current state (STATE1)
        context.save();
        context.beginPath();
        // Set clip
        context.rect(0, 0, 50, 50);
        context.clip();

        context.beginPath();
        context.strokeStyle = 'red';
        context.lineWidth = 5;
        context.arc(100, 100, 100, (Math.PI/180) * 0, (Math.PI/180) * 360, false);
        context.stroke();
        context.closePath();

        // Restore to STATE1
        context.restore();
        // Set a new clip
        context.rect(0, 0, 500, 500);
        context.clip();

        context.beginPath();
        context.strokeStyle = 'blue';
        context.lineWidth = 5;
        context.arc(100, 100, 50, (Math.PI/180) * 0, (Math.PI/180) * 360, false);
        context.stroke();
        context.closePath();
    }

    function composition() {
        context.fillStyle = 'black';
        context.fillRect(10, 10, 200, 200);

        context.fillStyle = 'red';
        context.fillRect(1, 1, 50, 50);

        context.globalCompositeOpeation = 'source-over';
        context.fillRect(60, 1, 50, 50);

        context.globalCompositeOpeation = 'destination-atop';
        context.fillRect(1, 60, 50, 50);

        context.globalAlpha = 0.5;
        context.globalCompositeOpeation = 'source-atop';
        context.fillRect(60, 60, 50, 50);
    }

    function drawScreen() {
        composition();
    }

    drawScreen();
}