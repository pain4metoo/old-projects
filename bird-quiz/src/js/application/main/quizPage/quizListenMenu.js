import { Control } from "../../../common/control";
import { Player } from "./quizPlayer";
import { isTrueAnswer } from "./isTrueAnswer";
import { state } from "../../../common/state";

export class ListenMenu extends Control {
    constructor(parentNode, category) {
        super(parentNode, 'div', 'quiz_listen_menu', '');

        const quizListenImg = new Control(this.node, 'img', 'quiz_listen_img', '');
        quizListenImg.node.alt = 'bird';
        quizListenImg.node.src = './assets/images/anonim_bird.jpg'

        const quizListenRightMenu = new Control(this.node, 'div', 'quiz_listen_menu_right');
        const quizListenRightTitle = new Control(quizListenRightMenu.node, 'h3', 'quiz_listen_right_title', '???');
        const quizListenRightScore = new Control(quizListenRightMenu.node, 'div', 'quiz_listen_right_score', `Очков: ${state.warmup.categoryResults[category].score}`);
        const player = new Player(quizListenRightMenu);
    }
}