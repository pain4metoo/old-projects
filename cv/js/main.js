window.addEventListener("load", function () {
  setTimeout(function () {
    let preloader = document.querySelector(".preload-x");
    if (!preloader.classList.contains("change-x")) {
      preloader.classList.add("change-x");
    }
  }, 1000);
});

let items = document.querySelectorAll(".project__slides .project__slide");
let currentItem = 0;
let isEnabled = true;
let checkActive = document.querySelectorAll(".project__menu__square");
let checkCount = document.querySelector(".project__count");
let slides = document.querySelectorAll(".project__slide");

const activeSlide = (n) => {
  for (slide of slides) {
    slide.classList.remove("active");
  }
  slides[n].classList.add("active");
  checkCount.innerHTML = `0${currentItem + 1}`;
};

const activeDot = (n) => {
  for (dot of checkActive) {
    dot.classList.remove("active");
    dot.classList.remove("active-color");
  }
  checkActive[n].classList.add("active");
  checkActive[currentItem].classList.add("active-color");
};

const prepareCurrentSlide = (ind) => {
  activeSlide(ind);
  activeDot(ind);
};

checkActive.forEach((item, indexDot) => {
  item.addEventListener("click", () => {
    currentItem = indexDot;
    prepareCurrentSlide(currentItem);
  });
});

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("active", direction);
  });
  checkActive[currentItem].classList.remove("active-color");
}

function showItem(direction) {
  items[currentItem].classList.add("next", direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
  checkActive[currentItem].classList.add("active-color");
  checkCount.innerHTML = `0${currentItem + 1}`;
}

function nextItem(n) {
  hideItem("to-left");
  changeCurrentItem(n + 1);
  showItem("from-right");
}

function previousItem(n) {
  hideItem("to-right");
  changeCurrentItem(n - 1);
  showItem("from-left");
}

document
  .querySelector(".project__control.left")
  .addEventListener("click", function () {
    if (isEnabled) {
      previousItem(currentItem);
    }
  });

document
  .querySelector(".project__control.right")
  .addEventListener("click", function () {
    if (isEnabled) {
      nextItem(currentItem);
    }
  });

const swipeCheck = (x) => {
  let surface = x;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let treshold = 150;
  let restraint = 100;
  let allowedTime = 200;

  surface.addEventListener("mousedown", function (e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener("mouseup", function (e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= treshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
  });

  surface.addEventListener("touchstart", function (e) {
    if (
      e.target.classList.contains("arrow") ||
      e.target.classList.contains("control")
    ) {
      if (e.target.classList.contains("left")) {
        if (isEnabled) {
          previousItem(currentItem);
        }
      } else if (e.target.classList.contains("left")) {
        if (isEnabled) {
          nextItem(currentItem);
        }
      }
    }

    let touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
  });

  surface.addEventListener("touchend", function (e) {
    let touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= treshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
  });
};

let x = document.querySelector(".project__slides");

swipeCheck(x);

const gambMenu = document
  .querySelector(".menu")
  .addEventListener("click", openMenu);
const leftSide = document.querySelector(".leftside");
const accordion = document
  .querySelector(".leftside__btn")
  .addEventListener("click", openAccordion);

function openMenu() {
  leftSide.classList.toggle("leftside__close");
  document.querySelector(".menu").classList.toggle("active-y");
}

function openAccordion() {
  document
    .querySelector(".leftside__hobbies")
    .classList.toggle("leftside__hobbies__close");
  document.querySelector(".leftside__btn").classList.toggle("active-z");
}

const changeLogo = document.querySelector(".header__logo");
const changeAvatar = document.getElementById("avatar");
const light = document.getElementById("light");
const instagram = document.getElementById("instagram");
const linkedIn = document.getElementById("linkedIn");
const gmail = document.getElementById("gmail");
const telegram = document.getElementById("telegram");
const youtube = document.getElementById("youtube");

light.onclick = function () {
  let theme = document.getElementById("Light-Theme");
  if (theme.getAttribute("href") === "css/style.css") {
    light.classList.add("change");
    theme.href = "css/light.css";
    changeLogo.src = "./assets/image/header-logo-1.png";
    changeAvatar.src = "./assets/image/avatar-change.png";

    instagram.src = "./assets/image/society/instagram.svg";
    linkedIn.src = "./assets/image/society/linkedin.svg";
    gmail.src = "./assets/image/society/gmail.svg";
    telegram.src = "./assets/image/society/whatsapp.svg";
    youtube.src = "./assets/image/society/youtube.svg";
  } else if (theme.getAttribute("href") === "css/light.css") {
    light.classList.remove("change");
    theme.href = "css/style.css";
    changeLogo.src = "./assets/image/header-logo.png";
    changeAvatar.src = "./assets/image/avatar.png";
    instagram.src = "./assets/svg/instagramm.svg";
    linkedIn.src = "./assets/svg/linked.svg";
    gmail.src = "./assets/svg/gmail.svg";
    telegram.src = "./assets/svg/telegram.svg";
    youtube.src = "./assets/svg/youtube.svg";
  }
};

let scrollItems = document.querySelectorAll(".ani");

if (scrollItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let i = 0; i < scrollItems.length; i++) {
      const animItem = scrollItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animeItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animeItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animeItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("active");
      } else {
        if (!animItem.classList.contains("hide")) {
          animItem.classList.remove("active");
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
}

console.log(`Score: 150 / 150
  - [x] вёрстка валидная (10)
  - [x] вёрстка семантическая (20)
  - [x] для оформления СV используются css-стили (10)
  - [x] контент размещается в блоке, который горизонтально центрируется на странице. Фоновый цвет, если он есть, тянется во всю ширину страницы (10)
  - [x] вёрстка адаптивная: ни на одном из разрешений экрана до 320px включительно не появляется горизонтальная полоса прокрутки, при этом всё содержание страницы сохраняется (10)
  - [x] есть меню. Ссылки в пунктах меню ведут на основные разделы CV. При кликах по пунктам меню реализована плавная прокрутка по якорям. При уменьшении ширины экрана меню становится адаптивным (10)
  - [x] на странице СV присутствует изображение - фото или аватарка автора CV, пропорции изображения не искажены (10)
  - [x] контакты для связи и перечень навыков оформлены в виде списка (10)
  - [x] CV содержит контакты для связи, краткую информацию о себе, перечень навыков, информацию об образовании и уровне английского (10)
  - [x] CV содержит пример вашего кода (например, решение задачи с сайта codewars) с подсветкой кода (10)
  - [x] CV содержит изображения-ссылки на выполненные вами проекты. При клике по изображению страница проекта открывается в новой вкладке (10)
  - [x] CV выполнено на английском языке (10)
  - [x] выполнены требования к Pull Request: есть ссылка на задание, скриншот страницы СV, ссылка на деплой страницы CV на GitHub Pages, выполнена самооценка (самооценку расписываем по пунктам критериев оценки, указывая балл за каждый пункт) (10)
  - [x] есть видеорезюме автора CV на английском языке. Продолжительность видео 3-5 минут (±15 секунд). В описание видео на YouTube добавлена его транскрипция на английском языке (10)
  - [x] качество выполнения CV не ниже чем в примерах CV, приведённых в материалах к заданию (10)`);
