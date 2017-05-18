export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<canvas id="canvasOne" width="500" height="500">
        Your browser doesn't support HTML5 canvas.
        </canvas>
        <form>
        Text: <input type="text" id="textBox" placeholder="some text"/><br>
        Fill or stroke:
        <select id="fillOrStroke">
            <option value="fill">fill</option>
            <option value="stroke">stroke</option>
            <option value="both">both</option>
        </select>
        </form>`;

    appElement.innerHTML = appTemplate;

    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");

    const input = document.getElementById('textBox');
    input.addEventListener('keyup', textBoxChanged, false);

    const select = document.getElementById('fillOrStroke');
    select.addEventListener('change', fillOrStrokeChanged, false);

    function clearRect() {
        const { width, height } = theCanvas;
        context.clearRect(0, 0, width, height);
    }

    let message = 'some text';
    let fillOrStroke = 'fill';

    function drawScreen() {
        clearRect();
        
        
        context.fillStyle = 'gray';
        context.fillRect(0, 0, 500, 500);

        context.strokeStyle = 'black';
        context.strokeRect(10, 10, 480, 480);

        context.font = '50px serif';

        const metrics = context.measureText(message);
        const textWidth = metrics.width;
        const xPosition = (theCanvas.width / 2) - (textWidth / 2);
        const yPosition = theCanvas.height / 2;

        switch(fillOrStroke) {
            case 'fill':
                context.fillStyle = '#FF0000';
                context.fillText(message, xPosition, yPosition);
                break;
            case 'stroke':
                context.strokeStyle = '#FF0000';
                context.strokeText(message, xPosition, yPosition);
                break;
            case 'both':
                context.fillStyle = '#FF0000';
                context.fillText(message, xPosition, yPosition);
                context.strokeStyle = '#000000';
                context.strokeText(message, xPosition, yPosition);
                break;
        }
    }

    function textBoxChanged(event) {
        const { target } = event;
        message = target.value;
        drawScreen();
    }

    function fillOrStrokeChanged(event) {
        const { target } = event;
        fillOrStroke = target.value;
        drawScreen();
    }

    drawScreen();
}
