const typaArtist = document.querySelector(".game__inner__artist");
const typePictures = document.querySelector(".game__inner__pictures");

const artistWindow = document.querySelector(".game__window");
const gameDots = document.querySelectorAll(".game__dot");
const gameBtns = document.querySelectorAll(".game__btn");

export async function getData() {
  let bigData = {};
  let picturesStorage = [];
  let authors = `https://raw.githubusercontent.com/pain4metoo/image-data/master/data.json`;
  const resAuthors = await fetch(authors);
  const dataAuthors = await resAuthors.json();
  let count = 0;

  if (!bigData.authors) {
    bigData.authors = dataAuthors;
  }

  for (let i = 0; i < 24; i++) {
    picturesStorage.push([]);
    for (let g = 0; g < 10; g++) {
      let pictures = `https://raw.githubusercontent.com/pain4metoo/image-data/master/full/${count}full.jpg`;
      count++;
      picturesStorage[i].push(pictures);
    }
  }

  if (!bigData.pictures) {
    bigData.pictures = picturesStorage;
  }

  return bigData;
}

let pictureCount = 0;

const popupWin = document.querySelector(".popup__win");
const winPicture = document.querySelector(".popup__win__picture");
const winArtist = document.querySelector(".popup__win__artist");
const truImage = document.querySelector(".popup__win__img");
const winNext = document.querySelector(".popup__win__btn");

export function startAuthor(BIGDATA, round) {
  typaArtist.classList.remove("hide");
  typePictures.classList.add("hide");

  let authorName = BIGDATA.authors[round * 10].name;
  let authorYear = BIGDATA.authors[round * 10].year;
  let picture = BIGDATA.pictures[round];
  let author = BIGDATA.authors[round * 10].author;

  let randomCount = getRandom(3);

  artistWindow.style.backgroundImage = `url('${picture[pictureCount]}')`;
  gameBtns.forEach((item, index) => {
    if (index === randomCount) {
      item.textContent = author;
    } else {
      item.textContent = BIGDATA.authors[getRandom(230)].author;
    }
    item.addEventListener("click", () => {
      if (index !== randomCount) {
        lose();
      } else {
        win();
      }
    });
  });

  function lose(count) {
    popupWin.classList.remove("hide");

    truImage.style.backgroundImage = `url('${picture[pictureCount]}')`;
    winPicture.textContent = `${authorName}, ${authorYear}`;
    winArtist.textContent = `${author}`;
    truImage.classList.remove("popup__win__true");
    truImage.classList.add("popup__win__false");
  }

  function win(count) {
    popupWin.classList.remove("hide");

    truImage.style.backgroundImage = `url('${picture[pictureCount]}')`;
    winPicture.textContent = `${authorName}, ${authorYear}`;
    winArtist.textContent = `${author}`;
    truImage.classList.add("popup__win__true");
    truImage.classList.remove("popup__win__false");
  }
}

export function startPicture(BIGDATA, round) {
  typePictures.classList.remove("hide");
}

let prevNum = 150;

function getRandom(num) {
  let newNum = Math.round(Math.random() * num);
  if (prevNum === newNum) {
    getRandom(num);
  } else {
    return newNum;
  }

  prevNum = newNum;
}
