const hours = document.querySelector(".clock-hours");
const minutes = document.querySelector(".clock-minutes");
const month = document.querySelector(".month");
const day = document.querySelector(".day");
const temp = document.querySelector(".temp-number");
const city = document.querySelector(".city");
const weatherImg = document.querySelector(".weather-img");
const page = document.querySelector(".page");
const myKey = config.MY_KEY;
let myCity = null;

const input = document.createElement("input");
input.type = "text";
input.className = "cityInput";
input.placeholder = "City";

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

// get city using users IP (Using API)
const getCity = async () => {
  try {
    let res = await fetch("https://ipapi.co/json/");
    let data = await res.json();
    return data.city;
  } catch (err) {
    console.log(err);
  }
};

// if nothing is typed c = false then get city using IP.
const getWeather = async (c) => {
  try {
    myCity = !c ? await getCity() : c;
    let res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${myKey}&q=${myCity}&aqi=no`
    );
    let weather = await res.json();
    weatherImg.src = weather.current.condition.icon;
    temp.innerHTML = weather.current.temp_c + "c";
    city.innerHTML = myCity;
  } catch (err) {
    city.innerHTML = "City not found";
    city.style.position = "fixed";
    temp.style.marginTop = "1vw";
    temp.innerHTML = "-00c";
    console.log(err);
  }
};

getDate();
// getWeather();

const loop = () => {
  //Every second get date.
  setInterval(() => {
    getDate();
  }, 1000);

  //Every 30 minutes check weather.
  // setInterval(() => getWeather(), 1000 * 60 * 30);
};

loop();

// If input is not open when clicked open input, where city can be typed in. Input position:fixed, so I added marginTop.
let inputOpen = false;
let mouseOverInput = false;

//
const cityEventListener = city.addEventListener("click", () => {
  if (myCity != null && !inputOpen) {
    temp.style.marginTop = "1.5vw";
    city.innerHTML = null;
    city.appendChild(input);
    inputOpen = true;
    mouseOverInput = true;
  }
  removeEventListener("click", cityEventListener);
});

// press enter and change city for weather checking.
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && input.value.length > 0) {
    temp.style.marginTop = "0";
    getWeather(input.value);
    input.value = null;
    inputOpen = false;
  }
});
// if mouse is not over input allow to cancel input when pressed anywhere on the page
input.addEventListener("mouseleave", () => (mouseOverInput = false));

// to cancel input by click anywhere on page
page.addEventListener("click", () => {
  if (inputOpen && !mouseOverInput) {
    temp.style.marginTop = "0";
    input.value = null;
    city.removeChild(input);
    city.innerHTML = myCity;
    inputOpen = false;
  }
});
