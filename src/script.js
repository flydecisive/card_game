"use strict";
exports.__esModule = true;
exports.condition = void 0;
require("./css/style.scss");
var end_page_1 = require("./end_page");
var generate_cards_1 = require("./generate_cards");
exports.condition = {
    complexity: null,
    move: null,
    time: null,
    cards: {},
    userCards: [""]
};
// export const suits = [
//   "./static/spades.png",
//   "./static/hearts.png",
//   "./static/diamonds.png",
//   "./static/clubs.png",
// ];
// export const ranks = ["A", "K", "Q", "J", "10", "9", "8", "7", "6"];
// генерация карт для отгадывания
// export function generateCards(
//   suits: string[],
//   ranks: string[],
//   complexity: string,
//   condition: Condition,
// ): void {
//   let pairsCount: number;
//   if (complexity === "1") {
//     pairsCount = 3;
//   } else if (complexity === "2") {
//     pairsCount = 6;
//   } else if (complexity === "3") {
//     pairsCount = 9;
//   }
//   let rank: number;
//   let suit: number;
//   for (let i = 0; i < pairsCount; i++) {
//     rank = Math.floor(Math.random() * ranks.length);
//     suit = Math.floor(Math.random() * suits.length);
//     condition.cards[i] = {
//       rank: `${ranks[rank]}`,
//       suit: `${suits[suit]}`,
//     };
//   }
// }
document.addEventListener("DOMContentLoaded", function () {
    var container = document.querySelector(".container");
    if (container) {
        new StartPage(3, container);
    }
});
// создание начальной страницы
var StartPage = /** @class */ (function () {
    function StartPage(elementsCount, container) {
        this.initPage(elementsCount, container);
    }
    StartPage.prototype.initPage = function (elementsCount, container) {
        var popupWrapper = document.createElement("div");
        popupWrapper.classList.add("popup-wrapper");
        var popup = document.createElement("div");
        popup.classList.add("popup");
        var popupTitle = document.createElement("h2");
        popupTitle.classList.add("popup-title");
        popupTitle.innerHTML = "Выбери <br>сложность";
        var popupButtonList = document.createElement("div");
        popupButtonList.classList.add("popup-button-list", "button-list");
        var button = document.createElement("button");
        button.classList.add("button");
        button.textContent = "Старт";
        button === null || button === void 0 ? void 0 : button.addEventListener("click", function () {
            container.innerHTML = "";
            (0, generate_cards_1.generateCards)(generate_cards_1.suits, generate_cards_1.ranks, exports.condition.complexity, exports.condition);
            var itemsCount = Object.keys(exports.condition.cards).length * 2;
            new GamePage(container, itemsCount);
        });
        var _loop_1 = function (i) {
            var buttonListItem = document.createElement("div");
            buttonListItem.classList.add("button-list-item");
            var input = document.createElement("input");
            input.classList.add("input");
            input.id = "radio-".concat(i + 1);
            input.type = "radio";
            input.name = "radio";
            input.value = "".concat(i + 1);
            input.addEventListener("click", function () {
                exports.condition.complexity = input.getAttribute("value");
                console.log(exports.condition.complexity);
            });
            var label = document.createElement("label");
            label.setAttribute("for", "radio-".concat(i + 1));
            label.textContent = "".concat(i + 1);
            buttonListItem.appendChild(input);
            buttonListItem.appendChild(label);
            popupButtonList.appendChild(buttonListItem);
        };
        for (var i = 0; i < elementsCount; i++) {
            _loop_1(i);
        }
        popup.appendChild(popupTitle);
        popup.appendChild(popupButtonList);
        popup.appendChild(button);
        popupWrapper.appendChild(popup);
        container.appendChild(popupWrapper);
    };
    return StartPage;
}());
// создание игровой страницы
var GamePage = /** @class */ (function () {
    function GamePage(container, itemsCount) {
        this.initPage(container, itemsCount);
    }
    // инициализация страницы
    GamePage.prototype.initPage = function (container, itemsCount) {
        var gameWrapper = document.createElement("div");
        gameWrapper.classList.add("game-wrapper");
        var gameTop = document.createElement("div");
        gameTop.classList.add("game-top");
        var gameTimer = document.createElement("div");
        gameTimer.classList.add("game-timer");
        this.initTimer(gameTimer);
        var button = document.createElement("button");
        button.classList.add("button");
        button.textContent = "Начать заново";
        var gameItems = document.createElement("div");
        gameItems.classList.add("game-items");
        this.initGameItem(gameItems, itemsCount);
        this.initGameItemImg(gameItems);
        gameTop.appendChild(gameTimer);
        gameTop.appendChild(button);
        gameWrapper.appendChild(gameTop);
        gameWrapper.appendChild(gameItems);
        container.appendChild(gameWrapper);
        setTimeout(function () {
            var gameItems = document.querySelectorAll(".game-item");
            gameItems.forEach(function (item) {
                var img = item.querySelector(".game-item-img");
                img.classList.add("hidden");
                var rank = item.querySelector(".game-item-rank");
                rank.classList.add("hidden");
                var shirt = document.createElement("img");
                shirt.classList.add("game-item-shirt");
                shirt.src = "./static/shirt.png";
                item.appendChild(shirt);
            });
        }, 5000);
        var gameItemsList = gameItems.querySelectorAll(".game-item");
        exports.condition.userCards = [];
        var choosenItems = [];
        // отгадывание карт
        gameItemsList.forEach(function (item) {
            item.addEventListener("click", function () {
                var img = item.querySelector(".game-item-img");
                img.classList.remove("hidden");
                var rank = item.querySelector(".game-item-rank");
                rank.classList.remove("hidden");
                var shirt = item.querySelector(".game-item-shirt");
                shirt.classList.add("hidden");
                exports.condition.userCards.push(item.getAttribute("data-key"));
                choosenItems.push(item);
                if (exports.condition.userCards.length === 2) {
                    var rank1 = exports.condition.cards[Number(exports.condition.userCards[0])].rank;
                    var rank2 = exports.condition.cards[Number(exports.condition.userCards[1])].rank;
                    var suit1 = exports.condition.cards[Number(exports.condition.userCards[0])].suit;
                    var suit2 = exports.condition.cards[Number(exports.condition.userCards[1])].suit;
                    if (rank1 === rank2 && suit1 === suit2) {
                        var elem = Number(choosenItems[0].getAttribute("data-key"));
                        delete exports.condition.cards[elem];
                        exports.condition.userCards = [];
                        choosenItems = [];
                        if (Object.keys(exports.condition.cards).length === 0) {
                            new end_page_1.EndPage(container, "Вы выйграли!", "00.00", "./static/celebration.png");
                            var button_1 = document.querySelector(".button");
                            button_1.addEventListener("click", function () {
                                container.innerHTML = "";
                                new StartPage(3, container);
                            });
                        }
                    }
                    else {
                        setTimeout(function () {
                            var img = choosenItems[0].querySelector(".game-item-img");
                            img.classList.add("hidden");
                            var rank = choosenItems[0].querySelector(".game-item-rank");
                            rank.classList.add("hidden");
                            var shirt = choosenItems[0].querySelector(".game-item-shirt");
                            shirt.classList.remove("hidden");
                            img = choosenItems[1].querySelector(".game-item-img");
                            img.classList.add("hidden");
                            rank = choosenItems[1].querySelector(".game-item-rank");
                            rank.classList.add("hidden");
                            shirt = choosenItems[1].querySelector(".game-item-shirt");
                            shirt.classList.remove("hidden");
                            choosenItems = [];
                            exports.condition.userCards = [];
                            new end_page_1.EndPage(container, "Вы проиграли!", "00.00", "./static/dead.png");
                            var button = document.querySelector(".button");
                            button.addEventListener("click", function () {
                                container.innerHTML = "";
                                new StartPage(3, container);
                            });
                        }, 500);
                    }
                }
            });
        });
    };
    // инициализация таймера
    GamePage.prototype.initTimer = function (container) {
        var timerWrapper = document.createElement("div");
        timerWrapper.classList.add("timer-wrapper");
        var min = document.createElement("div");
        min.classList.add("game-timer-minutes");
        min.textContent = "00";
        var dot = document.createElement("div");
        dot.textContent = ".";
        var sec = document.createElement("div");
        sec.classList.add("game-timer-seconds");
        sec.textContent = "00";
        timerWrapper.appendChild(min);
        timerWrapper.appendChild(dot);
        timerWrapper.appendChild(sec);
        container.appendChild(timerWrapper);
    };
    // инициализация игрового item'а
    GamePage.prototype.initGameItem = function (container, itemsCount) {
        for (var i = 0; i < itemsCount; i++) {
            var gameItem = document.createElement("div");
            gameItem.classList.add("game-item");
            container.appendChild(gameItem);
        }
    };
    // инициализация игровой картинки
    GamePage.prototype.initGameItemImg = function (gameItems) {
        var _a;
        var items = gameItems.querySelectorAll(".game-item");
        var indexes = [];
        for (var i = 0; i < items.length; i++) {
            indexes.push(i);
        }
        var currentIndex = indexes.length;
        while (currentIndex !== 0) {
            var randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            _a = [
                indexes[randomIndex],
                indexes[currentIndex],
            ], indexes[currentIndex] = _a[0], indexes[randomIndex] = _a[1];
        }
        for (var i = 0; i < Object.keys(exports.condition.cards).length; i++) {
            var src = exports.condition.cards[i].suit;
            var rank = exports.condition.cards[i].rank;
            var gameItemImg = document.createElement("img");
            gameItemImg.classList.add("game-item-img");
            gameItemImg.src = src;
            var gameItemRank = document.createElement("p");
            gameItemRank.textContent = rank;
            gameItemRank.classList.add("game-item-rank");
            items[indexes[0]].appendChild(gameItemImg);
            console.log(indexes[0]);
            items[indexes[0]].setAttribute("data-key", "".concat(i));
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
            items[indexes[0]].setAttribute("data-key", "".concat(i));
            items[indexes[0]].appendChild(gameItemRank);
            indexes.splice(0, 1);
        }
    };
    return GamePage;
}());
