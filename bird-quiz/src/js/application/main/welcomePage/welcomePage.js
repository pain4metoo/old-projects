import { Control } from "../../../common/control";
import { DATA } from "../../../data/data";

export class WelcomePage extends Control {
    onStartQuiz;
    constructor(parentNode) {
        super(parentNode, 'div', 'welcome', '');

        DATA.welcomeInfo.forEach((it, index) => {
            const welcomeText = new Control(this.node, `h${index + 1}`, `welcome_title_${index + 1}`, it);
        })

        DATA.welcomeRules.forEach((it) => {
            const welcomeRule = new Control(this.node, 'li', 'welcome_rule', it);
        })

        const btnStartQuiz = new Control(this.node, 'button', 'welcome_btn', 'Начать игру');
        btnStartQuiz.node.onclick = () => this.onStartQuiz('Викторина');
    }
}