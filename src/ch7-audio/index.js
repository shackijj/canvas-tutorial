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
    const controlStartY = 200;

    const playX = controlStartX;
    const playY = controlStartY;
    const playBackX = controlStartX + bW;
    const playBackY = controlStartY + bW;
    const volBackX = controlStartX + bW + playBackW;
    const volBackY = controlStartY;
    const loopX = controlStartX + bW + playBackW + volBackW;
    const loopY = controlStartY;

    function drawScreen() {
        context.fillStyle = '#aaaaaa';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);

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

    buttonsSheet.onload = itemLoaded;
    buttonsSheet.src = 'audiocontrols.png';

    theAudio.addEventListener('canplaythrough', itemLoaded, false);

    theAudio.load();

    gameLoop();
}
