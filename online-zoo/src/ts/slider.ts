import sliderData from "./sliderData";

class Slider {
  counter: number = 0;
  items: NodeListOf<Element> = document.querySelectorAll(".main_slider_item");
  left: HTMLElement | null = document.getElementById("left");
  right: HTMLElement | null = document.getElementById("right");
  isNext: boolean = true;
  constructor() {
    this.left?.addEventListener("click", () => this.nextSliders("left"));
    this.right?.addEventListener("click", () => this.nextSliders("right"));
  }

  nextSliders(side: string) {
    let currentSlides = this.getRandom();

    if (this.isNext) {
      this.isNext = false;
      this.items.forEach((item: any, index) => {
        item.classList.add("main_slider_item_animation");
        item.style.animation = `${side} 1s cubic-bezier(0.075, 0.82, 0.165, 1)`;
        item.innerHTML = `<span class="main_slider_item_bg"></span>
                    <img
                      class="main_slider_item_img"
                      src="${sliderData[currentSlides[index]].img}"
                      alt="image"
                    />
            
                    <div class="main_slider_item_inner">
                      <div class="main_slider_item_text">
                        <h3 class="main_slider_item_title">${
                          sliderData[currentSlides[index]].title
                        }</h3>
                        <p class="main_slider_item_name">${
                          sliderData[currentSlides[index]].location
                        }</p>
                      </div>
                      <img
                        class="main_slider_item_pic"
                        src="${sliderData[currentSlides[index]].logo}"
                        alt="picture"
                      />
                    </div>`;
        setTimeout(() => {
          this.isNext = true;
          item.classList.remove("main_slider_item_animation");
          item.style.animation = ``;
        }, 1000);
      });
    }
  }

  getRandom() {
    const cardsCount: number = 7;
    let randomArr: Array<number> = [];

    for (let i = 0; i < cardsCount; i++) {
      randomCount(randomArr);
    }

    function randomCount(arr: Array<number>): Array<number> {
      let randomNumber: number = Math.ceil(Math.random() * cardsCount);

      if (arr.includes(randomNumber)) {
        randomCount(randomArr);
      } else {
        arr.push(randomNumber);
      }
      return arr;
    }

    return randomArr;
  }
}

const slider = new Slider();
