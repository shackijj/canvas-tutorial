import { requestAnimFrame } from '../utils';

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


    function lesson1() {
        context.fillStyle = 'black';
        context.fillRect(20, 20, 25, 25);

        context.setTransform(1, 0, 0, 1, 0, 0);
        const angleInRadians = 45 * Math.PI / 180;

        context.rotate(angleInRadians);
        context.fillStyle = 'red';
        context.fillRect(100, 100, 50, 50);
    }

    function lesson2() {
        context.fillStyle = 'black';
        context.fillRect(20, 20, 25, 25);

        context.setTransform(1, 0, 0, 1, 0, 0);
        const angleInRadians = 45 * Math.PI / 180;

        const x = 100;
        const y = 100;

        const width = 100;
        const height = 100;
        // Change the origin
        context.translate(x + 0.5 * width, y + 0.5 * height);
        context.rotate(angleInRadians);
        context.fillStyle = 'red';
        context.fillRect(-0.5 * width, -0.5 * height, width, height);
    }

    function lesson3() {
        const width = 50;
        const height = 50;

        context.setTransform(1, 0, 0, 1, 0, 0);
        let angleInRadians = 45 * Math.PI / 180;

        let x = 30;
        let y = 30;


        // Change the origin
        context.translate(x + 0.5 * width, y + 0.5 * height);
        context.rotate(angleInRadians);
        context.fillStyle = 'red';
        context.fillRect(-0.5 * width, -0.5 * height, width, height);

        context.setTransform(1, 0, 0, 1, 0, 0);
        angleInRadians = 10 * Math.PI / 180;

        x = 90;
        y = 30;

        // Change the origin
        context.translate(x + 0.5 * width, y + 0.5 * height);
        context.rotate(angleInRadians);
        context.fillStyle = 'red';
        context.fillRect(-0.5 * width, -0.5 * height, width, height);

        context.setTransform(1, 0, 0, 1, 0, 0);
        angleInRadians = 5 * Math.PI / 180;

        x = 150;
        y = 30;

        // Change the origin
        context.translate(x + 0.5 * width, y + 0.5 * height);
        context.rotate(angleInRadians);
        context.fillStyle = 'red';
        context.fillRect(-0.5 * width, -0.5 * height, width, height);


        context.setTransform(1, 0, 0, 1, 0, 0);
        angleInRadians = 60 * Math.PI / 180;
        x = 210;
        y = 30;

        // Change the origin
        context.translate(x + 0.5 * width, y + 0.5 * height);
        context.rotate(angleInRadians);
        context.fillStyle = 'red';
        context.fillRect(-0.5 * width, -0.5 * height, width, height);
    }

    function drawScreen() {
        lesson3();
    }

    drawScreen();
}
