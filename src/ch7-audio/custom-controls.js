export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = `<canvas id="theCanvas" width="500" height="500"></canvas>`;
    appElement.innerHTML = appTemplate;

    let itemsLoaded = 0;
    const itemsToLoad = 2;


    const theAudio = document.createElement('audio');
    theAudio.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/4/45/ACDC_-_Back_In_Black-sample.ogg');
    appElement.appendChild(theAudio);

    const buttonsSheet = new Image();

    const theCanvas = document.getElementById('theCanvas');
    const context = theCanvas.getContext('2d');

    const bW = 32;
    const bH = 32;
    const playBackW = 206;
    const volBackW = 50;
    const sliderW = 10;
    const sliderH = 32;
    const controlStartX = 25;
    const controlStartY = 300;

    const playX = controlStartX;
    const playY = controlStartY;
    const playBackX = controlStartX + bW;
    const playBackY = controlStartY;
    const volBackX = controlStartX + bW + playBackW;
    const volBackY = controlStartY;
    const loopX = controlStartX + bW + playBackW + volBackW;
    const loopY = controlStartY;

    const volumeSliderStart = volBackX;
    const volumeSliderEnd = volBackX + volBackW - sliderW;

    const buttonWait = 30;
    let timeWaited = 0;
    let mouseX;
    let mouseY;
    let volumeSliderDrag;
    let volumeSliderX;
    let volumeSliderY;

    function drawScreen() {
        context.fillStyle = '#aaaaaa';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);

        context.drawImage(buttonsSheet, 32, 0, playBackW, bH, playBackX, playBackY, playBackW, bH);

        const slideIncrement = playBackW / theAudio.duration;
        const sliderX = (controlStartX + bW) + (slideIncrement * theAudio.currentTime);
        context.drawImage(buttonsSheet, 238, 0, sliderW, bH, sliderX, controlStartY, sliderW, bH);

        if (theAudio.ended&& !theAudio.loop) {
            theAudio.currentTime = 0;
            theAudio.pause();
        }

        if (theAudio.paused) {
            context.drawImage(buttonsSheet, 0, 0, bW, bH, playX, playY, bW, bH)
        } else {
            context.drawImage(buttonsSheet, 0, 32, bW, bH, playX, playY, bW, bH)
        }

        if (theAudio.loop) {
            context.drawImage(buttonsSheet, 113, 32, bW, bH, loopX, loopY, bW, bH)
        } else {
            context.drawImage(buttonsSheet, 81, 32, bW, bH, loopX, loopY, bW, bH)
        }

        volumeSliderX = volumeSliderStart + (theAudio.volume * (volBackW - sliderW));
        volumeSliderY = controlStartY;
        const volumeIncrement = 1 / (volBackW - sliderW);

        context.drawImage(buttonsSheet, 32, 32, volBackW, bH, volBackX, volBackY, volBackW, bH);
        if (volumeSliderDrag) {
            volumeSliderX = mouseX;
            if (volumeSliderX > volumeSliderEnd) {
                volumeSliderX = volumeSliderEnd;
            }
            if (volumeSliderX < volumeSliderStart) {
                volumeSliderX = volumeSliderStart;
            }
        } else {
            volumeSliderX = volumeSliderStart + (theAudio.volume * (volBackW - sliderW));
        }

        context.drawImage(buttonsSheet, 238, 0, sliderW, bH, volumeSliderX, volumeSliderY, sliderW, bH);
        theAudio.volume = (volumeSliderX - volumeSliderStart) * volumeIncrement;

        timeWaited++;

        context.fillStyle = '#000000';
        context.fillText(`duration: ${theAudio.duration}`, 20, 20);
        context.fillText(`currentTime: ${theAudio.currentTime}`, 20, 40);
        context.fillText(`loop: ${theAudio.loop}`, 20, 60);
        context.fillText(`autoplay: ${theAudio.autoplay}`, 20, 80);
        context.fillText(`muted: ${theAudio.muted}`, 20, 100);
        context.fillText(`controls: ${theAudio.controls}`, 20, 120);
        context.fillText(`volume: ${theAudio.volume}`, 20, 140);
        context.fillText(`paused: ${theAudio.paused}`, 20, 160);
        context.fillText(`ended: ${theAudio.ended}`, 20, 180);
        context.fillText(`currentSrc: ${theAudio.currentSrc}`, 20, 200);
        context.fillText(`Can play audio/ogg?: ${theAudio.canPlayType('audio/ogg')}`, 20, 220);
        context.fillText(`Can play audio/wav?: ${theAudio.canPlayType('audio/wav')}`, 20, 240);
        context.fillText(`Can play audio/mp3?: ${theAudio.canPlayType('audio/mp3')}`, 20, 260);
    }

    function gameLoop() {
        drawScreen();
        window.requestAnimationFrame(gameLoop);
    }

    function audioLoaded() {
        theAudio.play();
    }

    function itemLoaded() {
        itemsLoaded++;
        if (itemsLoaded === itemsToLoad) {
            gameLoop();
        }
    }

    function eventMouseUp(event) {
        if (timeWaited >= buttonWait) {
            timeWaited = 0;
            if ((mouseY >= playY) && (mouseY <= playY + bH) && (mouseX >= playX) && (mouseX <= playX + bW)) {
                if (theAudio.paused) {
                    theAudio.play();
                } else {
                    theAudio.pause();
                }
            }

            if ((mouseY >= loopY) && (mouseY <= loopY + bH) && (mouseX >= loopX) && (mouseX <= loopX + bW)) {
                if (theAudio.loop) {
                    theAudio.loop = false;
                } else {
                    theAudio.loop = true;
                }
            }
        }

        if (volumeSliderDrag) {
            volumeSliderDrag = false;
        }
    }
    function eventMouseDown(event) {
        if ((mouseX >= volumeSliderX) && (mouseX <= volumeSliderX + sliderW) && (mouseY >= volumeSliderY) && (mouseY <= volumeSliderY + sliderH)) {
            volumeSliderDrag = true;
        }
    }
    function eventMouseMove(event) {
        let x;
        let y;

        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        x = x - theCanvas.offsetLeft;
        y = y - theCanvas.offsetTop;
        mouseX = x;
        mouseY = y;
    }

    theCanvas.addEventListener('mouseup', eventMouseUp, false);
    theCanvas.addEventListener('mousedown', eventMouseDown, false);
    theCanvas.addEventListener('mousemove', eventMouseMove, false);

    buttonsSheet.onload = itemLoaded;
    buttonsSheet.src = 'audiocontrols.png';

    theAudio.addEventListener('canplaythrough', itemLoaded, false);

    theAudio.load();

    gameLoop();
}
