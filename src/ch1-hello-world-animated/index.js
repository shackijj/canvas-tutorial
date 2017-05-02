import { requestAnimFrame } from '../utils';

export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');

    const appTemplate = 
        `<canvas id="canvasOne" width="640" height="480">
        Your browser doesn't support HTML5 canvas.
        </canvas>`;

    appElement.innerHTML = appTemplate;

    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");

    let alpha = 0;
    let fadeIn = true;
    let text = 'Hello World';

    let helloWorldImage = new Image();
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
        requestAnimFrame(gameLoop);
        drawScreen();
    }

    gameLoop();
}
