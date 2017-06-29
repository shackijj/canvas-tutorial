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
    var appTemplate = '<canvas id="canvasOne" width="500" height="500">\n        Your browser doesn\'t support HTML5 canvas.\n        </canvas>';

    appElement.innerHTML = appTemplate;

    var theCanvas = document.getElementById('canvasOne');
    var context = theCanvas.getContext("2d");

    var tileSheet = new Image();
    tileSheet.addEventListener('load', eventSheetLoaded, false);
    tileSheet.src = 'images/tanks-sheet.png';

    var mapRows = 10;
    var mapCols = 10;
    // It is taken from tanks.csv
    var tileMap = [[31, 30, 30, 30, 0, 30, 30, 30, 30, 31], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [31, 0, 25, 0, 25, 0, 25, 0, 0, 31], [31, 25, 0, 0, 25, 0, 0, 25, 0, 31], [31, 0, 0, 0, 25, 25, 0, 25, 0, 31], [31, 0, 0, 25, 0, 0, 0, 25, 0, 31], [31, 0, 0, 0, 0, 0, 0, 25, 0, 31], [0, 0, 25, 0, 25, 0, 25, 0, 0, 0], [31, 0, 0, 0, 0, 0, 0, 0, 0, 31], [31, 30, 30, 30, 0, 30, 30, 30, 30, 31]];

    function drawMap() {
        for (var i = 0; i < mapRows; i++) {
            for (var j = 0; j < mapCols; j++) {
                var tileId = tileMap[i][j];
                var sourceX = Math.floor(tileId % 8) * 32;
                var sourceY = Math.floor(tileId / 8) * 32;
                context.drawImage(tileSheet, sourceX, sourceY, 32, 32, j * 32, i * 32, 32, 32);
            }
        }
    }

    function drawScreen() {
        drawMap();
    }

    function eventSheetLoaded() {
        drawScreen();
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ch4Images = __webpack_require__(0);

window.addEventListener('load', _ch4Images.canvasApp);

/***/ })
/******/ ]);