export const validationClasses = ({
	activeErrorBorder: 'popup__input_type_error',
	activeErrorText: 'popup__text-error_active',
	inactiveClassButton: 'popup__btn-form_inactive',
	inputSelector: '.popup__input',
	buttonSelector: '.popup__btn-form',
	formSelector: '.popup__form',
});

export default class FormValidator {
  constructor(validationClasses, popupForm) {
    this._formSelector = validationClasses.formSelector
    this._inputSelector = validationClasses.inputSelector
    this._buttonSelector = validationClasses.buttonSelector
    this._inactiveClassButton = validationClasses.inactiveClassButton
    this._activeErrorBorder = validationClasses.activeErrorBorder
    this._activeErrorText = validationClasses.activeErrorText
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

  _setListener(form) {
    this._disableBtn(this._btnEl)

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(form, inputEl)
        if (this._hasInvalidinput(this._inputList)) {
          this._disableBtn(this._btnEl)
        } else this._activeBtn(this._btnEl)
      })
    })
  }

  _checkInputValidity(form, inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(form, inputEl, inputEl.validationMessage, this._activeErrorBorder, this._activeErrorText)
    } else {
      this._hideInputError(form, inputEl, this._activeErrorBorder, this._activeErrorText)
    }
  }

  _showInputError(form, inputEl, errorMessage, activeErrorBorder, activeErrorText) {
    const errorEl = form.querySelector(`.${inputEl.id}-error`)
    inputEl.classList.add(activeErrorBorder)
    errorEl.textContent = errorMessage
    errorEl.classList.add(activeErrorText)
  }

  _hideInputError(form, inputEl, activeErrorBorder, activeErrorText) {
    const errorEl = form.querySelector(`.${inputEl.id}-error`)
    inputEl.classList.remove(activeErrorBorder)
    errorEl.classList.remove(activeErrorText)
    errorEl.textContent = ""
  }

  _hasInvalidinput(inputList) {
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid
    })
  }

  resetFormErrorMessages() {
    this._disableBtn(this._btnEl)

    this._inputList.forEach((input) => {
      input.value = ""
      input.classList.remove("popup__input_type_error")
    })
    this._errorMessages.forEach((errorMessage) => {
      errorMessage.textContent = ""
    })
  }
  
  enableValidation() {
    const form = this._popupForm.querySelector(this._formSelector)

    form.addEventListener("submit", (e) => {
      e.preventDefault()
    })

    this._setListener(form)
  }
}
