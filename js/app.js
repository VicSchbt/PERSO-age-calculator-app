const dayInput = document.querySelector('#calculator-date-form__day');
const monthInput = document.querySelector('#calculator-date-form__month');
const yearInput = document.querySelector('#calculator-date-form__year');

const dayResult = document.querySelector('.calculator-result__days span');
const monthResult = document.querySelector('.calculator-result__months span');
const yearResult = document.querySelector('.calculator-result__years span');

const submitBtn = document.querySelector(
	'.calculator-date-form__submit button'
);

submitBtn.addEventListener('click', (event) => {
	event.preventDefault();

	const dayValue = dayInput.value;
	const monthValue = monthInput.value;
	const yearValue = yearInput.value;

	const today = new Date();
	const birthDate = new Date();
	birthDate.setFullYear(yearValue);
	birthDate.setMonth(monthValue - 1);
	birthDate.setDate(dayValue);

	let years = today.getFullYear() - birthDate.getFullYear();
	let months = today.getMonth() - birthDate.getMonth();
	if (months < 0) {
		years--;
		months += 12;
	}
	let days = today.getDate() - birthDate.getDate();
	if (days < 0) {
		months--;
		days += 30;
		if (months < 0) {
			years--;
			months += 12;
		}
	}

	dayResult.innerHTML = days;
	monthResult.innerHTML = months;
	yearResult.innerHTML = years;
});
