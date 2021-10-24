import { welcome } from "./welcome.js";
import { settings } from "./settings.js";
import { checkItems } from "./settings.js";
const body = document.querySelector(".body");
export let randomNumber = Math.round(Math.random() * 20);
let url = `url('https://raw.githubusercontent.com/pain4metoo/stage1-tasks/assets/images/`;
let currentTime;

let btnLeft = document.querySelector(".left");
btnLeft.addEventListener("click", () => {
  prevImage();
});

let btnRight = document.querySelector(".right");
btnRight.addEventListener("click", () => {
  nextImage();
});

document.querySelectorAll(".settings__type__elem").forEach((item) =>
  item.addEventListener("click", () => {
    changeUrl();
  })
);

document.querySelectorAll(".settings__tags__elem").forEach((item) =>
  item.addEventListener("click", () => {
    changeUrl();
  })
);

export function changeUrl() {
  let time = welcome();
  for (let i = 0; i < time.length; i++) {
    if (time[i] !== undefined) {
      currentTime = time[i].split(" ")[1];
      break;
    }
  }

  if (checkItems.includes("lang-1")) {
    if (currentTime === "утро") {
      currentTime = "morning";
    } else if (currentTime === "день") {
      currentTime = "afternoon";
    } else if (currentTime === "вечер") {
      currentTime = "evening";
    } else if (currentTime === "ночи") {
      currentTime = "night";
    }
  }

  if (checkItems.includes("api-1")) {
    if (randomNumber === 0) {
      randomNumber = 1;
    }
    if (randomNumber < 10) {
      body.style.backgroundImage = `${url}${currentTime}/0${randomNumber}.jpg`;
    } else {
      body.style.backgroundImage = `${url}${currentTime}/${randomNumber}.jpg`;
    }
  }
  if (checkItems.includes("api-2")) {
    if (randomNumber === 0) {
      randomNumber = 1;
    }
    if (randomNumber >= 10) {
      randomNumber = 5;
    }
    settings();
  }
  if (checkItems.includes("api-3")) {
    settings();
  }

  body.style.backgroundSize = "cover";
  body.style.backgroundRepeat = "no-repeat";
}

function prevImage() {
  randomNumber--;
  if (checkItems.includes("api-1")) {
    if (randomNumber === 0) {
      randomNumber = 20;

      body.style.backgroundImage = `${url}${currentTime}/20.jpg`;
    } else {
      if (randomNumber < 10) {
        body.style.backgroundImage = `${url}${currentTime}/0${randomNumber}.jpg`;
      }
      if (randomNumber >= 10) {
        body.style.backgroundImage = `${url}${currentTime}/${randomNumber}.jpg`;
      }
    }
  }
  if (checkItems.includes("api-2")) {
    if (randomNumber <= 0) {
      randomNumber = 9;
    }
    settings();
  }
  if (checkItems.includes("api-3")) {
    settings();
  }
}

function nextImage() {
  randomNumber++;
  if (checkItems.includes("api-1")) {
    if (randomNumber === 21) {
      randomNumber = 1;
      body.style.backgroundImage = `${url}${currentTime}/01.jpg`;
    } else {
      if (randomNumber < 10) {
        body.style.backgroundImage = `${url}${currentTime}/0${randomNumber}.jpg`;
      }
      if (randomNumber >= 10) {
        body.style.backgroundImage = `${url}${currentTime}/${randomNumber}.jpg`;
      }
    }
  }
  if (checkItems.includes("api-2")) {
    if (randomNumber >= 10) {
      randomNumber = 1;
    }

    settings();
  }
  if (checkItems.includes("api-3")) {
    settings();
  }
}
