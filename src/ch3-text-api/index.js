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
        <select id="fillType">
            <option value="none">None</option>
            <option value="linear">Linear Gradient</option>
            <option value="radial">Radial Gradient</option>
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
        Color 1: <input type="color" id="textColor1"/><br>
        Color 2: <input type="color" id="textColor2"/><br>
        TextAlpha: <input type="range" id="textAlpha" min="0.0" max="1.0" step="0.01" value="1.0"/><br>
        shadowX: <input type="range" id="shadowX" min="-100" max="100" step="1" value="1"/><br>
        shadowY: <input type="range" id="shadowY" min="-100" max="100" step="1" value="1"/><br>
        shadowBlur: <input type="range" id="shadowBlur" min="0.0" max="1.0" step="0.01" value="1"/><br>
        Color: <input type="color" id="shadowColor" value="#707070"/><br>
        </form>`;

    appElement.innerHTML = appTemplate;

    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");

    const appState = {
        message: 'some text',
        fillOrStroke: 'fill',
        textSize: 50,
        fontFace: 'serif',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textColor1: '#000000',
        textColor2: '#ff0000',
        textAlpha: '1.0',
        shadowX: 1,
        shadowY: 1,
        shadowBlur: 1,
        shadowColor: '#707070',
        fillType: 'none'
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
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.globalAlpha = 1;

        context.fillStyle = 'gray';
        context.fillRect(0, 0, 500, 500);

        context.strokeStyle = 'black';
        context.strokeRect(10, 10, 480, 480);

        context.globalAlpha = appState.textAlpha;

        context.shadowOffsetX = appState.shadowX;
        context.shadowOffsetY = appState.shadowY;
        context.shadowBlur = appState.shadowBlur;
        context.shadowColor = appState.shadowColor;

        context.font = getFontString(appState);
        const metrics = context.measureText(appState.message);
        const textWidth = metrics.width;

        let textColor;

        switch(appState.fillType) {
            case 'none':
                textColor = appState.textColor1;
                break;
            case 'linear':
                const linearGradient = context.createLinearGradient(100, 100, textWidth, 100);
                linearGradient.addColorStop(0, appState.textColor1);
                linearGradient.addColorStop(0.5, appState.textColor2);
                textColor = linearGradient;
                break;
            case 'radial':
                const radialGradient = context.createRadialGradient(250, 250, 300, 250, 250, 5);
                console.log(appState.textColor1, appState.textColor2);
                radialGradient.addColorStop(0, appState.textColor1);
                radialGradient.addColorStop(1, appState.textColor2);
                textColor = radialGradient;
                break;
        }

        const xPosition = (theCanvas.width / 2) - (textWidth / 2);
        const yPosition = theCanvas.height / 2;

        switch(appState.fillOrStroke) {
            case 'fill':
                context.fillStyle = textColor;
                context.fillText(appState.message, xPosition, yPosition);
                break;
            case 'stroke':
                context.strokeStyle = textColor;
                context.strokeText(appState.message, xPosition, yPosition);
                break;
            case 'both':
                context.fillStyle = textColor;
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
    changeAppStateOnDOMEvent('textColor1', 'textColor1', 'change');
    changeAppStateOnDOMEvent('textColor2', 'textColor2', 'change');
    changeAppStateOnDOMEvent('textAlpha', 'textAlpha', 'change');

    changeAppStateOnDOMEvent('shadowX', 'shadowX', 'change');
    changeAppStateOnDOMEvent('shadowY', 'shadowY', 'change');
    changeAppStateOnDOMEvent('shadowBlur', 'shadowBlur', 'change');
    changeAppStateOnDOMEvent('shadowColor', 'shadowColor', 'change');

    changeAppStateOnDOMEvent('fillType', 'fillType', 'change');

    drawScreen();
}
