export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<canvas id="canvasOne" width="500" height="500" style="display: block;">
        Your browser doesn't support HTML5 canvas.
        </canvas>`;

    appElement.innerHTML = appTemplate;



    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");

    const blueObject = {
        x: 0,
        y: 200,
        dx: 2,
        width: 48,
        height: 48,
        image: new Image(),
    };
    blueObject.image.src = 'images/bluecross.png';

    const redObject = {
        x: 348,
        y: 200,
        dx: -2,
        width: 48,
        height: 48,
        image: new Image(),
    };
    redObject.image.src = 'images/redcircle.png';

    function boundingBoxCollide(object1, object2) {
        const { x: left1, y: top1, width: width1, height: height1 } = object1;
        const { x: left2, y: top2, width: width2, height: height2 } = object2;

        const right1 = left1 + width1;
        const bottom1 = top1 + height1;

        const right2 = left2 + width2;
        const bottom2 = top2 + height2;

        if (bottom1 < top2) return false;
        if (bottom2 < top1) return false;
        if (right1 < left2) return false;
        if (right2 < left1) return false;
        return true;
    }

    function isIntersected() {
        const xMin = Math.max(blueObject.x, redObject.x);
        const yMin = Math.max(blueObject.y, redObject.y);
        const xMax = Math.max(
            blueObject.x + blueObject.width, redObject.x + redObject.width);
        const yMax = Math.max(
            blueObject.y + blueObject.height, redObject.y + redObject.height);

        for(let pixelX = xMin; pixelX < xMax; pixelX++) {
            for(let pixelY = yMin; pixelY < yMax; pixelY++) {
                let bluepixel = ((pixelX - blueObject.x) + (pixelY - blueObject.y)
                    * blueObject.width) * 4 + 3;
                let redpixel = ((pixelX - redObject.x) + (pixelY - redObject.y)
                    * redObject.width) * 4 + 3;
                if (blueObject.imageData.data[bluepixel] !== 0 &&
                    redObject.imageData.data[redpixel] !== 0) {
                        console.log('pixel collision');
                        blueObject.dx = 0;
                        redObject.dx = 0;
                        break; 
                    }
            }
        }
    }

    function drawScreen() {
        blueObject.x += blueObject.dx;
        redObject.x += redObject.dx;
        context.clearRect(0, 0, theCanvas.width, theCanvas.height);
        context.drawImage(blueObject.image, blueObject.x, blueObject.y);
        context.drawImage(redObject.image, redObject.x, redObject.y);
        if (boundingBoxCollide(blueObject, redObject)) {
            console.log('box collision');
            isIntersected();
        }
    }

    function gameLoop() {
        window.setTimeout(gameLoop, 100);
        drawScreen();
    }

    function startUp() {
        context.drawImage(blueObject.image, 0, 0);
        blueObject.imageData = context.getImageData(
            0, 0, blueObject.width, blueObject.height);
        context.clearRect(0, 0, theCanvas.width, theCanvas.height);
        
        context.drawImage(redObject.image, 0, 0);
        redObject.imageData = context.getImageData(
            0, 0, redObject.width, redObject.height);
        context.clearRect(0, 0, theCanvas.width, theCanvas.height);
        gameLoop();
    }

    setTimeout(startUp, 1000);
}
