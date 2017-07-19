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

    var blueObject = {
        x: 0,
        y: 200,
        dx: 2,
        width: 48,
        height: 48,
        image: new Image()
    };
    blueObject.image.src = 'images/bluecross.png';

    var redObject = {
        x: 348,
        y: 200,
        dx: -2,
        width: 48,
        height: 48,
        image: new Image()
    };
    redObject.image.src = 'images/redcircle.png';

    function boundingBoxCollide(object1, object2) {
        var left1 = object1.x,
            top1 = object1.y,
            width1 = object1.width,
            height1 = object1.height;
        var left2 = object2.x,
            top2 = object2.y,
            width2 = object2.width,
            height2 = object2.height;


        var right1 = left1 + width1;
        var bottom1 = top1 + height1;

        var right2 = left2 + width2;
        var bottom2 = top2 + height2;

        if (bottom1 < top2) return false;
        if (bottom2 < top1) return false;
        if (right1 < left2) return false;
        if (right2 < left1) return false;
        return true;
    }

    function isIntersected() {
        var xMin = Math.max(blueObject.x, redObject.x);
        var yMin = Math.max(blueObject.y, redObject.y);
        var xMax = Math.max(blueObject.x + blueObject.width, redObject.x + redObject.width);
        var yMax = Math.max(blueObject.y + blueObject.height, redObject.y + redObject.height);

        for (var pixelX = xMin; pixelX < xMax; pixelX++) {
            for (var pixelY = yMin; pixelY < yMax; pixelY++) {
                var bluepixel = (pixelX - blueObject.x + (pixelY - blueObject.y) * blueObject.width) * 4 + 3;
                var redpixel = (pixelX - redObject.x + (pixelY - redObject.y) * redObject.width) * 4 + 3;
                if (blueObject.imageData.data[bluepixel] !== 0 && redObject.imageData.data[redpixel] !== 0) {
                    console.log('pixel collision');
                    blueObject.dx = 0;
                    redObject.dx = 0;
                    break;
                }
            }
        }
    }

    function drawScreen() {
        blueObject.x += blueObject.dx;
        redObject.x += redObject.dx;
        context.clearRect(0, 0, theCanvas.width, theCanvas.height);
        context.drawImage(blueObject.image, blueObject.x, blueObject.y);
        context.drawImage(redObject.image, redObject.x, redObject.y);
        if (boundingBoxCollide(blueObject, redObject)) {
            console.log('box collision');
            isIntersected();
        }
    }

    function gameLoop() {
        window.setTimeout(gameLoop, 100);
        drawScreen();
    }

    function startUp() {
        context.drawImage(blueObject.image, 0, 0);
        blueObject.imageData = context.getImageData(0, 0, blueObject.width, blueObject.height);
        context.clearRect(0, 0, theCanvas.width, theCanvas.height);

        context.drawImage(redObject.image, 0, 0);
        redObject.imageData = context.getImageData(0, 0, redObject.width, redObject.height);
        context.clearRect(0, 0, theCanvas.width, theCanvas.height);
        gameLoop();
    }

    setTimeout(startUp, 1000);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ch4Images = __webpack_require__(0);

window.addEventListener('load', _ch4Images.canvasApp);

/***/ })
/******/ ]);