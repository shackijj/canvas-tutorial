export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<canvas id="canvasOne" width="500" height="500" style="display: block;">
        Your browser doesn't support HTML5 canvas.
        </canvas>
        <form>
        Canvas Width: <input type="range" id="canvasWidth" min="0" max="1000" step="1" value="500"/>
        Canvas Height: <input type="range" id="canvasHeight" min="0" max="1000" step="1" value="500"/>
        </form>`;

    appElement.innerHTML = appTemplate;



    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");
    const canvasWidthInput = document.getElementById('canvasWidth');
    const canvasHeightInput = document.getElementById('canvasHeight');


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
    let tempVelocityX;
    let tempVelocityY;

    function hitTestCircle(ball1, ball2) {
        let retval = false;
        const dx = ball1.nextX - ball2.nextX;
        const dy = ball1.nextY - ball2.nextY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= (ball1.radius + ball2.radius)) {
            retval = true;
        }
        return retval;
    }

    function canStartHere(testBall) {
        let retval = true;
        balls.forEach(function(ball) {
            if (hitTestCircle(testBall, ball)) {
                retval = false;
            }
        });
        return retval;
    }

    for (let i = 0; i < numBalls; i++) {
        tempRadius = 5;
        let placeOK = false;
        while (!placeOK) {
            tempX = Math.floor(Math.random() * theCanvas.width);
            tempY = Math.floor(Math.random() * theCanvas.height);
            tempSpeed = 4;
            tempAngle = Math.floor(360 * Math.random());
            tempRadians = tempAngle * Math.PI / 180;
            tempVelocityX = Math.cos(tempRadians) * tempSpeed;
        const finalVelocityY2 = velocityY2;
            tempVelocityY = Math.sin(tempRadians) * tempSpeed;
            tempBall = {
                speed: tempSpeed,
                angle: tempAngle, 
                velocityX: tempVelocityY,
                velocityY: tempVelocityX,
                radius: tempRadius,
                x: tempX,
                y: tempY,
                nextX: tempX,
                nextY: tempY,
                mass: tempRadius,
            };
            placeOK = canStartHere(tempBall);
        }
        balls.push(tempBall);
    }

    function update() {
        balls.forEach(function(ball) {
            ball.nextX = (ball.x += ball.velocityX);
            ball.nextY = (ball.y += ball.velocityY);
        });
    }


    function testWalls() {
        balls.forEach(function(ball) {
            if (ball.nextX + ball.radius > theCanvas.width) {
                ball.velocityX *= -1;
                ball.nextX = theCanvas.width - ball.radius;
            } else if (ball.nextY - ball.radius < 0) {
                ball.velocityY *= -1
                ball.nextY = ball.radius;
            } else if (ball.nextX - ball.radius < 0) {
                ball.velocityX *= -1;
                ball.nextX = ball.radius;
            } else if (ball.nextY + ball.radius > theCanvas.height)  {
                ball.velocityY *= -1;
                ball.nextY = theCanvas.height - ball.radius;
            }
        });
    }
        const finalVelocityY2 = velocityY2;

    function collideBalls(ball1, ball2) {
        const dx = ball1.nextX - ball2.nextX;
        const dy = ball1.nextY - ball2.nextY;

        const collisionAngle = Math.atan2(dy, dx);

        const speed1 = Math.sqrt(
            ball1.velocityX * ball1.velocityX + ball1.velocityY * ball1.velocityY);
        const speed2 = Math.sqrt(
            ball2.velocityX * ball2.velocityX + ball2.velocityY * ball2.velocityY);

        const direction1 = Math.atan2(ball1.velocityY, ball1.velocityX);
        const direction2 = Math.atan2(ball2.velocityY, ball2.velocityX);

        const velocityX1 = speed1 * Math.cos(direction1 - collisionAngle);
        const velocityY1 = speed1 * Math.sin(direction1 - collisionAngle);
        const velocityX2 = speed2 * Math.cos(direction2 - collisionAngle);
        const velocityY2 = speed2 * Math.sin(direction2 - collisionAngle);

        const finalVelocityX1 = ((ball1.mass - ball2.mass) * velocityX1 + 
            (ball2.mass + ball2.mass) * velocityX2) / (ball1.mass + ball2.mass);
        
        const finalVelocityX2 = ((ball1.mass + ball1.mass) * velocityX1 + 
            (ball2.mass - ball1.mass) * velocityX2) / (ball1.mass + ball2.mass);

        const finalVelocityY1 = velocityY1;
        const finalVelocityY2 = velocityY2;

        ball1.velocityX = Math.cos(collisionAngle) * finalVelocityX1 + 
            Math.cos(collisionAngle + Math.PI / 2) * finalVelocityY1;

        ball1.velocityY = Math.sin(collisionAngle) * finalVelocityX1 +
            Math.sin(collisionAngle + Math.PI / 2) * finalVelocityY1;

        ball2.velocityX = Math.cos(collisionAngle) * finalVelocityX2 +
            Math.cos(collisionAngle + Math.PI / 2) * finalVelocityY2;

        ball2.velocityY = Math.sin(collisionAngle) * finalVelocityX2 +
            Math.sin(collisionAngle + Math.PI / 2) * finalVelocityY2;

        ball1.nextX = (ball1.nextX += ball1.velocityX);
        ball1.nextY = (ball1.nextY += ball1.velocityY);
        ball2.nextX = (ball2.nextX += ball2.velocityX);
        ball2.nextY = (ball2.nextY += ball2.velocityY);
    }

    function collide() {
        balls.forEach(function(testBall) {
            balls.forEach(function(ball) {
                if (testBall !== ball && hitTestCircle(ball, testBall)) {
                    collideBalls(ball, testBall);
                }
            });
        });
    }

    function render() {
        context.fillStyle = '#000000';
        balls.forEach(function(ball) {
            ball.x = ball.nextX;
            ball.y = ball.nextY;
            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        });
    }

    function drawScreen() {
        context.fillStyle = '#EEEEEE';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);
        //Box
        context.strokeStyle = '#000000';
        context.strokeRect(1, 1, theCanvas.width-2, theCanvas.height-2) 
        update();
        testWalls();
        collide();
        render();
    }

    function gameLoop() {
        drawScreen();
        window.requestAnimationFrame(gameLoop);
    }

    function canvasWidthChanged(e) {
        const target = e.target;
        theCanvas.width = target.value;
        drawScreen();
    }

    function canvasHeightChanged(e) {
        const target = e.target;
        theCanvas.height = target.value;
        drawScreen();
    }

    canvasWidthInput.addEventListener('change', canvasWidthChanged, false);
    canvasHeightInput.addEventListener('change', canvasHeightChanged, false);
    window.requestAnimationFrame(gameLoop);
}
