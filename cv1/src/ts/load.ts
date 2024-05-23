import { setTimer } from "./header/anim_title";

const preLoader: HTMLInputElement | null = document.querySelector(".preload");
const body = document.querySelector("html");

if (body) {
  body.style.overflow = "hidden";
} else {
  throw new Error('Object is possibly "null"');
}

const load = (value: number) => {
  setTimeout(() => {
    if (preLoader && body) {
      preLoader.style.display = "none";
      body.style.overflow = "auto";
      setTimer();
    } else {
      throw new Error('Object is possibly "null"');
    }
  }, value);
};

(function isLoadLong() {
  setTimeout(() => load(5000), 0);
})();

window.addEventListener("load", () => {
  load(1000);
});
