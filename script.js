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
        this.startPage(elementsCount, container);
    }
    StartPage.prototype.startPage = function (elementsCount, container) {
        var popupWrapper = document.createElement('div');
        popupWrapper.classList.add('popup-wrapper');
        var popup = document.createElement('div');
        popup.classList.add('popup');
        var popupTitle = document.createElement('h2');
        popupTitle.classList.add('popup__title');
        popupTitle.innerHTML = 'Выбери <br>сложность';
        var popupButtonList = document.createElement('div');
        popupButtonList.classList.add('popup__button-list', 'button-list');
        var button = document.createElement('button');
        button.classList.add('button');
        button.textContent = 'Старт';
        for (var i = 0; i < elementsCount; i++) {
            var buttonListItem = document.createElement('div');
            buttonListItem.classList.add('button-list__item');
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
