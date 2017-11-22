const FRAME_RATE = 30;
const INTERVAL_TIME = 1000 / FRAME_RATE;

const container = document.getElementById('app');
const theCanvas = document.createElement('canvas');

theCanvas.setAttribute('width', 200);
theCanvas.setAttribute('height', 200);
container.appendChild(theCanvas);

const context = theCanvas.getContext('2d');

let shipState = 0;
let rotation = 0;
const rotationVelocity = 1;
const thrustAcceleration = .03;
const width = 20;
const height = 20;
let x = 50;
let y = 50;
let alpha = 0;

let facingX;
let facingY;
let movingX;
let movingY;

const keyPressList = [];
document.addEventListener('keydown', function(e) {
    keyPressList[e.keyCode] = true;
});
document.addEventListener('keyup', function(e) {
    keyPressList[e.keyCode] = false;
});

function drawScreen() {
    const angleInRadians = rotation * Math.PI / 180;
    
    if (keyPressList[38] === true) {
        facingX = Math.cos(angleInRadians);
        facingY = Math.sin(angleInRadians);
        movingX = movingX + thrustAcceleration * facingX;
        movingY = movingY + thrustAcceleration * facingY;
    }
    if (keyPressList[37] === true) {
        rotation -= rotationVelocity;
    }
    if (keyPressList[39] === true) {
        rotation += rotationVelocity;
    }

    shipState++;
    if (shipState > 1) {
        shipState = 0;
    }
    alpha += .01;
    if (alpha > 1) {
        alpha = 0;
    }
    context.fillStyle = '#000000';
    context.fillRect(0, 0, 200, 200);

    context.globalAlpha = alpha;
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(x + .5 * width, y + .5 * width);
    context.rotate(angleInRadians);

    context.strokeStyle = '#ffffff';
    context.beginPath();
    context.moveTo(-10, -10);
    context.lineTo(10, 0);
    context.moveTo(10, 1);
    context.lineTo(-10, 10);
    context.lineTo(1, 1);
    context.moveTo(1, -1);
    context.lineTo(-10, -10);
    context.stroke();
    context.closePath();
    context.restore();

/*     if (shipState === 1) {
        context.beginPath();
        context.moveTo(8, 13);
        context.lineTo(11, 13);
        context.moveTo(9, 14);
        context.lineTo(9, 18);
        context.moveTo(10, 14);
        context.lineTo(10, 18);
        context.stroke();
        context.closePath();
    } */
}

function gameLoop() {
    drawScreen();
    window.setTimeout(gameLoop, INTERVAL_TIME);
}

export function canvasApp() {
    gameLoop();
}
