export let trackCount;

export function wrapper() {
  document.querySelector(".select__open").addEventListener("click", () => {
    selectBody.classList.toggle("active-select");
    arrow.classList.toggle("select__arrow__change");
  });

  let playList = ["track1.mp3", "track2.mp3", "track3.mp3", "track4.mp3"];
  let imgList = ["track-1.jpg", "track-2.jpg", "track-3.jpg", "track-4.jpg"];
  let track;

  window.onload = function () {
    track = 0;
    trackCount = track;
    audio.volume = 0.4;
    current.innerHTML = document.getElementById("audio-1").innerHTML;
    document.getElementById("audio-1").style.color = "#ff2253";
    document.getElementById("audio-1").classList.add("active-track");
    songValue.innerHTML = current.innerHTML;
  };

  const current = document.querySelector(".select__current");
  const selectBody = document.querySelector(".select__body");
  const arrow = document.querySelector(".select__arrow");
  const songValue = document.querySelector(".header__song__name");
  const selectItems = document
    .querySelectorAll(".select__item")
    .forEach((item, index) =>
      item.addEventListener("click", () => {
        current.innerHTML = item.innerHTML;
        songValue.innerHTML = current.innerHTML;
        changeMusic(index);
      })
    );

  const currentTimeSec = document.querySelector(".current__time__sec");
  const currentTimeMin = document.querySelector(".current__time__min");
  const durationTime = document.querySelector(".duration__time");
  const image = document.querySelector(".header__player__img");
  const audio = document.getElementById("audio");
  const left = document.querySelector(".header__player__left");
  const play = document.querySelector(".header__player__play");
  const playProgress = document.querySelector(".header__player__progress");
  const right = document.querySelector(".header__player__right");
  const volume = document.querySelector(".header__player__volume");
  const volumeProgress = document.querySelector(
    ".header__player__volume__progress"
  );
  const progress = document.querySelector(".header__play__line");
  const pause = document.querySelector(".header__player__pause");
  const volumeOff = document.querySelector(".header__player__volume-off");

  function checkStatus() {
    if (audio.play) {
      play.style.display = "none";
      pause.style.display = "block";
    }
  }

  function audioProgress(event) {
    let width = this.offsetWidth;
    let pos = event.offsetX;
    this.value = (100 * pos) / width;
    audio.currentTime = audio.duration * (pos / width);
  }

  function changeMusic(count) {
    track = count;
    trackCount = count;
    audio.src = `./assets/audio/${playList[count]}`;
    image.src = `./assets/images/${imgList[count]}`;
    audioTime(count);
    audio.currentTime = 0;
    audio.play();
    songValue.classList.add("animation__song");
    let trackArr = document.querySelectorAll(".select__item");
    current.innerHTML = trackArr[count].innerHTML;
    songValue.innerHTML = trackArr[count].innerHTML;
    checkStatus();
    playMusic();
  }

  function volumeLine() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #ff2253 0%, #ff2253 ${value}%, #fff ${value}%, white 100%)`;
    let volumeCount = (audio.volume = volumeProgress.value / 100);
    if (volumeCount === 0) {
      volumeOff.style.display = "block";
      volume.style.display = "none";
    } else {
      volumeOff.style.display = "none";
      volume.style.display = "block";
    }
  }

  function volumeZero() {
    if (audio.volume > 0.01) {
      audio.volume = 0;
      volumeOff.style.display = "block";
      volume.style.display = "none";
      volumeProgress.style.background = `linear-gradient(to right, #ff2253 0%, #ff2253 0%, #fff 10%, white 100%)`;
      volumeProgress.value = 0;
    } else if (audio.volume === 0) {
      audio.volume = 0.4;
      volumeOff.style.display = "none";
      volume.style.display = "block";
      volumeProgress.value = 40;
      volumeProgress.style.background = `linear-gradient(to right, #ff2253 0%, #ff2253 40%, #fff 10%, white 100%)`;
    }
  }

  function audioTime(count) {
    let timeDuration;
    if (count === 0) {
      timeDuration = "2:22";
    }
    if (count === 1) {
      timeDuration = "2:33";
    }
    if (count === 2) {
      timeDuration = "4:29";
    }
    if (count === 3) {
      timeDuration = "2:58";
    }
    let deleteColor = document.querySelectorAll(".select__item");

    for (let i = 0; i < deleteColor.length; i++) {
      if (i === count) {
        deleteColor[i].classList.add("active-track");
        deleteColor[i].style.color = "#ff2253";
      } else {
        deleteColor[i].classList.remove("active-track");
        deleteColor[i].style.color = "white";
      }
    }
    durationTime.innerHTML = timeDuration;
  }

  function playMusic() {
    audio.play();
    checkStatus();

    songValue.classList.add("animation__song");
  }

  function audioLine() {
    let time = Math.round(audio.currentTime);
    let length = Math.round(audio.duration);
    progress.style.width = (time * 100) / length + "%";

    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    if (sec < 10) {
      currentTimeSec.innerHTML = `0${sec}`;
    } else if (sec > 9) {
      currentTimeSec.innerHTML = sec;
    }
    currentTimeMin.innerHTML = min;

    if (time === length && track < 3) {
      track++;
      changeMusic(track);
    }
    if (time === length && track > 3) {
      track = 0;
      changeMusic(track);
    }
  }

  function stopMusic() {
    audio.pause();
    play.style.display = "block";
    pause.style.display = "none";
    songValue.classList.remove("animation__song");
  }

  function nextTrack() {
    if (track < 3) {
      track++;
      changeMusic(track);
    } else {
      track = 0;
      changeMusic(track);
    }
  }

  function prevTrack() {
    if (track !== 0 && track < 4) {
      track--;
      changeMusic(track);
    } else {
      track = 3;
      changeMusic(track);
    }
  }

  audio.addEventListener("timeupdate", audioLine);
  volumeOff.addEventListener("click", volumeZero);
  volume.addEventListener("click", volumeZero);
  left.addEventListener("click", prevTrack);
  play.addEventListener("click", playMusic);
  right.addEventListener("click", nextTrack);
  playProgress.addEventListener("click", audioProgress);
  pause.addEventListener("click", stopMusic);
  volumeProgress.addEventListener("input", volumeLine);
}
