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

    const tileSheet = new Image();
    tileSheet.addEventListener('load', eventSheetLoaded, false);
    tileSheet.src = 'images/tanks-sheet.png';

    const mapRows = 10;
    const mapCols = 10;
    // It is taken from tanks.csv
    var tileMap = [
        [31,30,30,30,0,30,30,30,30,31],
        [0,0,0,0,0,0,0,0,0,0],
        [31,0,25,0,25,0,25,0,0,31],
        [31,25,0,0,25,0,0,25,0,31],
        [31,0,0,0,25,25,0,25,0,31],
        [31,0,0,25,0,0,0,25,0,31],
        [31,0,0,0,0,0,0,25,0,31],
        [0,0,25,0,25,0,25,0,0,0],
        [31,0,0,0,0,0,0,0,0,31],
        [31,30,30,30,0,30,30,30,30,31],
    ];

    function drawMap() {
        for (let i = 0; i < mapRows; i++) {
            for (let j = 0; j < mapCols; j++) {
                const tileId = tileMap[i][j];
                const sourceX = Math.floor(tileId % 8) * 32;
                const sourceY = Math.floor(tileId / 8) * 32;
                context.drawImage(tileSheet, sourceX, sourceY, 32, 32, j * 32, i * 32, 32, 32);
            }
        }
    }

    function drawScreen() {
        drawMap();
    }

    function eventSheetLoaded() {
        drawScreen();
    }
}
