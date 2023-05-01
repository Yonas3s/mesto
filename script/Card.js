export default class Card {
    constructor(card, cardTemplate, openImgPopup) {
      this._name = card.name
      this._link = card.link
      this._cardTemplate = cardTemplate
      this._openImgPopup = openImgPopup
    }

    _getTemplate() {
        const cardElement = this._cardTemplate.querySelector(".card").cloneNode(true)
    
        return cardElement
    }

    _handleDeleteTrashBtn(e) {
        const _deleteCard = e.target.closest(".card")
        _deleteCard.remove()
    }

    _handleToggleLike(e) {
      if (e.target.classList.contains("card__caption-like")) {
        e.target.classList.toggle("card__caption-like_active")
      }
    }
  
    _setEventListenerForCard() {
      this._element.querySelector(".card__photo").addEventListener("click", (e) => {
        this._openImgPopup(e)
      })
      this._element.querySelector(".card__trash").addEventListener("click", (e) => {
        this._handleDeleteTrashBtn(e)
      })
      this._element.addEventListener("click", (e) => {
        this._handleToggleLike(e)
      })
    }
  
    createCard() {
      this._element = this._getTemplate()
      this._setEventListenerForCard()
  
      const cardImg = this._element.querySelector(".card__photo")
  
      cardImg.src = this._link
      cardImg.alt = this._name
  
      this._element.querySelector(".card__caption-title").textContent = this._name
  
      return this._element
    }
  }
  