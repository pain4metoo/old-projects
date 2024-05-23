import { Control } from "../../../common/control";
import { state } from "../../../common/state";
import { DATA } from "../../../data/data";

export class Player extends Control {
    audio;
    audioProgress;
    audioMarker;
    progressBlock;
    btnPause;
    btnPlay;
    volumeProgress;
    btnVolume;
    btnVolumeOff;
    constructor(parentNode) {
        super(parentNode.node, 'div', 'quiz_player', '')

        const audio = new Control(this.node, 'audio', '', '');
        
        audio.node.src = state.warmup.bird.audio;
        audio.node.volume = 0.4;
        this.audio = audio.node;

        const playerInnerLeft = new Control(this.node, 'div', 'quiz_player_left', '');

        const playerBtnPlay = new Control(playerInnerLeft.node, 'img', 'quiz_player_btn_play', '');
        playerBtnPlay.node.src = './assets/images/play.png';
        this.btnPlay = playerBtnPlay.node;

        playerBtnPlay.node.onclick = () => {
            this.toggleAudio(audio.node, true);
        }

        const playerBtnPause = new Control(playerInnerLeft.node, 'img', 'quiz_player_btn_pause', '');
        playerBtnPause.node.src = './assets/images/pause.png';
        this.btnPause = playerBtnPause.node;
        playerBtnPause.node.onclick = () => {
            this.toggleAudio(audio.node, false);
        }

        const playerProgress = new Control(playerInnerLeft.node, 'div', 'quiz_player_progress_inner', '');
        this.progressBlock = playerProgress.node;
        const playerMarker = new Control(playerProgress.node, 'span', 'quiz_player_marker', '');
        this.audioMarker = playerMarker.node;
        const playerLine = new Control(playerProgress.node, 'span', 'quiz_player_line', '');
        this.audioProgress = playerLine.node;

        const playerInnerRight = new Control(this.node, 'div', 'quiz_player_right', '');

        const playerBtnVolume = new Control(playerInnerRight.node, 'img', 'quiz_player_btn_volume', '');
        playerBtnVolume.node.src = './assets/images/sound.png';
        this.btnVolume = playerBtnVolume.node;
        playerBtnVolume.node.onclick = () => {
            this.toggleVolume(audio.node, true);
        }
        const playerBtnVolumeOff = new Control(playerInnerRight.node, 'img', 'quiz_player_btn_volume_off', '');
        playerBtnVolumeOff.node.src = './assets/images/sound-off.png';
        this.btnVolumeOff = playerBtnVolumeOff.node;
        playerBtnVolumeOff.node.onclick = () => {
            this.toggleVolume(audio.node, false);
        }

        const playerVolumeProgress = new Control(playerInnerRight.node, 'input', 'quiz_player_volume', '');
        this.volumeProgress = playerVolumeProgress.node;
        this.volumeProgress.oninput = (el) => {
            this.changeVolume(el.target);
        }
        playerVolumeProgress.node.type = 'range';
        playerVolumeProgress.node.min = 0;
        playerVolumeProgress.node.max = 100;
        playerVolumeProgress.node.step = 1;
        playerVolumeProgress.node.value = 40;
    }

    toggleAudio(audio, isPlay) {
        if (isPlay) {
            this.btnPlay.style.display = 'none';
            this.btnPause.style.display = 'block';
            audio.play();
            state.isPlaySound = true;
        } else {
            this.btnPlay.style.display = 'block';
            this.btnPause.style.display = 'none';
            audio.pause();
            state.isPlaySound = false;
        }
        audio.ontimeupdate = () => {
            if (state.isPlaySound && state.warmup.currentAnswer === state.warmup.trueAnswer) {
                this.toggleAudio(audio, false);
                state.warmup.currentAnswer = '';
            }
            const progressLine = (audio.currentTime / audio.duration) * this.progressBlock.clientWidth;
            this.audioProgress.style.width = `${progressLine}px`;
            this.audioMarker.style.transform = `translateX(${progressLine}px)`;
        }
    }

    changeVolume(el) {
        let value = el.value;
        let audioVolume = value / 100;
        this.audio.volume = audioVolume;
        this.volumeProgress.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${audioVolume * 100
            }%, rgba(210, 108, 213, 0.5) ${audioVolume * 100
            }%, rgba(210, 108, 213, 0.5))`;
    }

    toggleVolume(audio, isVolume) {
        if (isVolume) {
            this.btnVolume.style.display = 'none';
            this.btnVolumeOff.style.display = 'block';
        } else {
            this.btnVolume.style.display = 'block';
            this.btnVolumeOff.style.display = 'none';
        }

        if (audio.volume !== 0) {
            localStorage.setItem("prevVolume", JSON.stringify(this.audio.volume));
        }

        let getVolume = JSON.parse(localStorage.getItem("prevVolume") || "");
        if (audio.volume === 0) {
            this.volumeProgress.value = getVolume * 100;
            this.audio.volume = getVolume;
            this.volumeProgress.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${this.volumeProgress.value}%, rgba(210, 108, 213, 0.5) ${this.volumeProgress.value}%, rgba(210, 108, 213, 0.5))`;
        } else {
            this.audio.volume = 0;
            this.volumeProgress.value = 0;
            this.volumeProgress.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff 0%, rgba(210, 108, 213, 0.5) 0%, rgba(210, 108, 213, 0.5))`;
        }
    }
}
