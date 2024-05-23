class Validation {
  constructor() {
    let test = false;
    const input = document.getElementById("input") as HTMLInputElement;
    const btn = document.getElementById("btn") as HTMLInputElement;

    input?.addEventListener("input", () => {
      let text: string = input.value;
      const regExp = new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
      );

      if (text.length >= 3) {
        let testValue: boolean = regExp.test(text);
        if (testValue) {
          test = true;
          btn.style.borderColor = "#333B41";
          btn.style.color = "#333B41";
          input.style.borderColor = "#333B41";
          input.style.color = "#333B41";
        } else {
          test = false;
          btn.style.borderColor = "#D31414";
          btn.style.color = "#D31414";
          input.style.borderColor = "#D31414";
          input.style.color = "#D31414";
        }
      } else {
        test = false;
        btn.style.borderColor = "#D31414";
        btn.style.color = "#D31414";
        input.style.borderColor = "#D31414";
        input.style.color = "#D31414";
      }
    });

    btn.addEventListener("click", () => {
      const error: HTMLElement | null = document.createElement("p");
      error.className = "footer_right_error";
      const block: HTMLElement | null = document.querySelector(
        ".footer_right_inner"
      );
      if (test) {
        btn.disabled = true;
        btn.style.borderColor = "#D31414";
        btn.style.color = "#D31414";
        input.value = "";
        input.style.borderColor = "#D31414";
        test = false;
        error.textContent = "Thanks for subscribing";
        error.style.color = "green";
        block?.appendChild(error);
        setTimeout(() => {
          btn.disabled = false;
          block?.removeChild(error);
        }, 1000);
      } else {
        btn.disabled = true;
        error.textContent = "Your email has not been validated";
        error.style.color = "red";
        test = false;
        block?.appendChild(error);
        setTimeout(() => {
          btn.disabled = false;
          block?.removeChild(error);
        }, 1000);
      }
    });
  }
}

const validation = new Validation();
