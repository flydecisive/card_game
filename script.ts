document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    if (container) {
        new StartPage(3, container);
        const button = container.querySelector('.button');
        const inputs = container.querySelectorAll('.input');
        inputs.forEach((input) => {
            input.addEventListener('click', () => {
                condition.complexity = input.getAttribute('value');      
            });
        });
        button?.addEventListener('click', () => {
            container.innerHTML = '';
            console.log(`Уровень сложности: ${condition.complexity}`);
            const itemsCount = 36;
            new GamePage(container, itemsCount);
        });
    }
});

interface Condition {
    complexity: string | null;
    move: string | null;
    time: number | null;
    cards: [];
    userCards: [];
}

const condition: Condition = {
    complexity: null,
    move: null,
    time: null,
    cards: [],
    userCards: [],
}

class StartPage {
    constructor (elementsCount: number, container: Element) {
        this.initPage(elementsCount, container);
    }

    initPage (elementsCount: number, container: Element): void {
        const popupWrapper = document.createElement('div');
        popupWrapper.classList.add('popup-wrapper');
        const popup = document.createElement('div');
        popup.classList.add('popup');
        const popupTitle = document.createElement('h2');
        popupTitle.classList.add('popup-title');
        popupTitle.innerHTML = 'Выбери <br>сложность';
        const popupButtonList = document.createElement('div');
        popupButtonList.classList.add('popup-button-list', 'button-list');
        const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = 'Старт';
        for (let i = 0; i < elementsCount; i++) {
            const buttonListItem = document.createElement('div');
            buttonListItem.classList.add('button-list-item');
            const input = document.createElement('input');
            input.classList.add('input');
            input.id = `radio-${i + 1}`;
            input.type = 'radio';
            input.name = 'radio';
            input.value = `${i + 1}`;
            const label = document.createElement('label');
            label.setAttribute('for', `radio-${i + 1}`);
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

class GamePage {
    constructor (container: Element, itemsCount: number) {
        this.initPage(container, itemsCount);
    }
    
    initPage (container: Element, itemsCount: number) {
        const gameWrapper = document.createElement('div');
        gameWrapper.classList.add('game-wrapper');
        const gameTop = document.createElement('div');
        gameTop.classList.add('game-top');
        const gameTimer = document.createElement('div');
        gameTimer.classList.add('game-timer');
        const min = document.createElement('div');
        min.classList.add('game-timer-minutes');
        min.textContent = '00';
        const sec = document.createElement('div');
        sec.classList.add('game-timer-seconds');
        sec.textContent = '00';
        gameTimer.appendChild(min);
        gameTimer.appendChild(sec);
        const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = 'Начать заново';
        const gameItems = document.createElement('div');
        gameItems.classList.add('game-items');
        this.initGameItem(gameItems, itemsCount);
        gameTop.appendChild(gameTimer);
        gameTop.appendChild(button);
        gameWrapper.appendChild(gameTop);
        gameWrapper.appendChild(gameItems);
        container.appendChild(gameWrapper);
    }

    initGameItem (container: Element, itemsCount: number): void {
        for (let i = 0; i < itemsCount; i++) {
            const gameItem = document.createElement('div');
            gameItem.classList.add('game-item');
            const gameItemImg = document.createElement('img');
            gameItemImg.src = './img/shirt.png';
            gameItem.appendChild(gameItemImg);
            container.appendChild(gameItem);
        }
    }
}