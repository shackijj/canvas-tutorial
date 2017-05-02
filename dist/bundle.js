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
    var theCanvas = document.getElementById('canvasOne');
    var context = theCanvas.getContext('2d');
    var formElement = document.getElementById('createImageDate');
    formElement.addEventListener('click', createImageDatePressed, false);

    var guesses = 0;
    var message = 'Guess the Letter From a (lower) to z (higher)';
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var today = new Date();
    var letterToGuess = "";
    var higherOrLower = "";
    var lettersGuessed = void 0;
    var gameOver = false;

    function initGame() {
        var letterIndex = Math.floor(Math.random() * letters.length);
        letterToGuess = letters[letterIndex];
        guesses = 0;
        lettersGuessed = [];
        gameOver = false;
        window.addEventListener('keydown', eventKeyPresses, true);
        drawScreen();
    }

    function eventKeyPresses(event) {
        if (gameOver) {
            return;
        }
        var letterPressed = String.fromCharCode(event.keyCode);
        letterPressed = letterPressed.toLowerCase();
        guesses++;
        lettersGuessed.push(letterPressed);
        if (letterPressed === letterToGuess) {
            gameOver = true;
        } else {
            var letterIndex = letters.indexOf(letterToGuess);
            var guessIndex = letters.indexOf(letterPressed);

            if (guessIndex < 0) {
                higherOrLower = 'That is not a letter.';
            } else if (guessIndex > letterIndex) {
                higherOrLower = 'lower';
            } else {
                higherOrLower = 'higher';
            }
        }
        drawScreen();
    }

    function drawScreen() {
        // backgroud
        context.fillStyle = '#ffffaa';
        context.fillRect(0, 0, 500, 300);

        // box
        context.strokeStyle = '#000000';
        context.strokeRect(5, 5, 490, 290);
        context.textBaseLine = 'top';
        // date
        context.fillStyle = '#000000';
        context.font = '10px Sans-Serif';
        context.fillText(today, 150, 20);
        // message
        context.fillStyle = '#FF0000';
        context.font = "14px Sans-Serif";
        context.fillText(message, 125, 35);
        // guesses
        context.fillStyle = '16px Sans-Serif';
        context.fillText('Guesses: ' + guesses, 215, 50);
        // higher or lower
        context.fillStyle = '#000000';
        context.font = '16px Sans-Serif';
        context.fillText('Higher or Lower: ' + higherOrLower, 150, 125);
        // letter guessed
        context.fillStyle = '#FF0000';
        context.font = '16px Sans-Serif';
        context.fillText('Letters Guessed: ' + lettersGuessed.toString(), 10, 260);

        if (gameOver) {
            context.fillStyle = '#FF0000';
            context.font = '40px Sans-Serif';
            context.fillText('You got it!', 150, 180);
        }
    }

    function createImageDatePressed(e) {
        var width = theCanvas.width,
            height = theCanvas.height;

        window.open(theCanvas.toDataURL(), "canvasImage", 'left=0,top=0,width=' + width + ',height=' + height + ',toolbar=0,resizable=0');
    }

    initGame();
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ch1GuessTheWord = __webpack_require__(0);

window.addEventListener('load', _ch1GuessTheWord.canvasApp);

/***/ })
/******/ ]);