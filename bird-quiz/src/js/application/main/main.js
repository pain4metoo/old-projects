import { Control } from "../../common/control";
import { WelcomePage } from "./welcomePage/welcomePage";
import { QuizPage } from "./quizPage/quizPage";
import { ScorePage } from "./scorePage/scorePage";
import { GalleryPage } from "./galleryPage/galleryPage";

export class Main extends Control {
    onStartQuiz;
    constructor(parentNode, screen = 'Об игре') {
        super(parentNode, 'div', 'main_inner', '');

        switch (screen) {
            case 'Об игре':
                const newWelcomePage = new WelcomePage(this.node)
                newWelcomePage.onStartQuiz = (screen) => {
                    this.onStartQuiz(screen);
                }
                break;
            case 'Викторина':
                const newQuizPage = new QuizPage(this.node);
                break;
            case 'Очки':
                const newScorePage = new ScorePage(this.node);
                break;
            case 'Галерея':
                const newGalleryPage = new GalleryPage(this.node);
                break;
            default:
                return
        }
    }
}