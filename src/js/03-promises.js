import Notiflix from 'notiflix';

const promisesForm = document.querySelector('.form');

const createPromisesBtn = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    let setTime = setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const result = { position, delay };
      if (shouldResolve) {
        resolve(result);
      } else {
        reject(result);
      }
    }, delay);
  });
}

promisesForm.addEventListener('submit', event => {
  event.preventDefault();
  const formDelay = Number(promisesForm.elements.delay.value);
  const formStep = Number(promisesForm.elements.step.value);
  const formAmount = Number(promisesForm.elements.amount.value);
  for (let i = 1; i <= formAmount; i += 1) {
    let step = formDelay + formStep * (i - 1);
    createPromise(i, step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
