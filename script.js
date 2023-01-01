const hours = document.querySelector(".clock-hours");
const minutes = document.querySelector(".clock-minutes");
const month = document.querySelector(".month");
const day = document.querySelector(".day");
const myKey = config.MY_KEY;

const loop = () => {
  setInterval(() => {
    let m = new Date().getMonth() + 1;
    let currentMonth = m < 10 ? "0" + m : m;
    let d = new Date().getDate();
    let currentDay = d < 10 ? "0" + d : d;
    let h = new Date().getHours();
    let currentHours = h < 10 ? "0" + h : h;
    let min = new Date().getMinutes();
    let currentMin = min < 10 ? "0" + min : min;

    month.innerHTML = currentMonth;
    day.innerHTML = currentDay;
    hours.innerHTML = currentHours;
    minutes.innerHTML = currentMin;
  }, 1000);
};

fetch(
  `https://api.weatherapi.com/v1/current.json?key=${myKey}&q=klaipeda&aqi=no`
)
  .then((res) => {
    return res.json();
  })
  .then((weather) => {
    console.log(weather);
  });

loop();
