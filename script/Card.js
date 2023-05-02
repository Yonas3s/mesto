export default class Card {
  constructor(card, cardTemplate, openImgPopup) {
    this._name = card.name
    this._link = card.link
    this._cardTemplate = cardTemplate
    this._openImgPopup = openImgPopup
  }

  _getTemplate() {
      const cardElement = document
        .querySelector(this._cardTemplate)
        .content
        .querySelector('.card')
        .cloneNode(true);
      return cardElement
  }

  _handleDeleteTrashBtn() {
		this._element.remove();
		this._element = null;
  }

  _handleToggleLike() {
    this._likeButton.classList.toggle('card__caption-like_active');
  }

  _setEventListenerForCard() {
    this._likeButton = this._element.querySelector('.card__caption-like')
    this._cardPhoto = this._element.querySelector(".card__photo")
    this._cardPhoto.addEventListener("click", (e) => {
      this._openImgPopup(this._name, this._link)
    })
    this._element.querySelector(".card__trash").addEventListener("click", () => {
      this._handleDeleteTrashBtn()
    })
    this._likeButton.addEventListener("click", () => {
      this._handleToggleLike()
    })
  }

  createCard() {
    this._element = this._getTemplate()
    this._setEventListenerForCard()

    this._cardPhoto.src = this._link
    this._cardPhoto.alt = this._name

    this._element.querySelector(".card__caption-title").textContent = this._name

    return this._element
  }
}
