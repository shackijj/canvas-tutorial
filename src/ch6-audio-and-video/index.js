export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<video autoplay loop controls id="theVideo" width="320" height="240">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
        </video>`;

    appElement.innerHTML = appTemplate;

    const theVideo = document.getElementById('theVideo');

    let loadCount = 0;
    const itemsToLoad = 2;

    let buttonSheet;
    const buttonWait = 5;
    let timeWaited;


    

    function itemLoaded() {
        loadCount++;
        if (itemsToLoad === loadCount) {
            startUp();
        }
    }

    theVideo.addEventListener('canplay', itemLoaded, false);

    buttonSheet = new Image();
    buttonSheet.src = 'images/videobuttons.png';
    buttonSheet.onload = itemLoaded;
}
