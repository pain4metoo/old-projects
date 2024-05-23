export const skillsGrafic: any = document.querySelectorAll(".anim");

export function getOffSet(el) {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset;
  const scrollTop = window.pageYOffset;

  return {
    top: rect.top + scrollTop,
    letf: rect.left + scrollLeft,
  };
}
