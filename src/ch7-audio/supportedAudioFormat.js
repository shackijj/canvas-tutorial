export default function supportedAudioFormat(audio) {
    var returnExtension = "";
    if (audio.canPlayType("audio/ogg") =="probably" || audio.canPlayType("audio/ogg") == "maybe") {
        returnExtension = "ogg";
    } else if(audio.canPlayType("audio/wav") =="probably" || audio.canPlayType("audio/wav") == "maybe") {
        returnExtension = "wav";
    } else if (audio.canPlayType("audio/mp3") == "probably" || audio.canPlayType("audio/mp3") == "maybe") {
        eturnExtension = "mp3";
    }
    return returnExtension; 
}