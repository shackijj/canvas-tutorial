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
    var appTemplate = '<canvas id="canvasOne" width="256" height="256" style="position: absolute; top: 50px; left: 50px">\n        Your browser doesn\'t support HTML5 canvas.\n        </canvas>';

    appElement.innerHTML = appTemplate;

    var theCanvas = document.getElementById('canvasOne');
    var context = theCanvas.getContext("2d");

    var tileSheet = new Image();
    tileSheet.addEventListener('load', startUp);
    tileSheet.src = 'images/tanks-sheet.png';

    var mouseX = void 0;
    var mouseY = void 0;
    var imageData = void 0;

    function onMouseMove(event) {
        mouseX = event.clientX - theCanvas.offsetLeft;
        mouseY = event.clientY - theCanvas.offsetTop;
    }

    function drawTileSheet() {
        context.drawImage(tileSheet, 0, 0);
    }

    function highlightTile(tileId, x, y) {
        context.fillStyle = '#aaaaaa';
        context.fillRect(0, 0, 256, 128);
        drawTileSheet();
        imageData = context.getImageData(x, y, 32, 32);

        // setting alpha
        for (var j = 3; j < imageData.data.length; j += 4) {
            imageData.data[j] = 128;
        }

        var startX = Math.floor(tileId % 8) * 32;
        var startY = Math.floor(tileId / 8) * 32;
        context.strokeStyle = 'red';
        context.strokeRect(startX, startY, 32, 32);
    }

    function onMouseClick() {
        if (mouseY < 128) {
            var col = Math.floor(mouseX / 32);
            var row = Math.floor(mouseY / 32);
            var tileId = row * 7 + (col + row);
            highlightTile(tileId, col * 32, row * 32);
        } else {
            var _col = Math.floor(mouseX / 32);
            var _row = Math.floor(mouseY / 32);
            context.putImageData(imageData, _col * 32, _row * 32);
        }
    }

    function startUp() {
        context.fillStyle = '#aaaaaa';
        context.fillRect(0, 0, 256, 256);
        drawTileSheet();
    }

    theCanvas.addEventListener('mousemove', onMouseMove, false);
    theCanvas.addEventListener('click', onMouseClick, false);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ch4Images = __webpack_require__(0);

window.addEventListener('load', _ch4Images.canvasApp);

/***/ })
/******/ ]);