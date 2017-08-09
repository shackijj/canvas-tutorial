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

    const circle = {centerX: 250, centerY: 250, radius: 0, angle: 0};
    const ball = {x: 0, y: 0, speed: 0.05};
    const radiusInc = 0.2;

    function drawPoint(point) {
        context.drawImage(pointImage, point.x, point.y, 1, 1);
    }

    function drawScreen() {
        ball.x = circle.centerX + Math.cos(circle.angle) * circle.radius;
        ball.y = circle.centerY + Math.sin(circle.angle) * circle.radius;
        circle.angle += ball.speed;
        circle.radius += radiusInc;
        points.push({x:ball.x,y:ball.y});

        context.fillStyle = '#EEEEEE';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);

        context.strokeStyle = '#000000';
        context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

        context.fillStyle = '#000000';
        context.beginPath();
        context.arc(ball.x, ball.y, 15, 0, Math.PI*2, true);
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
