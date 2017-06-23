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
    tileSheet.addEventListener('load', eventSheetLoaded, false);
    tileSheet.src = 'images/tanks-sheet.png';

    function eventSheetLoaded() {
        startUp();
    }

    const animationFrames = [1, 2, 3, 4, 5, 6, 7, 8];
    let frameIndex = 0;
    let x = 50;
    let y = 50;
    const dx = 1;
    const dy = 0;

    function sampleFill() {
        context.fillStyle = '#aaaaaa';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);
    }

    function drawScreen() {
        sampleFill();
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.translate(x + 16, y + 16);
        
        let rotation = 90;
        let angleInRadians = rotation * Math.PI / 180;
        context.rotate(angleInRadians);

        frameIndex++;
        if (frameIndex === animationFrames.length) {
            frameIndex = 0;
        }
        x += dx;
        y += dy;
        // Math for source(X|Y) is based on a green tank placement
        const sourceX = Math.floor(animationFrames[frameIndex] % 8) * 32;
        const sourceY = Math.floor(animationFrames[frameIndex] / 8) * 32;
        context.drawImage(tileSheet, sourceX, sourceY, 32, 32, -16, -16, 32, 32);
        context.restore();
    }

    function startUp() {
        gameLoop();
    }

    function gameLoop() {
        window.setTimeout(gameLoop, 100);
        drawScreen();
    }
}
