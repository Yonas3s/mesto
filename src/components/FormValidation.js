export const validationClasses = ({
	activeErrorBorder: 'popup__input_type_error',
	activeErrorText: 'popup__text-error_active',
	inactiveClassButton: 'popup__btn-form_inactive',
	inputSelector: '.popup__input',
	buttonSelector: '.popup__btn-form',
	formSelector: '.popup__form',
});

export default class FormValidator {
	constructor(classSelectors, form) {
		this._activeErrorBorder = classSelectors.activeErrorBorder;
		this._activeErrorText = classSelectors.activeErrorText;
		this._inactiveClassButton = classSelectors.inactiveClassButton;
		this._inputSelector = classSelectors.inputSelector
		this._buttonSelector = classSelectors.buttonSelector;
		this._formSelector = classSelectors.formSelector;
		this._form = form;
		this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
		this._button = this._form.querySelector(this._buttonSelector);
	}

	_showInputError(inputElement, errorMessage) {
		const formError = this._form.querySelector(`.${inputElement.id}-error`);

		inputElement.classList.add(this._activeErrorBorder);
		formError.textContent = errorMessage;
		formError.classList.add(this._activeErrorText);
	}

	_hideInputError(inputElement) {
		const formError = this._form.querySelector(`.${inputElement.id}-error`);
		
		inputElement.classList.remove(this._activeErrorBorder);
		formError.classList.remove(this._activeErrorText);
		formError.textContent = '';
	}

	_isValid(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	}

	_hasInvalidInput(inputList) {
		return inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		})
	}

	_toggleButton() {
		if (this._hasInvalidInput(this._inputList)) {
			this._button.classList.add(this._inactiveClassButton);
			this._button.setAttribute('disabled', 'true');
		} else {
			this._button.classList.remove(this._inactiveClassButton);
			this._button.removeAttribute('disabled');
		}
	}

	_setEventListener() {
		this._toggleButton();

		this._inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			this._isValid(inputElement);
			
			this._toggleButton();
		});
	});
	}
	
	resetFormErrorMessages() {
		this._toggleButton();

		this._inputList.forEach((inputElement) => {
			this._hideInputError(inputElement);
		})
	}

	enableValidation() {
		this._setEventListener();
	}
}