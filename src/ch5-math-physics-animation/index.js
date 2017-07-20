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
    const balls = [];

    const numBalls = 100;
    const maxSize = 8;
    const minSize = 5;
    const maxSpeed = minSize + 5;

    let tempBall;
    let tempX;
    let tempY;
    let tempSpeed;
    let tempAngle;
    let tempRadius;
    let tempRadians;
    let tempXUnits;
    let tempYUnits;

    for (let i = 0; i < numBalls; i++) {
        tempRadius = maxSize - Math.random() * (maxSize - minSize);

        tempX = Math.floor(Math.random() * theCanvas.width);
        tempY = Math.floor(Math.random() * theCanvas.height);
        tempSpeed = maxSpeed - tempRadius;
        tempAngle = Math.floor(360 * Math.random());
        tempRadians = tempAngle * Math.PI / 180;
        tempXUnits = Math.cos(tempRadians) * tempSpeed;
        tempYUnits = Math.sin(tempRadians) * tempSpeed;
        tempBall = {
            speed: tempSpeed,
            angle: tempAngle, 
            xunits: tempXUnits,
            yunits: tempYUnits,
            radius: tempRadius,
            x: tempX,
            y: tempY,
        };
        balls.push(tempBall);
    }

    function updateBall(ball) {
        const radians = ball.angle * Math.PI / 180;
        ball.xunits = Math.cos(radians) * ball.speed;
        ball.yunits = Math.sin(radians) * ball.speed;
    }

    function drawPoint(point) {
        context.drawImage(pointImage, point.x, point.y, 1, 1);
    }

    function drawScreen() {
        context.fillStyle = '#EEEEEE';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);

        context.strokeStyle = '#000000';
        context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

        balls.forEach((ball) => {
            ball.x += ball.xunits;
            ball.y += ball.yunits;
                    context.fillStyle = '#000000';
            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, true);
            context.closePath();
            context.fill();
            
            if (ball.x > theCanvas.width || ball.x < 0) {
                ball.angle = 180 - ball.angle;
                updateBall(ball);
            } else if (ball.y > theCanvas.height || ball.y < 0) {
                ball.angle = 360 - ball.angle;
                updateBall(ball);
            }
        });
    }

    function gameLoop() {
        drawScreen();
        window.requestAnimationFrame(gameLoop);
    }

    window.requestAnimationFrame(gameLoop);
}
