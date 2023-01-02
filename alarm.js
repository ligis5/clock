const alarmHours = document.querySelector(".alarm-hours");

let changeAlramHours = false;
let startingMousePos = null;
let h = 0;

// if clicked on alarm hours fires
alarmHours.addEventListener("mousedown", (e) => {
  if (!changeAlramHours) {
    startingMousePos = e.clientY;
    changeAlramHours = true;
  }
  // added this one inside so it would only check when "mousedown" is fired also.

  // If mouse is above alarm clock it will add to h if it's less it will subtract.
  page.addEventListener("mousemove", (e) => {
    if (changeAlramHours) {
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
        if (h < 10 && h >= 0) alarmHours.innerHTML = "0" + h;
        // if more then -10, but less then 0, remove - from start, add 0 to start and - before 0.
        else if (h > -10 && h < 0)
          alarmHours.innerHTML = "-0" + h.toString().split("-").join("");
        else alarmHours.innerHTML = h;
      }
    }
  });
});

// if let go of mouse fires
page.addEventListener("mouseup", () => {
  if (changeAlramHours) {
    changeAlramHours = false;
  }
});
