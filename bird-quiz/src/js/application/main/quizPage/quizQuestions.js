import { Control } from "../../../common/control";
import { DATA } from "../../../data/data";
import { state } from "../../../common/state";
import { isTrueAnswer } from "./isTrueAnswer";
import { ListenMenu } from "./quizListenMenu";
import { CategoryEnd } from "./categoryEnd";

export class Questions extends Control {
    onRestart = () => { };
    onWarmup = () => { };
    constructor(parentNode, quizNode, category) {
        super(parentNode.node, 'div', 'quiz_quest', '');

        state.warmup.wrongCount = 0;
        state.warmup.currentAnswer = 'none';
        const audioLose = new Control(quizNode, 'audio', '', '');
        const audioWin = new Control(quizNode, 'audio', '', '');

        if (category && state.warmup.categoryResults[category].answers.length === 6) { // 6 if this doesn't warmup
            this.checkScore(quizNode, category);
        }
        const restartCategory = () => this.onRestart();
        const goWarmup = () => this.onWarmup();

        DATA.birds.forEach((it, index) => {
            state.warmup.currentAnswers = [];
            const questMenuItem = new Control(this.node, 'div', 'quiz_quest_item', index);
            questMenuItem.node.textContent = state.warmup.questions[index];

            questMenuItem.node.onclick = function () {
                let trueAnswer = state.warmup.trueAnswer;
                let answer = this.textContent;
                state.warmup.currentAnswer = answer;
                if (!state.warmup.currentAnswers.includes(answer)) {
                    state.warmup.currentAnswers.push(answer);
                } else {
                    return
                }

                if (state.warmup.answers.includes(trueAnswer)) {
                    if (!state.warmup.isWarmup) {
                        return
                    } else {
                        if (state.warmup.warmupAnswers.includes(trueAnswer)) {
                            return
                        }
                    }
                }

                if (trueAnswer === answer) {
                    if (!state.warmup.warmupAnswers.includes(trueAnswer)) {
                        state.warmup.warmupAnswers.push(trueAnswer);
                    }
                    state.warmup.answers.push(trueAnswer);
                    if (!state.warmup.allRightAnswers.includes(trueAnswer)) {
                        state.warmup.allRightAnswers.push(trueAnswer);
                    }
                    const listenMenu = quizNode.children[1].children;
                    const btnNext = quizNode.children[5];
                    updateCurrentScore()

                    btnNext.style.backgroundColor = '#7cc0bb';
                    const listenMenuImg = listenMenu[0].src = state.warmup.bird.image;
                    const listenMenuTitle = listenMenu[1].children[0].textContent = state.warmup.bird.name;

                    const answerMenu = quizNode.children[2].children[1].children;

                    const answerMenuInner = answerMenu[0].style.display = 'block';
                    const answerMenuText = answerMenu[1].style.display = 'none';
                    const answerMenuImg = answerMenu[0].children[0].children[0].src = state.warmup.bird.image;
                    const answerMenuName = answerMenu[0].children[0].children[1].children[0].textContent = state.warmup.bird.name;
                    const answerMenuType = answerMenu[0].children[0].children[1].children[1].textContent = state.warmup.bird.species;
                    const answerMenuDescription = quizNode.children[2].children[1].children[0].children[1].textContent = state.warmup.bird.description;

                    answerSound(audioLose.node, false);
                    answerColor(questMenuItem.node, false)

                    const listenScore = quizNode.children[1].children[1].children[1];
                    listenScore.textContent = `Очков: ${state.warmup.categoryResults[category].score}`;

                    return;

                } else {
                    state.warmup.wrongCount += state.warmup.wrongCount >= 5 ? 0 : 1;
                    answerColor(questMenuItem.node, true);
                    answerSound(audioLose.node, true);

                    return;
                }

                function updateCurrentScore() {
                    let categoryResults = state.warmup.categoryResults[category];
                    if (!state.warmup.isWarmup) {

                        if (!categoryResults.answers.includes(trueAnswer)) {
                            categoryResults.answers.push(trueAnswer);
                            categoryResults.score += 5 - state.warmup.wrongCount;

                            if (categoryResults.answers.length === 6) {
                                answerSound(audioWin.node, false);
                                answerColor(questMenuItem.node, true);
                                const endCategory = new CategoryEnd(quizNode);

                                if (categoryResults.score > categoryResults.bestScore) {
                                    categoryResults.bestScore = categoryResults.score;
                                }

                                endCategory.onRestart = () => restartCategory();
                                endCategory.onWarmup = () => goWarmup();
                            }
                        }
                    } else {
                        categoryResults.score += 5 - state.warmup.wrongCount;

                        if (categoryResults.score > categoryResults.bestScore) {
                            categoryResults.bestScore = categoryResults.score;
                        }
                    }
                }
                function answerSound(audioNode, isWrong) {
                    if (isWrong) {
                        audioNode.src = './assets/sounds/false.mp3';
                        audioNode.volume = 0.1;
                        audioNode.play();
                    } else {
                        audioNode.src = './assets/sounds/true.mp3'
                        audioNode.volume = 0.1;
                        audioNode.play();
                    }
                }

                function answerColor(questMenuItem, isWrong) {
                    if (isWrong) {
                        questMenuItem.style.backgroundColor = '#ce6456';
                    } else {
                        questMenuItem.style.backgroundColor = '#7cc0bb'
                    }

                }
            };
        })
    }

    checkScore(quizNode, category) {
        const endCategory = new CategoryEnd(quizNode);
        endCategory.onRestart = () => {
            state.warmup.categoryResults[category].answers = [];
            state.warmup.categoryResults[category].score = 0;
            this.onRestart();
        };
        endCategory.onWarmup = () => this.onWarmup();
    }


}