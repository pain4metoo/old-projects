import { checkItems } from "./settings.js";

document.getElementById("lang-1").addEventListener("change", getPhrase);
document.getElementById("lang-2").addEventListener("change", getPhrase);
const quote = document.querySelector(".footer__text");
const author = document.querySelector(".footer__author");
const reload = document.getElementById("reload");
reload.addEventListener("click", getPhrase);

export async function getPhrase() {
  let url;
  if (checkItems.includes("lang-1")) {
    url = `https://gist.githubusercontent.com/pain4metoo/d9927ff725f885d90621f3d20831ee15/raw/5ef89433299dfefe7f9259a4a89ab3f1f577af92/qoutes_ru.json`;
  } else {
    url = `https://gist.githubusercontent.com/pain4metoo/fd0948fa51e0369c59f085c762143e08/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`;
  }
  const res = await fetch(url);
  const data = await res.json();
  let count = Math.round(Math.random() * 102);
  let randomQuote;
  let randomAuthor;
  if (checkItems.includes("lang-1")) {
    randomQuote = data[count].text;
    randomAuthor = data[count].author;
  } else {
    randomQuote = data.quotes[count].quote;
    randomAuthor = data.quotes[count].author;
  }

  if (!data) {
    quote.innerHTML = `Error 404`;
    author.innerHTML = `Try again`;
  }
  quote.innerHTML = `"${randomQuote}"`;
  author.innerHTML = `${randomAuthor}`;

  reload.classList.toggle("animation__reload");
  quote.classList.toggle("animation__text");
  author.classList.toggle("animation__text");
}
