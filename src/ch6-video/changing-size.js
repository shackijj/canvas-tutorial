export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<video autoplay loop controls id="theVideo" width="320" height="240">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
        </video>
        <form>
            Video Size: <input type="range" id="videoSize"
            min="80"
            max="1280"
            step="1"
            value="320"/>
        </form>`;

    appElement.innerHTML = appTemplate;

    let aspectRatio;

    function onSizeChange(event) {
        const { target } = event;
        const video = document.getElementById('theVideo');
        video.width = target.value;
        video.height = target.value / aspectRatio;
    }

    const video = document.getElementById('theVideo');
    aspectRatio = video.width / video.height;

    const input = document.getElementById('videoSize');
    input.addEventListener('change', onSizeChange);
}
