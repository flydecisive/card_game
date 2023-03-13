export class EndPage {
  constructor(
    container: Element,
    message: string,
    time: string,
    imgSource: string,
  ) {
    this.initPage(container, message, time, imgSource);
  }

  initPage(
    container: Element,
    message: string,
    time: string,
    imgSource: string,
  ): void {
    container.innerHTML = "";
    const popupWrapper = document.createElement("div");
    popupWrapper.classList.add("popup-wrapper");
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.classList.add("end-page");
    const popupImg = document.createElement("img");
    popupImg.classList.add("popup-img");
    popupImg.src = imgSource;
    const popupTitle = document.createElement("h2");
    popupTitle.classList.add("popup-title");
    popupTitle.classList.add("end-page-title");
    popupTitle.textContent = message;
    const popupTime = document.createElement("div");
    popupTime.classList.add("popup-time");
    const popupTimeTitle = document.createElement("h3");
    popupTimeTitle.classList.add("popup-time-title");
    popupTimeTitle.textContent = "Затраченное время";
    const popupTimeValue = document.createElement("p");
    popupTimeValue.classList.add("popup-time-value");
    popupTimeValue.textContent = time;
    popupTime.appendChild(popupTimeTitle);
    popupTime.appendChild(popupTimeValue);
    const button = document.createElement("button");
    button.classList.add("button");
    button.textContent = "Играть снова";
    popup.appendChild(popupImg);
    popup.appendChild(popupTitle);
    popup.appendChild(popupTime);
    popup.appendChild(button);
    popupWrapper.appendChild(popup);
    container.appendChild(popupWrapper);
  }
}
