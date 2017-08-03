/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.canvasApp = canvasApp;
function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    var appElement = document.getElementById('app');
    var appTemplate = '<canvas id="canvasOne" width="500" height="500" style="display: block;">\n        Your browser doesn\'t support HTML5 canvas.\n        </canvas>\n        <form>\n        Canvas Width: <input type="range" id="canvasWidth" min="0" max="1000" step="1" value="500"/>\n        Canvas Height: <input type="range" id="canvasHeight" min="0" max="1000" step="1" value="500"/>\n        </form>';

    appElement.innerHTML = appTemplate;

    var theCanvas = document.getElementById('canvasOne');
    var context = theCanvas.getContext("2d");
    var canvasWidthInput = document.getElementById('canvasWidth');
    var canvasHeightInput = document.getElementById('canvasHeight');

    var pointImage = new Image();
    pointImage.src = 'images/point.png';
    var balls = [];

    var numBalls = 500;
    var maxSize = 8;
    var minSize = 5;
    var maxSpeed = minSize + 5;

    var tempBall = void 0;
    var tempX = void 0;
    var tempY = void 0;
    var tempSpeed = void 0;
    var tempAngle = void 0;
    var tempRadius = void 0;
    var tempRadians = void 0;
    var tempVelocityX = void 0;
    var tempVelocityY = void 0;

    function hitTestCircle(ball1, ball2) {
        var retval = false;
        var dx = ball1.nextX - ball2.nextX;
        var dy = ball1.nextY - ball2.nextY;
        var distance = dx * dx + dy * dy;
        if (distance <= ball1.radius + ball2.radius) {
            retval = true;
        }
        return retval;
    }

    function canStartHere(testBall) {
        var retval = true;
        balls.forEach(function (ball) {
            if (hitTestCircle(testBall, ball)) {
                retval = false;
            }
        });
        return retval;
    }

    for (var i = 0; i < numBalls; i++) {
        tempRadius = 5;
        var placeOK = false;
        while (!placeOK) {
            tempX = Math.floor(Math.random() * theCanvas.width);
            tempY = Math.floor(Math.random() * theCanvas.height);
            tempSpeed = 4;
            tempAngle = Math.floor(360 * Math.random());
            tempRadians = tempAngle * Math.PI / 180;
            tempVelocityX = Math.cos(tempRadians) * tempSpeed;
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
                mass: tempRadius
            };
            placeOK = canStartHere(tempBall);
        }
        balls.push(tempBall);
    }

    function update() {
        balls.forEach(function (ball) {
            ball.nextX = ball.x += ball.velocityX;
            ball.nextX = ball.y += ball.velocityY;
        });
    }

    function testWalls() {
        balls.forEach(function (ball) {
            if (ball.nextX + ball.radius > theCanvas.width) {
                ball.velocityX *= -1;
                ball.nextX = theCanvas.width - ball.radius;
            } else if (ball.nextY - ball.radius < 0) {
                ball.velocityY *= -1;
                ball.nextY = ball.radius;
            } else if (ball.nextX - ball.radius < 0) {
                ball.velocityX *= -1;
                ball.nextX = ball.radius;
            } else if (ball.nextY + ball.radius > theCanvas.height) {
                ball.velocitY *= -1;
                ball.nextY = theCanvas.height - ball.radius;
            }
        });
    }

    function collideBalls(ball1, ball2) {
        var dx = ball1.nextX - ball2.nextX;
        var dy = ball2.nextY - ball2.nextY;
        var collisionAngle = Math.atan2(dy, dx);
        var speed1 = Math.sqrt(ball1.velocityX * ball1.velocityX + ball1.velocitY * ball1.velocityY);
        var speed2 = Math.sqrt(ball2.velocityX * ball2.velocityX + ball2.velocitY * ball2.velocityY);
        var direction1 = Math.atan2(ball1.velocitY, ball1.velocityX);
        var direction2 = Math.atan2(ball2.velocitY, ball2.velocityX);

        var velocityX1 = speed1 * Math.cos(direction1 - collisionAngle);
        var velocityY1 = speed1 * Math.sin(direction1 - collisionAngle);
        var velocityX2 = speed2 * Math.cos(direction2 - collisionAngle);
        var velocityY2 = speed2 * Math.sin(direction2 - collisionAngle);

        var finalVelocityX1 = ((ball1.mass - ball2.mass) * velocityX1 + 2 * ball2.mass * velocityX2) / ball1.mass + ball2.mass;

        var finalVelocityX2 = ((ball2.mass - ball1.mass) * velocityX2 + 2 * ball1.mass * velocityX1) / ball1.mass + ball2.mass;

        var finalVelocityY1 = velocityY1;
        var finalVelocityY2 = velocityY2;

        ball1.velocityX = Math.cos(collisionAngle) * finalVelocityX1 + Math.cos(collisionAngle + Math.PI / 2) * finalVelocityY1;
        ball1.velocityY = Math.sin(collisionAngle) * finalVelocityX1 + Math.sin(collisionAngle + Math.PI / 2) * finalVelocityY1;

        ball2.velocityX = Math.cos(collisionAngle) * finalVelocityX2 + Math.cos(collisionAngle + Math.PI / 2) * finalVelocityY2;

        ball2.velocityY = Math.sin(collisionAngle) * finalVelocityX2 + Math.sin(collisionAngle + Math.PI / 2) * finalVelocityY2;

        ball1.nextX = ball1.nextX += ball1.velocityX;
        ball1.nextY = ball1.nextY += ball1.velocityY;
        ball2.nextX = ball2.nextX += ball2.velocityX;
        ball2.nextY = ball2.nextY += ball2.velocityY;
    }

    function collide() {
        balls.forEach(function (testBall) {
            balls.forEach(function (ball) {
                if (testBall !== ball && hitTestCircle(ball, testBall)) {
                    collideBalls(ball, testBall);
                }
            });
        });
    }

    function render() {
        context.fillStyle = '#000000';
        balls.forEach(function (ball) {
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
        context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);
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
        var target = e.target;
        theCanvas.width = target.value;
        drawScreen();
    }

    function canvasHeightChanged(e) {
        var target = e.target;
        theCanvas.height = target.value;
        drawScreen();
    }

    canvasWidthInput.addEventListener('change', canvasWidthChanged, false);
    canvasHeightInput.addEventListener('change', canvasHeightChanged, false);
    window.requestAnimationFrame(gameLoop);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ch5MathPhysicsAnimation = __webpack_require__(0);

window.addEventListener('load', _ch5MathPhysicsAnimation.canvasApp);

/***/ })
/******/ ]);