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
    explodeSound.setAttribute('src', `space-raiders/explode1.${audioType}`);

    shootSound = document.createElement('audio');
    document.body.appendChild(shootSound);
    shootSound.addEventListener('canplaythrough', itemLoaded);
    shootSound.setAttribute('src', `space-raiders/shoot1.${audioType}`);

    alienImage = new Image();
    alienImage.src = 'alien.png';
    alienImage.onload = itemLoaded;


    missileImage = new Image();
    missileImage.src = 'missile.png';
    missileImage.onload = itemLoaded;


    playerImage = new Image();
    playerImage.src = 'player.png';
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

function hitTest(image1, image2) {
    
    const o1Left = image1.x;
    const o1Top = image1.y;
    const o1Bottom = image1.y + image1.height;
    const o1Right = image1.x + image1.width;

    const o2Left = image2.x;
    const o2Top = image2.y;
    const o2Bottom = image2.y + image2.height;
    const o2Right = image2.x + image2.width;

    let rc = false
    if ((o1Right > o2Left) || (o1Bottom < o2Top) || (o1Left > o2Right) || (o1Top > o2Bottom)) {
        rc = false;
    } else {
        rc = true;
    }
    return rc;
}

function drawScreen() {
    for (let i = missiles.length - 1; i >= 0; i--) {
        missiles[i].y -= missiles[i].speed;
        if (missiles[i].y < (0 - missiles[i].height)) {
            missiles.splice(i, 1);
        }
    }

    for (let i = alient.length - 1; i >= 0; i--) {
        aliens[i].x += aliens[i].speed;
        if (aliens[i].x > (theCanvas.width - aliens[i].width) || aliens[i].x < 0) {
            aliens[i].speed *= -1;
            aliens[i].y += 20;
        } 

        if (aliens[i].y > theCanvas.height) {
            aliens.splice(i, 1);
        }
    }

    missile: for (let i = missiles.length - 1; i >= 0; i--) {
        const tempMissile = missiles[i];
        for (let j = aliens.length - 1; j >= 0; j--) {
            const tempAlient = aliens[j];
            if (hitTest(tempAlient, tempMissile)) {
                explodeSound.play();
                aliens.splice(j, 1);
                missiles.splice(i, 1);
                break missile;
            }
        }

        if (aliens.length <= 0) {
            appState = STATE_RESET;
        }
    }

    for(let i = missiles.length - 1; i >= 0; i--) {
        context.drawImage(missileImage, missiles[i].x, missiles[i].y);
    }

    for(let i = aliens.length - 1; i >= 0; i--) {
        context.drawImage(alienImage, aliens[i].x, aliens[i].y);
    }

    context.drawImage(playerImage, player.x, player.y);
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
        width: missileImage.width,
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