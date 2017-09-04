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

    const pointImage = new Image();
    pointImage.src = 'images/point.png';
    const points = [];

    const shipImage = new Image();
    shipImage.src = 'images/space-ship.png';
    shipImage.onload = gameLoop;

    const easeValue = 0.05;
    const p1 = {x: 240, y: -20};
    const p2 = {x: 240, y: 450};
    const ship = {x: p1.x, y: p1.y, ex: p2.x, ey: p2.y, vx: 0, vy: 0};

    function drawPoint(point) {
        context.drawImage(pointImage, point.x, point.y, 1, 1);
    }

    function drawBackground() {
        context.fillStyle = '#EEEEEE';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);

        context.strokeStyle = '#000000';
        context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);
    }

    function drawScreen() {
        points.push({x: ship.x, y: ship.y});

        drawBackground();
        points.forEach(drawPoint);
        const dx = ship.ex - ship.x;
        const dy = ship.ey - ship.y;

        ship.vx = dx * easeValue;
        ship.vy = dy * easeValue;

        ship.x += ship.vx;
        ship.y += ship.vy;
    
        context.drawImage(shipImage, ship.x - shipImage.width / 2, ship.y);
    }

    function gameLoop() {
        drawScreen();
        window.requestAnimationFrame(gameLoop);
    }
}
