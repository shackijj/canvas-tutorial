import { FrameRateCounter } from '../../utils';
import partsSrc from './parts.png';
import saucerSrc from './saucer.png';
import shipTilesSrc from './ship_tiles.png';
import shipTiles2Src from './ship_tiles2.png';

// Images
let parts = new Image();
let shipTiles = new Image();
let shipTiles2 = new Image();
let saucerTiles = new Image();


const frameRateCounter = new FrameRateCounter();

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const container = document.getElementById('app');
const theCanvas = document.createElement('canvas');

theCanvas.setAttribute('width', CANVAS_WIDTH);
theCanvas.setAttribute('height', CANVAS_HEIGHT);
container.appendChild(theCanvas);

const context = theCanvas.getContext('2d');

let currentGameStateFunction = null;
let currentGameState;

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

const player = {
    maxVelocity: 5,
    dx: 0,
    dy: 0,
    x: 200,
    y: 380,
    width: 32,
    height: 32,
    halfWidth: 10,
    halfHeight: 10,
    hitWidth: 24,
    hitHeight: 24,
    rotation: 0,
    rotationVelocity: 5,
    thrustAcceleration: .05,
    missileFrameDelay: 5,
    thrust: false,
    missileSpeed: 5,
    lastFrameCount: 0,
};

let rocks = [];
let saucers = [];
let playerMissiles = [];
let particles = [];
let saucerMissiles = [];

let levelRockMaxSpeed = 0;
let levelRockMaxSpeedAdjust = 1;
let levelSaucerMax = 1;
let levelSaucerOccurenceRate = 25;
let levelSaucerSpeed = 1;
let levelSaucerFireDelay = 300;
let levelSaucerFireRate = 30;
let levelSaucerMissileSpeed = 1;
let levelSaucerCreated = 0;

let shipState = 0;
const rotationVelocity = 1;
const thrustAcceleration = .03;
const width = 20;
const height = 20;
let x = 400;
let y = 200;
let alpha = 0;

const keyPressList = [];
document.addEventListener('keydown', function(e) {
    keyPressList[e.keyCode] = true;
});
document.addEventListener('keyup', function(e) {
    keyPressList[e.keyCode] = false;
});

function checkKeys() {
    if (keyPressList[38] === true) {
        const angleInRadians = player.rotation * Math.PI / 180;
        const facingX = Math.cos(angleInRadians);
        const facingY = Math.sin(angleInRadians);
        shipState = 1;
        const movingXNew = player.dx + player.thrustAcceleration * facingX;
        const movingYNew = player.dy + player.thrustAcceleration * facingY;
        const currentVelocity = Math.sqrt(Math.pow(movingXNew, 2) + Math.pow(movingYNew, 2));
        if (currentVelocity < player.maxVelocity) {
            player.dx = movingXNew;
            player.dy = movingYNew;
        }
    } else {
        shipState = 0;
    }
    if (keyPressList[37] === true) {
        player.rotation -= player.rotationVelocity;
    }
    if (keyPressList[39] === true) {
        player.rotation += player.rotationVelocity;
    }
    if (player.rotation >= 360) {
        player.rotation = 0;
    }
    if (player.rotation < 0) {
        player.rotation = 359;
    }
    // space
    const frameDelay = frameRateCounter.frameCtr - player.lastFrameCount;
    if (keyPressList[32] === true &&
        (frameDelay> player.missileFrameDelay || frameDelay < 0)) {
        player.lastFrameCount = frameRateCounter.frameCtr;
        const angleInRadians = player.rotation * Math.PI / 180;
        playerMissiles.push({
            x: player.x + player.halfWidth,  
            y: player.y + player.halfHeight,
            halfWidth: 1,
            halfHeight: 1,
            width: 2,
            height: 2,
            hitHeight: 2,
            hitWidth: 2,
            dx: Math.cos(angleInRadians) * player.missileSpeed,
            dy: Math.sin(angleInRadians) * player.missileSpeed,
        });
    }
}

function updatePlayer() {
    testWallsAndMove(player);
    frameRateCounter.countFrames();
}

function testWallsAndMove(obj) {
    const {x, dx, y, dy, halfHeight, halfWidth} = obj;
    const nextX = x + dx;
    const nextY = y + dy;
    if (nextX + 2 * halfWidth > xMax) {
        obj.dx *= -1;
        obj.x = xMax - 2 * halfWidth;
    } else if (nextX < xMin) {
        obj.dx *= -1;
        obj.x = xMin;
    } else if (nextY + 2 * halfHeight > yMax) {
        obj.dy *= -1;
        obj.y = yMax - 2 * halfHeight;
    } else if (nextY < yMin) {
        obj.dy *= -1;
        obj.y = yMin;
    } else {
        obj.x += dx;
        obj.y += dy;
    }
}

