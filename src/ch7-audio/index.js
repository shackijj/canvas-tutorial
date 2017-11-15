import supportedAudioFormat from './supportedAudioFormat';

const STATE_INIT = 10;
const STATE_LOADING = 20;
const STATE_RESET = 30;
const STATE_PLAYING = 40;

let appState = STATE_INIT;

let loadCount = 0;
let itemsToLoad = 0;

let alienImage;
let missileImage;
let playerImage;

let explodeSound;
let shootSound;

let mouseX;
let mouseY;

const player = { x: 250, y: 475 };

const aliens = [];
const missiles = [];

const ALIEN_START_X = 25;
const ALIEN_START_Y = 25;
const ALIEN_ROWS = 5;
const ALIEN_COLS = 8;
const ALIENT_SPACING = 40;

const appElement = document.getElementById('app');
const appTemplate = `<canvas id="theCanvas" width="500" height="500"></canvas>`;
appElement.innerHTML = appTemplate;
const theCanvas = document.getElementById('theCanvas');

function itemLoaded() {
    loadCount++;

    if (loadCount >= itemLoaded) {
        shootSound.removeEventListener("canplaythrough",itemLoaded, false);
        explodeSound.removeEventListener("canplaythrough",itemLoaded,false);

        appState = STATE_RESET;
    }
}

function initApp() {
    loadCount = 0;
    itemsToLoad = 5;
    explodeSound = document.createElement('audio');
    document.body.appendChild(explodeSound);
    const audioType = supportedAudioFormat(explodeSound);
    explodeSound.addEventListener('canplaythrough', itemLoaded);
    explodeSound.setAttribute('src', `audio/space-raiders/explode1.${audioType}`);

    shootSound = document.createElement('audio');
    document.body.appendChild(shootSound);
    shootSound.addEventListener('canplaythrough', itemLoaded);
    shootSound.setAttribute('src', `audio/space-raiders/shoot1.${audioType}`);

    alienImage = new Image();
    alienImage.src = 'images/alien.png';
    alienImage.onload = itemLoaded;


    missileImage = new Image();
    missileImage.src = 'images/missile.png';
    missileImage.onload = itemLoaded;


    playerImage = new Image();
    playerImage.src = 'images/player.png';
    playerImage.onload = itemLoaded;

    appState = STATE_LOADING;
}

function startLevel() {
    const {width, height} = alienImage;
    for (let r = 0; r < ALIEN_ROWS; r++) {
        for(let c = 0; c < ALIEN_COLS; c++) {
            aliens.push({
                speed: 2,
                x: ALIEN_START_X + c * ALIENT_SPACING,
                y: ALIEN_START_Y + r * ALIENT_SPACING,
                width,
                height,
            })
        }
    }
}

function resetApp() {
    startLevel();
    shootSound.volume = .5;
    shootSound.volume = .5;
    appState = STATE_PLAYING;
}

function run() {
    switch(appState) {
        case STATE_INIT:
            initApp();
            break;
        case STATE_LOADING:
            // wait for call blocks
            break;
        case STATE_RESET:
            resetApp();
            break;
        case STATE_PLAYING:
            drawScreen();
            break;
    }
}

function eventMouseMove(event) {
    const {offsetX, offsetY} = event;
    mouseX = offsetX;
    mouseY = offsetY;
    player.x = offsetX;
    player.y = offsetY;
}
function eventMouseUp(event) {
    missiles.push({
        speed: 5,
        x: player.x + .5 * player.width,
        y: player.y - missileImage.height,
        width: missile.width,
        height: missileImage.height,
    });
    shootSound.play();
}

theCanvas.addEventListener('mouseup', eventMouseUp, false);
theCanvas.addEventListener('mousemove', eventMouseMove, false);

function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    run();
}

const canvasApp = gameLoop;

export { canvasApp };