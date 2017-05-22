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
    var appTemplate = '<canvas id="canvasOne" width="500" height="500">\n        Your browser doesn\'t support HTML5 canvas.\n        </canvas>\n        <form>\n        Text: <input type="text" id="textBox" placeholder="some text"/><br>\n        Fill or stroke:\n        <select id="fillOrStroke">\n            <option value="fill">fill</option>\n            <option value="stroke">stroke</option>\n            <option value="both">both</option>\n        </select><br>\n        Font style: <select id="fontStyle">\n            <option value="normal">normal</option>\n            <option value="italic">italic</option>\n            <option value="oblique">oblique</option>\n        </select><br>\n        Font weight: <select id="fontWeight">\n            <option value="normal">normal</option>\n            <option value="bold">bold</option>\n            <option value="bolder">bolder</option>\n            <option value="lighter">lighter</option>\n        </select><br>\n        Font: <select id="fontFace">\n            <option value="serif">serif</option>\n            <option value="sans-serif">sans-serif</option>\n            <option value="cursive">cursive</option>\n            <option value="fantasy">fantasy</option>\n            <option value="monospace">monospace</option>\n        </select><br>\n        Font size: <input type="range" id="textSize" min="0" max="200" step="1" value="50"/><br>\n        Color: <input type="color" id="textColor"/><br>\n        </form>';

    appElement.innerHTML = appTemplate;

    var theCanvas = document.getElementById('canvasOne');
    var context = theCanvas.getContext("2d");

    var appState = {
        message: 'some text',
        fillOrStroke: 'fill',
        textSize: '50',
        fontFace: 'serif',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textColor: '#ff0000'
    };

    function clearRect() {
        var width = theCanvas.width,
            height = theCanvas.height;

        context.clearRect(0, 0, width, height);
    }

    function getFontString(state) {
        return state.fontWeight + ' ' + state.fontStyle + ' ' + state.textSize + 'px ' + state.fontFace;
    }

    function drawScreen() {
        clearRect();

        context.fillStyle = 'gray';
        context.fillRect(0, 0, 500, 500);

        context.strokeStyle = 'black';
        context.strokeRect(10, 10, 480, 480);

        context.font = getFontString(appState);
        console.log(getFontString(appState));
        var metrics = context.measureText(appState.message);
        var textWidth = metrics.width;
        var xPosition = theCanvas.width / 2 - textWidth / 2;
        var yPosition = theCanvas.height / 2;

        switch (appState.fillOrStroke) {
            case 'fill':
                context.fillStyle = appState.textColor;
                context.fillText(appState.message, xPosition, yPosition);
                break;
            case 'stroke':
                context.strokeStyle = appState.textColor;
                context.strokeText(appState.message, xPosition, yPosition);
                break;
            case 'both':
                context.fillStyle = appState.textColor;
                context.fillText(appState.message, xPosition, yPosition);
                context.strokeStyle = '#000000';
                context.strokeText(appState.message, xPosition, yPosition);
                break;
        }
    }

    function changeAppStateOnDOMEvent(property, elementId, eventName) {
        function eventHandler(event) {
            var target = event.target;

            appState[property] = target.value;
            drawScreen();
        }
        var element = document.getElementById(elementId);

        element.addEventListener(eventName, eventHandler, false);
    }

    changeAppStateOnDOMEvent('message', 'textBox', 'keyup');
    changeAppStateOnDOMEvent('fillOrStroke', 'fillOrStroke', 'change');
    changeAppStateOnDOMEvent('fontStyle', 'fontStyle', 'change');
    changeAppStateOnDOMEvent('fontWeight', 'fontWeight', 'change');
    changeAppStateOnDOMEvent('fontFace', 'fontFace', 'change');
    changeAppStateOnDOMEvent('textSize', 'textSize', 'change');
    changeAppStateOnDOMEvent('textColor', 'textColor', 'change');

    drawScreen();
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ch3TextApi = __webpack_require__(0);

window.addEventListener('load', _ch3TextApi.canvasApp);

/***/ })
/******/ ]);