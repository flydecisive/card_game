import "./css/style.scss";
import { EndPage } from "./end_page";

interface Condition {
  complexity: string | null;
  move: string | null;
  time: string | null;
  cards: { [key: number]: { rank: string; suit: string } };
  userCards: string[];
}

const condition: Condition = {
  complexity: null,
  move: null,
  time: null,
  cards: { 1: { rank: "", suit: "" } },
  userCards: [""],
};

const suits = [
  "./static/spades.png",
  "./static/hearts.png",
  "./static/diamonds.png",
  "./static/clubs.png",
];
const ranks = ["A", "K", "Q", "J", "10", "9", "8", "7", "6"];

// генерация карт для отгадывания
function generateCards(
  suits: string[],
  ranks: string[],
  complexity: string,
  condition: Condition,
): void {
  condition.cards = { 1: { rank: "", suit: "" } };
  let pairsCount: number;
  if (complexity === "1") {
    pairsCount = 3;
  } else if (complexity === "2") {
    pairsCount = 6;
  } else if (complexity === "3") {
    pairsCount = 9;
  }
  let rank: number;
  let suit: number;
  for (let i = 0; i < pairsCount; i++) {
    rank = Math.floor(Math.random() * ranks.length);
    suit = Math.floor(Math.random() * suits.length);
    condition.cards[i] = {
      rank: `${ranks[rank]}`,
      suit: `${suits[suit]}`,
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  if (container) {
    new StartPage(3, container);
  }
});

// создание начальной страницы
class StartPage {
  constructor(elementsCount: number, container: Element) {
    this.initPage(elementsCount, container);
  }

  initPage(elementsCount: number, container: Element): void {
    const popupWrapper = document.createElement("div");
    popupWrapper.classList.add("popup-wrapper");
    const popup = document.createElement("div");
    popup.classList.add("popup");
    const popupTitle = document.createElement("h2");
    popupTitle.classList.add("popup-title");
    popupTitle.innerHTML = "Выбери <br>сложность";
    const popupButtonList = document.createElement("div");
    popupButtonList.classList.add("popup-button-list", "button-list");
    const button = document.createElement("button");
    button.classList.add("button");
    button.textContent = "Старт";
    button?.addEventListener("click", () => {
      container.innerHTML = "";
      generateCards(suits, ranks, condition.complexity, condition);
      const itemsCount = Object.keys(condition.cards).length * 2;
      new GamePage(container, itemsCount);
    });
    for (let i = 0; i < elementsCount; i++) {
      const buttonListItem = document.createElement("div");
      buttonListItem.classList.add("button-list-item");
      const input = document.createElement("input");
      input.classList.add("input");
      input.id = `radio-${i + 1}`;
      input.type = "radio";
      input.name = "radio";
      input.value = `${i + 1}`;
      input.addEventListener("click", () => {
        condition.complexity = input.getAttribute("value");
        console.log(condition.complexity);
      });
      const label = document.createElement("label");
      label.setAttribute("for", `radio-${i + 1}`);
      label.textContent = `${i + 1}`;
      buttonListItem.appendChild(input);
      buttonListItem.appendChild(label);
      popupButtonList.appendChild(buttonListItem);
    }
    popup.appendChild(popupTitle);
    popup.appendChild(popupButtonList);
    popup.appendChild(button);
    popupWrapper.appendChild(popup);
    container.appendChild(popupWrapper);
  }
}

// создание игровой страницы
class GamePage {
  constructor(container: Element, itemsCount: number) {
    this.initPage(container, itemsCount);
  }

  // инициализация страницы
  initPage(container: Element, itemsCount: number) {
    const gameWrapper = document.createElement("div");
    gameWrapper.classList.add("game-wrapper");
    const gameTop = document.createElement("div");
    gameTop.classList.add("game-top");
    const gameTimer = document.createElement("div");
    gameTimer.classList.add("game-timer");
    this.initTimer(gameTimer);
    const button = document.createElement("button");
    button.classList.add("button");
    button.textContent = "Начать заново";
    const gameItems = document.createElement("div");
    gameItems.classList.add("game-items");
    this.initGameItem(gameItems, itemsCount);
    this.initGameItemImg(gameItems);
    gameTop.appendChild(gameTimer);
    gameTop.appendChild(button);
    gameWrapper.appendChild(gameTop);
    gameWrapper.appendChild(gameItems);
    container.appendChild(gameWrapper);
    setTimeout(function () {
      const gameItems = document.querySelectorAll(".game-item");
      gameItems.forEach((item) => {
        const img = item.querySelector(".game-item-img");
        img.classList.add("hidden");
        const rank = item.querySelector(".game-item-rank");
        rank.classList.add("hidden");
        const shirt = document.createElement("img");
        shirt.classList.add("game-item-shirt");
        shirt.src = "./static/shirt.png";
        item.appendChild(shirt);
      });
    }, 5000);
    const gameItemsList = gameItems.querySelectorAll(".game-item");
    condition.userCards = [];
    let choosenItems: Element[] = [];

    // отгадывание карт
    gameItemsList.forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector(".game-item-img");
        img.classList.remove("hidden");
        const rank = item.querySelector(".game-item-rank");
        rank.classList.remove("hidden");
        const shirt = item.querySelector(".game-item-shirt");
        shirt.classList.add("hidden");
        condition.userCards.push(item.getAttribute("data-key"));
        choosenItems.push(item);
        if (condition.userCards.length === 2) {
          if (
            condition.cards[Number(condition.userCards[0])].rank ===
              condition.cards[Number(condition.userCards[1])].rank &&
            condition.cards[Number(condition.userCards[0])].suit ===
              condition.cards[Number(condition.userCards[1])].suit
          ) {
            const elem = Number(choosenItems[0].getAttribute("data-key"));
            delete condition.cards[elem];
            condition.userCards = [];
            choosenItems = [];

            if (Object.keys(condition.cards).length === 0) {
              new EndPage(
                container,
                "Вы выйграли!",
                "00.00",
                "./static/celebration.png",
              );
              const button = document.querySelector(".button");
              button.addEventListener("click", () => {
                container.innerHTML = "";
                new StartPage(3, container);
              });
            }
          } else {
            setTimeout(function () {
              let img = choosenItems[0].querySelector(".game-item-img");
              img.classList.add("hidden");
              let rank = choosenItems[0].querySelector(".game-item-rank");
              rank.classList.add("hidden");
              let shirt = choosenItems[0].querySelector(".game-item-shirt");
              shirt.classList.remove("hidden");
              img = choosenItems[1].querySelector(".game-item-img");
              img.classList.add("hidden");
              rank = choosenItems[1].querySelector(".game-item-rank");
              rank.classList.add("hidden");
              shirt = choosenItems[1].querySelector(".game-item-shirt");
              shirt.classList.remove("hidden");
              choosenItems = [];
              condition.userCards = [];
              new EndPage(
                container,
                "Вы проиграли!",
                "00.00",
                "./static/dead.png",
              );
              const button = document.querySelector(".button");
              button.addEventListener("click", () => {
                container.innerHTML = "";
                new StartPage(3, container);
              });
            }, 500);
          }
        }
      });
    });
  }

  // инициализация таймера
  initTimer(container: Element) {
    const timerWrapper = document.createElement("div");
    timerWrapper.classList.add("timer-wrapper");
    const min = document.createElement("div");
    min.classList.add("game-timer-minutes");
    min.textContent = "00";
    const dot = document.createElement("div");
    dot.textContent = ".";
    const sec = document.createElement("div");
    sec.classList.add("game-timer-seconds");
    sec.textContent = "00";
    timerWrapper.appendChild(min);
    timerWrapper.appendChild(dot);
    timerWrapper.appendChild(sec);
    container.appendChild(timerWrapper);
  }

  // инициализация игрового item'а
  initGameItem(container: Element, itemsCount: number): void {
    for (let i = 0; i < itemsCount; i++) {
      const gameItem = document.createElement("div");
      gameItem.classList.add("game-item");
      container.appendChild(gameItem);
    }
  }

  // инициализация игровой картинки
  initGameItemImg(gameItems: Element): void {
    const items = gameItems.querySelectorAll(".game-item");
    const indexes = [];
    for (let i = 0; i < items.length; i++) {
      indexes.push(i);
    }
    let currentIndex = indexes.length;
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [indexes[currentIndex], indexes[randomIndex]] = [
        indexes[randomIndex],
        indexes[currentIndex],
      ];
    }
    for (let i = 0; i < Object.keys(condition.cards).length; i++) {
      const src = condition.cards[i].suit;
      const rank = condition.cards[i].rank;
      let gameItemImg = document.createElement("img");
      gameItemImg.classList.add("game-item-img");
      gameItemImg.src = src;
      let gameItemRank = document.createElement("p");
      gameItemRank.textContent = rank;
      gameItemRank.classList.add("game-item-rank");
      items[indexes[0]].appendChild(gameItemImg);
      console.log(indexes[0]);
      items[indexes[0]].setAttribute("data-key", `${i}`);
      items[indexes[0]].appendChild(gameItemRank);
      indexes.splice(0, 1);
      gameItemImg = document.createElement("img");
      gameItemImg.classList.add("game-item-img");
      gameItemImg.src = src;
      gameItemRank = document.createElement("p");
      gameItemRank.textContent = rank;
      gameItemRank.classList.add("game-item-rank");
      items[indexes[0]].appendChild(gameItemImg);
      console.log(indexes[0]);
      items[indexes[0]].setAttribute("data-key", `${i}`);
      items[indexes[0]].appendChild(gameItemRank);
      indexes.splice(0, 1);
    }
  }
}
