class Menu {
  menu = document.getElementById("nav");
  btn = document.getElementById("btn_nav");
  logo = document.getElementById("logo");
  btnClose = document.getElementById("close_btn");
  bg = document.getElementById("bg");
  popup = document.getElementById("popup");

  constructor() {
    this.btn?.addEventListener("click", () => this.toggleMenu());
    this.btnClose?.addEventListener("click", () => this.closeBg());
    this.bg?.addEventListener("click", () => this.closeBg());
  }

  toggleMenu() {
    if (this.popup?.classList.contains("main_comments_popup_show")) {
      this.bg?.classList.remove("background_show");
      this.popup?.classList.remove("main_comments_popup_show");
    }
    this.menu?.classList.add("header_nav_show");
    if (this.menu) {
      this.menu.style.display = "block";
    }
    this.bg?.classList.add("background_show");
    setTimeout(() => {
      this.logo?.classList.add("header_logo_text_menu");
    }, 500);
  }

  closeBg() {
    this.bg?.classList.remove("background_show");
    this.menu?.classList.remove("header_nav_show");
    if (this.menu) {
      this.menu.style.display = "none";
    }
    setTimeout(() => {
      this.logo?.classList.remove("header_logo_text_menu");
    }, 500);
  }
}

const menu = new Menu();
