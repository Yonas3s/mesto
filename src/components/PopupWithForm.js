import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
  	}

  _getInputValues() {
	this._inputValue = {};
	
	this._inputs.forEach(input => {
		this._inputValue[input.name] = input.value;
		console.log(this._inputValue)
	});
	
	return this._inputValue;
	}

	setEventListeners() {
	super.setEventListeners();
	this._form.addEventListener('submit', (evt) => {
		evt.preventDefault();
		this._handleFormSubmit(this._getInputValues());
		this.close();
	} )
    }

  close() {
    super.close();
    this._form.reset();
	}
}