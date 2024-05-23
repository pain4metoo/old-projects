import { getOffSet, skillsGrafic } from "./main/anim_skills";
import { startPoints } from "./main/anim_about";
import { showAnim } from "./main/anim_about";
import { arrowUp } from "./footer/arrowUp";

window.addEventListener("scroll", () => {
  startPoints.forEach((el) => {
    const height = el.offsetHeight;
    const offSet = getOffSet(el).top;
    let point = window.innerHeight - height;
    if (window.pageYOffset >= offSet - point) {
      showAnim();
    }
  });

  skillsGrafic.forEach((el) => {
    const height = el.offsetHeight;
    const offSet = getOffSet(el).top;
    let point = window.innerHeight - height;
    if (window.pageYOffset >= offSet - point) {
      el.classList.add("active");
    }
  });

  (function () {
    const height = arrowUp.offsetHeight;
    const offSet = getOffSet(arrowUp).top;
    let point = window.innerHeight - height;
    if (window.pageYOffset > offSet - point) {
      arrowUp.classList.add("show_arrow");
    }
  })();
});
