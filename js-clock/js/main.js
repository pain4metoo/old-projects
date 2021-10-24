window.addEventListener("load", function () {
  setTimeout(function () {
    let preloader = document.querySelector(".preload");
    if (!preloader.classList.contains("change")) {
      preloader.classList.add("change");
    }
  }, 1000);
});

let hour = document.querySelector(".clock__hour");
let min = document.querySelector(".clock__min");
let sec = document.querySelector(".clock__sec");

function goClock() {
  let date = new Date();

  const fixSec = date.getSeconds();
  const hh = date.getHours() * 30 + date.getMinutes() / 2 + 90;
  const mn = date.getMinutes() * 6 + 90;
  const ss = date.getSeconds() * 6 + 90;

  hour.style.transform = `rotate(${hh}deg)`;
  min.style.transform = `rotate(${mn}deg)`;
  sec.style.transform = `rotate(${ss}deg)`;
  if (fixSec === 0) {
    sec.style.transitionDuration = "0.01s";
  } else if (fixSec === 1) {
    sec.style.transitionDuration = "1s";
  }
}

setInterval(goClock, 1000);

function digital() {
  let date = new Date();

  let digitalSec = date.getSeconds();
  document.querySelector(".digital__sec").innerHTML = digitalSec;
  if (digitalSec < 10) {
    document.querySelector(".digital__sec").innerHTML = `0${digitalSec}`;
  }
  let digitalRadiusSec = document.querySelector(".digital__circle__sec");
  let changeBorderSec = (digitalSec / 70) * 360;
  digitalRadiusSec.style.strokeDasharray = `${changeBorderSec}, 314`;

  let digitalMin = date.getMinutes();
  document.querySelector(".digital__min").innerHTML = digitalMin;
  if (digitalMin < 10) {
    document.querySelector(".digital__min").innerHTML = `0${digitalMin}`;
  }
  let digitalRadiusMin = document.querySelector(".digital__circle__min");
  let changeBorderMin = (digitalMin / 70) * 360;
  digitalRadiusMin.style.strokeDasharray = `${changeBorderMin}, 314`;

  let digitalHour = date.getHours();
  document.querySelector(".digital__hour").innerHTML = digitalHour;
  if (digitalHour < 10) {
    document.querySelector(".digital__hour").innerHTML = `0${digitalHour}`;
  }
  let digitalRadiusHour = document.querySelector(".digital__circle__hour");
  let changeBorderHour = (digitalMin / 70) * 360;
  digitalRadiusHour.style.strokeDasharray = `${changeBorderHour}, 314`;
}

setInterval(digital, 1000);

function data() {
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

  const date = new Date();

  let dayOfWeek = date.getDay();
  if (dayOfWeek === 0) {
    document.querySelector(".data__name").innerHTML = daysWeek[6];
  } else {
    document.querySelector(".data__name").innerHTML = daysWeek[dayOfWeek - 1];
  }

  let countOfMonth = date.getDate();
  document.querySelector(".data__count").innerHTML = `, ${countOfMonth}`;

  let month = date.getMonth();
  document.querySelector(".data__month").innerHTML = `${monthArr[month]}`;

  let year = date.getFullYear();
  document.querySelector(".data__year").innerHTML = `${year}`;
}

data();

let dark = document.getElementById("dark");

dark.onclick = function () {
  let theme = document.getElementById("theme");

  if (theme.getAttribute("href") === "css/style.css") {
    theme.href = "css/dark.css";
    dark.innerHTML = "Light theme";
  } else if (theme.getAttribute("href") === "css/dark.css") {
    dark.innerHTML = "Dark theme";
    theme.href = "css/style.css";
  }
};

let music = document.querySelector(".music");
let progress = document.querySelector(".audio__time");
let play = document.querySelector(".audio__play");
let pause = document.querySelector(".audio__pause");
let prev = document.querySelector(".audio__prev");
let next = document.querySelector(".audio__next");

let playlist = ["track1.mp3", "track2.mp3", "track3.mp3", "track4.mp3"];

let track;

window.onload = function () {
  track = 0;
};

function switchTrack(numTrack) {
  music.src = "../js-clock/assets/audio/" + playlist[numTrack];
  music.currentTime = 0;
  music.play();
}

play.addEventListener("click", function () {
  music.play();
  musicPlay = setInterval(function () {
    let audioProgress = Math.round(music.currentTime);
    let audioLength = Math.round(music.duration);
    progress.style.width = (audioProgress * 100) / audioLength + "%";
    if (audioProgress === audioLength && track < 3) {
      track++;
      switchTrack(track);
    } else if (audioProgress === audioLength && track >= 3) {
      track = 0;
      switchTrack(track);
    }
  }, 10);
});

pause.addEventListener("click", function () {
  music.pause();
  clearInterval(musicPlay);
});

prev.addEventListener("click", function () {
  if (track > 0) {
    track--;
    switchTrack(track);
  } else {
    track = 3;
    switchTrack(track);
  }
});

next.addEventListener("click", function () {
  if (track < 3) {
    track++;
    switchTrack(track);
  } else {
    track = 0;
    switchTrack(track);
  }
});

console.log(
  `Первый этап: Повторить исходный проект (10/10)\n\nВторой этап: Обязательный дополнительный фукционал (10/10)\n\n[x] точное время (часы минуты и секунды)\n[x] полное название дня недели\n[x] дату (число и название месяца)\n[x] год\n  \nТретий этап: Дополнительный функционал на выбор(27/30)\n\n[x] Круговые диаграммы для часов минут и секунд (9/10)\n[x] Возможность переключать тёмную светлую тему (10/10)\n[x] Миниатюрный аудиоплеер для прослушивания музыки (8/10)\n\n Score: (30/30)`
);