function createSaucer() {
    if (levelSaucerCreated >= levelSaucerMax) {
        return;
    }

    if (Math.random() * 100 < levelSaucerOccurenceRate) {
        levelSaucerCreated++;
        const saucer = {
            width: 30,
            height: 15,
            hitHeight: 30,
            hitWidth: 15,
            halfHeight: 15,
            halfWidth: 7,
            x: Math.floor(Math.random() * 50),
            y: Math.floor(Math.random() * 50),
            dx: ((Math.random() * 2) + levelRockMaxSpeedAdjust) * ((Math.random() < .5) ? -1 : 1),
            dy: ((Math.random() * 2) + levelRockMaxSpeedAdjust) * ((Math.random() < .5) ? -1 : 1),
        };
        saucers.push(saucer);
    }
}

function updateRock(rock) {
    const {x, dx, y, dy, halfHeight, halfWidth, rotation, rotationInc} = rock;
    testWallsAndMove(rock);
    rock.rotation += rotationInc;
}

function updateSaucers() {
    saucers.forEach(testWallsAndMove);
}

function updateRocks() {
    rocks.forEach(updateRock);
    particles.forEach(updateRock);
}

function fillBackground() {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawScoreboard() {
    context.fillStyle = '#ffffff';
    context.font = '20px sans-serif';
    context.textBaseline = 'top';
    context.fillText(`FPS: ${frameRateCounter.lastFrameCount}`, 0, 0);
    context.fillText(`Score: ${frameRateCounter.lastFrameCount}`, 90, 0);
    context.fillText(`Ships: ${frameRateCounter.lastFrameCount}`, 200, 0);
}

function hitTest(obj1, obj2) {
    const o1Left = obj1.x;
    const o1Top = obj1.y;
    const o1Bottom = obj1.y + obj1.hitHeight;
    const o1Right = obj1.x + obj1.hitWidth;

    const o2Left = obj2.x;
    const o2Top = obj2.y;
    const o2Bottom = obj2.y + obj2.hitHeight;
    const o2Right = obj2.x + obj2.hitWidth;

    let rc = false
    if ((o1Right < o2Left) || (o1Bottom < o2Top) || (o1Left > o2Right) || (o1Top > o2Bottom)) {
        rc = false;
    } else {
        rc = true;
    }
    return rc;
}

function randomDirection(d) {
    return d * ((Math.random() < .5) ? -1 : 1);
}


function checkParticales() {
    missile: for(let i = playerMissiles.length - 1; i >= 0; i--) {
        const missile = playerMissiles[i];
        for(let j = particles.length - 1; j >= 0; j--) {
            if (hitTest(missile, particles[j])) {
                particles.splice(j, 1);
                playerMissiles.splice(i, 1);
                break missile;
            }
        }
    }
}

function checkSaucers() {
    missile: for(let i = playerMissiles.length - 1; i >= 0; i--) {
        const missile = playerMissiles[i];
        for(let j = saucers.length - 1; j >= 0; j--) {
            if (hitTest(missile, saucers[j])) {
                saucers.splice(j, 1);
                playerMissiles.splice(i, 1);
                break missile;
            }
        }
    }
}

function checkRocks() {
    missile: for(let i = playerMissiles.length - 1; i >= 0; i--) {
        const missile = playerMissiles[i];
        for(let j = rocks.length - 1; j >= 0; j--) {
            const rock = rocks[j];
            if (hitTest(missile, rock)) {
                rocks.splice(j, 1);
                playerMissiles.splice(i, 1);
                let newWidth;
                switch(rock.width) {
                    case 50:
                        newWidth = 30;
                        break;
                    case 30:
                        newWidth = 20;
                        break;
                }
                const width = newWidth;
                const height = newWidth;
                const halfWidth = newWidth / 2;
                const halfHeight = newWidth / 2;
                const hitHeight = newWidth;
                const hitWidth = newWidth;
                const newRock1 = Object.assign({}, rock, {
                    width,
                    height,
                    halfWidth,
                    halfHeight,
                    hitHeight,
                    hitWidth,
                    dx: rock.dx * -1,
                    dy: rock.dy
                });
                const newRock2 = Object.assign({}, newRock1, {
                    dy: rock.dy * -1,
                });
                if (newWidth == 20) {
                    particles.push(newRock1);
                    particles.push(newRock2);
                } else {
                    rocks.push(newRock1);
                    rocks.push(newRock2);
                }
                break missile;
            }
        }
    }
}

function checkPlayer() {
    for (let i = rocks.length - 1; i >= 0; i--) {
        const rock = rocks[i];
        if (hitTest(player, rock)) {
            switchGameState(GAME_STATE_NEW_GAME);
            return;
        }
    }
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        if (hitTest(player, particle)) {
            switchGameState(GAME_STATE_NEW_GAME);
            return;
        }
    }
}

