window.addEventListener("load", function () {
  setTimeout(function () {
    let preloader = document.querySelector(".preload");
    if (!preloader.classList.contains("change")) {
      preloader.classList.add("change");
    }
  }, 1000);
});

let checkWidth = window.innerWidth;

window.addEventListener("resize", move);

let item1 = document.getElementById("welcome-1");
let item2 = document.getElementById("welcome-2");
let item3 = document.getElementById("welcome-3");
let item4 = document.getElementById("welcome-4");
let item5 = document.getElementById("welcome-5");

function move() {
  const viewport_width = window.innerWidth;
  const valueVolume = document.querySelector(".play__volume");

  if (viewport_width <= 1024) {
    valueVolume.value = 40;
    const leftSide = document.querySelector(".header__menu__list");
    const menu = document.querySelector(".menu");
    const menuInner = document.querySelector(".menu__inner");
    const title = document.querySelector(".welcome__left__inner");

    menu.addEventListener("click", () => {
      leftSide.classList.toggle("leftside__close");
      menu.classList.toggle("active-y");
      title.classList.toggle("hide");
    });

    const openMenu = () => {
      leftSide.classList.remove("leftside__close");
      menu.classList.remove("active-y");
      title.classList.remove("hide");
    };

    document.addEventListener("click", (event) => {
      if (
        !(event.target === menu) &&
        !(event.target === leftSide) &&
        !(event.target === document.querySelector(".header__menu__items")) &&
        !(event.target === menuInner) &&
        !(event.target === document.querySelector(".header__img-1")) &&
        !(event.target === document.querySelector(".header__menu__adaptive")) &&
        !(event.target === document.querySelector(".header__img-2")) &&
        !(event.target === document.querySelector(".header__img-3"))
      ) {
        openMenu();
      }
    });
  }
  if (viewport_width <= 800) {
    item1.src = `./assets/img/welcome-slider/welcome-slider-1-1.webp`;
    item2.src = `./assets/img/welcome-slider/welcome-slider-2-2.webp`;
    item3.src = `./assets/img/welcome-slider/welcome-slider-3-3.webp`;
    item4.src = `./assets/img/welcome-slider/welcome-slider-4-4.webp`;
    item5.src = `./assets/img/welcome-slider/welcome-slider-5-5.webp`;
  } else {
    item1.src = `./assets/img/welcome-slider/welcome-slider-1.webp`;
    item2.src = `./assets/img/welcome-slider/welcome-slider-2.webp`;
    item3.src = `./assets/img/welcome-slider/welcome-slider-3.webp`;
    item4.src = `./assets/img/welcome-slider/welcome-slider-4.webp`;
    item5.src = `./assets/img/welcome-slider/welcome-slider-5.webp`;
  }
}

move();

/// start welcome slider

let items = document.querySelectorAll(
  ".welcome__carousel .welcome__slide__inner"
);
let currentItem = 0;
let isEnabled = true;
let checkActive = document.querySelectorAll(".welcome__menu__square");
let checkCount = document.querySelector(".welcome__count");
let slides = document.querySelectorAll(".welcome__slide__inner");

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
  .querySelector(".welcome__control.left")
  .addEventListener("click", function () {
    if (isEnabled) {
      previousItem(currentItem);
    }
  });

