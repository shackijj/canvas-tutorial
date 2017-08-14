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

    
    const bullEye = new Image();
    bullEye.src = 'images/bulleye.png';
    bullEye.onload = gameLoop;

    const p0 = {x: 150, y: 440};
    const p1 = {x: 450, y: 10};
    const p2 = {x: 50, y: 10};
    const p3 = {x: 350, y: 440};
    const player = {x: 0, y: 0, speed: 0.01, t: 0};

    function drawPoint(point) {
        context.drawImage(pointImage, point.x, point.y, 1, 1);
    }

    function drawScreen() {
        const cx = 3 * (p1.x - p0.x);
        const bx = 3 * (p2.x - p1.x) - cx;
        const ax = p3.x - p0.x - cx - bx;

        const cy = 3 * (p1.y - p0.y);
        const by = 3 * (p2.y - p1.y) - cy;
        const ay = p3.y - p0.y - cy - by;

        const t = player.t;

        const xt = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + p0.x;
        const yt = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + p0.y;

        player.t += player.speed;

        player.x = xt - bullEye.width / 2;
        player.y = yt - bullEye.height / 2;

        if (player.t > 1) {
            player.t = 1;
        }
        points.push({x: xt, y: yt});

        context.fillStyle = '#EEEEEE';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);

        context.strokeStyle = '#000000';
        context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

        context.fillStyle = '#FF0000';
        context.beginPath();
        context.arc(p0.x, p0.y, 8, 0, Math.PI*2, true);
        context.closePath();
        context.fill();

        context.fillStyle = '#FF0000';
        context.beginPath();
        context.arc(p1.x, p1.y, 8, 0, Math.PI*2, true);
        context.closePath();
        context.fill();

        context.fillStyle = '#FF0000';
        context.beginPath();
        context.arc(p2.x, p2.y, 8, 0, Math.PI*2, true);
        context.closePath();
        context.fill();

        context.fillStyle = '#FF0000';
        context.beginPath();
        context.arc(p3.x, p3.y, 8, 0, Math.PI*2, true);
        context.closePath();
        context.fill();

        context.drawImage(bullEye, player.x, player.y);

        points.forEach(drawPoint);
    }

    function gameLoop() {
        drawScreen();
        window.requestAnimationFrame(gameLoop);
    }
}
