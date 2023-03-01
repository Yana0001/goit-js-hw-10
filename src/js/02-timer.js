import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

class CountdownTimer {
  constructor(
    startBtnSelector,
    dateChosenSelector,
    daysSelector,
    hoursSelector,
    minutesSelector,
    secondsSelector
  ) {
    this.startBtn = document.querySelector(startBtnSelector);
    this.dateChosen = document.querySelector(dateChosenSelector);
    this.d = document.querySelector(daysSelector);
    this.h = document.querySelector(hoursSelector);
    this.m = document.querySelector(minutesSelector);
    this.s = document.querySelector(secondsSelector);
    this.timer = null;
    this.startBtn.disabled = true;
    this.init();
  }

  init() {
    const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose: (selectedDate) => {
        if (selectedDate[0] <= new Date()) {
          this.startBtn.disabled = true;
          Notiflix.Notify.failure("<Будь ласка, обери дату в майбутньому>");
        } else {
          this.startBtn.disabled = false;
          this.startBtn.addEventListener(
            "click",
            this.countdownTime.bind(this)
          );
        }
      },
    };
    flatpickr(this.dateChosen, options);
  }

  countdownTime() {
    this.timer = setInterval(() => {
      this.startBtn.disabled = true;
      const dateChoosenMs = new Date(
        this.dateChosen.value.replace(/-/g, "/")
      ).getTime();
      const now = new Date().getTime();
      const timeLeft = dateChoosenMs - now;

      const { days, hours, minutes, seconds } = this.convertMs(timeLeft);

      this.d.innerHTML = days < 10 ? this.addLeadingZero(days) : days;
      this.h.innerHTML = hours < 10 ? this.addLeadingZero(hours) : hours;
      this.m.innerHTML = minutes < 10 ? this.addLeadingZero(minutes) : minutes;
      this.s.innerHTML = seconds < 10 ? this.addLeadingZero(seconds) : seconds;

      if (timeLeft < 1000) {
        clearInterval(this.timer);
        this.startBtn.disabled = false;
      }
    }, 1000);
  }

  addLeadingZero(value) {
    const stringValue = String(value);
    return stringValue.padStart(2, "0");
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}

const countdownTimer = new CountdownTimer(
  "button[data-start]",
  "#datetime-picker",
  "[data-days]",
  "[data-hours]",
  "[data-minutes]",
  "[data-seconds]"
);
