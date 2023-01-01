const hours = document.querySelector(".clock-hours");
const minutes = document.querySelector(".clock-minutes");
const month = document.querySelector(".month");
const day = document.querySelector(".day");
const temp = document.querySelector(".temp-number");
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

  setInterval(() => getWeather(), 1000 * 60 * 30);
};

const getIP = () => {
  fetch("https://ipapi.co/json/")
    .then(function (response) {
      response.json().then((jsonData) => {
        console.log(jsonData);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};
getIP();
const getLocation = () => {
  fetch(`https://ipapi.co/78.58.44.60/json/`)
    .then((res) => {
      return res.json();
    })
    .then((location) => {
      console.log(location);
    });
};
// getLocation();

const getWeather = () => {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=${myKey}&q=klaipeda&aqi=no`
  )
    .then((res) => {
      return res.json();
    })
    .then((weather) => {
      console.log(weather);
      temp.innerHTML = weather.current.temp_c;
    });
};

getWeather();

loop();
