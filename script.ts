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
        this.startPage(elementsCount, container);
    }

    startPage (elementsCount: number, container: Element): void {
        const popupWrapper = document.createElement('div');
        popupWrapper.classList.add('popup-wrapper');
        const popup = document.createElement('div');
        popup.classList.add('popup');
        const popupTitle = document.createElement('h2');
        popupTitle.classList.add('popup__title');
        popupTitle.innerHTML = 'Выбери <br>сложность';
        const popupButtonList = document.createElement('div');
        popupButtonList.classList.add('popup__button-list', 'button-list');
        const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = 'Старт';
        for (let i = 0; i < elementsCount; i++) {
            const buttonListItem = document.createElement('div');
            buttonListItem.classList.add('button-list__item');
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