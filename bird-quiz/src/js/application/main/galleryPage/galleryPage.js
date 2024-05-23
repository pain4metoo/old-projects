import { Control } from "../../../common/control";
import { state } from "../../../common/state";
import { DATA } from "../../../data/data";

export class GalleryPage extends Control {
    constructor(parentNode) {
        super(parentNode, 'div', 'quiz_gallery', '');

        this.createGalleryPageInner(this.node);
    }

    createGalleryPageInner(galleryNode, page = 0) {

        Array.from(galleryNode.children).forEach(it => it.remove());

        let categoryItems = DATA.birds[page];

        const galleryTitle = new Control(galleryNode, 'h4', 'quiz_gallery_title', 'Галлерея');
        const galleryInner = new Control(galleryNode, 'div', 'quiz_gallery_inner', '');

        categoryItems.forEach((it, index) => {
            const galleryItem = new Control(galleryInner.node, 'div', 'quiz_gallery_item', '');
            const galleryItemrHide = new Control(galleryItem.node, 'div', 'quiz_gallery_hide', '');
            galleryItem.node.onclick = () => this.createPopup(galleryNode, it, page);
            const galleryItemImgQuest = new Control(galleryItem.node, 'img', 'quiz_gallery_img_hide', '');
            galleryItemImgQuest.node.src = './assets/images/quest.png';
            const galleryItemImg = new Control(galleryItem.node, 'img', 'quiz_gallery_img', '');
            galleryItemImg.node.src = categoryItems[index].image;
            const galleryItemName = new Control(galleryItem.node, 'p', 'quiz_gallery_name', `${categoryItems[index].name}`);
            const galleryItemBtn = new Control(galleryItem.node, 'button', 'quiz_gallery_btn', 'Подробнее');

            if (state.warmup.allRightAnswers.includes(it.name)) {
                galleryItemrHide.node.style.display = 'none';
                galleryItemImg.node.style.filter = 'none';
                galleryItemName.node.style.filter = 'none';
                galleryItemBtn.node.style.filter = 'none';
                galleryItemImgQuest.node.style.display = 'none';
            } else {
                galleryItem.node.onclick = () => { };
            }
        })

        const galleryPagination = new Control(galleryNode, 'div', 'quiz_gallery_pagination', '');

        categoryItems.forEach((it, index) => {
            const paginatonItem = new Control(galleryPagination.node, 'span', 'quiz_gallery_pagin_item', `${index + 1}`)

            paginatonItem.node.onclick = () => {

                this.createGalleryPageInner(galleryNode, index);
            }
        })
    }

    createPopup(galleryNode, item, page) {
        const galleryPopup = new Control(galleryNode, 'div', 'quiz_gallery_popup', '');
        galleryPopup.node.onclick = () => this.createGalleryPageInner(galleryNode, page);
        const popupInner = new Control(galleryPopup.node, 'div', 'quiz_gallery_popup_inner', '');
        const popupImg = new Control(popupInner.node, 'img', 'quiz_gallery_popup_img', '');
        popupImg.node.src = item.image;
        const popupName = new Control(popupInner.node, 'p', 'quiz_gallery_popup_name', `${item.name}`);
        const popupType = new Control(popupInner.node, 'p', 'quiz_gallery_popup_type', `${item.species}`);
        const popupDescription = new Control(popupInner.node, 'p', 'quiz_gallery_popup_description', `${item.description}`);
        const popupCloseBtn = new Control(popupInner.node, 'button', 'quiz_gallery_popup_btn', 'закрыть')
        popupCloseBtn.node.onclick = () => this.createGalleryPageInner(galleryNode, page);
    }
}