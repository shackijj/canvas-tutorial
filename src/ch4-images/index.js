export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<canvas id="canvasOne" width="256" height="256" style="position: absolute; top: 50px; left: 50px">
        Your browser doesn't support HTML5 canvas.
        </canvas>`;

    appElement.innerHTML = appTemplate;



    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");

    const tileSheet = new Image();
    tileSheet.addEventListener('load', startUp);
    tileSheet.src = 'images/tanks-sheet.png';

    let mouseX;
    let mouseY;
    let imageData;

    function onMouseMove(event) {
        mouseX = event.clientX - theCanvas.offsetLeft;
        mouseY = event.clientY - theCanvas.offsetTop;
    }

    function drawTileSheet() {
        context.drawImage(tileSheet, 0, 0);
    }

    function highlightTile(tileId, x, y) {
        context.fillStyle = '#aaaaaa';
        context.fillRect(0, 0, 256, 128);
        drawTileSheet();
        imageData = context.getImageData(x, y, 32, 32);

        // setting alpha
        for(let j = 3; j < imageData.data.length; j += 4) {
            imageData.data[j] = 128;
        }

        let startX = Math.floor(tileId % 8) * 32;
        let startY = Math.floor(tileId / 8) * 32;
        context.strokeStyle = 'red';
        context.strokeRect(startX, startY, 32, 32);
    }

    function onMouseClick() {
        if (mouseY < 128) {
            let col = Math.floor(mouseX / 32);
            let row = Math.floor(mouseY / 32);
            let tileId = (row * 7) + (col + row);
            highlightTile(tileId, col * 32, row * 32);
        } else {
            let col = Math.floor(mouseX / 32);
            let row = Math.floor(mouseY / 32);
            context.putImageData(imageData, col * 32, row * 32);
        }
    }

    function startUp() {
        context.fillStyle = '#aaaaaa';
        context.fillRect(0, 0, 256, 256);
        drawTileSheet();
    }

    theCanvas.addEventListener('mousemove', onMouseMove, false);
    theCanvas.addEventListener('click', onMouseClick, false);
}
