import supportedAudioFormat from './supportedAudioFormat';

const STATE_INIT = 10;
const STATE_LOADING = 20;
const STATE_RESET = 30;
const STATE_PLAYING = 40;

let appState = STATE_INIT;

let itemsLoaded = 0;
let itemsToLoad = 0;

let alienImage;
let missileImage;
let playerImage;

let mouseX;
let mouseY;

const player = { x: 250, y: 475 };

const aliens = [];
const missiles = [];

const ALIEN_START_X = 25;
const ALIEN_START_Y = 25;
const ALIEN_ROWS = 5;
const ALIEN_COLS = 8;
const ALIEN_SPACING = 40;

const MAX_SOUNDS = 8;
const SOUND_EXPLODE = 'space-raiders/explode1';
const SOUND_SHOOT = 'space-raiders/shoot1';

const audioType = supportedAudioFormat(document.createElement('audio'));

let explodeSound1;
let explodeSound2;
let explodeSound3;

let shootSound1;
let shootSound2;
let shootSound3;

const sounds = [];

const appElement = document.getElementById('app');
const appTemplate = `<canvas id="theCanvas" width="500" height="500"></canvas>`;
appElement.innerHTML = appTemplate;

const theCanvas = document.getElementById('theCanvas');
const context = theCanvas.getContext('2d');

function itemLoaded() {
    itemsLoaded++;
    if (itemsLoaded >= itemsToLoad) {
        explodeSound1.removeEventListener('canplaythrough', itemLoaded);
        explodeSound2.removeEventListener('canplaythrough', itemLoaded);
        explodeSound3.removeEventListener('canplaythrough', itemLoaded);
        
        shootSound1.removeEventListener('canplaythrough', itemLoaded);
        shootSound2.removeEventListener('canplaythrough', itemLoaded);
        shootSound3.removeEventListener('canplaythrough', itemLoaded);
        sounds.push({name: SOUND_EXPLODE, element: explodeSound1, played: false});
        sounds.push({name: SOUND_EXPLODE, element: explodeSound2, played: false});
        sounds.push({name: SOUND_EXPLODE, element: explodeSound3, played: false});
        sounds.push({name: SOUND_SHOOT, element: shootSound1, played: false});
        sounds.push({name: SOUND_SHOOT, element: shootSound2, played: false});
        sounds.push({name: SOUND_SHOOT, element: shootSound3, played: false});

        appState = STATE_RESET;
    }
}

function initApp() {
    itemsLoaded = 0;
    itemsToLoad = 9;
    explodeSound1 = document.createElement('audio');
    document.body.appendChild(explodeSound1);
    explodeSound1.addEventListener('canplaythrough', itemLoaded);
    explodeSound1.setAttribute('src', `space-raiders/explode1.${audioType}`);

    explodeSound2 = document.createElement('audio');
    document.body.appendChild(explodeSound2);
    explodeSound2.addEventListener('canplaythrough', itemLoaded);
    explodeSound2.setAttribute('src', `space-raiders/explode1.${audioType}`);

    explodeSound3 = document.createElement('audio');
    document.body.appendChild(explodeSound3);
    explodeSound3.addEventListener('canplaythrough', itemLoaded);
    explodeSound3.setAttribute('src', `space-raiders/explode1.${audioType}`);

    shootSound1 = document.createElement('audio');
    document.body.appendChild(shootSound1);
    shootSound1.addEventListener('canplaythrough', itemLoaded);
    shootSound1.setAttribute('src', `space-raiders/shoot1.${audioType}`);

    shootSound2 = document.createElement('audio');
    document.body.appendChild(shootSound2);
    shootSound2.addEventListener('canplaythrough', itemLoaded);
    shootSound2.setAttribute('src', `space-raiders/shoot1.${audioType}`);

    shootSound3 = document.createElement('audio');
    document.body.appendChild(shootSound3);
    shootSound3.addEventListener('canplaythrough', itemLoaded);
    shootSound3.setAttribute('src', `space-raiders/shoot1.${audioType}`);


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


function playSound(sound, volume) {
    let soundFound = false;
    let soundIndex = 0;
    if (sounds.length > 0) {
        while(!soundFound && soundIndex < sound.length) {
            let tSound = sounds[soundIndex];

            if (tSound && tSound.name === sound && (tSound.element.ended || !tSound.played)) {
                soundFound = true;
            } else {
                soundIndex++;
            }
        }
    }
    if (soundFound) {
        const tempSound = sounds[soundIndex].element;
        sounds[soundIndex].played = true;
        tempSound.volume = volume;
        tempSound.play();
    } else if (sounds.length < MAX_SOUNDS) {
        const tempSound = document.createElement('audio');
        tempSound.setAttribute('src', sound + '.' + audioType);
        tempSound.volume = volume;
        tempSound.play();
        sounds.push({ name: sound, element: tempSound, played: true });
    }
}
function startLevel() {
    aliens.length = 0;
    missiles.length = 0;
    const {width, height} = alienImage;
    for (let r = 0; r < ALIEN_ROWS; r++) {
        for(let c = 0; c < ALIEN_COLS; c++) {
            aliens.push({
                speed: 2,
                x: ALIEN_START_X + c * ALIEN_SPACING,
                y: ALIEN_START_Y + r * ALIEN_SPACING,
                width,
                height,
            })
        }
    }
}

function resetApp() {
    startLevel();
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
    if ((o1Right < o2Left) || (o1Bottom < o2Top) || (o1Left > o2Right) || (o1Top > o2Bottom)) {
        rc = false;
    } else {
        rc = true;
    }
    return rc;
}

function drawScreen() {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);

    for (let i = missiles.length - 1; i >= 0; i--) {
        missiles[i].y -= missiles[i].speed;
        if (missiles[i].y < (0 - missiles[i].height)) {
            missiles.splice(i, 1);
        }
    }

    for (let i = aliens.length - 1; i >= 0; i--) {
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
            const tempAlien = aliens[j];
            if (hitTest(tempAlien, tempMissile)) {
                playSound(SOUND_EXPLODE, .5);
                aliens.splice(j, 1);
                missiles.splice(i, 1);
                break missile;
            }
        }

        if (aliens.length <= 0) {
            appState = STATE_RESET;
        }
    }

    for (let j = aliens.length - 1; j >= 0; j--) {
        const tempAlien = aliens[j];
        if (hitTest(tempAlien, player)) {
            playSound(SOUND_EXPLODE, .5);
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
    context.fillStyle = '#ffffff';
    context.fillText("Active sounds: " + sounds.length, 200, 480);
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
        x: player.x + (.5 * playerImage.width),
        y: player.y - missileImage.height,
        width: missileImage.width,
        height: missileImage.height,
    });
    playSound(SOUND_SHOOT, .5);
}

theCanvas.addEventListener('mouseup', eventMouseUp, false);
theCanvas.addEventListener('mousemove', eventMouseMove, false);

function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    run();
}

const canvasApp = gameLoop;

export { canvasApp };