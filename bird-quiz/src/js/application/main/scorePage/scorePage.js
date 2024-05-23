import { Control } from "../../../common/control";
import { state } from "../../../common/state";
import { DATA } from "../../../data/data";

export class ScorePage extends Control {
    constructor(parentNode) {
        super(parentNode, 'div', 'quiz_score', '');

        this.createscorePageInner(this.node);
    }

    createscorePageInner(scoreNode) {
        const scoreTitle = new Control(scoreNode, 'h4', 'quiz_score_title', 'Страница очков');
        const scoreInner = new Control(scoreNode, 'div', 'quiz_score_inner', '');
        DATA.category.forEach((it, index) => {
            let categoryScore = state.warmup.categoryResults[index].bestScore;
            let maxScore = 30;
            const scoreInnerBlock = new Control(scoreInner.node, 'div', 'quiz_score_block', '');
            const scoreBlockName = new Control(scoreInnerBlock.node, 'p', 'quiz_score_block_name', `${it}`)
            const scoreInnerItems = new Control(scoreInnerBlock.node, 'div', 'quiz_score_items', '');
            const scoreItemsProgress = new Control(scoreInnerItems.node, 'div', 'quiz_score_progress', '');
            scoreItemsProgress.node.style.width = `${(categoryScore / maxScore) * 100}%`;
            const scoreInnerValue = new Control(scoreInnerItems.node, 'p', 'quiz_score_value', `${categoryScore} очков`);
            if (index === 0) { // It means that it is a warmup;
                scoreItemsProgress.node.style.backgroundColor = 'transparent';
                scoreInnerValue.node.textContent = `Макс. очков за разминку - ${categoryScore}`;
            }
        })

        // const scoreInnerReset = new Control(scoreNode, 'button', 'quiz_score_btn', 'начать игру заново');
    }
}