function checkCollisions() {
    checkRocks();
    checkSaucers();
    checkParticales();
    checkPlayer();
}


function updateMissiles() {
    for(let i = playerMissiles.length - 1; i >= 0; i--) {
        const missile = playerMissiles[i];
        if (missile.x > xMax || missile.x < xMin || missile.y > yMax || missile.y < yMin) {
            playerMissiles.splice(i, 1);
        }
        missile.x += missile.dx;
        missile.y += missile.dy;
    }
}

function renderPlayerMissiles() {
    playerMissiles.forEach((missile) => {
        const {x, y, halfWidth, halfHeight, rotation} = missile;
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.translate(x + halfWidth, y + halfHeight);
        const angleInRadians = rotation * Math.PI / 180;
        context.rotate(angleInRadians);
    
        context.strokeStyle = '#ffffff';
        context.beginPath();
        context.moveTo(-1, -1);
        context.lineTo(1, -1);
        context.lineTo(1, 1);
        context.lineTo(-1, 1);
        context.lineTo(-1, -1);
        context.stroke();
        context.closePath();
    
        context.restore();
    })
}

function renderPlayer() {
    const {x, y, halfWidth, halfHeight, rotation} = player;
    context.save();

    const sourceX = Math.floor((player.rotation / 10) % 10) * 32;
    const sourceY = Math.floor((player.rotation / 10) / 10) * 32;
    if (player.thrust) {
        context.drawImage(shipTiles2, sourceX, sourceY, 32, 32,
            player.x, player.y, 32, 32);
    } else {
        context.drawImage(shipTiles, sourceX, sourceY, 32, 32,
            player.x, player.y, 32, 32);
    }

    context.restore();
}

function renderSaucers() {
    for(let i = saucers.length - 1; i >= 0; i--) {
        const saucer = saucers[i];
        context.save();
        const sourceX = 0;
        const sourceY = 0;
        context.drawImage(saucerTiles, sourceX, sourceY, 30, 15, saucer.x, saucer.y, 30, 15);
        context.restore();
    }
}

function renderRock(rock) {
    const {x, y, halfHeight, halfWidth, rotation, scale} = rock;
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(x + halfWidth, y + halfHeight);
    const angleInRadians = rotation * Math.PI / 180;
    context.rotate(angleInRadians);
    context.strokeStyle = '#ffffff';
    context.beginPath();
    context.moveTo(-1 * halfWidth, -1 * halfWidth);
    context.lineTo(halfWidth, -1 * halfWidth);
    context.lineTo(halfWidth, halfWidth);
    context.lineTo(-1 * halfHeight, halfHeight);
    context.lineTo(-1 * halfWidth, -1 * halfWidth);
    context.stroke();
    context.closePath();
    context.restore();
}

function renderRocks() {
    rocks.forEach(renderRock);
    particles.forEach(renderRock);
}

function gameStatePlayLevel() {
    checkKeys();
    fillBackground();
    createSaucer();
    updatePlayer();
    updateRocks();
    updateMissiles();
    updateSaucers();
    renderPlayer();
    renderRocks();
    renderSaucers();
    renderPlayerMissiles();
    checkCollisions();
    drawScoreboard();
}

function checkTitleKeys() {
    if (keyPressList[13] === true) {
        switchGameState(GAME_STATE_NEW_GAME);
    }
}

function gameStateTitle() {
    // checkTitleKeys();
    switchGameState(GAME_STATE_NEW_GAME);
    context.fillStyle = '#000000';
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.fillStyle = '#ffffff';
    context.font = '20px sans-serif';
    context.textBaseline = 'top';
    context.fillText('Geo Blaster Basic', 120, 100);
    context.font = '15px sans-serif';
    context.fillText('Press enter to start', 135, 140);
}

