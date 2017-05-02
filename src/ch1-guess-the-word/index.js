export function canvasApp() {
    const appElement = getElementById('app');

    const appTemplate = 
        `<canvas id="canvasOne" width="500" height="300">
        Your browser doesn't support HTML5 canvas.
        </canvas>
        <form>
            <input type="button" id="createImageDate" value="Export Canvas Image"/>
        </form>`;

    appElement.innerHTML = appTemplate;


    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext('2d');
    const formElement = document.getElementById('createImageDate');
    formElement.addEventListener('click', createImageDatePressed, false);

    let guesses = 0;
    const message = 'Guess the Letter From a (lower) to z (higher)';
    const letters = [
        "a" , "b" , "c" , "d" , "e" , "f" , "g" , "h" , 
        "i" , "j" , "k" , "l" , "m" , "n" , "o" , "p" , 
        "q" , "r" , "s" , "t" , "u" , "v" , "w" , "x" ,
        "y" , "z"
    ];
    const today = new Date();
    let letterToGuess = "";
    let higherOrLower = "";
    let lettersGuessed;
    let gameOver = false;

    function initGame() {
        let letterIndex = Math.floor(Math.random() * letters.length);
        letterToGuess = letters[letterIndex];
        guesses = 0;
        lettersGuessed = [];
        gameOver = false;
        window.addEventListener('keydown', eventKeyPresses, true);
        drawScreen();
    }

    function eventKeyPresses(event) {
        if (gameOver) {
            return;
        }
        let letterPressed = String.fromCharCode(event.keyCode);
        letterPressed = letterPressed.toLowerCase();
        guesses++;
        lettersGuessed.push(letterPressed);
        if (letterPressed === letterToGuess) {
            gameOver = true;
        } else {
            let letterIndex = letters.indexOf(letterToGuess);
            let guessIndex = letters.indexOf(letterPressed);

            if (guessIndex < 0) {
                higherOrLower = 'That is not a letter.';            
            } else if (guessIndex > letterIndex) {
                higherOrLower = 'lower';
            } else {
                higherOrLower = 'higher';
            }
        }
        drawScreen();
    }

    function drawScreen() {
        // backgroud
        context.fillStyle = '#ffffaa';
        context.fillRect(0, 0, 500, 300);

        // box
        context.strokeStyle = '#000000';
        context.strokeRect(5, 5, 490, 290);
        context.textBaseLine = 'top';
        // date
        context.fillStyle = '#000000';
        context.font = '10px Sans-Serif';
        context.fillText(today, 150, 20);
        // message
        context.fillStyle = '#FF0000';
        context.font = "14px Sans-Serif";
        context.fillText(message, 125, 35);
        // guesses
        context.fillStyle = '16px Sans-Serif';
        context.fillText(`Guesses: ${guesses}`, 215, 50);
        // higher or lower
        context.fillStyle = '#000000';
        context.font = '16px Sans-Serif';
        context.fillText(`Higher or Lower: ${higherOrLower}`, 150, 125);
        // letter guessed
        context.fillStyle = '#FF0000';
        context.font = '16px Sans-Serif';
        context.fillText(`Letters Guessed: ${lettersGuessed.toString()}`, 10, 260);

        if (gameOver) {
            context.fillStyle = '#FF0000';
            context.font = '40px Sans-Serif';
            context.fillText('You got it!', 150, 180);
        }
    }

    function createImageDatePressed(e) {
        const { width, height } = theCanvas;
        window.open(theCanvas.toDataURL(), "canvasImage", 
            `left=0,top=0,width=${width},height=${height},toolbar=0,resizable=0`);
    }

    initGame();
}
