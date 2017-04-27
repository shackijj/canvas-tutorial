function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");

    function drawScreen() {
        context.fillStyle = '#ffffaa';
        context.fillRect(0, 0, 500, 300);

        context.fillStyle = '#000000';
        context.font = '20px Sans-Serif';
        context.textBaseline = 'top';
        context.fillText('Hello Canvas', 195, 80);

        const helloWorldImage = new Image();
        helloWorldImage.onload = function drawImage() {
            context.drawImage(helloWorldImage, 150, 90, 200, 216);
        };
        helloWorldImage.src = 'images/hello-world.png';

        context.strokeStyle = '#000000';
        context.strokeRect(5, 5, 490, 290);
    }

    drawScreen();

}

window.addEventListener('load', function() {
    canvasApp();
});