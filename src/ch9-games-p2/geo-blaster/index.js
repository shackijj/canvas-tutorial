import { FrameRateCounter } from '../../utils';
import partsSrc from './parts.png';
import saucerSrc from './saucer.png';
import shipTilesSrc from './ship_tiles.png';
import shipTiles2Src from './ship_tiles2.png';
import smallRocksTilesSrc from './smallrocks.png';
import mediumRocksTilesSrc from './mediumrocks.png';
import largeRocksTilesSrc from './largerocks.png';
import supportedAudioFormat from '../../ch7-audio/supportedAudioFormat';

import explodeMp3 from './explode1.mp3';
import explodeOgg from './explode1.ogg';
import explodeWav from './explode1.wav';

// Images
let parts = new Image();
let shipTiles = new Image();
let shipTiles2 = new Image();
let saucerTiles = new Image();
let smallRocksTiles = new Image();
let mediumRocksTiles = new Image();
let largeRocksTiles = new Image();


const frameRateCounter = new FrameRateCounter();

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const audioContext = new (window.AudioContext || window.webkitAudioContext);
const audioType = supportedAudioFormat(document.createElement('audio'));
let explodeSoundBuffer;

function playSound(soundBuffer) {
    var source = audioContext.createBufferSource();
    source.buffer = soundBuffer;
    source.connect(audioContext.destination);
    source.start(0);
}

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
let particlePool = [];

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
            fireCount: 0,
            x: Math.floor(Math.random() * 50),
            y: Math.floor(Math.random() * 50),
            dx: ((Math.random() * 2) + levelRockMaxSpeedAdjust) * ((Math.random() < .5) ? -1 : 1),
            dy: ((Math.random() * 2) + levelRockMaxSpeedAdjust) * ((Math.random() < .5) ? -1 : 1),
        };
        saucers.push(saucer);
    }
}

function updateRock(rock) {
    testWallsAndMove(rock);
    rock.animationCount++;
    if (rock.animationCount > rock.animationDelay) {
        rock.rotation += rock.rotationInc;
        rock.animationCount = 0;
        if (rock.rotation > 4) {
            rock.rotation = 0;
        } else if (rock.rotation < 0) {
            rock.rotation = 4;
        }
    }
}

