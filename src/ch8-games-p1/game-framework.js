const container = document.getElementById('app');
const theCanvas = document.createElement('canvas');

theCanvas.setAttribute('width', 200);
theCanvas.setAttribute('height', 200);
container.appendChild(theCanvas);

const context = theCanvas.getContext('2d');

const GAME_STATE_TITLE = 0;
const GAME_STATE_NEW_LEVEL = 1;
const GAME_STATE_GAME_OVER = 2;

let currentGameState = 0;
let currentGameStateFunction = null;

function gameStateTitle() {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);
    context.fillStyle = '#ffffff';
    context.font = '20px sans-serif';
    context.textBaseline = 'top';
    context.fillText('Title screen', 50, 90);
}

function gameStateTitle() {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);
    context.fillStyle = '#ffffff';
    context.font = '20px sans-serif';
    context.textBaseline = 'top';
    context.fillText('Title screen', 50, 90);
}

function gameStatePlayLevel() {
    console.log('gameStatePlayLevel');
}

function gameStateGameOver() {
    console.log('gameStateGameOver');
}

function runGame() {
    currentGameStateFunction();
}

function switchGameState(newState) {
    currentGameState = newState;
    switch(currentGameState) {
        case GAME_STATE_TITLE:
            currentGameStateFunction = gameStateTitle;
            break;
        case GAME_STATE_NEW_LEVEL:
            currentGameStateFunction = gameStatePlayLevel;
            break;
        case GAME_STATE_GAME_OVER:
            currentGameStateFunction = gameStateGameOver;
            break;
    }
}

switchGameState(GAME_STATE_TITLE);

const FRAME_RATE = 40;
const INTERVAL_TIME = 1000 / FRAME_RATE;

function gameLoop() {
    runGame();
    window.setTimeout(gameLoop, INTERVAL_TIME);
}

export function canvasApp() {
    gameLoop();
}