import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateTimer = document.querySelector('.timer');
const dateInput = document.querySelector('input#datetime-picker');
const dateBtn = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

dateTimer.style.display = 'flex';
dateTimer.style.alignItems = 'center';
dateTimer.style.justifyContent = 'space-between';
dateTimer.style.marginInline = '200px';
dateTimer.style.marginBlock = '50px';
dateTimer.style.fontSize = '25px';

dateBtn.disabled = true;

let timer;

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let selectedDatesMs = selectedDates[0].getTime();
    let todaysDateMs = new Date().getTime();
    if (selectedDatesMs < todaysDateMs) {
      window.alert('Please choose a date in the future');
    } else {
      dateBtn.disabled = false;
      let calculateMs = selectedDatesMs - todaysDateMs;

      const dateBtnOnClick = () => {
        const addLeadingZero = value => value.toString().padStart(2, '0');

        const timer = setInterval(() => {
          const second = 1000;
          const minute = second * 60;
          const hour = minute * 60;
          const day = hour * 24;

          const days = Math.floor(calculateMs / day);
          const hours = Math.floor((calculateMs % day) / hour);
          const minutes = Math.floor(((calculateMs % day) % hour) / minute);
          const seconds = Math.floor(
            (((calculateMs % day) % hour) % minute) / second
          );

          timerDays.textContent = addLeadingZero(days);
          timerHours.textContent = addLeadingZero(hours);
          timerMinutes.textContent = addLeadingZero(minutes);
          timerSeconds.textContent = addLeadingZero(seconds);

          calculateMs -= 1000;

          if (calculateMs < 1000) {
            clearInterval(timer);
            timerSeconds.textContent = 0;
          }
        }, 1000);
      };
      dateBtn.addEventListener('click', dateBtnOnClick);
    }
  },
};

flatpickr(dateInput, options);
