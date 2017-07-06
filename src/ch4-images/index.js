export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<canvas id="canvasOne" width="256" height="256" style="display: block;">
        Your browser doesn't support HTML5 canvas.
        </canvas>`;

    appElement.innerHTML = appTemplate;



    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas1.getContext("2d");

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

    function startUp() {
        context1.drawImage(tileSheet, 0, 0);
        context2.drawImage(theCanvas1, 32, 0, 32, 32, 0, 0, 32, 32);
    }

    function boundingBoxCollide(object1, object2) {
        const { x: left1, y: top1, width: width1, height: height1 } = object1;
        const { x: left2, y: top2, width: width2, height: height2 } = object1;

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
}
