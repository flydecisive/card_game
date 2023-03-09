document.addEventListener('DOMContentLoaded', function () {
    var container = document.querySelector('.container');
    if (container) {
        new StartPage(3, container);
        var button = container.querySelector('.button');
        var inputs = container.querySelectorAll('.input');
        inputs.forEach(function (input) {
            input.addEventListener('click', function () {
                condition.complexity = input.getAttribute('value');
            });
        });
        button === null || button === void 0 ? void 0 : button.addEventListener('click', function () {
            container.innerHTML = '';
            console.log("\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u0438: ".concat(condition.complexity));
            var itemsCount = 36;
            new GamePage(container, itemsCount);
        });
    }
});
var condition = {
    complexity: null,
    move: null,
    time: null,
    cards: [],
    userCards: []
};
var StartPage = /** @class */ (function () {
    function StartPage(elementsCount, container) {
        this.initPage(elementsCount, container);
    }
    StartPage.prototype.initPage = function (elementsCount, container) {
        var popupWrapper = document.createElement('div');
        popupWrapper.classList.add('popup-wrapper');
        var popup = document.createElement('div');
        popup.classList.add('popup');
        var popupTitle = document.createElement('h2');
        popupTitle.classList.add('popup-title');
        popupTitle.innerHTML = 'Выбери <br>сложность';
        var popupButtonList = document.createElement('div');
        popupButtonList.classList.add('popup-button-list', 'button-list');
        var button = document.createElement('button');
        button.classList.add('button');
        button.textContent = 'Старт';
        for (var i = 0; i < elementsCount; i++) {
            var buttonListItem = document.createElement('div');
            buttonListItem.classList.add('button-list-item');
            var input = document.createElement('input');
            input.classList.add('input');
            input.id = "radio-".concat(i + 1);
            input.type = 'radio';
            input.name = 'radio';
            input.value = "".concat(i + 1);
            var label = document.createElement('label');
            label.setAttribute('for', "radio-".concat(i + 1));
            label.textContent = "".concat(i + 1);
            buttonListItem.appendChild(input);
            buttonListItem.appendChild(label);
            popupButtonList.appendChild(buttonListItem);
        }
        popup.appendChild(popupTitle);
        popup.appendChild(popupButtonList);
        popup.appendChild(button);
        popupWrapper.appendChild(popup);
        container.appendChild(popupWrapper);
    };
    return StartPage;
}());
var GamePage = /** @class */ (function () {
    function GamePage(container, itemsCount) {
        this.initPage(container, itemsCount);
    }
    GamePage.prototype.initPage = function (container, itemsCount) {
        var gameWrapper = document.createElement('div');
        gameWrapper.classList.add('game-wrapper');
        var gameTop = document.createElement('div');
        gameTop.classList.add('game-top');
        var gameTimer = document.createElement('div');
        gameTimer.classList.add('game-timer');
        this.initTimer(gameTimer);
        var button = document.createElement('button');
        button.classList.add('button');
        button.textContent = 'Начать заново';
        var gameItems = document.createElement('div');
        gameItems.classList.add('game-items');
        this.initGameItem(gameItems, itemsCount);
        gameTop.appendChild(gameTimer);
        gameTop.appendChild(button);
        gameWrapper.appendChild(gameTop);
        gameWrapper.appendChild(gameItems);
        container.appendChild(gameWrapper);
    };
    GamePage.prototype.initTimer = function (container) {
        var timerWrapper = document.createElement('div');
        timerWrapper.classList.add('timer-wrapper');
        var min = document.createElement('div');
        min.classList.add('game-timer-minutes');
        min.textContent = '00';
        var dot = document.createElement('div');
        dot.textContent = '.';
        var sec = document.createElement('div');
        sec.classList.add('game-timer-seconds');
        sec.textContent = '00';
        timerWrapper.appendChild(min);
        timerWrapper.appendChild(dot);
        timerWrapper.appendChild(sec);
        container.appendChild(timerWrapper);
    };
    GamePage.prototype.initGameItem = function (container, itemsCount) {
        for (var i = 0; i < itemsCount; i++) {
            var gameItem = document.createElement('div');
            gameItem.classList.add('game-item');
            var gameItemImg = document.createElement('img');
            gameItemImg.src = './img/shirt.png';
            gameItem.appendChild(gameItemImg);
            container.appendChild(gameItem);
        }
    };
    return GamePage;
}());
