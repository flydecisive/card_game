export function timeChange(min: Element, sec: Element): void {
  let seconds = 0;
  let minutes = 0;

  setInterval(function () {
    seconds += 1;
    if (seconds > 59) {
      minutes += 1;
      seconds = 0;
      if (minutes < 10) {
        min.innerHTML = `0${minutes}`;
      } else {
        min.innerHTML = `${minutes}`;
      }
    }
    if (seconds < 10) {
      sec.innerHTML = `0${seconds}`;
    } else {
      sec.innerHTML = `${seconds}`;
    }
  }, 1000);
}
