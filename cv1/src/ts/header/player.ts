const showPlayer: HTMLInputElement | null = document.querySelector(
  ".header_video_block"
);
const videoInner: HTMLInputElement | null = document.querySelector(".video");
const video = document.querySelector(".video_main") as HTMLVideoElement | null;
const videoControls: HTMLInputElement | null =
  document.querySelector(".video_controls");
const btnClose: HTMLInputElement | null =
  document.querySelector(".video_btn_close");
const btnPlayMini: HTMLInputElement | null = document.querySelector(
  ".video_control_play"
);
const btnPauseMini: HTMLInputElement | null = document.querySelector(
  ".video_control_pause"
);
const btnPlayLarge: HTMLInputElement | null =
  document.querySelector(".video_btn_play");
const progressBlock: HTMLInputElement | null = document.querySelector(
  ".video_control_progress"
);
const progress: HTMLInputElement | null = document.querySelector(
  ".video_control_line"
);
const progressDumb: HTMLInputElement | null = document.querySelector(
  ".video_control_marker"
);
const btnSound: HTMLInputElement | null = document.querySelector(
  ".video_control_sound"
);
const volume: HTMLInputElement | any = <HTMLAudioElement>(
  document.querySelector(".video_control_volume")
);
const btnFullL: HTMLInputElement | null = document.querySelector(
  ".video_control_full"
);
const videoBg: HTMLInputElement | null = document.querySelector(
  ".header_video_inner"
);

window.onload = function () {
  if (video) {
    video.volume = 0.4;
  } else {
    throw new Error("Object is possibly 'null'");
  }
};
const showVideo = () => {
  videoInner?.classList.remove("video_hiden");
};

const closeVideo = () => {
  videoInner?.classList.add("video_hiden");
  stopVideo();
  if (document.fullscreenElement) {
    fullScreen();
  }
};

const playVideo = () => {
  video?.play();
  if (btnPlayMini && btnPauseMini && btnPlayLarge) {
    btnPlayMini.style.display = "none";
    btnPauseMini.style.display = "block";
    btnPlayLarge.style.display = "none";
  } else {
    throw new Error("Object is possibly 'null'");
  }
};

const stopVideo = () => {
  video?.pause();
  if (btnPauseMini && btnPlayMini && btnPlayLarge) {
    btnPauseMini.style.display = "none";
    btnPlayMini.style.display = "block";
    btnPlayLarge.style.display = "block";
  } else {
    throw new Error("Object is possibly 'null'");
  }
};

const progresVideo = () => {
  if (progress && video && progressBlock && progressDumb) {
    const progressLine: number =
      (video.currentTime / video.duration) * progressBlock.clientWidth;
    progress.style.width = `${progressLine}px`;
    progressDumb.style.transform = `translateX(${progressLine}px)`;
  } else {
    throw new Error("Object is possibly 'null'");
  }
  if (video?.currentTime === video?.duration) {
    stopVideo();
  }
};

const fullScreen = () => {
  if (!document.fullscreenElement) {
    videoInner?.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const setProgress = (e) => {
  let width: number | any = progressBlock?.clientWidth;
  let pos = e.offsetX;
  e.value = (100 * pos) / width;
  if (video && progressDumb) {
    video.currentTime = video.duration * (pos / width);
  } else {
    throw new Error("Object is possibly 'null'");
  }
};

const toggleVolume = () => {
  if (video?.volume !== 0) {
    localStorage.setItem("prevVolume", JSON.stringify(video?.volume));
  }
  if (video) {
    let getVolume: number = JSON.parse(
      localStorage.getItem("prevVolume") || ""
    );
    if (video.volume === 0) {
      btnSound?.classList.remove("video_control_sound_off");
      volume.value = getVolume * 100;
      video.volume = getVolume;
      volume.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${volume.value}%, rgba(210, 108, 213, 0.5) ${volume.value}%, rgba(210, 108, 213, 0.5))`;
    } else {
      btnSound?.classList.add("video_control_sound_off");
      video.volume = 0;
      volume.value = 0;
      volume.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff 0%, rgba(210, 108, 213, 0.5) 0%, rgba(210, 108, 213, 0.5))`;
    }
  }
};

function setVolume(this: any) {
  const value = this.value;
  if (video && volume) {
    let videoVolume: number = value / 100;
    if (videoVolume > 0) {
      btnSound?.classList.remove("video_control_sound_off");
    } else {
      btnSound?.classList.add("video_control_sound_off");
    }
    video.volume = videoVolume;
    volume.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${
      videoVolume * 100
    }%, rgba(210, 108, 213, 0.5) ${
      videoVolume * 100
    }%, rgba(210, 108, 213, 0.5))`;
  }
}

(function timeUpdate() {
  if (video) {
    video.ontimeupdate = progresVideo;
  } else {
    throw new Error("Object is possibly 'null'");
  }
})();

video?.addEventListener("click", () => {
  if (video.paused) {
    playVideo();
  } else {
    stopVideo();
  }
});

videoInner?.addEventListener("click", (e) => {
  let target = e.target;
  if (target === videoInner) {
    closeVideo();
  }
});

volume?.addEventListener("input", setVolume);
btnSound?.addEventListener("click", toggleVolume);
progressBlock?.addEventListener("click", setProgress);
btnPlayLarge?.addEventListener("click", playVideo);
btnPauseMini?.addEventListener("click", stopVideo);
btnPlayMini?.addEventListener("click", playVideo);
btnClose?.addEventListener("click", closeVideo);
showPlayer?.addEventListener("click", showVideo);
btnFullL?.addEventListener("click", fullScreen);