function updateSaucers() {
    saucers.forEach((saucer) => {
        testWallsAndMove(saucer);

        saucer.fireCount++;
        if (saucer.fireCount > levelSaucerFireRate) {
            saucer.fireCount = 0;
            saucerMissiles.push({
                x: saucer.x + saucer.halfWidth,  
                y: saucer.y + saucer.halfHeight,
                halfWidth: 1,
                halfHeight: 1,
                width: 2,
                height: 2,
                hitHeight: 2,
                hitWidth: 2,
                dx: saucer.dx * 2,
                dy: saucer.dy * 2,
            });
        }
    });
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
            const particle = particles[j];
            if (hitTest(missile, particle)) {
                createExplosion(
                    particle.x + particle.halfWidth, particle.y + particle.halfHeight, 10, 4);
                playSound(explodeSoundBuffer);
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
            const saucer = saucers[j];
            if (hitTest(missile, saucers[j])) {
                createExplosion(
                    saucer.x + saucer.halfWidth, saucer.y + saucer.halfHeight, 10, 4);
                playSound(explodeSoundBuffer);
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
                let newScale;
                switch(rock.scale) {
                    case 1:
                        newWidth = 32;
                        newScale = 2;
                        break;
                    case 2:
                        newWidth = 24;
                        newScale = 3;
                        break;
                }
                createExplosion(
                    rock.x + rock.halfWidth, rock.y + rock.halfHeight, 10, rock.scale);
                playSound(explodeSoundBuffer);
                const width = newWidth;
                const height = newWidth;
                const halfWidth = newWidth / 2;
                const halfHeight = newWidth / 2;
                const hitHeight = newWidth - 8;
                const hitWidth = newWidth - 8;
                const newRock1 = Object.assign({}, rock, {
                    scale: newScale,
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
                if (newScale === 3) {
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


function updateMissiles(missiles) {
    for(let i = missiles.length - 1; i >= 0; i--) {
        const missile = missiles[i];
        if (missile.x > xMax || missile.x < xMin || missile.y > yMax || missile.y < yMin) {
            missiles.splice(i, 1);
        }
        missile.x += missile.dx;
        missile.y += missile.dy;
    }
}

function renderMissile(missile, index) {
    const {x, y, width, height} = missile;
    context.save();
    const sourceX = Math.floor(index % 4) * missile.width;
    const sourceY = Math.floor(index / 4) * missile.height;
    context.drawImage(parts, sourceX, sourceY, width, height, x, y, width, height);

    context.restore();
}

function renderPlayerMissiles() {
    const renderGreeenMissile = (missile) => renderMissile(missile, 1);
    playerMissiles.forEach(renderGreeenMissile);
}

function renderSaucerMissiles() {
    const renderBlueMissile = (missile) => renderMissile(missile, 2);
    saucerMissiles.forEach(renderBlueMissile);
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
    const {x, y, width, height, rotation, scale} = rock;
    context.save();
    const sourceX = Math.floor(rotation % 5) * width;
    const sourceY = Math.floor(rotation / 5) * height;

    let tile;
    switch(scale) {
        case 1:
            tile = largeRocksTiles;
            break;
        case 2:
            tile = mediumRocksTiles;
            break;
        case 3:
            tile = smallRocksTiles;
            break;
    }

    context.drawImage(tile, sourceX, sourceY, width, height, x, y, width, height);
    context.restore();
}

function renderRocks() {
    rocks.forEach(renderRock);
    particles.forEach(renderRock);
}

function createExplosion(x, y, num, type) {
    for (let i = 0; i < num; i++) {
        let newParticle = {};
        newParticle.dx = Math.random() * 3;
        if (Math.random() < 0.5) {
            newParticle.dx *= -1;
        }

        newParticle.dy = Math.random() * 3;
        if (Math.random() < 0.5) {
            newParticle.dy *= -1;
        }

        newParticle.life = Math.floor(Math.random() * 30 + 30);
        newParticle.lifeCounter = 0;
        newParticle.x = x;
        newParticle.y = y;
        newParticle.width = 2;
        newParticle.height = 2;
        newParticle.type = type;
        particlePool.push(newParticle);
    }
}

function renderParticles() {
    particlePool.forEach((particle) => {
        context.save();
        let tile;

        switch(particle.type) {
            case 0:
                tile = 0;
                break;
            case 1:
                tile = 2;
                break;
            case 2:
                tile = 3;
                break;
            case 3:
                tile = 0;
                break;
            case 4:
                tile = 1;
                break;
        }

        const sourceX = Math.floor(tile % 4) * particle.width;
        const sourceY = Math.floor(tile / 4) * particle.height;

        const {width, height, x, y} = particle;
        context.drawImage(parts, sourceX, sourceY, width, height, x, y, width, height);
        context.restore();
    });
}

function updateParticles() {
    for(let i = particlePool.length - 1; i >= 0; i--) {
        const particle = particlePool[i];
        particle.lifeCounter++;
        if (particle.lifeCounter > particle.life) {
            particlePool.splice(i, 1);
            continue;
        }

        if (particle.x > xMax || particle.x < xMin || particle.y > yMax || particle.y < yMin) {
            particlePool.splice(i, 1);
            continue;
        }
        particle.x += particle.dx;
        particle.y += particle.dy;
    }
}

function gameStatePlayLevel() {
    checkKeys();
    fillBackground();
    createSaucer();
    updatePlayer();
    updateRocks();
    updateMissiles(playerMissiles);
    updateMissiles(saucerMissiles)
    updateSaucers();
    updateParticles();
    renderPlayer();
    renderRocks();
    renderSaucers();
    renderParticles();
    renderPlayerMissiles();
    renderSaucerMissiles();
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
            width: 64,
            height: 64,
            hitHeight: 56,
            hitWidth: 56,
            halfHeight: 32,
            halfWidth: 32,
            x: Math.floor(Math.random() * 50),
            animationCount: 0,
            animationDelay: 5,
            y: Math.floor(Math.random() * 50),
            dx: ((Math.random() * 2) + levelRockMaxSpeedAdjust) * ((Math.random() < .5) ? -1 : 1),
            dy: ((Math.random() * 2) + levelRockMaxSpeedAdjust) * ((Math.random() < .5) ? -1 : 1),
            rotationInc: (Math.random() < .5) ? -1 : 1,
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
    let itemsToLoad = 8;
    let itemsLoaded = 0;

    function itemLoaded() {
        itemsLoaded++;
        if (itemsLoaded >= itemsToLoad) {
            gameLoop();
        }
    }

    function loadExplodeSound() {
        const request = new XMLHttpRequest();
        let url;
        switch(audioType) {
            case 'mp3':
                url = explodeMp3;
                break;
            case 'ogg':
                url = explodeOgg;
                break;
            case 'wav':
                url = explodeWav;
                break;
            default:
                alert('Cannot find url for audio');
                return;
        }
        function onError() {
            alert(`error loading sound ${url}`);
        }
        request.open('GET', url);
        request.responseType = 'arraybuffer';
        request.onload = function() {
            audioContext.decodeAudioData(request.response, function(buffer) {
                explodeSoundBuffer = buffer;
                itemLoaded();
            }, onError);
        }
        request.send();
    }

    loadExplodeSound();
    parts.addEventListener('load', itemLoaded);
    parts.src = partsSrc;
    shipTiles.addEventListener('load', itemLoaded);
    shipTiles.src = shipTilesSrc;
    shipTiles2.addEventListener('load', itemLoaded);
    shipTiles2.src = shipTiles2Src;
    saucerTiles.addEventListener('load', itemLoaded);
    saucerTiles.src = saucerSrc;
    largeRocksTiles.addEventListener('load', itemLoaded);
    largeRocksTiles.src = largeRocksTilesSrc;
    mediumRocksTiles.addEventListener('load', itemLoaded);
    mediumRocksTiles.src = mediumRocksTilesSrc;
    smallRocksTiles.addEventListener('load', itemLoaded);
    smallRocksTiles.src = smallRocksTilesSrc;
}
