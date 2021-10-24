const btnLang = document.getElementById("lang-1");
const wheatherTemp = document.querySelector(".weather__temp__value");
const wheatherIcon = document.querySelector(".weather__icon");
const wheatherName = document.querySelector(".weather__name");
const wheatherFeel = document.querySelector(".weather__feel");
const wheatherCity = document.querySelector(".weather__city");
const wheatherMin = document.querySelector(".weather__min");
const wheatherMax = document.querySelector(".weather__max");
const wheatherHumidity = document.querySelector(".weather__humidity");
const wheatherPres = document.querySelector(".weather__pres");
const wheatherWind = document.querySelector(".weather__wind");
const firstBlock = document.querySelector(".weather__first__block");
const threeBlock = document.querySelector(".weather__three__block");
const secondBlock1 = document.querySelector(".weather__second__minmax");
const secondBlock2 = document.querySelector(".weather__feel__text");
const secondBlock3 = document.querySelector(".weather__feel");
const weatherError = document.querySelector(".weather__error");
const title = document.querySelector(".weather__title");
wheatherCity.addEventListener("change", weather);

export let valueRu;

export async function weather() {
  let value = wheatherCity.value || "Minsk";

  if (value !== "Minsk") {
    localStorage.setItem("value", JSON.stringify(value));
  }
  const getLocalCity = localStorage.getItem("value");
  let localValue = JSON.parse(getLocalCity);
  let url;
  value = localValue || value;
  if (wheatherCity.value === "Minsk" && localStorage.value !== "Minsk") {
    value = "Minsk";
    localStorage.setItem("value", JSON.stringify(value));
  }

  valueRu = value;
  if (btnLang.checked) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=ru&appid=a876b64907b5df75ab7f693edd26d2bc&units=metric`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=en&appid=a876b64907b5df75ab7f693edd26d2bc&units=metric`;
  }

  const res = await fetch(url);
  const data = await res.json();

  wheatherIcon.className = "weather-icon owf";
  if (res.status === 404) {
    firstBlock.classList.add("display-none");
    threeBlock.classList.add("display-none");
    secondBlock1.classList.add("display-none");
    secondBlock2.classList.add("display-none");
    secondBlock3.classList.add("display-none");
    wheatherCity.classList.add("weather__city-error");
    weatherError.classList.remove("display-none");
    title.classList.add("display-none");
    if (btnLang.checked) {
      weatherError.innerHTML = `Город (${value}) не найден 404`;
    } else {
      weatherError.innerHTML = `City (${value}) not Found 404`;
    }
  } else {
    firstBlock.classList.remove("display-none");
    threeBlock.classList.remove("display-none");
    secondBlock1.classList.remove("display-none");
    secondBlock2.classList.remove("display-none");
    secondBlock3.classList.remove("display-none");
    wheatherCity.classList.remove("weather__city-error");
    title.classList.remove("display-none");
    weatherError.classList.add("display-none");
    wheatherCity.placeholder = value;
    title.innerHTML = value;
    wheatherTemp.innerHTML = `${Math.round(data.main.temp)}`;
    wheatherIcon.classList.add(`owf-${data.weather[0].id}`);
    wheatherName.innerHTML = `${data.weather[0].description}`;
    wheatherFeel.innerHTML = `${Math.round(data.main.feels_like)}`;
    wheatherMin.innerHTML = `${Math.round(data.main.temp_min)}`;
    wheatherMax.innerHTML = `${Math.round(data.main.temp_max)}`;
    wheatherHumidity.innerHTML = `${data.main.humidity}%`;
    wheatherPres.innerHTML = `${data.main.pressure} kPa`;
    wheatherWind.innerHTML = `${Math.round(data.wind.speed)} mph`;
  }
}
