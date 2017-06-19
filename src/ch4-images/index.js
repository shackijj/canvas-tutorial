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

    var spaceShip = new Image();
    spaceShip.addEventListener('load', eventShipLoaded, false);
    spaceShip.src = 'images/space-ship.png';

    function eventShipLoaded() {
        drawScreen();
    }

    function placeShip(obj, posX, posY, width, height) {
        if (width && height) {
            context.drawImage(obj, pox, posY, width, height);
        } else {
            context.drawImage(obj, posX, posY);
        }
    }

    function drawScreen() {
        context.fillStyle = '#aaaaaa';
        context.fillRect(0, 0, 500, 500);

        context.drawImage(spaceShip, 0, 0);
        context.drawImage(spaceShip, 0, 50, 32, 32);
    }

    drawScreen();
}
