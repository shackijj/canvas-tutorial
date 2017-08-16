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

    var shipImage = new Image();
    shipImage.src = 'images/space-ship.png';
    shipImage.onload = gameLoop;

    var easeValue = 0.05;
    var p1 = { x: 240, y: -20 };
    var p2 = { x: 240, y: 470 };
    var ship = { x: p1.x, y: p1.y, ex: p2.x, ey: p2.y, vx: 0, vy: 0 };

    function drawPoint(point) {
        context.drawImage(pointImage, point.x, point.y, 1, 1);
    }

    function drawBackground() {
        context.fillStyle = '#EEEEEE';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);

        context.strokeStyle = '#000000';
        context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);
    }

    function drawScreen() {
        points.push({ x: ship.x, y: ship.y });

        drawBackground();
        points.forEach(drawPoint);
        var dx = ship.ex - ship.x;
        var dy = ship.ey - ship.y;

        ship.vx = dx * easeValue;
        ship.vy = dy * easeValue;

        ship.x += ship.vx;
        ship.y += ship.vy;

        context.drawImage(shipImage, ship.x - shipImage.width / 2, ship.y);
    }

    function gameLoop() {
        drawScreen();
        window.requestAnimationFrame(gameLoop);
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ch5MathPhysicsAnimation = __webpack_require__(0);

window.addEventListener('load', _ch5MathPhysicsAnimation.canvasApp);

/***/ })
/******/ ]);