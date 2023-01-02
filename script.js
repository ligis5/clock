const hours = document.querySelector(".clock-hours");
const minutes = document.querySelector(".clock-minutes");
const month = document.querySelector(".month");
const day = document.querySelector(".day");
const temp = document.querySelector(".temp-number");
const city = document.querySelector(".city");
const myKey = config.MY_KEY;
let myCity = null;

const getDate = () => {
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
};

const getCity = async () => {
  try {
    let res = await fetch("https://ipapi.co/json/");
    let data = await res.json();
    // if city name is longer then 4 letters, it will be shortened.
    city.innerHTML =
      data.city.length > 4 ? data.city.slice(0, 4) + "..." : data.city;
    return data.city;
  } catch (err) {
    console.log(err);
  }
};

const getWeather = async () => {
  try {
    myCity = await getCity();
    let res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${myKey}&q=${myCity}&aqi=no`
    );
    let weather = await res.json();
    temp.innerHTML = weather.current.temp_c;
  } catch (err) {
    console.log(err);
  }
};

getDate();
getWeather();

const loop = () => {
  //Every second get date.
  setInterval(() => {
    getDate();
  }, 1000);

  //Every 30 minutes check weather.
  setInterval(() => getWeather(), 1000 * 60 * 30);
};

loop();

city.addEventListener("mouseover", () => {
  if (myCity != null) city.innerHTML = myCity;
});
city.addEventListener("mouseout", () => {
  if (myCity != null)
    city.innerHTML = myCity.length > 4 ? myCity.slice(0, 4) + "..." : myCity;
});
