
export default class Section {
	constructor({ renderer }, cardContainer) {
		this._renderer = renderer;
		this._container = document.querySelector(cardContainer);
	}

	addItem(element) {
		this._container.prepend(element);
	}

	renderItems(cards) {
		cards.forEach((card) => { //Object.keys(cards)
			this._renderer(card);
		})
	}
}