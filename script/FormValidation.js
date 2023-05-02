export const validationClasses = ({
	activeErrorBorder: 'popup__input_type_error',
	activeErrorText: 'popup__text-error_active',
	inactiveClassButton: 'popup__btn-form_inactive',
	inputSelector: '.popup__input',
	buttonSelector: '.popup__btn-form',
	formSelector: '.popup__form',
});

export default class FormValidator {
  constructor(classSelectors, popupForm) {
    this._formSelector = classSelectors.formSelector
    this._inputSelector = classSelectors.inputSelector
    this._buttonSelector = classSelectors.buttonSelector
    this._inactiveClassButton = classSelectors.inactiveClassButton
    this._activeErrorBorder = classSelectors.activeErrorBorder
    this._activeErrorText = classSelectors.activeErrorText
    this._popupForm = popupForm
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector))
    this._btnEl = this._popupForm.querySelector(this._buttonSelector)
    this._errorMessages = Array.from(this._popupForm.querySelectorAll(".popup__text-error"))
  }

  _disableBtn(btnEl) {
    btnEl.classList.add(this._inactiveClassButton)
    btnEl.setAttribute("disabled", true)
  }

  _activeBtn(btnEl) {
    btnEl.classList.remove(this._inactiveClassButton)
    btnEl.removeAttribute("disabled")
  }

  _setListener() {
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl)
        if (this._hasInvalidinput(this._inputList)) {
          this._disableBtn(this._btnEl)
        } else this._activeBtn(this._btnEl)
      })
    })
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _showInputError(inputEl, errorMessage) {
    const errorEl = this._popupForm.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.add(this._activeErrorBorder);
    errorEl.textContent = errorMessage;
    errorEl.classList.add(this._activeErrorText);
  }

  _hideInputError(inputEl) {
    const errorEl = this._popupForm.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.remove(this._activeErrorBorder);
    errorEl.classList.remove(this._activeErrorText);
    errorEl.textContent = "";
  }

  _hasInvalidinput(inputList) {
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    })
  }

  resetFormErrorMessages() {
    this._disableBtn(this._btnEl)
    this._inputList.forEach((inputEl) => {
			this._hideInputError(inputEl);
		})
  }
  
  enableValidation() {
    this._setListener()
  }
}
