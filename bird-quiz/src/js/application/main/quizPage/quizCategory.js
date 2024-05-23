import { Control } from "../../../common/control";
import { state } from "../../../common/state";
import { DATA } from "../../../data/data";

export class Category extends Control {
    onSwitchCategory;
    constructor(parentNode, category = 0) {
        super(parentNode, 'div', 'quiz_category', '');

        DATA.category.forEach((it, index) => {
            const categoryItem = new Control(this.node, 'div', 'quiz_category_item', `${it}`);
            if (category === index) {
                categoryItem.node.style.background = 'rgb(83, 155, 245)';
            } else {
                categoryItem.node.style.background = '#a27af3';
            }
            categoryItem.node.onclick = () => {
                state.category = index;
                this.onSwitchCategory(index);
            }
        })
    }
}