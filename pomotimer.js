/* Converts HTML Buttons  */
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const timerDisplay = document.getElementById("timertime");
const timerDisplay2 = document.getElementById("time");
const shortBreakBtn = document.getElementById("short-break-btn");
const longBreakBtn = document.getElementById("long-break-btn");
const pomodoroBtn = document.getElementById("pomodoro-btn");

/* Executes Functions on Click */
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
shortBreakBtn.addEventListener("click", startShortBreak);
longBreakBtn.addEventListener("click", startLongBreak);
pomodoroBtn.addEventListener("click", startPomodoro);

const audio = new Audio();
  audio.src = "timer-button.mp3"

let timer;
let seconds = 1500; // 25 minutes 

/*Decreases value of variable 'seconds', every second. */
function startTimer() {
  timer = setInterval(function() {
    seconds--;
    displayTime();

    if (seconds === 0) {
      stopTimer();
      audio.play();
      startShortBreak();
      startTimer();
    }
  }, 1000);
  startButton.disabled = true; 
  stopButton.disabled = false;
}

function stopTimer() {
  clearInterval(timer);
  startButton.disabled = false;
  stopButton.disabled = true;
}

function resetTimer() {
  stopTimer();
  seconds = 1500;
  displayTime();
}

function startShortBreak() {
  stopTimer();
  seconds = 300;
  displayTime();
}

function startLongBreak() {
  stopTimer();
  seconds = 600;
  displayTime();
}

function startPomodoro() {
  stopTimer();
  seconds = 1500;
  displayTime();
}

function displayTime() {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  timerDisplay.innerHTML = `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  timerDisplay2.innerHTML = `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}