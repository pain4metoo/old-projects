import { Control } from "../common/control";
import { Header } from "./header/header";
import { Main } from "./main/main";
import { Footer } from "./footer/footer";


export class App extends Control {
    constructor(parentNode) {
        super(parentNode, 'div', 'wrapper', '');
        const header = new Header(this.node);
        const main = new Control(this.node, 'main', 'main', '');
        const footer = new Footer(this.node);

        this.mainCycle(header, main);
    }

    mainCycle(header, main, screen) {
        const mainInner = new Main(main.node, screen);

        mainInner.onStartQuiz = (screen) => {
            mainInner.destroy();
            this.mainCycle(header, main, screen);
        }

        header.onMenuSwitcher = (screen) => {
            mainInner.destroy();
            this.mainCycle(header, main, screen);
        }
    }
}