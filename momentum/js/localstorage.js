const welcomeName = JSON.parse(localStorage.getItem("name")) || "";

window.addEventListener("load", () => {
  const name = document.querySelector(".welcome__name__value");
  if (welcomeName) {
    name.value = welcomeName;
    if (welcomeName.length <= 8) {
      document.querySelector(".welcome__name").style.marginLeft = "10rem";
    } else {
      document.querySelector(".welcome__name").style.marginLeft = "0rem";
    }
  }
});
