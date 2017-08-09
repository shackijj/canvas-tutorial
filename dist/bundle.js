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
    var appTemplate = '<canvas id="canvasOne" width="500" height="500" style="display: block;">\n        Your browser doesn\'t support HTML5 canvas.\n        </canvas>';

    appElement.innerHTML = appTemplate;

    var theCanvas = document.getElementById('canvasOne');
    var context = theCanvas.getContext("2d");

    var pointImage = new Image();
    pointImage.src = 'images/point.png';
    var points = [];

    var p0 = { x: 60, y: 10 };
    var p1 = { x: 70, y: 200 };
    var p2 = { x: 125, y: 295 };
    var p3 = { x: 350, y: 350 };
    var ball = { x: 0, y: 0, speed: 0.01, t: 0 };

    function drawPoint(point) {
        context.drawImage(pointImage, point.x, point.y, 1, 1);
    }

    function drawScreen() {
        var cx = 3 * (p1.x - p0.x);
        var bx = 3 * (p2.x - p1.x) - cx;
        var ax = p3.x - p0.x - cx - bx;

        var cy = 3 * (p1.y - p0.y);
        var by = 3 * (p2.y - p1.y) - cy;
        var ay = p3.y - p0.y - cy - by;

        var t = ball.t;

        var xt = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + p0.x;
        var yt = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + p0.y;

        ball.t += ball.speed;

        if (ball.t > 1) {
            ball.t = 1;
        }
        points.push({ x: xt, y: yt });

        context.fillStyle = '#EEEEEE';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);

        context.strokeStyle = '#000000';
        context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

        context.fillStyle = '#FF0000';
        context.beginPath();
        context.arc(p0.x, p0.y, 8, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        context.fillStyle = '#FF0000';
        context.beginPath();
        context.arc(p1.x, p1.y, 8, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        context.fillStyle = '#FF0000';
        context.beginPath();
        context.arc(p2.x, p2.y, 8, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        context.fillStyle = '#FF0000';
        context.beginPath();
        context.arc(p3.x, p3.y, 8, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        context.fillStyle = '#000000';
        context.beginPath();
        context.arc(xt, yt, 5, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        points.forEach(drawPoint);
    }

    function gameLoop() {
        drawScreen();
        window.requestAnimationFrame(gameLoop);
    }

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