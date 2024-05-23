import { getOffSet } from "./anim_skills";

export const startPoints: any = document.querySelectorAll(".anim_0");
const textAbout: HTMLInputElement | any = customText(
  document.querySelectorAll(".anim_0")
);

export function showAnim() {
  textAbout.forEach((domEl) => {
    domEl.forEach((lettersArray) =>
      lettersArray.forEach((letter) => {
        setTimeout(() => (letter.style.opacity = "1")), 0;
      })
    );
  }, 0);
}

function customText(element) {
  let lettersArr: Array<string[]> = [];

  for (let i = 0; i < element.length; i++) {
    element[i].style.wordBreak = "break-word";

    const letters = element[i].innerText
      .split("")
      .map((letter: string, i: number) => {
        const span: any = document.createElement("span");
        span.innerHTML = letter;
        span.style.opacity = "0";
        span.style.transitionDelay = 0.3 * i + "s";
        return span;
      });

    lettersArr.push([letters]);
    element[i].innerHTML = "";
    element[i].append(...letters);
  }

  return lettersArr;
}
