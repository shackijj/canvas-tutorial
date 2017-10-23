export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<video autoplay loop controls id="theVideo" width="320" height="240" style="display: none;">
            <source src="http://design.enter-media.org/upload/iblock/2ae/2aed972c5726025ebd0eedc378866a61.webm" type="video/webm">
        </video>
        <canvas id="theCanvas" width="370" height="290">

        </canvas>`;

    appElement.innerHTML = appTemplate;

    const videoElement = document.getElementById('theVideo');
    const canvasElement = document.getElementById('theCanvas');
    const context = canvasElement.getContext('2d');
    const videoWidth = 1920;
    const videoHeight = 1080;

    const rows = 4;
    const cols = 4;
    const xPad = 10;
    const yPad = 10;
    const startXOffset = 10;
    const startYOffset = 10;
    const partWidth = videoElement.width / rows;
    const partHeight = videoElement.height / cols;

    function randomizeBoard(board) {
        return board;
    }

    function initBoard(rows, cols) {
        const board = [];
        for(let i = 0; i < rows; i++) {
            board[i] = [];
            for(let j = 0; j < cols; j++) {
                board[i][j] = { finalRow: i, finalCol: j, selected: false };
            }
        }
        return board;
    }

    const board = randomizeBoard(initBoard(rows, cols));

    function drawScreen() {
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);

        context.strokeStyle = '#303030';
        context.strokeRect(5, 5, theCanvas.width - 10, theCanvas.height - 10);

        for(let r = 0; r < rows; r++) {
            for(let c = 0; c < cols; c++) {
                const tempPiece = board[r][c];
                const { finalRow, finalCol, selected } = tempPiece;

                const partVideoWidth = videoWidth / cols;
                const partVideoHeight = videoHeight / rows;

                const imageX = finalCol * partVideoWidth;
                const imageY = finalRow * partVideoHeight;


                const placeX = startXOffset + (xPad * c) + (partWidth * c);
                const placeY = startYOffset + (yPad * r) + (partHeight * r);
                
                context.drawImage(videoElement, imageX, imageY, partVideoWidth, partVideoHeight,
                    placeX, placeY, partWidth, partHeight);
                
                if (tempPiece.selected) {
                    context.strokeStyle = '#FFFF00';
                    context.strokeRect(placeX, placeY, partWidth, partHeight);
                }
            }
        }
    }

    function gameLoop() {
        drawScreen();
        window.requestAnimationFrame(gameLoop);
    }

    window.requestAnimationFrame(gameLoop);
}
