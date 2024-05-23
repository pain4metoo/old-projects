import { Control } from "../../common/control";

export class Footer extends Control {
    constructor(parentNode) {
        super(parentNode, 'footer', 'footer', '');

        this.createFooter(this.node);
    }

    createFooter(node) {
        const footerInner = new Control(node, 'div', 'footer_inner', '');

        const logoRs = new Control(footerInner.node, 'a', 'footer_link', '');
        logoRs.node.href = '#';
        const logoRsImg = new Control(logoRs.node, 'img', "footer_logo", '');
        logoRsImg.node.src = './assets/svg/footer_rs.svg';
        logoRsImg.node.alt = "logo rschool";


        const logoGit = new Control(footerInner.node, 'a', 'footer_link', '');
        logoGit.node.href = 'https://github.com/pain4metoo';
        logoGit.node.target = "blank";
        const logoGitImg = new Control(logoGit.node, 'img', "footer_logo", '');
        logoGitImg.node.src = './assets/images/footer_git.png';
        logoGitImg.node.alt = "logo github";
    }
}