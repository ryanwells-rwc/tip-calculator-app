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
  const bill = parseFloat(billInput.value) || 0;
  const peopleQuantity = peopleInput.value;

  if (peopleQuantity === '') {
    peopleError.classList.remove('hidden');
    numberOfPeopleContainer.classList.add('border-orange');
    return;
  }

  const people = parseInt(peopleQuantity);

  const totalTip = bill * (tipPercent / 100);
  const totalBillWithTip = bill + totalTip;

  document.getElementById('tip-per-person').textContent = `$${(totalTip / people).toFixed(2)}`;
  document.getElementById('total-per-person').textContent = `$${(totalBillWithTip / people).toFixed(2)}`;

  resetButton.classList.add('green-400-bg');
}

billInput.addEventListener('keydown', (e) => {
  if (e.key === '-') {
    e.preventDefault();
  }
});

customInput.addEventListener('keydown', (e) => {
  if (e.key === '-') {
    e.preventDefault();
  }
});

customBtn.addEventListener('click', (e) => {
  e.preventDefault();
  customBtn.classList.add('hidden');
  customInput.classList.remove('hidden');
  customInput.focus();
  calculateTotal(0);
})

customInput.addEventListener('input', () => {
  let tipPercent = parseFloat(customInput.value) || 0;

  if (tipPercent < 0) {
    tipPercent = 0;
    customInput.value = 0;
  }

  calculateTotal(tipPercent);
})

tipButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    customInput.value = '';
    customInput.classList.add('hidden');
    customBtn.classList.remove('hidden');
    const tipPercent = parseFloat(button.dataset.percent);
    calculateTotal(tipPercent);

    tipButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    resetButton.classList.remove('no-hover');
  })
})

peopleInput.addEventListener('input', () => {
  const people = parseInt(peopleInput.value);

  if (people === 0) {
    peopleError.classList.remove('hidden');
    numberOfPeopleContainer.classList.add('border-orange');
  } else {
    peopleError.classList.add('hidden');
    numberOfPeopleContainer.classList.remove('border-orange');
  }
})

peopleInput.addEventListener('keydown', (e) => {
  if (e.key === '-' || e.key === '.') {
    e.preventDefault();
  }
})

resetButton.addEventListener('click', () => {
  customInput.value = '';
  customInput.classList.add('hidden');
  customBtn.classList.remove('hidden');
  tipButtons.forEach(btn => btn.classList.remove('active'));
  billInput.value = '';
  peopleInput.value = '';
  peopleError.classList.add('hidden');
  numberOfPeopleContainer.classList.remove('border-orange');
  //calculateTotal(0);
  tipPerPersonDisplay.textContent = '$0.00';
  totalPerPersonDisplay.textContent = '$0.00';
  resetButton.classList.remove('green-400-bg');
  resetButton.classList.add('no-hover');
  resetButton.blur();
})