import supportedAudioFormat from './supportedAudioFormat';

export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const audioContext = new AudioContext();
    const audioType = supportedAudioFormat(document.createElement('audio'));
    function loadSound(url, onSuccess, onError) {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            audioContext.decodeAudioData(request.response, onSuccess, onError);
        };
        request.onerror = onError;
        request.send();
    }

    function playSound(buffer) {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
    }

    loadSound('space-raiders/explode1.' + audioType, 
        function(buffer) { playSound(buffer); },
        function(err) { console.log(err); });
}
