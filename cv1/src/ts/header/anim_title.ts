const welcomeText: HTMLInputElement | any = showText(
  document.querySelector(".header_title_text")
);

export const setTimer = () => {
  setTimeout(
    () =>
      welcomeText.forEach(
        (i: { style: { opacity: number } }) => (i.style.opacity = 1)
      ),
    0
  );
};

function showText(element) {
  element.style.wordBreak = "break-word";

  const letters = element.innerText
    .split("")
    .map((letter: string, i: number) => {
      const span: any = document.createElement("span");
      if (
        letter === "[" ||
        letter === "]" ||
        letter === "'" ||
        letter === "!"
      ) {
        span.style.color = "#E12179";
      }
      span.innerHTML = letter;
      span.style.opacity = 0;
      span.style.transitionDelay = 0.1 * i + "s";
      return span;
    });

  element.innerHTML = "";
  element.append(...letters);
  return letters;
}
