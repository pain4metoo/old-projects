const arrowLeft = document.querySelector(".video__arrow-left");
const arrowRight = document.querySelector(".video__arrow-right");
const source = document.getElementById("video__src");
const btnLeft = document.querySelector(".video__btn__left");
const btnRight = document.querySelector(".video__btn__right");
const theme = document.getElementById("theme");

const video = document.querySelector(".video__inner");
const smallPlay = document.querySelector(".video__btn__mid");
const bigPlay = document.querySelector(".video__btn__play");
const pause = document.querySelector(".video__btn__img");
const videoProgress = document.querySelector(".video__line");
const volume = document.querySelector(".video__btn__volume");
const volumeOff = document.querySelector(".video__btn__volume__off");
const volumeProgress = document.querySelector(".video__volume");
const fullWindow = document.querySelector(".video__btn__window");
const skipBtn = document.querySelectorAll("[data-skip]");
const speedBlock = document.querySelector(".video__speed");
const leftBar = document.querySelector(".btn__faq");
const menu = document.querySelector(".key__inner");
const close = document.querySelector(".key__close");

function checkVolume() {
  if (video.volume > 0.01) {
    video.volume = 0;
    volumeOff.style.display = "block";
    volume.style.display = "none";
  } else if (video.volume === 0) {
    video.volume = 1;
    volumeOff.style.display = "none";
    volume.style.display = "block";
  }
}

function volumeLine() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #fff ${value}%, white 100%)`;
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
  const videoProgressLine = (video.currentTime / video.duration) * 100;
  videoProgress.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${videoProgressLine}%, #fff ${videoProgressLine}%, white 100%)`;
}

function fullScreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function setProgress() {
  let width = this.offsetWidth;
  let pos = event.offsetX;
  this.value = (100 * pos) / width;
  video.currentTime = video.duration * (pos / width);
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function showSpeed() {
  speedBlock.style.visibility = "visible";
  setTimeout(() => (speedBlock.style.visibility = ""), 500);
}

function openBar() {
  menu.classList.toggle("key__hidden");
  leftBar.classList.toggle("hidden");
}

theme.onkeypress = function (event) {
  let result = event.code;
  if (result === "Space") {
    checkVideoStatus();
  } else if (result === "KeyM") {
    checkVolume();
  } else if (result === "KeyK") {
    checkVideoStatus();
  } else if (result === "KeyF") {
    fullScreen();
  } else if (result === "KeyP") {
    ArrowLeftChange();
  } else if (result === "KeyN") {
    ArrowRightChange();
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
  console.log(result);
};

window.addEventListener("load", function () {
  setTimeout(function () {
    let preloader = document.querySelector(".preload");
    if (!preloader.classList.contains("change")) {
      preloader.classList.add("change");
    }
  }, 1000);
});

skipBtn.forEach((button) => button.addEventListener("click", skip));
close.addEventListener("click", openBar);
leftBar.addEventListener("click", openBar);
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
  "poster0.jpg",
  "poster1.jpg",
  "poster2.jpg",
  "poster3.jpg",
  "poster4.jpg",
];
const arrPostersChange = [
  "poster0-1.jpg",
  "poster0-2.jpg",
  "poster0-3.jpg",
  "poster0-4.jpg",
  "poster0-5.jpg",
];

let count = 0;

function switchVideo(numVideo) {
  source.src = `./assets/video/${arrVideo[numVideo]}`;
  video.poster = `./assets/img/${arrPosters[numVideo]}`;
  theme.style.backgroundImage = `url(./assets/img/${arrPostersChange[numVideo]})`;
}

function ArrowLeftChange() {
  if (count > 0) {
    count--;
    switchVideo(count);
    video.load();
    checkVideoStatus();
  } else {
    count = 4;
    switchVideo(count);
    video.load();
    checkVideoStatus();
  }
}

function ArrowRightChange() {
  if (count < 4) {
    count++;
    switchVideo(count);
    video.load();
    checkVideoStatus();
  } else {
    count = 0;
    switchVideo(count);
    video.load();
    checkVideoStatus();
  }
}

function btnRightChange() {
  if (count < 4) {
    count++;
    switchVideo(count);
    video.load();
    checkVideoStatus();
  } else {
    count = 0;
    switchVideo(count);
    video.load();
    checkVideoStatus();
  }
}

function btnLeftChange() {
  if (count > 0) {
    count--;
    switchVideo(count);
    video.load();
    checkVideoStatus();
  } else {
    count = 4;
    switchVideo(count);
    video.load();
    checkVideoStatus();
  }
}

arrowLeft.addEventListener("click", ArrowLeftChange);
arrowRight.addEventListener("click", ArrowRightChange);
btnLeft.addEventListener("click", btnLeftChange);
btnRight.addEventListener("click", btnRightChange);

