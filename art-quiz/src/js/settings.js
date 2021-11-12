const volumeProgress = document.querySelector(".settings__range");
const volumeOff = document.querySelector(".settings__volume__off");
const volumeOn = document.querySelector(".settings__volume__on");
const language = document.querySelector(".settings__language");
const timeGame = document.querySelector(".settings__time__check");
const secValue = document.querySelector(".settings__answer");
const resetSettings = document.querySelector(".settings__default");
const saveSettings = document.querySelector(".settings__save");

const btnLang = document.getElementById("lang");
btnLang.addEventListener("click", changeLang);

const btnTime = document.getElementById("time");
btnTime.addEventListener("click", changeTime);

function changeLang() {
  if (!btnLang.classList.contains("active-settings")) {
    btnLang.classList.add("active-settings");
    document.querySelector(".settings__language__text").textContent = "Ру";
  } else {
    document.querySelector(".settings__language__text").textContent = "En";
    btnLang.classList.remove("active-settings");
  }
}

function changeTime() {
  if (!btnTime.classList.contains("active-settings")) {
    btnTime.classList.add("active-settings");
    document.querySelector(".settings__time__text").textContent = "On";
  } else {
    document.querySelector(".settings__time__text").textContent = "Off";
    btnTime.classList.remove("active-settings");
  }
}

function volumeLine() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #ffbca2 0%, #ffbca2 ${value}%, #fff ${value}%, white 100%)`;
}

function volumeZero() {
  let value = volumeProgress.value;
  console.log(value);
  if (value > 1) {
    value = 0;
    volumeProgress.style.fill = "red";
    volumeProgress.style.background = `linear-gradient(to right, #ffbca2 0%, #ffbca2 0%, #fff 0%, white 100%)`;
    volumeProgress.value = 0;
  } else if (value === 1) {
    value = 40;
    volumeProgress.style.fill = "red";
    volumeProgress.style.background = `linear-gradient(to right, #ffbca2 40%, #ffbca2 40%, #fff 0%, white 100%)`;
    volumeProgress.value = 0;
  }
}

function volumeOffF() {}

function volumeOnF() {}

volumeOff.addEventListener("click", volumeZero);
volumeOn.addEventListener("click", volumeZero);
volumeProgress.addEventListener("input", volumeLine);
