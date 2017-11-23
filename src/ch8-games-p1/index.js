import { FrameRateCounter } from '../utils';

const frameRateCounter = new FrameRateCounter();

const container = document.getElementById('app');
const theCanvas = document.createElement('canvas');

theCanvas.setAttribute('width', 200);
theCanvas.setAttribute('height', 200);
container.appendChild(theCanvas);

const context = theCanvas.getContext('2d');

const GAME_STATE_TITLE = 0;
const GAME_STATE_NEW_GAME = 1;
const GAME_STATE_NEW_LEVEL = 2;
const GAME_STATE_PLAYER_START = 3;
const GAME_STATE_PLAY_LEVEL = 4;
const GAME_STATE_PLAYER_DIE = 5;
const GAME_STATE_GAME_OVER = 6;

// Variables to control screen flow
let titleStarted = false;
let gameOverStarted = false;

// Game environmental variables
let score = 0;
let level = 0;
let extraShipAtEach = 10000;
let extraShipEarned = 0;
let playerShips = 3;

// Playfield variables
const xMin = 0;
const xMax = 400;
const yMin = 0;
const yMax = 400;

// Score value vars
const bigRockScore = 50;
const medRockScore = 75;
const smlRockScore = 100;
const saucerScore = 300;

const ROCK_SCALE_LARGE = 1;
const ROCK_SCALE_MEDIUM = 2;
const ROCK_SCALE_SMALL = 3;

const player = {};
const rocks = [];
const saucers = [];
const playerMissiles = [];
const particles = [];
const saucerMissiles = [];

let levelRockMaxSpeedAdjust = 1;
let levelSaucerMax = 1;
let levelSaucerOccurenceRate = 25;
let levelSaucerSpeed = 1;
let levelSaucerFireDelay = 300;
let levelSaucerFireRate = 30;
let levelSaucerMissileSpeed = 1;

let shipState = 0;
let rotation = 0;
const rotationVelocity = 1;
const thrustAcceleration = .03;
const width = 20;
const height = 20;
let x = 50;
let y = 50;
let alpha = 0;

let facingX = 0;
let facingY = 0;
let movingX = 0;
let movingY = 0;
const maxVelocity = 2;

const keyPressList = [];
document.addEventListener('keydown', function(e) {
    keyPressList[e.keyCode] = true;
});
document.addEventListener('keyup', function(e) {
    keyPressList[e.keyCode] = false;
});

function checkKeys() {
    if (keyPressList[38] === true) {
        const angleInRadians = rotation * Math.PI / 180;
        facingX = Math.cos(angleInRadians);
        facingY = Math.sin(angleInRadians);
        const movingXNew = movingX + thrustAcceleration * facingX;
        const movingYNew = movingY + thrustAcceleration * facingY;
        const currentVelocity = Math.sqrt(Math.pow(movingXNew, 2) + Math.pow(movingYNew, 2));
        if (currentVelocity < maxVelocity) {
            movingX = movingXNew;
            movingY = movingYNew;
        }
    }
    if (keyPressList[37] === true) {
        rotation -= rotationVelocity;
    }
    if (keyPressList[39] === true) {
        rotation += rotationVelocity;
    }
}

function update() {
    x = x + movingX;
    y = y + movingY;
    frameRateCounter.countFrames();
}

function render() {
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

    context.fillStyle = '#ffffff';
    context.font = '20px sans-serif';
    context.textBaseline = 'top';
    context.fillText(`FPS: ${frameRateCounter.lastFrameCount}`, 0, 180);

    context.globalAlpha = alpha;
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(x + .5 * width, y + .5 * width);
    const angleInRadians = rotation * Math.PI / 180;
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

function gameStatePlayLevel() {
    checkKeys();
    update();
    render();
}

function gameStateTitle() {}
function gameStateNewGame() {}
function gameStateNewLevel() {}
function gameStatePlayerStart() {}
function gameStatePlayerDie() {}
function gameStateGameOver() {}

const FRAME_RATE = 30;
const INTERVAL_TIME = 1000 / FRAME_RATE;
function gameLoop() {
    gameStatePlayLevel();
    window.setTimeout(gameLoop, INTERVAL_TIME);
}

export function canvasApp() {
    gameLoop();
}
