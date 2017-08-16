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

    const speed = 4;
    const angle = 295;
    const radians = angle * Math.PI / 180;
    const radius = 15;
    const gravity = 0.1;
    const vx = Math.cos(radians) * speed;
    const vy = Math.sin(radians) * speed;
    const p1 = {x: 20, y: theCanvas.height - radius};
    const ball = {x: p1.x, y: p1.y, vx, vy, radius};

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
        points.push({x: ball.x, y: ball.y});

        ball.vy += gravity;
        if (ball.y + ball.radius > theCanvas.height) {
            ball.vy = -(ball.vy);
        }

        ball.x += ball.vx;
        ball.y += ball.vy;

        drawBackground();

        context.fillStyle = '#000000';
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, true);
        context.closePath();
        context.fill();

        points.forEach(drawPoint);
    }

    function gameLoop() {
        drawScreen();
        window.requestAnimationFrame(gameLoop);
    }
    window.requestAnimationFrame(gameLoop);
}
