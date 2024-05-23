import Testimonials from "./testimonals";

class TestimonialsPopup extends Testimonials {
  popup: HTMLElement | null = document.getElementById("popup");
  popupInner: HTMLElement | null = document.getElementById("popup_inner");
  bg = document.getElementById("bg");
  screenWidth: number = window.screen.width;
  constructor() {
    super();
    if (this.screenWidth <= 640) {
      this.comments.forEach((item: HTMLElement) => {
        item.addEventListener("click", () => this.showPopup(item));
      });
      this.bg?.addEventListener("click", () => this.closePopup());
    }
  }

  showPopup(elem: HTMLElement) {
    this.popup?.classList.add("main_comments_popup_show");
    if (this.popupInner) {
      let span = document.createElement("span");
      span.classList.add("main_comments_btn_close");
      this.popupInner.innerHTML = elem.innerHTML;
      this.popupInner.append(span);
      span.addEventListener("click", () => this.closePopup());
    }
    this.bg?.classList.add("background_show");
  }

  closePopup() {
    this.bg?.classList.remove("background_show");
    this.popup?.classList.remove("main_comments_popup_show");
  }
}

const testimonialsPopup = new TestimonialsPopup();
