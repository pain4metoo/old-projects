import { Control } from "../../../common/control";
import { state } from "../../../common/state";
import { DATA } from "../../../data/data";

export class CategoryEnd extends Control {
    onRestart;
    onWarmup;
    constructor(quizNode) {
        super(quizNode, 'div', 'quiz_category_end_popup', '');

        const categoryEndInner = new Control(this.node, 'div', 'quiz_category_end_inner', '');
        const categoryEndText = new Control(categoryEndInner.node, 'p', 'quiz_category_end_text', `Вы завершили категорию "${DATA.category[state.warmup.category]}"`);
        const categoryEndScore = new Control(categoryEndInner.node, 'p', 'quiz_category_end_score', `С результатом ${state.warmup.categoryResults[state.warmup.category].score} из 30 очков`)
        const categoryEndBtnInner = new Control(categoryEndInner.node, 'div', 'quiz_category_btn_inner', '');
        const categoryEndBtnRestart = new Control(categoryEndBtnInner.node, 'button', 'quiz_category_end_btn', 'Рестарт категории');
        const categoryEndBtnWarmup = new Control(categoryEndBtnInner.node, 'button', 'quiz_category_end_btn', 'Перейти к разминке');

        categoryEndBtnRestart.node.onclick = () => this.onRestart();
        categoryEndBtnWarmup.node.onclick = () => this.onWarmup();
    }
}