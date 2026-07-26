const tipButtons = document.querySelectorAll('.tip-button[data-percent]');
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const customBtn = document.getElementById('custom-btn');
const customInput = document.getElementById('custom-input');
const peopleError = document.getElementById('people-error');
const numberOfPeopleContainer = document.getElementById('number-of-people-container');
const resetButton = document.getElementById('reset-button');

const tipPerPersonDisplay = document.getElementById('tip-per-person');
const totalPerPersonDisplay = document.getElementById('total-per-person');

function calculateTotal(tipPercent) {
  // get bill value or 0 if not a number
  let bill = parseFloat(billInput.value) || 0;
  let peopleQuantity = peopleInput.value;

  // if peopleQuantity is empty show error state and exit function
  if (peopleQuantity === '') {
    peopleError.classList.remove('hidden');
    numberOfPeopleContainer.classList.add('border-orange');
    peopleInput.setAttribute('aria-invalid', 'true');
    return;
  }

  // convert peopleQuantity to integer
  const people = parseInt(peopleQuantity);

  if (people <= 0) {
    return;
  }

  if (bill < 0) {
    return;
  }

  const totalTip = bill * (tipPercent / 100);
  const totalBillWithTip = bill + totalTip;

  tipPerPersonDisplay.textContent = `$${(totalTip / people).toFixed(2)}`;
  totalPerPersonDisplay.textContent = `$${(totalBillWithTip / people).toFixed(2)}`;

  // make the reset button appear active
  resetButton.classList.add('green-400-bg');

  // set aria-invalid attribute to false
  peopleInput.setAttribute('aria-invalid', 'false');

  // enable reset button
  resetButton.removeAttribute('disabled');
}

// prevent negative numbers from being entered in the bill input
billInput.addEventListener('keydown', (e) => {
  if (e.key === '-') {
    e.preventDefault();
  }
});

// prevent negative numbers from being entered in the custom input
customInput.addEventListener('keydown', (e) => {
  if (e.key === '-') {
    e.preventDefault();
  }
});

// when custom button is clicked, show the custom input and focus on it
customBtn.addEventListener('click', (e) => {
  e.preventDefault();
  customBtn.classList.add('hidden');
  customInput.classList.remove('hidden');
  customInput.focus();
  calculateTotal(0);
})

// calculate total bill with tip
customInput.addEventListener('input', () => {
  let tipPercent = parseFloat(customInput.value) || 0;

  // prevent negative numbers from being entered in the custom input
  if (tipPercent < 0) {
    tipPercent = 0;
    customInput.value = 0;
  }

  calculateTotal(tipPercent);
})

// add event listener to each tip button
tipButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    // hide custom input and show custom button
    customInput.value = '';
    customInput.classList.add('hidden');
    customBtn.classList.remove('hidden');

    // get the value of the particular tip button that was clicked
    const tipPercent = parseFloat(button.dataset.percent);
    calculateTotal(tipPercent);

    // make other buttons inactive
    tipButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // make reset button appear clickable
    resetButton.classList.remove('no-hover');
    resetButton.classList.add('active');
  })
})

peopleInput.addEventListener('input', () => {
  let people = parseInt(peopleInput.value);

  if (people === 0) {
    peopleError.classList.remove('hidden');
    numberOfPeopleContainer.classList.add('border-orange');
    peopleInput.setAttribute('aria-invalid', 'true');
  } else {
    peopleError.classList.add('hidden');
    numberOfPeopleContainer.classList.remove('border-orange');
    peopleInput.setAttribute('aria-invalid', 'false');
  }
})

// prevent negative and decimal values in people input
peopleInput.addEventListener('keydown', (e) => {
  if (e.key === '-' || e.key === '.') {
    e.preventDefault();
  }
})

resetButton.addEventListener('click', () => {
  // if reset button is not active, return
  if (!resetButton.classList.contains('active')) return;

  customInput.value = '';
  customInput.classList.add('hidden');
  customBtn.classList.remove('hidden');
  tipButtons.forEach(btn => btn.classList.remove('active'));
  billInput.value = '';
  peopleInput.value = '';
  peopleError.classList.add('hidden');
  numberOfPeopleContainer.classList.remove('border-orange');
  tipPerPersonDisplay.textContent = '$0.00';
  totalPerPersonDisplay.textContent = '$0.00';
  resetButton.classList.remove('green-400-bg');
  resetButton.classList.add('no-hover');
  resetButton.blur();
})