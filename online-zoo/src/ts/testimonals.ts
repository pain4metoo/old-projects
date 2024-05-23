import testimonialsData from "./testimonialsData";

class Testimonials {
  comments: NodeListOf<Element> | any = document.querySelectorAll(
    ".main_comments_item"
  );
  input = document.getElementById("input") as HTMLInputElement;
  screenWidth: number = window.screen.width;

  constructor() {
    this.input?.addEventListener("input", () => this.changeValue());
    if (this.screenWidth <= 1160) {
      this.input.setAttribute("max", "8");
    }
  }

  changeValue() {
    let value: number = +this.input.value;
    if (value >= 0 && Number.isInteger(value)) {
      this.comments.forEach((item: any, index: number) => {
        let correctIndex = index;
        if (this.screenWidth <= 1160) {
          correctIndex = index === 3 ? (index -= 1) : index; // in the width 1160px one of the item element have display: none. That's why need to correct index;
        }
        item.classList.add("main_slider_item_animation");
        if (index < 2) {
          item.style.animation = `left 1s cubic-bezier(0.075, 0.82, 0.165, 1)`;
        } else {
          item.style.animation = `right 1s cubic-bezier(0.075, 0.82, 0.165, 1)`;
        }

        item.innerHTML = `<div class="main_comments_info">
            <img
              class="main_comments_ava"
              src=${testimonialsData[correctIndex + value].avatar}
              alt="avatar"
            />
            <div class="main_comments_local">
              <p class="main_comments_name">${
                testimonialsData[correctIndex + value].name
              }</p>
              <span class="main_comments_geog">${
                testimonialsData[correctIndex + value].local
              }</span>
              <span class="main_comments_geog">${
                testimonialsData[correctIndex + value].online
              }</span>
            </div>
          </div>
          <p class="main_comments_comment main_comments_comment_2">
          ${testimonialsData[correctIndex + value].text}
          </p>`;
        setTimeout(() => {
          item.classList.remove("main_slider_item_animation");
          item.style.animation = ``;
        }, 500);
      });
    }
  }
}

const testimonials = new Testimonials();

export default Testimonials;
