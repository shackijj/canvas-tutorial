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
    var appElement = document.getElementById('app');

    var appTemplate = '<canvas id="canvasOne" width="500" height="500">\n        Your browser doesn\'t support HTML5 canvas.\n        </canvas>';

    appElement.innerHTML = appTemplate;
    var theCanvas = document.getElementById('canvasOne');
    var context = theCanvas.getContext("2d");

    if (!Modernizr.canvas) {
        return;
    }

    function simplePaths() {
        context.strokeStyle = 'black';
        context.lineWidth = 10;

        context.lineJoin = 'bevel';
        context.lineCap = 'round';
        // sample 1 round, bevel

        context.beginPath();
        context.moveTo(10, 10);
        context.lineTo(35, 10);
        context.lineTo(35, 35);
        context.stroke();
        context.closePath();

        // sample 2 round, bevel
        context.beginPath();
        context.moveTo(10, 60);
        context.lineTo(35, 60);
        context.lineTo(35, 85);
        context.stroke();
        context.closePath();

        // sampe 3 round, butt
        context.lineJoin = 'round';
        context.lineCap = 'butt';
        context.beginPath();
        context.moveTo(10, 110);
        context.lineTo(35, 110);
        context.lineTo(35, 135);
        context.stroke();
        context.closePath();
    }

    function advancedPaths() {
        // arc
        context.beginPath();
        context.strokeStyle = 'red';
        context.lineWidth = 5;
        context.arc(250, 250, 20, Math.PI / 180 * 30, Math.PI / 180 * 150, true);
        // fill
        context.stroke();
        context.closePath();

        context.beginPath();
        context.strokeStyle = 'green';
        context.moveTo(0, 0);
        context.lineTo(100, 200);
        context.arcTo(350, 350, 100, 100, 20);
        context.stroke();
        context.closePath();
    }

    function drawScreen() {
        advancedPaths();
    }

    drawScreen();
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ch2DrawingOnCanvas = __webpack_require__(0);

window.addEventListener('load', _ch2DrawingOnCanvas.canvasApp);

/***/ })
/******/ ]);