document
  .querySelector(".welcome__control.right")
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
    e.preventDefault();
  });

  surface.addEventListener("touchmove", function (e) {
    e.preventDefault();
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

let x = document.querySelector(".welcome__carousel");

swipeCheck(x);

/////// welcome slider end

//// start explore slider
const exploreSlider = document.querySelector(".explore__inner__slide");
const before = document.querySelector(".explore__before");
const beforeImage = document.querySelector(".explore__img");
const change = document.querySelector(".explore__change");
const body = document.body;

let exploreActive = false;

document.addEventListener("DOMContentLoaded", () => {
  let width = exploreSlider.offsetWidth;
  beforeImage.style.width = `${width}px`;
});

change.addEventListener("mousedown", () => {
  exploreActive = true;
});

body.addEventListener("mouseup", () => {
  exploreActive = false;
});

body.addEventListener("mouseleave", () => {
  exploreActive = false;
});

const beforeAfterSlider = (x) => {
  let shift = Math.max(0, Math.min(x, exploreSlider.offsetWidth));
  before.style.width = `${shift}px`;
  change.style.left = `${shift}px`;
};

const pauseEvents = (e) => {
  e.stopPropagation();
  e.preventDefault();
  return false;
};

body.addEventListener("mousemove", (e) => {
  if (!exploreActive) {
    return;
  }

  let x = e.pageX;
  x -= exploreSlider.getBoundingClientRect().left;
  beforeAfterSlider(x);
  pauseEvents(e);
});

change.addEventListener("touchstart", () => {
  exploreActive = true;
});

body.addEventListener("touchend", () => {
  exploreActive = false;
});

body.addEventListener("touchcancel", () => {
  exploreActive = false;
});

body.addEventListener("touchmove", (e) => {
  if (!exploreActive) {
    return;
  }

  let x;

  let i;
  for (i = 0; i < e.changedTouches.length; i++) {
    x = e.changedTouches[i].pageX;
  }

  x -= exploreSlider.getBoundingClientRect().left;

  beforeAfterSlider(x);
  pauseEvents(e);
});

////////// explore end

/////// video

const source = document.getElementById("video__src");
const theme = document.getElementById("theme");

const fullScreenVideo = document.querySelector(".play");
const video = document.querySelector(".play__inner");
const smallPlay = document.querySelector(".play__btn__mid");
const bigPlay = document.querySelector(".play__btn__play");
const pause = document.querySelector(".play__btn__img");
const videoProgress = document.querySelector(".play__line");
const volume = document.querySelector(".play__btn__volume");
const volumeOff = document.querySelector(".play__btn__volume__off");
const volumeProgress = document.querySelector(".play__volume");
const fullWindow = document.querySelector(".play__btn__window");
const speedBlock = document.querySelector(".play__speed");

window.onload = function () {
  video.volume = 0.4;
};

window.addEventListener("scroll", videoReady);
function videoReady() {
  const animItem = fullScreenVideo;
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
    animItem.classList.add("accept");
  } else {
    animItem.classList.remove("accept");
  }
}

theme.addEventListener("keydown", () => {
  if (fullScreenVideo.classList.contains("accept")) {
    let result = event.code;
    if (result === "ArrowLeft") {
      ArrowLeftChange();
    } else if (result === "ArrowRight") {
      ArrowRightChange();
    } else if (result === "ArrowUp") {
      video.volume = video.volume + 0.1;
      volumeProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${
        video.volume * 100
      }%, #fff ${video.volume * 100}%, white 100%)`;
      volumeProgress.value = video.volume * 100;
      volumeUpdate();
    } else if (result === "ArrowDown") {
      video.volume = video.volume - 0.1;
      volumeProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${
        video.volume * 100
      }%, #fff ${video.volume * 100}%, white 100%)`;
      volumeProgress.value = video.volume * 100;
      volumeUpdate();
    } else if (result === "Digit1") {
      video.currentTime = (video.duration / 100) * 10;
    } else if (result === "Digit2") {
      video.currentTime = (video.duration / 100) * 20;
    } else if (result === "Digit3") {
      video.currentTime = (video.duration / 100) * 30;
    } else if (result === "Digit4") {
      video.currentTime = (video.duration / 100) * 40;
    } else if (result === "Digit5") {
      video.currentTime = (video.duration / 100) * 50;
    } else if (result === "Space") {
      checkVideoStatus();
    } else if (result === "Digit6") {
      video.currentTime = (video.duration / 100) * 60;
    } else if (result === "Digit7") {
      video.currentTime = (video.duration / 100) * 70;
    } else if (result === "Digit8") {
      video.currentTime = (video.duration / 100) * 80;
    } else if (result === "Digit9") {
      video.currentTime = (video.duration / 100) * 90;
    }

    // if (result === "Space" || result === "Home" || result === "End") {
    //   document.body.addEventListener("keydown", function (e) {
    //     if ((e.keycode || e.which) === 36) {
    //       e.preventDefault();
    //     }
    //     if ((e.keycode || e.which) === 35) {
    //       e.preventDefault();
    //     }
    //     if ((e.keycode || e.which) === 32) {
    //       e.preventDefault();
    //       checkVideoStatus();
    //     } else {
    //       checkVideoStatus();
    //     }
    //   });
    // }

    if (result === "KeyM") {
      checkVolume();
    } else if (result === "KeyK") {
      checkVideoStatus();
    } else if (result === "KeyF") {
      fullScreen();
    } else if (result === "KeyP") {
      tnsArrowLeft.click(ArrowLeftChange);
    } else if (result === "KeyN") {
      tnsArrowRight.click(ArrowRightChange);
    } else if (result === "Comma" && video.playbackRate === 1) {
      video.playbackRate = 0.5;
      speedBlock.innerHTML = `${0.5} x`;
      showSpeed();
    } else if (result === "Period" && video.playbackRate === 0.5) {
      video.playbackRate = 1;
      speedBlock.innerHTML = `${1} x`;
      showSpeed();
    } else if (result === "Period" && video.playbackRate === 1) {
      video.playbackRate = 1.5;
      speedBlock.innerHTML = `${1.5} x`;
      showSpeed();
    } else if (result === "Comma" && video.playbackRate === 1.5) {
      video.playbackRate = 1;
      speedBlock.innerHTML = `${1} x`;
      showSpeed();
    }
  }
});

function checkVolume() {
  if (video.volume > 0.01) {
    video.volume = 0;
    volumeOff.style.display = "block";
    volume.style.display = "none";
    volumeProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #fff 10%, white 100%)`;
    volumeProgress.value = 0;
  } else if (video.volume === 0) {
    video.volume = 0.5;
    volumeOff.style.display = "none";
    volume.style.display = "block";
    volumeProgress.value = 50;
    volumeProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 50%, #fff 10%, white 100%)`;
  }
}

function volumeLine() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
  let volumeCount = (video.volume = volumeProgress.value / 100);
  if (volumeCount === 0) {
    volumeOff.style.display = "block";
    volume.style.display = "none";
  } else {
    volumeOff.style.display = "none";
    volume.style.display = "block";
  }
}

