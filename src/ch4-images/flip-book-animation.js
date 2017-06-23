export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<canvas id="canvasOne" width="500" height="500">
        Your browser doesn't support HTML5 canvas.
        </canvas>`;

    appElement.innerHTML = appTemplate;



    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");

    var tileSheet = new Image();
    tileSheet.addEventListener('load', eventShipLoaded, false);
    tileSheet.src = 'images/ships.png';

    function eventShipLoaded() {
        startUp();
    }

    function placeShip(obj, posX, posY, width, height) {
        if (width && height) {
            context.drawImage(obj, pox, posY, width, height);
        } else {
            context.drawImage(obj, posX, posY);
        }
    }

    var counter = 0;

    function drawScreen() {
        counter ^= 1;

        context.fillStyle = '#aaaaaa';
        context.fillRect(0, 0, 500, 500);

        context.drawImage(tileSheet, 32 * counter, 0, 32, 32, 50, 50, 64, 64);
    }

    function startUp() {
        gameLoop();
    }

    function gameLoop() {
        window.setTimeout(gameLoop, 100);
        drawScreen();
    }
}
