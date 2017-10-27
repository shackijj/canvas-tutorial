export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<video autoplay loop controls id="theVideo" width="320" height="240" style="display: none">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
        </video>
        <canvas id="theCanvas" width="320" height="240">
        </canvas>`;

    appElement.innerHTML = appTemplate;

    const theVideo = document.getElementById('theVideo');
    const theCanvas = document.getElementById('theCanvas');

    const context = theCanvas.getContext('2d');

    let loadCount = 0;
    const itemsToLoad = 2;

    let buttonSheet;
    const buttonWait = 5;
    let timeWaited;

    const bW = 32;
    const bH = 32;

    const playX = 190;
    const playY = 208;
    const pauseX = 230;
    const pauseY = 208;
    const stopX = 270;
    const stopY = 208;

    function drawScreen() {
        context.drawImage(theVideo, 0, 0, 320, 240);
        if (!theVideo.paused) {
            context.drawImage(buttonSheet, 0, 32, bW, bH, playX, playY, bW, bH);
        } else {
            context.drawImage(buttonSheet, 0, 0, bW, bH, playX, playY, bW, bH);
        }

        if (theVideo.paused) {
            context.drawImage(buttonSheet, 32, 32, bW, bH, pauseX, pauseY, bW, bH);
        } else {
            context.drawImage(buttonSheet, 32, 0, bW, bH, pauseX, pauseY, bW, bH);
        }
        context.drawImage(buttonSheet, 64, 0, bW, bH, stopX, stopY, bW, bH);
    }

    function isButtonClicked(event, x, y, w, h) {
        const {offsetX, offsetY} = event;
        if (offsetX >= x && offsetX <= x + w &&
            offsetY >= y && offsetY <= y + h) {
            return true;
        }
        return false;
    }
    function eventMouseUp(event) {
        const {offsetX, offsetY} = event;
        if (isButtonClicked(event, playX, playY, bW, bH) &&
            theVideo.paused) {
            theVideo.play();
        }
        if (isButtonClicked(event, pauseX, pauseY, bW, bH) &&
            !theVideo.paused) {
            theVideo.pause();
        }
        if (isButtonClicked(event, stopX, stopY, bW, bH)) {
            theVideo.pause();
            theVideo.currentTime = 0;
        }
    }

    function gameLoop() {
        drawScreen();
        window.requestAnimationFrame(gameLoop);
    }
    

    function itemLoaded() {
        loadCount++;
        if (itemsToLoad === loadCount) {
            gameLoop();
        }
    }

    theVideo.addEventListener('canplay', itemLoaded, false);
    theCanvas.addEventListener('mouseup', eventMouseUp, false);
    buttonSheet = new Image();
    buttonSheet.src = 'images/videobuttons.png';
    buttonSheet.onload = itemLoaded;
}