function checkVideoStatus() {
  if (video.paused) {
    video.play();
    smallPlay.style.display = "none";
    pause.style.display = "block";
    bigPlay.style.display = "none";
  } else {
    video.pause();
    smallPlay.style.display = "block";
    pause.style.display = "none";
    bigPlay.style.display = "block";
  }
}

function videoLine() {
  let videoProgressLine = (video.currentTime / video.duration) * 100;
  videoProgress.value = (video.currentTime / video.duration) * 100;
  videoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${
    videoProgressLine + 0.5
  }%, #fff ${videoProgressLine}%, white 100%)`;
  if (videoProgressLine > 40) {
    videoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${
      videoProgressLine - 0.5
    }%, #fff ${videoProgressLine}%, white 100%)`;
  }
  if (videoProgressLine > 70) {
    videoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${
      videoProgressLine - 1
    }%, #fff ${videoProgressLine}%, white 100%)`;
  }
  if (videoProgressLine > 90) {
    videoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${
      videoProgressLine - 1.5
    }%, #fff ${videoProgressLine}%, white 100%)`;
  }
  if (videoProgressLine === 100) {
    videoProgress.style.background = `#fff`;
    smallPlay.style.display = "block";
    pause.style.display = "none";
    bigPlay.style.display = "block";
    videoProgress.value = 0;
  }
}

videoProgress.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
});

