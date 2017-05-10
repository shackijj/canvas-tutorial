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

    function linear() {
        const gr = context.createLinearGradient(0, 0, 100, 0);
        gr.addColorStop(0, 'rgb(255,0,0)');
        gr.addColorStop(0.5, 'rgb(0,255,0)');
        gr.addColorStop(1, 'rgb(255,0,0)');

        
        /*
        context.fillStyle = gr;
        context.fillRect(0, 0, 100, 100);
        context.fillRect(0, 100, 50, 100);
        context.fillRect(0, 200, 200, 100);
        */

        /*
        context.strokeStyle = gr;
        context.strokeRect(0, 0, 100, 100);
        context.strokeRect(0, 100, 50, 100);
        context.strokeRect(0, 200, 200, 100);
        */

        context.fillStyle = gr;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(50, 0);
        context.lineTo(100, 50);
        context.lineTo(50, 100);
        context.lineTo(0, 100);
        context.lineTo(0, 0);
        context.fill();
        context.closePath();

    }

    function drawScreen() {
        const gr = context.createRadialGradient(50, 50, 25, 100, 100, 100);
        gr.addColorStop(0, 'rgb(255,0,0');
        gr.addColorStop(0.5, 'rgb(0,255,0)');
        gr.addColorStop(1, 'rgb(255,0,0)');

        context.fillStyle = gr;

        /*context.fillRect(0, 0, 200, 200);*/

        context.arc(100, 100, 100, 0, 2 * Math.PI, false);
        context.fill();
    }

    drawScreen();
}
