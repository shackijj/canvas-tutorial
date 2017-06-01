export function canvasApp() {
    const patternImage = new Image();
    patternImage.src = 'images/texture.jpg';
    patternImage.onload = runApp;
}

function runApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<canvas id="canvasOne" width="500" height="500">
        Your browser doesn't support HTML5 canvas.
        </canvas>
        <form>
        Canvas width: <input id="canvasWidth" type="range" min="0" max="1000" step="1" value="500"/><br>
        Canvas height: <input id="canvasHeight" type="range" min="0" max="1000" step="1" value="500"/><br>
        Canvas style width: <input id="canvasStyleWidth" type="range" min="0" max="1000" step="1" value="500"/><br>
        Canvas style height: <input id="canvasStyleHeight" type="range" min="0" max="1000" step="1" value="500"/><br>
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
            <option value="pattern">Pattern</option>
            <option value="animation">animation</option>
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
        <input type="button" id="createImageData" value="Create image data"/><br>
        <textarea id="imageDataDisplay" rows=10 cols=30></textarea>
        </form>`;

    appElement.innerHTML = appTemplate;

    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");
    const canvasStyleHeight = document.getElementById('canvasStyleHeight');
    const canvasStyleWidth = document.getElementById('canvasStyleWidth');
    const canvasHeight = document.getElementById('canvasHeight');
    const canvasWidth = document.getElementById('canvasWidth');

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
        fillType: 'none',
        pattern: new Image(),
    };

    const colorStops = [
        {color: '#ff0000', stopPercent: 0},
        {color: '#ffff00', stopPercent: 0.125},
        {color: '#00ff00', stopPercent: 0.375},
        {color: '#0000ff', stopPercent: 0.625},
        {color: '#ff00ff', stopPercent: 0.875},
        {color: '#ff0000', stopPercent: 1},
    ];
    appState.pattern.src = 'images/texture.jpg';

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
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);

        context.strokeStyle = 'black';
        context.strokeRect(10, 10, theCanvas.width - 20, theCanvas.height - 20);

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
            case 'pattern':
                const pattern = context.createPattern(appState.pattern, 'repeat');
                textColor = pattern;
                break;
            case 'animation':
                const gradient = context.createLinearGradient(
                    theCanvas.width/2,
                    0,
                    theCanvas.width/2,
                    theCanvas.height);
                for(let i = 0; i < colorStops.length; i++) {
                    let { color, stopPercent } = colorStops[i];

                    gradient.addColorStop(stopPercent, color);
                    stopPercent += .015;
                    if (stopPercent > 1) {
                        stopPercent = 0;
                    }
                     colorStops[i].stopPercent = stopPercent;
                }
                textColor = gradient;
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

    changeAppStateOnDOMEvent('canvasWidth', 'canvasWidth', 'change');
    changeAppStateOnDOMEvent('canvasHeight', 'canvasHeight', 'change');

    const createImageData = document.getElementById('createImageData');
    const imageDataDisplay = document.getElementById('imageDataDisplay');
    function createImageDataPressed(event) {
        imageDataDisplay.value = theCanvas.toDataURL();
        window.open(imageDataDisplay.value, 'canvasImage',
            `left=0,top=0,width=${theCanvas.width},height=${theCanvas.height},toolbar=0,resizable=0`);
    }
    createImageData.addEventListener('click', createImageDataPressed, false);


    function canvasStyleChanged() {
        const width = canvasStyleWidth.value;
        const height = canvasStyleWidth.value;
        theCanvas.setAttribute('style', `width:${width}px;height:${height}px`);
        drawScreen();
    }

    canvasStyleWidth.addEventListener('change', canvasStyleChanged);
    canvasStyleHeight.addEventListener('change', canvasStyleChanged);

    function canvasWidthChanged() {
        theCanvas.width = canvasWidth.value;
        drawScreen();
    }

    function canvasHeightChanged() {
        theCanvas.height = canvasHeight.value;
        drawScreen();
    }

    canvasWidth.addEventListener('change', canvasWidthChanged);
    canvasHeight.addEventListener('change', canvasHeightChanged);


    const textBox = document.getElementById('textBox');
    textBox.addEventListener('keyup', onTextBoxKeyUp);

    function onTextBoxKeyUp(event) {
        appState.message = event.target.value;
        /* setElementPath is current unsupported
        theCanvas.innerHTML = `<span>${appState.message}</span>`;
        const spanElement = theCanvas.firstChild;
        context.setElementPath(spanElement);
        */
        drawScreen();
    }

    function gameLoop() {
        setTimeout(gameLoop, 20);
        drawScreen();
    }

    gameLoop();
}
