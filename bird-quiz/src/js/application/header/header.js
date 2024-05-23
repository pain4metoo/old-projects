import { Control } from "../../common/control";
import { DATA } from "../../data/data";

export class Header extends Control {
    onMenuSwitcher;
    constructor(parentNode) {
        super(parentNode, 'header', 'header', '');

        this.createHeaderInner(this.node, parentNode);
    }

    createHeaderInner(node, parentNode) {
        const headerInner = new Control(node, 'div', 'header_inner', '');

        const logo = new Control(headerInner.node, 'img', 'header_logo', '');
        logo.node.src = "./assets/svg/logo.svg";
        logo.node.alt = "image logo";


        const navMenu = new Control(headerInner.node, 'nav', 'header_nav', '');
        const navList = new Control(navMenu.node, 'ul', 'header_nav_items', '');

        const windowInnerWidth = document.documentElement.clientWidth;

        if (windowInnerWidth <= 660) {
            this.toggleBurgerMenu(headerInner.node, navMenu, parentNode);
        }


        DATA.navMenu.forEach((it, i) => {
            const navListItem = new Control(navList.node, 'li', 'header_nav_item', it);
            navListItem.node.onclick = () => {
                this.onMenuSwitcher(it);
            };
        })
    }

    toggleBurgerMenu(headerNode, navMenu, parentNode) {
        const burger = new Control(headerNode, 'div', 'header_burger_menu', '');
        const bg = new Control(parentNode, 'div', 'header_menu_bg', '');
        const burgerItem1 = new Control(burger.node, 'span', 'header_burger_item', '');
        const burgerItem2 = new Control(burger.node, 'span', 'header_burger_item', '');

        bg.node.onclick = () => {
            navMenu.node.classList.toggle('header_nav_show');
            bg.node.classList.toggle('header_menu_bg_show');
            burgerItem1.node.classList.toggle('header_burger_item_rotate');
            burgerItem2.node.classList.toggle('header_burger_item_rotate');
        }
        burger.node.onclick = () => {
            navMenu.node.classList.toggle('header_nav_show');
            bg.node.classList.toggle('header_menu_bg_show');
            burgerItem1.node.classList.toggle('header_burger_item_rotate');
            burgerItem2.node.classList.toggle('header_burger_item_rotate');
        }
    }
}