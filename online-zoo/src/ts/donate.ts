class Donate {
  amount: any = document.getElementById("amount");
  value = document.querySelectorAll(
    ".main_donate_pick_amount_item"
  ) as NodeListOf<Element>;
  text = document.querySelectorAll(
    ".main_donate_pick_amount_price_text"
  ) as NodeListOf<Element>;
  input: any = document.querySelectorAll(
    ".main_donate_pick_amount_inp"
  ) as NodeListOf<Element>;

  constructor() {
    this.value.forEach((item, index): void => {
      item.addEventListener("click", () => this.newPrice(item, index));
    });
    this.amount.addEventListener("input", (e: Event) => this.isCoincidence(e));
  }

  newPrice(elem: Element | null, index: number | null, value: number = 0) {
    this.text.forEach((item, i) => {
      if (i === index || Number(item.textContent) === value) {
        item.classList.add("main_donate_pick_amount_price_text_active");
        this.amount.value = Number(item.textContent);
        this.input[i].checked = true;
      } else {
        item.classList.remove("main_donate_pick_amount_price_text_active");
        this.input[i].checked = false;
      }
    });
  }

  isCoincidence(e) {
    let targetValue: number = Number(e.target.value);
    this.newPrice(null, null, targetValue);
  }
}

const donate = new Donate();
