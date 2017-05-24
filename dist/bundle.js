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
    var appTemplate = '<canvas id="canvasOne" width="500" height="500">\n        Your browser doesn\'t support HTML5 canvas.\n        </canvas>\n        <form>\n        Text: <input type="text" id="textBox" placeholder="some text"/><br>\n        Fill or stroke:\n        <select id="fillOrStroke">\n            <option value="fill">fill</option>\n            <option value="stroke">stroke</option>\n            <option value="both">both</option>\n        </select><br>\n        <select id="fillType">\n            <option value="none">None</option>\n            <option value="linear">Linear Gradient</option>\n            <option value="radial">Radial Gradient</option>\n        </select><br>\n        Font style: <select id="fontStyle">\n            <option value="normal">normal</option>\n            <option value="italic">italic</option>\n            <option value="oblique">oblique</option>\n        </select><br>\n        Font weight: <select id="fontWeight">\n            <option value="normal">normal</option>\n            <option value="bold">bold</option>\n            <option value="bolder">bolder</option>\n            <option value="lighter">lighter</option>\n        </select><br>\n        Font: <select id="fontFace">\n            <option value="serif">serif</option>\n            <option value="sans-serif">sans-serif</option>\n            <option value="cursive">cursive</option>\n            <option value="fantasy">fantasy</option>\n            <option value="monospace">monospace</option>\n        </select><br>\n        Font size: <input type="range" id="textSize" min="0" max="200" step="1" value="50"/><br>\n        Color 1: <input type="color" id="textColor1"/><br>\n        Color 2: <input type="color" id="textColor2"/><br>\n        TextAlpha: <input type="range" id="textAlpha" min="0.0" max="1.0" step="0.01" value="1.0"/><br>\n        shadowX: <input type="range" id="shadowX" min="-100" max="100" step="1" value="1"/><br>\n        shadowY: <input type="range" id="shadowY" min="-100" max="100" step="1" value="1"/><br>\n        shadowBlur: <input type="range" id="shadowBlur" min="0.0" max="1.0" step="0.01" value="1"/><br>\n        Color: <input type="color" id="shadowColor" value="#707070"/><br>\n        </form>';

    appElement.innerHTML = appTemplate;

    var theCanvas = document.getElementById('canvasOne');
    var context = theCanvas.getContext("2d");

    var appState = {
        message: 'some text',
        fillOrStroke: 'fill',
        textSize: 50,
        fontFace: 'serif',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textColor1: '#000000',
        textColor2: '#ff0000',
        textAlpha: '1.0',
        shadowX: 1,
        shadowY: 1,
        shadowBlur: 1,
        shadowColor: '#707070',
        fillType: 'none'
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
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.globalAlpha = 1;

        context.fillStyle = 'gray';
        context.fillRect(0, 0, 500, 500);

        context.strokeStyle = 'black';
        context.strokeRect(10, 10, 480, 480);

        context.globalAlpha = appState.textAlpha;

        context.shadowOffsetX = appState.shadowX;
        context.shadowOffsetY = appState.shadowY;
        context.shadowBlur = appState.shadowBlur;
        context.shadowColor = appState.shadowColor;

        context.font = getFontString(appState);
        var metrics = context.measureText(appState.message);
        var textWidth = metrics.width;

        var textColor = void 0;

        switch (appState.fillType) {
            case 'none':
                textColor = appState.textColor1;
                break;
            case 'linear':
                var linearGradient = context.createLinearGradient(100, 100, textWidth, 100);
                linearGradient.addColorStop(0, appState.textColor1);
                linearGradient.addColorStop(0.5, appState.textColor2);
                textColor = linearGradient;
                break;
            case 'radial':
                var radialGradient = context.createRadialGradient(250, 250, 300, 250, 250, 5);
                console.log(appState.textColor1, appState.textColor2);
                radialGradient.addColorStop(0, appState.textColor1);
                radialGradient.addColorStop(1, appState.textColor2);
                textColor = radialGradient;
                break;
        }

        var xPosition = theCanvas.width / 2 - textWidth / 2;
        var yPosition = theCanvas.height / 2;

        switch (appState.fillOrStroke) {
            case 'fill':
                context.fillStyle = textColor;
                context.fillText(appState.message, xPosition, yPosition);
                break;
            case 'stroke':
                context.strokeStyle = textColor;
                context.strokeText(appState.message, xPosition, yPosition);
                break;
            case 'both':
                context.fillStyle = textColor;
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
    changeAppStateOnDOMEvent('textColor1', 'textColor1', 'change');
    changeAppStateOnDOMEvent('textColor2', 'textColor2', 'change');
    changeAppStateOnDOMEvent('textAlpha', 'textAlpha', 'change');

    changeAppStateOnDOMEvent('shadowX', 'shadowX', 'change');
    changeAppStateOnDOMEvent('shadowY', 'shadowY', 'change');
    changeAppStateOnDOMEvent('shadowBlur', 'shadowBlur', 'change');
    changeAppStateOnDOMEvent('shadowColor', 'shadowColor', 'change');

    changeAppStateOnDOMEvent('fillType', 'fillType', 'change');

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