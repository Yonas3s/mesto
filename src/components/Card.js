export default class Card {
	constructor(card, cardTemplate, userId, openImgPopup, handlePutLike, handleRemoveLike, handleOpenPopupDelete) {
		this._cardDate= card;
		this._name = card.name;
		this._link = card.link;
		this.cardId = card._id;
		this._cardTemplate = cardTemplate;
		this._userId = userId;
		this._openImgPopup = openImgPopup;
		this._handlePutLike = handlePutLike;
		this._handleRemoveLike = handleRemoveLike;
		this._handleOpenPopupDelete = handleOpenPopupDelete;
	}

	_getTemplate() {
		const cardElement = document
		.querySelector(this._cardTemplate)
		.content
		.querySelector('.card')
		.cloneNode(true);
		
		return cardElement;
		
	}

	createCard() {
		this._element = this._getTemplate();
		this._cardImage = this._element.querySelector('.card__photo');
		this._likeButton = this._element.querySelector('.card__caption-like');
		this._elementTitle = this._element.querySelector('.card__caption-title');
		this._trashButton = this._element.querySelector('.card__trash');
		this._setEventListeners();
		
		this.renderLikes(this._cardDate);

		if(this._cardDate.owner._id !== this._userId) {
			this._trashButton.classList.add('card__trash_disabled');
		}

		this._cardImage.src = this._link;
		this._elementTitle.textContent = this._name;
		this._cardImage.alt = `На фото ${this._name}`;

		return this._element;
	}

	deleteCard() {
		this._element.remove();
		this._element = null;
	}

	_checkLikes() {
		return this._likes.find((like) => like._id === this._userId)
	}

	renderLikes(card) {
		this._likes = card.likes;
		this._quantityLikes = this._element.querySelector('.card__quantity-like');

		this._quantityLikes.textContent = this._likes.length;

		if(this._checkLikes()) {
			this._likeButton.classList.add('card__caption-like_active');
		} else {
			this._likeButton.classList.remove('card__caption-like_active');
		}
	}

	_processingLike() {
		if(this._checkLikes()) {
			this._handleRemoveLike(this.cardId);
		} else {
			this._handlePutLike(this.cardId);
		}
	}

	_setEventListeners() {
		this._cardImage.addEventListener('click', () => {
			this._openImgPopup({
				name: this._name, 
				link: this._link});
		})
		this._trashButton.addEventListener('click', () => {
			this._handleOpenPopupDelete(this);
		});
		this._likeButton.addEventListener('click', () => {
			this._processingLike();
		});
	}
}