function gameStateNewGame() {
    level = 0;
    score = 0;
    playerShips = 0;
    switchGameState(GAME_STATE_NEW_LEVEL);
}

function resetPlayer() {
    player.dx = 0;
    player.dy = 0;
    player.x = 200;
    player.y = 380;
}

function gameStateNewLevel() {
    resetPlayer();
    rocks = [];
    playerMissiles = [];
    saucerMissiles = [];
    particles = [];
    saucers = [];

    levelSaucerCreated = 0;

    level++;

    levelRockMaxSpeedAdjust = level * .25;

    if (levelRockMaxSpeedAdjust > 3) {
        levelRockMaxSpeed = 3;
    }
    levelSaucerMax = 1 + Math.floor(level / 10);
    levelSaucerOccurenceRate = 10 + 3 * level;
    if (levelSaucerOccurenceRate > 35) {
        levelSaucerOccurenceRate = 35;
    }

    levelSaucerSpeed = 1 + .5 * level;
    if (levelSaucerSpeed > 5) {
        levelSaucerSpeed = 5;
    }
    levelSaucerFireDelay = 120 - 10 * level;
    if (levelSaucerFireDelay<20) {
        levelSaucerFireDelay=20;
    }
    
    levelSaucerFireRate = 20 + 3 * level;
    if (levelSaucerFireRate < 50) {
        levelSaucerFireRate = 50;
    }
    
    levelSaucerMissileSpeed = 1 + .2 * level;
    if (levelSaucerMissileSpeed > 4){
        levelSaucerMissileSpeed = 4;
    }
    for(let newRockCnt = 0; newRockCnt < level + 3; newRockCnt++) {
        rocks.push({
            scale: 1,
            width: 50,
            height: 50,
            hitHeight: 50,
            hitWidth: 50,
            halfHeight: 25,
            halfWidth: 25,
            x: Math.floor(Math.random() * 50),
            y: Math.floor(Math.random() * 50),
            dx: ((Math.random() * 2) + levelRockMaxSpeedAdjust) * ((Math.random() < .5) ? -1 : 1),
            dy: ((Math.random() * 2) + levelRockMaxSpeedAdjust) * ((Math.random() < .5) ? -1 : 1),
            rotationInc: ((Math.random() * 5) + 1) * ((Math.random() < .5) ? -1 : 1),
            scoreValue: bigRockScore,
            rotation: 0,
        });
    }
    resetPlayer();
    switchGameState(GAME_STATE_PLAYER_START);
}
function gameStatePlayerStart() {
    switchGameState(GAME_STATE_PLAY_LEVEL);
}
function gameStatePlayerDie() {}
function gameStateGameOver() {}

function switchGameState(newState) {
    currentGameState = newState;
    switch(currentGameState) {
        case GAME_STATE_TITLE:
            currentGameStateFunction = gameStateTitle;
            break;
        case GAME_STATE_NEW_LEVEL:
            currentGameStateFunction = gameStateNewLevel;
            break;
        case GAME_STATE_NEW_GAME:
            currentGameStateFunction = gameStateNewGame;
            break;
        case GAME_STATE_PLAYER_DIE:
            currentGameStateFunction = gameStatePlayerDie;
            break;
        case GAME_STATE_GAME_OVER:
            currentGameStateFunction = gameStateGameOver;
            break;
        case GAME_STATE_PLAY_LEVEL:
            currentGameStateFunction = gameStatePlayLevel;
            break;
        case GAME_STATE_PLAYER_START:
            currentGameStateFunction = gameStatePlayLevel;
            break;
    }
}

switchGameState(GAME_STATE_TITLE);

const FRAME_RATE = 30;
const INTERVAL_TIME = 1000 / FRAME_RATE;
function gameLoop() {
    currentGameStateFunction();
    window.setTimeout(gameLoop, INTERVAL_TIME);
}

export function canvasApp() {
    let itemsToLoad = 4;
    let itemsLoaded = 0;

    function itemLoaded() {
        itemsLoaded++;
        if (itemsLoaded >= itemsToLoad) {
            gameLoop();
        }
    }

    parts.addEventListener('load', itemLoaded);
    parts.src = partsSrc;
    shipTiles.addEventListener('load', itemLoaded);
    shipTiles.src = shipTilesSrc;
    shipTiles2.addEventListener('load', itemLoaded);
    shipTiles2.src = shipTiles2Src;
    saucerTiles.addEventListener('load', itemLoaded);
    saucerTiles.src = saucerSrc;
}
