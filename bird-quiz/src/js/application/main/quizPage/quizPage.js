import { Control } from "../../../common/control";
import { DATA } from "../../../data/data";
import { Answer } from "./quizAnswer";
import { Category } from "./quizCategory";
import { ListenMenu } from "./quizListenMenu";
import { Questions } from "./quizQuestions";
import { generateLogicGame } from "./generateGameLogic";
import { isTrueAnswer } from "./isTrueAnswer";
import { state } from "../../../common/state";

export class QuizPage extends Control {
    constructor(parentNode) {
        super(parentNode, 'div', 'quiz', '');

        this.createQuizPageInner(this.node);
    }

    createQuizPageInner(quizNode, category = 0) {
        Array.from(quizNode.children).forEach(it => {
            it.remove()
        })

        generateLogicGame(category);

        const quizCategory = new Category(quizNode, category);
        quizCategory.onSwitchCategory = (index) => {
            state.warmup.answers = [];
            if (index) {
                state.warmup.isWarmup = false;
            } else {
                state.warmup.isWarmup = true;
                state.warmup.warmupAnswers = [];
            }
            state.warmup.category = index;
            if (state.warmup.isWarmup) {
                state.warmup.categoryResults[category].score = 0;
            }
            this.createQuizPageInner(quizNode, index);
        }

        const quizListenMenu = new ListenMenu(quizNode, category);
        const gameInner = new Control(quizNode, 'div', 'quiz_menu', '');
        const quizQuestions = new Questions(gameInner, quizNode, category);
        quizQuestions.onRestart = () => {
            state.warmup.answers = [];
            state.warmup.categoryResults[category].answers = [];
            state.warmup.categoryResults[category].score = 0;
            this.createQuizPageInner(quizNode, state.warmup.category);
        }

        quizQuestions.onWarmup = () => {
            state.warmup.score = 0;
            state.warmup.category = 0;
            state.warmup.isWarmup = true;
            this.createQuizPageInner(quizNode, state.warmup.category);
        }
        const quizAnswer = new Answer(gameInner);

        const btnNextLevel = new Control(quizNode, 'button', 'quiz_btn_next', 'Следующий вопрос');
        btnNextLevel.node.onclick = () => {
            if (isTrueAnswer()) {
                this.createQuizPageInner(quizNode, state.warmup.category);
            }
        }
    }
}