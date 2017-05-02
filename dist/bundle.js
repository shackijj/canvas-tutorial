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

var _utils = __webpack_require__(2);

function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    var appElement = document.getElementById('app');

    var appTemplate = '<canvas id="canvasOne" width="640" height="480">\n        Your browser doesn\'t support HTML5 canvas.\n        </canvas>';

    appElement.innerHTML = appTemplate;

    var theCanvas = document.getElementById('canvasOne');
    var context = theCanvas.getContext("2d");

    var alpha = 0;
    var fadeIn = true;
    var text = 'Hello World';

    var helloWorldImage = new Image();
    helloWorldImage.src = 'images/hello-world.png';

    function drawScreen() {
        // background
        context.globalAlpha = 1;
        context.fillStyle = '#000000';
        context.fillRect(0, 0, 640, 480);

        context.globalAlpha = 0.25;
        context.drawImage(helloWorldImage, 0, 0);

        if (fadeIn) {
            alpha += 0.01;
            if (alpha >= 1) {
                alpha = 1;
                fadeIn = false;
            }
        } else {
            alpha -= 0.01;
            if (alpha < 0) {
                alpha = 0;
                fadeIn = true;
            }
        }

        context.globalAlpha = alpha;
        // font
        context.font = '72px Sans-Serif';
        context.textBaseline = 'top';
        context.fillStyle = '#FFFFFF';
        context.fillText(text, 150, 200);
    }

    function gameLoop() {
        (0, _utils.requestAnimFrame)(gameLoop);
        drawScreen();
    }

    gameLoop();
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ch1HelloWorldAnimated = __webpack_require__(0);

window.addEventListener('load', _ch1HelloWorldAnimated.canvasApp);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function getRequestAnimationFrame() {
    function requestAnimationFrameFallback(cb) {
        window.setTimeout(cb, 1000 / 60);
    }

    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrameFallback;
}

var requestAnimFrame = exports.requestAnimFrame = getRequestAnimationFrame();

/***/ })
/******/ ]);