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

    const speed = 10;
    let angle = 35;
    let radians = 0;
    let xunits = 0;
    let yunits = 0;
    const p1 = {x: 20, y: 20};
    const ball = {x: p1.x, y: p1.y};
    function updateBall() {
        radians = angle * Math.PI / 180;
        xunits = Math.cos(radians) * speed;
        yunits = Math.sin(radians) * speed;
    }

    updateBall();

    function drawPoint(point) {
        context.drawImage(pointImage, point.x, point.y, 1, 1);
    }

    function drawScreen() {
        ball.x += xunits;
        ball.y += yunits;
        context.fillStyle = '#EEEEEE';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);

        context.strokeStyle = '#000000';
        context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

        context.fillStyle = '#000000';
        context.beginPath();
        context.arc(ball.x, ball.y, 15, 0, Math.PI*2, true);
        context.closePath();
        context.fill();

        points.push({x:ball.x,y:ball.y});
        points.forEach(drawPoint);
        
        if (ball.x > theCanvas.width || ball.x < 0) {
            angle = 180 - angle;
            updateBall();
        } else if (ball.y > theCanvas.height || ball.y < 0) {
            angle = 360 - angle;
            updateBall();
        }
    }

    function gameLoop() {
        drawScreen();
        window.requestAnimationFrame(gameLoop);
    }

    window.requestAnimationFrame(gameLoop);
}
