export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<canvas id="canvasOne" width="256" height="256" style="display: block;">
        Your browser doesn't support HTML5 canvas.
        </canvas>
        <canvas id="canvasTwo" width="256" height="256" style="display: block;">
        Your browser doesn't support HTML5 canvas.
        </canvas>`;

    appElement.innerHTML = appTemplate;



    const theCanvas1 = document.getElementById('canvasOne');
    const context1 = theCanvas1.getContext("2d");
    const theCanvas2 = document.getElementById('canvasTwo');
    const context2 = theCanvas2.getContext("2d");

    const tileSheet = new Image();
    tileSheet.addEventListener('load', startUp);
    tileSheet.src = 'images/tanks-sheet.png';

    function startUp() {
        context1.drawImage(tileSheet, 0, 0);
        context2.drawImage(theCanvas1, 32, 0, 32, 32, 0, 0, 32, 32);
    }
}
