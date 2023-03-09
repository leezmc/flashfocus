
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const volume = document.getElementById("volume");
const type = document.getElementById("type");
const audio = document.getElementById("audio");
const source = document.getElementById("source");


let noiseType = type.value;
let noiseURL = getNoiseURL(noiseType);


source.setAttribute("src", noiseURL);
audio.volume = volume.value;


type.addEventListener("change", function() {
  noiseType = type.value;
  noiseURL = getNoiseURL(noiseType);
  source.setAttribute("src", noiseURL);
  audio.load();
});


volume.addEventListener("change", function() {
  audio.volume = volume.value;
});


startBtn.addEventListener("click", function() {
  audio.play();
});


stopBtn.addEventListener("click", function() {
  audio.pause();
});


function getNoiseURL(type) {
  switch (type) {
    case "white":
      return "white_noise.wav";
    case "pink":
      return "pink_noise.wav";
    case "brown":
      return "brown_noise.wav";
    default:
      return "";
  }
}