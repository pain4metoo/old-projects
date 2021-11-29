import { trackCount } from "./audio.js";
import { weather } from "./weather.js";
import { welcome } from "./welcome.js";
import { randomNumber } from "./slider.js";
import { changeUrl } from "./slider.js";

const set = document.querySelector(".settings");

document.querySelector(".settings__open").addEventListener("click", () => {
  set.classList.toggle("settings__active");
});
document.querySelector(".settings__close").addEventListener("click", () => {
  set.classList.toggle("settings__active");
});

document.querySelectorAll("input").forEach((item) =>
  item.addEventListener("click", () => {
    check();
    settings();
  })
);

let musicItems = document.querySelectorAll(".select__item");
let hideItems = document.querySelectorAll(".settings__text__hide");
let tagsItems = document.querySelectorAll(".settings__text__tag");
let typeitems = document.querySelectorAll(".settings__text__type");
export let checkItems = [];

let getSettings = JSON.parse(localStorage.getItem("settings"));

let songArrRu = [
  "Сочиняй свою музыку",
  "Это мои руки",
  "Дом восходящего Солнца",
  "Я слишком давно люблю тебя",
];
let songArrEn = [
  "Make Your Own Kind Of Music",
  "Otis Redding These Arms Of Mine",
  "House Of The Rising Sun",
  "I've Been Loving You Too Long",
];
export function settings() {
  if (checkItems.includes("lang-1")) {
    translateRu();
  }
  if (checkItems.includes("lang-2")) {
    translateEn();
  }
  if (
    checkItems.includes("block-1") ||
    checkItems.includes("block-2") ||
    checkItems.includes("block-3") ||
    checkItems.includes("block-4") ||
    checkItems.includes("block-5") ||
    checkItems.includes("block-6") ||
    checkItems.includes("block-7") ||
    checkItems.includes("block-8")
  ) {
    hide();
  } else {
    document
      .querySelectorAll(".remove__hiden")
      .forEach((item) => item.classList.remove("hide-wid"));
  }
  if (checkItems.includes("api-1")) {
    changeUrl();
  }
  if (checkItems.includes("api-2")) {
    splashApi();
  }
  if (checkItems.includes("api-3")) {
    flickApi();
  }

  function hide() {
    if (checkItems.includes("block-1")) {
      document
        .querySelector(".header__player__wrapper")
        .classList.add("hide-wid");
    } else {
      document
        .querySelector(".header__player__wrapper")
        .classList.remove("hide-wid");
    }
    if (checkItems.includes("block-2")) {
      document.querySelector(".header__weather").classList.add("hide-wid");
    } else {
      document.querySelector(".header__weather").classList.remove("hide-wid");
    }
    if (checkItems.includes("block-3")) {
      document.querySelector(".welcome").classList.add("hide-wid");
    } else {
      document.querySelector(".welcome").classList.remove("hide-wid");
    }
    if (checkItems.includes("block-4")) {
      document
        .querySelector(".footer__inner__phrase")
        .classList.add("hide-wid");
      document.querySelector(".footer__btn").classList.add("hide-wid");
    } else {
      document
        .querySelector(".footer__inner__phrase")
        .classList.remove("hide-wid");
      document.querySelector(".footer__btn").classList.remove("hide-wid");
    }
    if (checkItems.includes("block-5")) {
      document.querySelector(".welcome__time").classList.add("hide-wid");
    } else {
      document.querySelector(".welcome__time").classList.remove("hide-wid");
    }
    if (checkItems.includes("block-6")) {
      document.querySelector(".welcome__date").classList.add("hide-wid");
    } else {
      document.querySelector(".welcome__date").classList.remove("hide-wid");
    }
    if (checkItems.includes("block-7")) {
      document.querySelector(".left").classList.add("hide-wid");
      document.querySelector(".right").classList.add("hide-wid");
    } else {
      document.querySelector(".left").classList.remove("hide-wid");
      document.querySelector(".right").classList.remove("hide-wid");
    }
    if (checkItems.includes("block-8")) {
      document.querySelector(".welcome__name").classList.add("hide-wid");
    } else {
      document.querySelector(".welcome__name").classList.remove("hide-wid");
    }
  }

  function translateRu() {
    document.querySelector(".header__song__name").textContent =
      songArrRu[trackCount];
    document.querySelector(".select__current").textContent =
      songArrRu[trackCount];
    musicItems[0].textContent = "Сочиняй свою музыку";
    musicItems[1].textContent = "Это мои руки";
    musicItems[2].textContent = "Дом восходящего Солнца";
    musicItems[3].textContent = "Я слишком давно люблю тебя";
    document.querySelector(".weather__feel__text").textContent = "По ощущению";
    document.querySelector(".weather__min__text").textContent = "Мин";
    document.querySelector(".weather__max__text").textContent = "Макс";
    document.querySelector(".weather__humidity__text").textContent =
      "Влажность";
    document.querySelector(".weather__pres__text").textContent = "Давление";
    document.querySelector(".weather__wind__text").textContent =
      "Скорость ветра";
    document.querySelector(".settings__title").textContent = "Меню настроек";
    document.querySelector(".settings__lang__text").textContent = "Язык";
    document.querySelector(".settings__photo__text").textContent =
      "Источник изображений";
    document.querySelector(".settings__hide__text").textContent =
      "Скрыть виджеты";
    document.querySelector(".settings__lang__ru").textContent = "Русский";
    document.querySelector(".settings__lang__en").textContent = "Английский";
    document.querySelector(".settings__example__active").textContent =
      "Активный пункт";
    document.querySelector(".settings__example__none").textContent =
      "Неактивный пункт";
    document.querySelector(".settings__type__title").textContent =
      "Время суток на изображении";
    document.querySelector(".settings__tags__title").textContent =
      "Темы изображений";
    document.querySelector(".footer__info__name").textContent =
      "разработал / pain4metoo";

    hideItems[0].textContent = "Аудио плеер";
    hideItems[1].textContent = "Виджет погоды";
    hideItems[2].textContent = "Виджет приветствия";
    hideItems[3].textContent = "Виджет цитат";
    hideItems[4].textContent = "Время";
    hideItems[5].textContent = "Дата";
    hideItems[6].textContent = "Стрелки";
    hideItems[7].textContent = "Текст приветствия";
    typeitems[0].textContent = "Утренняя тема";
    typeitems[1].textContent = "Дневная тема";
    typeitems[2].textContent = "Вечерняя тема";
    typeitems[3].textContent = "Ночная тема";
    tagsItems[0].textContent = "Тема природа";
    tagsItems[1].textContent = "Тема космос";
    tagsItems[2].textContent = "Тема лес";
    tagsItems[3].textContent = "Тема океан";

    weather();
  }
  function translateEn() {
    musicItems[0].textContent = "Make Your Own Kind Of Music";
    musicItems[1].textContent = "Otis Redding These Arms Of Mine";
    musicItems[2].textContent = "House Of The Rising Sun";
    musicItems[3].textContent = "I've Been Loving You Too Long";
    document.querySelector(".header__song__name").textContent =
      songArrEn[trackCount];
    document.querySelector(".select__current").textContent =
      songArrEn[trackCount];
    document.querySelector(".weather__feel__text").textContent = "Feels like";
    document.querySelector(".weather__min__text").textContent = "Min";
    document.querySelector(".weather__max__text").textContent = "Max";
    document.querySelector(".weather__humidity__text").textContent = "Humidity";
    document.querySelector(".weather__pres__text").textContent = "Pressure";
    document.querySelector(".weather__wind__text").textContent = "Wind speed";
    document.querySelector(".settings__title").textContent = "Settings menu";
    document.querySelector(".settings__lang__text").textContent = "Language";
    document.querySelector(".settings__photo__text").textContent =
      "Image source";
    document.querySelector(".settings__hide__text").textContent =
      "Hide widgets";
    document.querySelector(".settings__lang__ru").textContent = "Russian";
    document.querySelector(".settings__lang__en").textContent = "English";
    document.querySelector(".settings__example__active").textContent =
      "Active item";
    document.querySelector(".settings__example__none").textContent =
      "Inactive item";
    document.querySelector(".settings__type__title").textContent =
      "Photo time theme";
    document.querySelector(".settings__tags__title").textContent =
      "Photo type theme";
    document.querySelector(".footer__info__name").textContent =
      "made by pain4metoo";
    hideItems[0].textContent = "Music Player";
    hideItems[1].textContent = "Weather widget";
    hideItems[2].textContent = "Welcome widget";
    hideItems[3].textContent = "Quotes widget";
    hideItems[4].textContent = "Time";
    hideItems[5].textContent = "Date";
    hideItems[6].textContent = "Arrows";
    hideItems[7].textContent = "Welcome text";
    typeitems[0].textContent = "Morning theme";
    typeitems[1].textContent = "Afternoon theme";
    typeitems[2].textContent = "Evening theme";
    typeitems[3].textContent = "Night theme";
    tagsItems[0].textContent = "Nature theme";
    tagsItems[1].textContent = "Cosmos theme";
    tagsItems[2].textContent = "Forest theme";
    tagsItems[3].textContent = "Water theme";
    weather();
  }

  async function flickApi() {
    let typeArr = document.querySelectorAll(".settings__type__elem");
    let flickId = [
      "72157720067298866",
      "72157720074272867",
      "72157720063446789",
      "72157720074273332",
    ];
    let result;
    let now = welcome();
    for (let i = 0; i < now.length; i++) {
      if (now[i]) {
        result = i;
        break;
      }
    }

    for (let g = 0; g < typeArr.length; g++) {
      if (typeArr[g].checked) {
        result = g;
        break;
      }
    }

    let url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=fd11f969e919a3bac7c12b16b30904a7&gallery_id=${flickId[result]}&extras=url_h&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    let apiFlick = data.photos.photo[randomNumber].url_h;

    document.querySelector("body").style.backgroundImage = `url(${apiFlick})`;
  }

  async function splashApi() {
    let tagsArr = document.querySelectorAll(".settings__tags__elem");
    let themeArr = ["nature", "cosmos", "forest", "water"];
    let count;
    for (let i = 0; i < themeArr.length; i++) {
      if (tagsArr[i].checked) {
        count = i;
        break;
      } else {
        count = "forest";
      }
    }

    let url = `https://api.unsplash.com/search/photos?query=${themeArr[count]}&client_id=ulcYFCLUHO1CuL7nZIRZcuvLAdFor8F9T4DVzkqaYII`;
    let res = await fetch(url);
    let data = await res.json();

    let splashUrl = data.results[randomNumber].urls.full;

    document.querySelector("body").style.backgroundImage = `url(${splashUrl})`;
  }
}

export function check() {
  checkItems = [];
  let checkArr = document.querySelectorAll("input");

  for (let i = 0; i < checkArr.length; i++) {
    if (checkArr[i].checked) {
      checkItems.push(checkArr[i].id);
    }
  }
  localStorage.setItem("settings", JSON.stringify(checkItems));
}

check();
