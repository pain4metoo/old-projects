export const state = {
    warmup: {
        isWarmup: true,
        warmupAnswers: [],
        category: 0,
        questions: [], // current list of the questions.
        trueAnswer: 'empty',
        currentAnswer: 'none',
        answers: [], // current Answers.
        bird: {}, // current Bird.
        isPlaySound: false, // The sound plays at the moment?
        wrongCount: 0,
        allRightAnswers: [],
        currentAnswers: [],
        categoryResults: [ // The index elem it is a number category;
            {
                answers: [],
                score: 0,
                bestScore: 0,
            },
            {
                answers: [],
                score: 0,
                bestScore: 0,
            },
            {
                answers: [],
                score: 0,
                bestScore: 0,
            },
            {
                answers: [],
                score: 0,
                bestScore: 0,
            },
            {
                answers: [],
                score: 0,
                bestScore: 0,
            },
            {
                answers: [],
                score: 0,
                bestScore: 0,
            }
        ],
    },
}