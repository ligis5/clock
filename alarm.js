const alarmHours = document.querySelector(".alarm-hours");
const alarmMinutes = document.querySelector(".alarm-minutes");
const alarmSound = document.querySelector(".alarm-sound");
const alarm = document.querySelector(".alarm");
const alarmContainer = document.querySelector(".alarm-container");

const stopButton = document.createElement("button");
stopButton.className = "stop-alarm";
stopButton.innerText = "Stop";

let changeAlarmHours = false;
let changeAlarmMinutes = false;
let startingMousePos = null;
let h = localStorage.getItem("hours") ? localStorage.getItem("hours") : 0;
let m = localStorage.getItem("minutes") ? localStorage.getItem("minutes") : 0;

// check localStorage for existing alarm
const checkForAlarm = () => {
  //hours
  if (localStorage.getItem("hours"))
    alarmHours.innerHTML =
      localStorage.getItem("hours") < 10
        ? "0" + localStorage.getItem("hours")
        : localStorage.getItem("hours");
  // minutes
  if (localStorage.getItem("minutes"))
    alarmMinutes.innerHTML =
      localStorage.getItem("minutes") < 10
        ? "0" + localStorage.getItem("minutes")
        : localStorage.getItem("minutes");
};
checkForAlarm();

// if clicked on alarm hours, fires
alarmHours.addEventListener("mousedown", (e) => {
  if (!changeAlarmHours) {
    startingMousePos = e.clientY;
    changeAlarmHours = true;
  }
  // added this one inside so it would only check when "mousedown" is fired also.

  // If mouse is above alarm clock it will add to h if it's less it will subtract.
  page.addEventListener("mousemove", (e) => {
    if (changeAlarmHours) {
      let num = e.clientY % 26;

      if (num === 25) {
        // if moving up add hours, if moving down, remove hours.
        if (e.clientY > startingMousePos) h--;
        if (e.clientY < startingMousePos) h++;
        // not more then 24, not less then 0 hours.
        if (h > 24) h = 0;
        if (h < 0) h = 24;
        startingMousePos = e.clientY;
        // if more then 0, but less then 10 add 0 to start
        if (h < 10) alarmHours.innerHTML = "0" + h;
        else alarmHours.innerHTML = h;
      }
      isAlarmStoped = false;
    }
  });
});

alarmMinutes.addEventListener("mousedown", (e) => {
  // if clicked on alarm minutes, fires
  if (!changeAlarmMinutes) {
    startingMousePos = e.clientY;
    changeAlarmMinutes = true;
  }
  page.addEventListener("mousemove", (e) => {
    if (changeAlarmMinutes) {
      let num = e.clientY % 11;

      if (num === 10) {
        // if moving up add hours, if moving down, remove hours.
        if (e.clientY > startingMousePos) m--;
        if (e.clientY < startingMousePos) m++;
        // not more then 24, not less then 0 hours.
        if (m > 60) m = 0;
        if (m < 0) m = 60;
        startingMousePos = e.clientY;
        // if more then 0, but less then 10 add 0 to start
        if (m < 10) alarmMinutes.innerHTML = "0" + m;
        else alarmMinutes.innerHTML = m;
      }
      isAlarmStoped = false;
    }
  });
});

// if let go of mouse fires
page.addEventListener("mouseup", () => {
  if (changeAlarmHours) {
    localStorage.setItem("hours", `${h}`);
    changeAlarmHours = false;
  }
  if (changeAlarmMinutes) {
    localStorage.setItem("minutes", `${m}`);
    changeAlarmMinutes = false;
  }
});

let isAlarmPlaying = false;
let isAlarmStoped = false;
let timeWhenAlarmStartedPlaying = null;

// remove stop button show alarm timer instead
const alarmStops = () => {
  alarmContainer.removeChild(stopButton);
  alarmSound.pause();
  isAlarmPlaying = false;
  isAlarmStoped = true;
  alarm.style.display = "flex";
};

const playAlarm = () => {
  // if alarm time is not currently changing and alarm is not stoped
  if (!changeAlarmMinutes && !changeAlarmHours && !isAlarmStoped) {
    // if there is saved alarm time in localStorage
    if (localStorage.getItem("hours") || localStorage.getItem("minutes")) {
      // if localStorage valyes are the same with current time
      if (
        hours.textContent == localStorage.getItem("hours") &&
        minutes.textContent == localStorage.getItem("minutes")
      ) {
        timeWhenAlarmStartedPlaying = minutes.textContent;
        isAlarmPlaying = true;
        // hide alarm time and show STOP button instead
        alarm.style.display = "none";
        alarmContainer.appendChild(stopButton);
        alarmSound.play();
      }
    }
  }
  // if current time is different from alarm time, then alarm button will reset
  if (timeWhenAlarmStartedPlaying != minutes.textContent) isAlarmStoped = false;

  // if current time is different from localStorage values and alarm is playing alarm stops
  if (
    (hours.textContent != localStorage.getItem("hours") && isAlarmPlaying) ||
    (minutes.textContent != localStorage.getItem("minutes") && isAlarmPlaying)
  ) {
    alarmStops();
  }
};
stopButton.onclick = alarmStops;

setInterval(() => {
  playAlarm();
}, 1000);
