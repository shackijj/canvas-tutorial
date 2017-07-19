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

    const speed = 5;
    const p1 = {x: 0, y: 0};
    const p2 = {x: 480, y: 480};
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    let moves = distance / speed;
    const xunits = dx / moves;
    const yunits = dy / moves;
    const ball = {x: p1.x, y: p1.y};

    function drawPoint(point) {
        context.drawImage(pointImage, point.x, point.y, 1, 1);
    }

    function drawScreen() {
        if (moves > 0) {
            moves--;
            points.push({x:ball.x,y:ball.y});
            ball.x += xunits;
            ball.y += yunits;
        }
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
