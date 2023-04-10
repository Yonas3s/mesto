const showInputError = (formElement, inputElement, errorMessage, classSet, activeErrorText) => {
	const formError = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(classSet.activeErrorBorder);
	formError.textContent = errorMessage;
	formError.classList.add(classSet.activeErrorText);
}
const hideInputError = (formElement, inputElement, classSet) => {
	const formError = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(classSet.activeErrorBorder);
	formError.classList.remove(classSet.activeErrorText);
	formError.textContent = '';
}
const isValid = (formElement, inputElement, classSet) => {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage, classSet);
	} else {
		hideInputError(formElement, inputElement, classSet);
	}
}

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	})
}

const toggleButton = (inputList, buttonElement, classSet) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(classSet.inactiveClassButton);
		buttonElement.setAttribute('disabled', 'true');
	} else {
		buttonElement.classList.remove(classSet.inactiveClassButton);
		buttonElement.removeAttribute('disabled');
	}
}

const setEventListener = (formElement, classSet) => {
	const inputList = Array.from(formElement.querySelectorAll(classSet.inputSelector));
	const buttonElement = formElement.querySelector(classSet.buttonSelector);
	toggleButton(inputList, buttonElement, classSet);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			isValid(formElement, inputElement, classSet);
			
			toggleButton(inputList, buttonElement, classSet);
		});
	});
}

const enableValidation = (classSet) => {
	const formList = Array.from(document.querySelectorAll(classSet.formSelector));
	formList.forEach((formElement) => {
		setEventListener(formElement, classSet);
	});
}

const validationClasses = ({
	activeErrorBorder: 'popup__input_type_error',
	activeErrorText: 'popup__text-error_active',
	inactiveClassButton: 'popup__btn-form_inactive',
	inputSelector: '.popup__input',
	buttonSelector: '.popup__btn-form',
	formSelector: '.popup__form',
});

enableValidation(validationClasses);
