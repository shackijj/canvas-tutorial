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
        </select><br>
        Font style: <select id="fontStyle">
            <option value="normal">normal</option>
            <option value="italic">italic</option>
            <option value="oblique">oblique</option>
        </select><br>
        Font weight: <select id="fontWeight">
            <option value="normal">normal</option>
            <option value="bold">bold</option>
            <option value="bolder">bolder</option>
            <option value="lighter">lighter</option>
        </select><br>
        Font: <select id="fontFace">
            <option value="serif">serif</option>
            <option value="sans-serif">sans-serif</option>
            <option value="cursive">cursive</option>
            <option value="fantasy">fantasy</option>
            <option value="monospace">monospace</option>
        </select><br>
        Font size: <input type="range" id="textSize" min="0" max="200" step="1" value="50"/><br>
        Color: <input type="color" id="textColor"/><br>
        </form>`;

    appElement.innerHTML = appTemplate;

    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");

    const appState = {
        message: 'some text',
        fillOrStroke: 'fill',
        textSize: '50',
        fontFace: 'serif',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textColor: '#ff0000',
    };

    function clearRect() {
        const { width, height } = theCanvas;
        context.clearRect(0, 0, width, height);
    }

    function getFontString(state) {
        return `${state.fontWeight} ${state.fontStyle} ${state.textSize}px ${state.fontFace}`;
    }

    function drawScreen() {
        clearRect();
        
        context.fillStyle = 'gray';
        context.fillRect(0, 0, 500, 500);

        context.strokeStyle = 'black';
        context.strokeRect(10, 10, 480, 480);

        context.font = getFontString(appState);
        const metrics = context.measureText(appState.message);
        const textWidth = metrics.width;
        const xPosition = (theCanvas.width / 2) - (textWidth / 2);
        const yPosition = theCanvas.height / 2;

        switch(appState.fillOrStroke) {
            case 'fill':
                context.fillStyle = appState.textColor;
                context.fillText(appState.message, xPosition, yPosition);
                break;
            case 'stroke':
                context.strokeStyle = appState.textColor;
                context.strokeText(appState.message, xPosition, yPosition);
                break;
            case 'both':
                context.fillStyle = appState.textColor;
                context.fillText(appState.message, xPosition, yPosition);
                context.strokeStyle = '#000000';
                context.strokeText(appState.message, xPosition, yPosition);
                break;
        }
    }

    function changeAppStateOnDOMEvent(property, elementId, eventName) {
        function eventHandler(event) {
            const { target } = event;
            appState[property] = target.value;
            drawScreen();
        }
        const element = document.getElementById(elementId);

        element.addEventListener(eventName, eventHandler, false);
    }

    changeAppStateOnDOMEvent('message', 'textBox', 'keyup');
    changeAppStateOnDOMEvent('fillOrStroke', 'fillOrStroke', 'change');
    changeAppStateOnDOMEvent('fontStyle', 'fontStyle', 'change');
    changeAppStateOnDOMEvent('fontWeight', 'fontWeight', 'change');
    changeAppStateOnDOMEvent('fontFace', 'fontFace', 'change');
    changeAppStateOnDOMEvent('textSize', 'textSize', 'change');
    changeAppStateOnDOMEvent('textColor', 'textColor', 'change');

    drawScreen();
}