function fullScreen() {
  if (!document.fullscreenElement) {
    fullScreenVideo.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function setProgress(event) {
  let width = this.offsetWidth;
  let pos = event.offsetX;
  this.value = (100 * pos) / width;
  video.currentTime = video.duration * (pos / width);
}

function volumeUpdate() {
  if (video.volume < 0.1) {
    volumeOff.style.display = "block";
    volume.style.display = "none";
    volumeProgress.style.background = `#fff`;
    volumeProgress.value = 0;
  } else {
    if (video.volume > 0.1) {
      volumeOff.style.display = "none";
      volume.style.display = "block";
    }
  }
}

function showSpeed() {
  speedBlock.style.visibility = "visible";
  setTimeout(() => (speedBlock.style.visibility = ""), 500);
}

video.ontimeupdate = videoLine;
videoProgress.addEventListener("click", setProgress);
fullWindow.addEventListener("click", fullScreen);
volumeProgress.addEventListener("input", volumeLine);
volumeOff.addEventListener("click", checkVolume);
volume.addEventListener("click", checkVolume);
video.addEventListener("click", checkVideoStatus);
bigPlay.addEventListener("click", checkVideoStatus);
smallPlay.addEventListener("click", checkVideoStatus);
pause.addEventListener("click", checkVideoStatus);

const arrVideo = [
  "video0.mp4",
  "video1.mp4",
  "video2.mp4",
  "video3.mp4",
  "video4.mp4",
];
const arrPosters = [
  "poster0.webp",
  "poster1.webp",
  "poster2.webp",
  "poster3.webp",
  "poster4.webp",
];

let count = 0;

function switchVideo(numVideo) {
  source.src = `./assets/video/${arrVideo[numVideo]}`;
  video.poster = `./assets/img/${arrPosters[numVideo]}`;
  video.load();
  video.pause();
  smallPlay.style.display = "block";
  pause.style.display = "none";
  bigPlay.style.display = "block";
  videoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #fff 0%, white 100%)`;
}

function ArrowLeftChange() {
  if (count > 0) {
    count--;
    switchVideo(count);
  } else {
    count = 4;
    switchVideo(count);
  }
  videoProgress.value = 0;
}

function ArrowRightChange() {
  if (count < 4) {
    count++;
    switchVideo(count);
  } else {
    count = 0;
    switchVideo(count);
  }
  videoProgress.value = 0;
}

const slider = tns({
  container: ".my-slider",
  items: 1,
  navAsThumbnails: true,
  arrowKeys: true,
  responsive: {
    1000: {
      items: 3,
    },
    390: {
      items: 2,
    },
  },
});

const tnsArrowLeft = document.querySelector(
  ".tns-controls [data-controls=prev]"
);
const tnsArrowRight = document.querySelector(
  ".tns-controls [data-controls=next]"
);

tnsArrowLeft.addEventListener("click", ArrowLeftChange);
tnsArrowRight.addEventListener("click", ArrowRightChange);

const tnsDotSlider0 = document.querySelector(".tns-nav [data-nav='0']");
const tnsDotSlider1 = document.querySelector(".tns-nav [data-nav='1']");
const tnsDotSlider2 = document.querySelector(".tns-nav [data-nav='2']");
const tnsDotSlider3 = document.querySelector(".tns-nav [data-nav='3']");
const tnsDotSlider4 = document.querySelector(".tns-nav [data-nav='4']");

tnsDotSlider0.addEventListener("click", function () {
  source.src = `./assets/video/${arrVideo[0]}`;
  video.poster = `./assets/img/${arrPosters[0]}`;
  video.load();
  count = 0;
  video.pause();
  smallPlay.style.display = "block";
  pause.style.display = "none";
  bigPlay.style.display = "block";
  videoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #fff 0%, white 100%)`;
});
tnsDotSlider1.addEventListener("click", function () {
  source.src = `./assets/video/${arrVideo[1]}`;
  video.poster = `./assets/img/${arrPosters[1]}`;
  video.load();
  count = 1;
  video.pause();
  smallPlay.style.display = "block";
  pause.style.display = "none";
  bigPlay.style.display = "block";
  videoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #fff 0%, white 100%)`;
});
tnsDotSlider2.addEventListener("click", function () {
  source.src = `./assets/video/${arrVideo[2]}`;
  video.poster = `./assets/img/${arrPosters[2]}`;
  video.load();
  count = 2;
  video.pause();
  smallPlay.style.display = "block";
  pause.style.display = "none";
  bigPlay.style.display = "block";
  videoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #fff 0%, white 100%)`;
});
tnsDotSlider3.addEventListener("click", function () {
  source.src = `./assets/video/${arrVideo[3]}`;
  video.poster = `./assets/img/${arrPosters[3]}`;
  video.load();
  count = 3;
  video.pause();
  smallPlay.style.display = "block";
  pause.style.display = "none";
  bigPlay.style.display = "block";
  videoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #fff 0%, white 100%)`;
});
tnsDotSlider4.addEventListener("click", function () {
  source.src = `./assets/video/${arrVideo[4]}`;
  video.poster = `./assets/img/${arrPosters[4]}`;
  video.load();
  count = 4;
  video.pause();
  smallPlay.style.display = "block";
  pause.style.display = "none";
  bigPlay.style.display = "block";
  videoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #fff 0%, white 100%)`;
});

function findVideos() {
  let videos = document.querySelectorAll(".video__iframe");

  for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }
}

function setupVideo(video) {
  let link = video.querySelector(".video__iframe__link");
  let media = video.querySelector(".video__iframe__img");
  let button = video.querySelector(".video__iframe__button");
  let id = parseMediaURL(media);

  video.addEventListener("click", () => {
    let iframe = createIframe(id);

    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute("href");
  video.classList.add("video--enabled");
}

function parseMediaURL(media) {
  let regexp =
    /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
  let url = media.src;
  let match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  let iframe = document.createElement("iframe");

  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("allow", "autoplay");
  iframe.setAttribute("src", generateURL(id));
  iframe.classList.add("video__iframe__img");

  return iframe;
}

function generateURL(id) {
  let query = "?rel=0&showinfo=0&autoplay=1";

  return "https://www.youtube.com/embed/" + id + query;
}

findVideos();

// video end

tnsArrowLeft.addEventListener("click", ArrowLeftChange);
tnsArrowRight.addEventListener("click", ArrowRightChange);

let galleryAnim = document.querySelectorAll(".gallery__anim");

if (galleryAnim.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let i = 0; i < galleryAnim.length; i++) {
      const animItem = galleryAnim[i];
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
        animItem.classList.remove("active");
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

const close = () => {
  galleryPop.classList.toggle("gallery__hiden");
  if (galleryPop.style.backgroundColor !== `rgba(0, 0, 0, 0.5)`) {
    galleryPop.style.transition = `1s`;
    setTimeout(
      () => (galleryPop.style.backgroundColor = `rgba(0, 0, 0, 0.5)`),
      1000
    );
  } else {
    galleryPop.style.transition = `0.5s`;
    galleryPop.style.backgroundColor = `transparent`;
  }
};

const changeImage = document.querySelectorAll(".gallery__img");

const mixImg = (a, b) => Math.random() - 0.5;
let galleryArr = Array.from(changeImage),
  galleryArrChange = galleryArr.map((e) => e.src).sort(mixImg);
galleryArr.map((e, i) => (e.src = galleryArrChange[i]));

const galleryPopupItems = document.querySelectorAll(".gallery__popup__item");
const galleryIcon = document.querySelectorAll(".gallery__popup__img");
const galleryPop = document.querySelector(".gallery__popup");
const galleryOverlay = document
  .querySelector(".gallery__popup__overlay")
  .addEventListener("click", close);

document.querySelectorAll(".gallery__img").forEach((item) =>
  item.addEventListener("click", function (event) {
    let target = event.target;
    galleryArr = [
      "galery1.webp",
      "galery2.webp",
      "galery3.webp",
      "galery4.webp",
      "galery5.webp",
      "galery6.webp",
      "galery7.webp",
      "galery8.webp",
      "galery9.webp",
      "galery10.webp",
      "galery11.webp",
      "galery12.webp",
    ];
    let galleryClass = [
      "elem-1",
      "elem-2",
      "elem-3",
      "elem-4",
      "elem-5",
      "elem-6",
      "elem-7",
      "elem-8",
      "elem-9",
      "elem-10",
      "elem-11",
      "elem-12",
    ];
    let src = target.src;
    let changeSrc = src.split(" ")[0].indexOf("galery");

    src = src.substring(changeSrc + 7);

    let visibleBlock = galleryArr.indexOf(src);

    for (let i = 0; i < galleryPopupItems.length; i++) {
      if (galleryPopupItems[i].classList.contains(galleryClass[visibleBlock])) {
        galleryPopupItems[i].style.display = "flex";
      } else {
        galleryPopupItems[i].style.display = "none";
      }
    }
    close();
  })
);

const checkStatus = document.querySelector(".gallery__faq__block");
const closeFaq = (event) => {
  checkStatus.classList.toggle("gallery__faq__close");
  checkStatus.classList.add("hideClose");
  if (
    checkStatus.classList.contains("hideClose") ||
    event.target === checkStatus
  ) {
    checkStatus.style.display = "none";
  }
};
checkStatus.addEventListener("click", closeFaq);

const closeAttention = document
  .querySelector(".gallery__faq__btn")
  .addEventListener("click", closeFaq);

mapboxgl.accessToken =
  "pk.eyJ1IjoibWVsbG82MTAiLCJhIjoiY2tzeXRybTFrMGc5ZTJvcDlkeHVpM3RzdCJ9.w-fSpACQN_xgF0C2zyxuLQ";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/light-v10", // style URL
  center: [2.3363, 48.86091], // starting position [lng, lat]
  zoom: 15.65, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());

const marker0 = new mapboxgl.Marker({
  color: "black",
  draggable: true,
})
  .setLngLat([2.3364, 48.86091])
  .addTo(map);

const marker1 = new mapboxgl.Marker({
  color: "#767676",
  draggable: true,
})
  .setLngLat([2.3333, 48.8602])
  .addTo(map);

const marker2 = new mapboxgl.Marker({
  color: "#767676",
  draggable: true,
})
  .setLngLat([2.3397, 48.8607])
  .addTo(map);

const marker3 = new mapboxgl.Marker({
  color: "#767676",
  draggable: true,
})
  .setLngLat([2.333, 48.8619])
  .addTo(map);

const marker4 = new mapboxgl.Marker({
  color: "#767676",
  draggable: true,
})
  .setLngLat([2.3365, 48.8625])
  .addTo(map);

/////// popup;

const popupOpen = document
  .querySelector(".tickets__btn__buy")
  .addEventListener("click", togglePopup);
const popup = document.querySelector(".popup");
const closePopup = document
  .querySelector(".popup__close")
  .addEventListener("click", togglePopup);

const overlay = document
  .querySelector(".popup__overlay")
  .addEventListener("click", togglePopup);

function togglePopup() {
  popup.classList.toggle("close");
  if (popup.style.backgroundColor !== `rgba(0, 0, 0, 0.5)`) {
    popup.style.transition = `1s`;
    setTimeout(() => (popup.style.backgroundColor = `rgba(0, 0, 0, 0.5)`), 900);
  } else {
    popup.style.transition = `0.5s`;
    popup.style.backgroundColor = `transparent`;
  }
}

const popupDate = document.querySelector(".popup__date");

let mydate = document.getElementById("date-x");
let olddate = mydate.value;
let isChangedDate = function () {
  if (mydate.value !== olddate) {
    olddate = mydate.value;
    return true;
  }
  return false;
};
mydate.addEventListener("change", function () {
  if (isChangedDate()) {
    popupDate.classList.remove("popup__date__hiden");
  } else {
    popupDate.classList.add("popup__date__hiden");
  }
});

popupDate.setAttribute("min", checkDate());

function checkDate() {
  const daysWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
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

  date = new Date();
  day = date.getDate();
  month = date.getMonth() + 1;
  year = date.getFullYear();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  mydate.addEventListener("change", function () {
    date = new Date(mydate.value);
    let dayOfWeek = date.getDay();
    if (dayOfWeek === 0) {
      document.querySelector(".data__name").innerHTML = daysWeek[6];
    } else {
      document.querySelector(".data__name").innerHTML = daysWeek[dayOfWeek - 1];
    }
    let countOfMonth = date.getDate();
    document.querySelector(".data__count").innerHTML = ` ${countOfMonth}`;
    let month = date.getMonth();
    document.querySelector(".data__month").innerHTML = `${monthArr[month]}`;
  });

  today = `${year}-${month}-${day}`;

  return today;
}

const popupTime = document.querySelector(".popup__time");

popupTime.addEventListener("change", function () {
  document.getElementById("hour").innerHTML = popupTime.value.substring(0, 2);
  document.getElementById("min").innerHTML = popupTime.value.substring(4);
});

const buttons = document.querySelectorAll(".popup__form__submit");

buttons.forEach((item) => {
  item.addEventListener("click", function (e) {
    let ripple = document.createElement("div"),
      ripleValue = Math.max(this.clientWidth, this.clientHeight),
      rect = this.getBoundingClientRect();
    (ripleX = ripple.style), (px = "px");

    ripleX.width = ripleX.height = ripleValue + px;
    ripleX.left = e.clientX - rect.left - ripleValue / 2 + px;
    ripleX.top = e.clientY - rect.top - ripleValue / 2 + px;

    ripple.classList.add("riple");
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

const priceTickets = {
  permanent: {
    basic: 20,
    senior: 10,
  },
  temporary: {
    basic: 25,
    senior: 12.5,
  },
  combined: {
    basic: 40,
    senior: 20,
  },
};

let sum = document.querySelector(".tickets__price__fix");
let basicValue = document.querySelector(".basic__value").value;
let seniorValue = document.querySelector(".senior__value").value;
let basicPopup = document.querySelector(".basic__value__popup");
let seniorPopup = document.querySelector(".senior__value__popup");
let popupTicketType = document.querySelector(".popup__right__type");
let popupSelect = document.querySelector(".popup__select");
const changeType = document
  .querySelectorAll(".tickets__input__left")
  .forEach((item) => item.addEventListener("click", sumTickets));
const btnMinus = document
  .querySelectorAll(".btn__minus")
  .forEach((item) => item.addEventListener("click", valueTickets));
const btnPlus = document
  .querySelectorAll(".btn__plus")
  .forEach((item) => item.addEventListener("click", valueTickets));

function valueTickets(event) {
  let target = event.target;

  if (target.closest(".btn__minus")) {
    if (target.closest(".basic")) {
      basicValue > 0 ? basicValue-- : 0;
    } else {
      seniorValue > 0 ? seniorValue-- : 0;
    }
  }
  if (target.closest(".btn__plus")) {
    if (target.closest(".basic")) {
      basicValue++;
    } else {
      seniorValue++;
    }
  }

  sumTickets();
  localStorage.setItem("basicValue", JSON.stringify(basicValue));
  localStorage.setItem("seniorValue", JSON.stringify(seniorValue));
}

function checkLocalStorage() {
  const getLocalBasicValue = localStorage.getItem("basicValue");
  let changeLocalBasicValue = JSON.parse(getLocalBasicValue);
  basicValue = changeLocalBasicValue;
  changeLocalBasicValue === null
    ? 0
    : (document.querySelector(".basic__value").value = changeLocalBasicValue);
  changeLocalBasicValue === null
    ? 0
    : (document.querySelector(".basic__value__popup").value =
        changeLocalBasicValue);

  const getLocalSeniorValue = localStorage.getItem("seniorValue");
  let changeLocalSeniorValue = JSON.parse(getLocalSeniorValue);
  seniorValue = changeLocalSeniorValue;
  changeLocalSeniorValue === null
    ? 0
    : (document.querySelector(".senior__value").value = changeLocalSeniorValue);
  changeLocalSeniorValue === null
    ? 0
    : (document.querySelector(".senior__value__popup").value =
        changeLocalSeniorValue);

  const getLocalinput = localStorage.getItem("i");
  let changeLocalInput = JSON.parse(getLocalinput);
  if (changeLocalInput === 0) {
    document.querySelectorAll(".tickets__input__left")[0].click();
  } else if (changeLocalInput === 1) {
    document.querySelectorAll(".tickets__input__left")[1].click();
  } else if (changeLocalInput === 2) {
    document.querySelectorAll(".tickets__input__left")[2].click();
  }

  const getLocalTicketType = localStorage.getItem("ticketType");
  let changeLocalTicketType = JSON.parse(getLocalTicketType);
  for (let g = 0; g < popupSelect.length; g++) {
    if (popupSelect[g].value === changeLocalTicketType) {
      popupSelect.value = changeLocalTicketType;
      popupTicketType.innerHTML = popupSelect[g];
    }
  }
}

checkLocalStorage();

function sumTickets() {
  let value = 0;
  let ticketType;
  let arrValue = [
    "Permanent exhibition",
    "Temporary exhibition",
    "Combined Admission",
  ];

  function checkTicketType() {
    const type = document.querySelectorAll(".tickets__input__left");
    for (let i = 0; i < type.length; i++) {
      if (type[i].checked) {
        ticketType = type[i].value;
        popupTicketType.innerHTML = arrValue[i];
        popupSelect.value = type[i].value;

        localStorage.setItem("i", JSON.stringify(i));
        localStorage.setItem("ticketType", JSON.stringify(ticketType));

        popupSelect.addEventListener("change", function () {
          ticketType = popupSelect.value;

          if (ticketType === "permanent" || ticketType === "temporary") {
            popupTicketType.innerHTML = `${ticketType[0].toUpperCase()}${ticketType.substring(
              1
            )} exhibition`;
          } else {
            popupTicketType.innerHTML = `${ticketType[0].toUpperCase()}${ticketType.substring(
              1
            )} Admission`;
          }
          document.querySelector(
            ".popup__right__price__count-basic"
          ).innerHTML = priceTickets[ticketType].basic;
          document.querySelector(
            ".popup__right__price__count-senior"
          ).innerHTML = priceTickets[ticketType].senior;
          changeSum();
        });
        break;
      }
    }
    return ticketType;
  }
  checkTicketType();

  function changeSum() {
    let basVal = 0;
    let senVal = 0;
    if (basicValue >= 20) {
      basicValue = 20;
    }
    if (seniorValue >= 20) {
      seniorValue = 20;
    }
    basVal = basicValue * priceTickets[ticketType].basic;
    document.querySelector(
      ".popup__right__price__text__basic"
    ).innerHTML = `${basVal} €`;
    senVal = seniorValue * priceTickets[ticketType].senior;
    document.querySelector(
      ".popup__right__price__text__senior"
    ).innerHTML = `${senVal} €`;
    value = basVal + senVal;
    document.querySelector(
      ".popup__right__total__price"
    ).innerHTML = `${value} €`;

    return value;
  }
  document.querySelector(".popup__right__price__count-basic").innerHTML =
    priceTickets[ticketType].basic;
  document.querySelector(".popup__right__price__count-senior").innerHTML =
    priceTickets[ticketType].senior;
  sum.innerHTML = changeSum();
  document.querySelector(".popup__right__count").innerHTML = basicValue;
  document.querySelector(".popup__right__count__senior").innerHTML =
    seniorValue;
  document.querySelector(".basic__value__popup").value = basicValue;
  document.querySelector(".senior__value__popup").value = seniorValue;
}

sumTickets();

let checkinputs = document.querySelectorAll(".hasValidate").forEach((item) =>
  item.addEventListener("change", function () {
    let rule = this.dataset.rule;
    let value = this.value;
    let check = true;

    switch (rule) {
      case "name":
        if (this.value.length >= 3 && this.value.length <= 15) {
          check = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/.test(value);
        } else {
          check = false;
        }
        break;
      case "email":
        if (this.value.length >= 3 && this.value.length <= 15) {
          check =
            /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/.test(
              value
            );
        } else {
          check = false;
        }
        break;
      case "phone":
        if (this.value.length >= 6 && this.value.length <= 10) {
          check = /^[1-9]+[0-9]*$/.test(value);
        } else {
          check = false;
        }
        break;
    }
    this.classList.remove("invalid");
    this.classList.remove("valid");
    if (check) {
      this.classList.add("valid");
      if (rule === "name") {
        document.querySelector(".valid__name").style.display = "none";
      } else if (rule === "email") {
        document.querySelector(".valid__email").style.display = "none";
      } else if (rule === "phone") {
        document.querySelector(".valid__phone").style.display = "none";
      }
    } else {
      if (rule === "name") {
        document.querySelector(".valid__name").style.display = "block";
      } else if (rule === "email") {
        document.querySelector(".valid__email").style.display = "block";
      } else if (rule === "phone") {
        document.querySelector(".valid__phone").style.display = "block";
      }
      this.classList.add("invalid");
    }
  })
);

document
  .querySelectorAll(".hasValidate")
  .forEach((item) => item.addEventListener("click", deleteStar));

function deleteStar() {
  const dateStar = document.querySelector(".popup__date__style");
  const timeStar = document.querySelector(".popup__time__style");
  const nameStar = document.querySelector(".popup__block__text");
  const emailStar = document.querySelector(".popup__block__email");
  const phoneStar = document.querySelector(".popup__block__tel");
  const select = document.querySelector(".popup__select ");
  let index = document.querySelectorAll(".hasValidate").length;

  while (index) {
    if (dateStar.classList.contains("date__star")) {
      dateStar.classList.remove("date__star");
    } else if (timeStar.classList.contains("time__star")) {
      timeStar.classList.remove("time__star");
    } else if (nameStar.classList.contains("name__star")) {
      nameStar.classList.remove("name__star");
    } else if (emailStar.classList.contains("email__star")) {
      emailStar.classList.remove("email__star");
    } else if (phoneStar.classList.contains("phone__star")) {
      phoneStar.classList.remove("phone__star");
    } else if (select.classList.contains("select__star")) {
      select.classList.remove("select__star");
    }
    index--;
  }
}

console.log(`Удачи в грядущих войнах!

Score 156/160

[x] Слайдер в секции Welcome +24
[x] Слайдер в секции Video +18
[x] Кастомный видеоплеер +36
[x] Слайдер сравнения изображений в секции Explore +10
[x] Анимация при прокрутке изображений в секции Galery +8
[x] Калькулятор продажи билетов в секции Tiskets +10
[x] Калькулятор продажи билетов в форме продажи билетов +14
[x] Валидация формы +14
[x] Интерактивная карта в секции Contacts +12
[x] Дополнительный функционал +10
- Дополнительный функционал заключается в всплывающих окнах при нажатии на картины в секции gallery. Так же была добавлена подстветка и scale(1.1) к картинам, для видимости, что на картину можно нажать. Так же добавлена подсказка по секции gallery, которая убирается при клике по ней. Добавлен preloader на сайт
`);
