let sections = document.querySelectorAll(".is-hide");
let categoryImages = document.querySelectorAll(".category__img");
const settings = document.querySelector(".welcome__settings");
const settings1 = document.querySelector(".category__settings__category");
const artist = document.querySelector(".welcome__artist");
const pictures = document.querySelector(".welcome__pictures");
const closeSet = document.querySelector(".settings__close");

const btnSave = document.querySelector(".settings__save");
const btnDefault = document.querySelector(".settings__default");
const btnArrow = document.querySelector(".settings__back");

const menuHeaderHome = document.getElementById("home-header");

const menuHome = document.getElementById("home");
const menuCategory = document.getElementById("categories");
const menuScore = document.getElementById("score");

const sectionWelcome = document.querySelector(".welcome");
const sectionSettings = document.querySelector(".settings");
const sectionCategory = document.querySelector(".category");
const sectionScore = document.querySelector(".score");
const sectionGame = document.querySelector(".game");

document.querySelector("body").addEventListener("click", (event) => {
  let target = event.target;

  if (target === settings) {
    sections.forEach((item) => item.classList.add("hide"));
    sectionSettings.classList.remove("hide");
  } else if (target === settings1) {
    sections.forEach((item) => item.classList.add("hide"));
    sectionSettings.classList.remove("hide");
  } else if (target === btnSave) {
    sections.forEach((item) => item.classList.add("hide"));
    sectionWelcome.classList.remove("hide");
  } else if (target === btnArrow) {
    sections.forEach((item) => item.classList.add("hide"));
    sectionWelcome.classList.remove("hide");
  } else if (target === closeSet) {
    sections.forEach((item) => item.classList.add("hide"));
    sectionWelcome.classList.remove("hide");
  } else if (target === artist) {
    for (let i = 0; i < categoryImages.length; i++) {
      let firstPos = categoryImages[i].src.split("").lastIndexOf("/");
      let currentImage = categoryImages[i].src.substring(firstPos + 1);
      categoryImages[i].src = `./assets/image/category/${currentImage}`;
    }
    sections.forEach((item) => item.classList.add("hide"));
    sectionCategory.classList.remove("hide");
  } else if (target === pictures) {
    for (let i = 0; i < categoryImages.length; i++) {
      let firstPos = categoryImages[i].src.split("").lastIndexOf("/");
      let currentImage = categoryImages[i].src.substring(firstPos + 1);
      categoryImages[
        i
      ].src = `./assets/image/category/pictures/${currentImage}`;
    }
    sections.forEach((item) => item.classList.add("hide"));
    sectionCategory.classList.remove("hide");
  } else if (target === menuHome) {
    sections.forEach((item) => item.classList.add("hide"));
    sectionWelcome.classList.remove("hide");
  } else if (target === menuHeaderHome) {
    sections.forEach((item) => item.classList.add("hide"));
    sectionWelcome.classList.remove("hide");
  }
});
