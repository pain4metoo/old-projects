import { Control } from "../../../common/control";
import { Player } from "./quizPlayer";

export class Answer extends Control {
    constructor(parentNode) {
        super(parentNode.node, 'div', 'quiz_answer', '');

        const answerMenuHide = new Control(this.node, 'div', 'quiz_answer_hide', '');
        const answerText = new Control(this.node, 'p', 'quiz_answer_text', 'Прослушайте аудио и выберите птицу из списка:');
        const answerMenuInner = new Control(answerMenuHide.node, 'div', 'quiz_answer_inner', '');

        const answerMenuImg = new Control(answerMenuInner.node, 'img', 'quiz_answer_img', '');
        answerMenuImg.node.src = './assets/images/anonim_bird.jpg';
        const answerMenuInfo = new Control(answerMenuInner.node, 'div', 'quiz_answer_info', '');
        const answerMenuInfoName = new Control(answerMenuInfo.node, 'p', 'quiz_answer_name', 'Name of the Bird');
        const answerMenuInfoType = new Control(answerMenuInfo.node, 'p', 'quiz_answer_type', 'Type of the Bird');
        const answerDescription = new Control(answerMenuHide.node, 'p', 'quiz_answer_description', '');
        const answerMenuPlayer = new Control(answerMenuInfo.node, 'div', 'quiz_answer_player', '');
        const playerAnswer = new Player(answerMenuPlayer);
    }
}