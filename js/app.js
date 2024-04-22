const inputs = document.querySelectorAll(
	'.calculator-date-form__date-selectors div input'
);
const labels = document.querySelectorAll(
	'.calculator-date-form__date-selectors div label'
);
const errorFields = document.querySelectorAll(
	'.calculator-date-form__error-message'
);
const results = document.querySelectorAll('.calculator-result p span');
const submitBtn = document.querySelector(
	'.calculator-date-form__submit button'
);

const REQUIRED_FIELD_ERROR_MESSAGE = 'This field is required';
const YEAR_WRONG_FORMAT_ERROR_MESSAGE = 'Must be in the past';
const MONTH_WRONG_FORMAT_ERROR_MESSAGE = 'Must be a valid month';
const DAY_WRONG_FORMAT_ERROR_MESSAGE = 'Must be a valid day';

let inputsValid = true;

const triggerErrorStyle = (label, input, errorField, message) => {
	label.classList.add('error');
	input.classList.add('error');
	errorField.innerHTML = message;
	errorField.classList.remove('hide');
};

const checkInputsValid = () => {
	inputs.forEach((input, index) => {
		// if the field is empty
		if (input.value === '') {
			triggerErrorStyle(
				labels[index],
				input,
				errorFields[index],
				REQUIRED_FIELD_ERROR_MESSAGE
			);
			inputsValid = false;
			// if the year is in the future
		} else if (index === 2 && input.value > new Date().getFullYear()) {
			triggerErrorStyle(
				labels[index],
				input,
				errorFields[index],
				YEAR_WRONG_FORMAT_ERROR_MESSAGE
			);
			inputsValid = false;
			// if the month is not valid (that means that the value is over 11)
		} else if (index === 1 && input.value > 11) {
			triggerErrorStyle(
				labels[index],
				input,
				errorFields[index],
				MONTH_WRONG_FORMAT_ERROR_MESSAGE
			);
			inputsValid = false;
			// if the day is not valid
			// if the month is not an empty field, it checks the value according to it
			// if the month is empty, juste check it is not over 31
		} else if (index === 0) {
			if (
				(inputs[1].value !== '' &&
					(([0, 2, 4, 6, 7, 9, 11].lastIndexOf(inputs[1].value) !== -1 &&
						input.value > 31) ||
						([3, 5, 8, 12].lastIndexOf(inputs[1].value) !== -1 &&
							input.value > 30) ||
						([2].lastIndexOf(inputs[1].value) !== -1 && input.value > 28))) ||
				input.value > 31
			) {
				triggerErrorStyle(
					labels[index],
					input,
					errorFields[index],
					DAY_WRONG_FORMAT_ERROR_MESSAGE
				);
				inputsValid = false;
			}
		}
	});
	const birthDate = new Date(
		inputs[2].value,
		inputs[1].value - 1,
		inputs[0].value
	);
	// if the date is in the future
	if (birthDate > new Date()) {
		inputs.forEach((input, index) => {
			triggerErrorStyle(
				labels[index],
				input,
				errorFields[index],
				YEAR_WRONG_FORMAT_ERROR_MESSAGE
			);
		});
		inputsValid = false;
	}
};

const resetFields = () => {
	inputs.forEach((input, index) => {
		labels[index].classList.remove('error');
		input.classList.remove('error');
		errorFields[index].innerHTML = '';
		errorFields[index].classList.add('hide');
		inputsValid = true;
	});
};

let day = 0,
	month = 0,
	year = 0;
let resultAnimation;

const animateResults = (dayResult, monthResult, yearResult) => {
	if (day <= dayResult) {
		results[2].innerHTML = day;
		day++;
	}
	if (month <= monthResult) {
		results[1].innerHTML = month;
		month++;
	}
	if (year <= yearResult) {
		results[0].innerHTML = year;
		year++;
	}

	if (day === dayResult && month === monthResult && year === yearResult) {
		console.log('animation stops');
		clearInterval(resultAnimation);
	}
};

submitBtn.addEventListener('click', (event) => {
	event.preventDefault();

	if (!inputsValid) resetFields();

	checkInputsValid();

	if (inputsValid) {
		const today = new Date();
		const birthDate = new Date(
			inputs[2].value,
			inputs[1].value - 1,
			inputs[0].value
		);

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

		resultAnimation = setInterval(
			() => animateResults(days, months, years),
			50
		);
	}
});
