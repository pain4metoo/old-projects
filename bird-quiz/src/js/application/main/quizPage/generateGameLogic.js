import { state } from "../../../common/state";
import { DATA } from "../../../data/data";

export function generateLogicGame(category) {
    let answers = state.warmup.answers;
    let questions = state.warmup.questions = [];
    const categoryCount = 6;
    const birdsCount = 6;
    let correctAnswer = generateRightAnswer(answers, category);

    for (let i = 0; i < birdsCount; i++) {
        generateQuestions(questions, answers);
    }

    state.warmup.trueAnswer = insertCorrectAnswer(questions, correctAnswer);

    function insertCorrectAnswer(questions, correctAnswer) {
        if (questions.includes(correctAnswer)) {
            return correctAnswer;
        } else {
            let randomNumber = Math.floor(Math.random() * birdsCount);
            questions[randomNumber] = correctAnswer;
            return correctAnswer;
        }
    }

    function generateRightAnswer(answers, category) {
        let categoryString = String(category);
        let randomAnswer = Math.floor(Math.random() * birdsCount);
        let randomCategory = state.warmup.isWarmup ? Math.floor(Math.random() * categoryCount) : state.warmup.category;
        let bird = DATA.birds[randomCategory][randomAnswer].name;
        if (answers.includes(bird)) {
            let currentCategory = DATA.birds[randomCategory];
            for (let i = 0; i < currentCategory.length; i++) {
                if (!answers.includes(currentCategory[i].name)) {
                    state.warmup.bird = currentCategory[i];
                    return currentCategory[i].name
                } else {
                    if (i === currentCategory.length - 1) {
                        return bird;
                    }
                }
            }
        }

        state.warmup.bird = DATA.birds[randomCategory][randomAnswer];
        return bird
    }

    function generateQuestions(questions) {
        let randomAnswer = Math.floor(Math.random() * birdsCount);
        let randomCategory = state.warmup.isWarmup ? Math.floor(Math.random() * categoryCount) : state.warmup.category;
        let bird = DATA.birds[randomCategory][randomAnswer].name;
        if (questions.includes(bird)) {
            generateQuestions(questions);
        } else {
            questions.push(bird);
        }
        return questions
    }

}