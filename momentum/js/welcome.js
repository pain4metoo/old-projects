import { checkItems } from "./settings.js";

const hour = document.querySelector(".welcome__hour");
const min = document.querySelector(".welcome__min");
const sec = document.querySelector(".welcome__sec");
const welcomeText = document.querySelector(".welcome__hi");

export function welcome(morning, afternoon, evening, night) {
  const date = new Date();

  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();

  if (h < 10) {
    hour.innerHTML = `0${h}`;
  } else {
    hour.innerHTML = h;
  }
  if (m < 10) {
    min.innerHTML = `:0${m}:`;
  } else {
    min.innerHTML = `:${m}:`;
  }
  if (s < 10) {
    sec.innerHTML = `0${s}`;
  } else {
    sec.innerHTML = s;
  }

  if (checkItems.includes("lang-1")) {
    if (h >= 6 && h < 12) {
      morning = welcomeText.innerHTML = "Доброе утро";
    } else if (h >= 12 && h < 18) {
      afternoon = welcomeText.innerHTML = "Добрый день";
    } else if (h >= 18 && h < 24) {
      evening = welcomeText.innerHTML = "Добрый вечер";
    } else if (h >= 0 && h < 6) {
      night = welcomeText.innerHTML = "Спокойной ночи";
    }
  } else {
    if (h >= 6 && h < 12) {
      morning = welcomeText.innerHTML = "Good morning";
    } else if (h >= 12 && h < 18) {
      afternoon = welcomeText.innerHTML = "Good afternoon";
    } else if (h >= 18 && h < 24) {
      evening = welcomeText.innerHTML = "Good evening";
    } else if (h >= 0 && h < 6) {
      night = welcomeText.innerHTML = "Good night";
    }
  }

  let timeArr = [morning, afternoon, evening, night];

  setTimeout(welcome, 1000);
  setTimeout(data, 1000);

  return timeArr;
}

const dayWeek = document.querySelector(".welcome__dayweek");
const monthValue = document.querySelector(".welcome__month");
const dayMonth = document.querySelector(".welcome__daymonth");

export function data() {
  const daysWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const daysWeekRu = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "воскресенье",
  ];

  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthArrRu = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const date = new Date();

  let dayOfWeek = date.getDay();

  if (checkItems.includes("lang-1")) {
    if (dayOfWeek === 0) {
      dayWeek.innerHTML = `${daysWeekRu[6]},`;
    } else {
      dayWeek.innerHTML = `${daysWeekRu[dayOfWeek - 1]},`;
    }
  } else {
    if (dayOfWeek === 0) {
      dayWeek.innerHTML = `${daysWeek[6]},`;
    } else {
      dayWeek.innerHTML = `${daysWeek[dayOfWeek - 1]},`;
    }
  }

  let countOfMonth = date.getDate();
  dayMonth.innerHTML = `${countOfMonth}`;

  let month = date.getMonth();
  if (checkItems.includes("lang-1")) {
    monthValue.innerHTML = `${monthArrRu[month]},`;
  } else {
    monthValue.innerHTML = `${monthArr[month]},`;
  }
}

const firstName = document.querySelector(".welcome__name__value");
firstName.addEventListener("change", welcomeName);

export function welcomeName() {
  let name = firstName.value;
  if (name !== "") [localStorage.setItem("name", JSON.stringify(name))];

  if (name.length <= 8) {
    document.querySelector(".welcome__name").style.marginLeft = "10rem";
  } else {
    document.querySelector(".welcome__name").style.marginLeft = "0rem";
  }
  document.querySelector(".welcome__hi").classList.toggle("animation__left");
  firstName.classList.toggle("animation__right");
}
