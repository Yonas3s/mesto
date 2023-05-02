import Card from "./Card.js";
import FormValidator from "./FormValidation.js";
import { validationClasses } from "./FormValidation.js";

const titleInputCard = document.querySelector('#title-input');
const linkInput = document.querySelector('#link-input');
const formElementProfile = document.querySelector('#popup_form-profile');
const formElementCard = document.querySelector('#popup_form-card');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');

const editBtn = document.querySelector('.profile__button-edit');
const addBtn = document.querySelector('.profile__button-add');
const nameProfile = document.querySelector('.profile__person-name');
const jobProfile = document.querySelector('.profile__person-job');

const popups = document.querySelectorAll('.popup');   
const popupEdit = document.querySelector('#profile');
const popupAdd = document.querySelector('#card');
const popupIncreaseCard = document.querySelector('#view-card');
const popupScalePhoto = document.querySelector('.popup__photo');
const popupScalePhotoDescription = document.querySelector('.popup__description');

const closeBtns = document.querySelectorAll('.popup__button-close');

const cardContainer = document.querySelector('.elements');

const profileFormValidation = new FormValidator(validationClasses, popupEdit);
const cardsFormValidation = new FormValidator(validationClasses, popupAdd);

const initialCards = [
	{
	  name: 'Архыз',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
	  name: 'Челябинская область',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
	  name: 'Иваново',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
	  name: 'Камчатка',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
	  name: 'Холмогорский район',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
	  name: 'Байкал',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
  ];

function openPopup(elem) {
	elem.classList.add('popup_opened');
	document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(elem) {
	elem.classList.remove('popup_opened');
	document.removeEventListener('keydown', closePopupByEsc);
}

closeBtns.forEach(closeCross);

function closeCross(el) {
	const openPopup = el.closest('.popup');
	el.addEventListener('click', () => {
		closePopup(openPopup);
	});
}

function closePopupByEsc(evt) {
	if (evt.key === 'Escape') {
		const openPopup = document.querySelector('.popup_opened');
		closePopup(openPopup);
	} 
}

popups.forEach((popupEl) => {
	popupEl.addEventListener('mousedown', (evt) => {
		if (evt.target === popupEl) {
			closePopup(popupEl);
		}
	})
})

function handleFormSubmitProfile (evt) {
    evt.preventDefault(); 

	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;

	closePopup(popupEdit);
}

const createCard = (item) => {
	const card = new Card(item, '#card-template', openImgPopup)
	const cardElement = card.createCard()
  
	return cardElement
  }
  
  const renderCards = (arrCards) => {
	arrCards.forEach((item) => {
	  cardContainer.append(createCard(item))
	})
  }
  
  const handleFormSubmitCards = (e) => {
	e.preventDefault();
	closePopup(popupAdd)
  
	const newCard = {}
	newCard.name = titleInputCard.value
	newCard.link = linkInput.value
  
	cardContainer.prepend(createCard(newCard))
  
	e.target.reset()
  }
  
  renderCards(initialCards) 

function openImgPopup(name, link) {
	openPopup(popupIncreaseCard);
		popupScalePhoto.src = link;
		popupScalePhoto.alt = name;
		popupScalePhotoDescription.textContent = `${name}`;
	};

editBtn.addEventListener('click', () => {
	openPopup(popupEdit);

	profileFormValidation.resetFormErrorMessages();

	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;
});

addBtn.addEventListener('click', function() {
	openPopup(popupAdd);

	cardsFormValidation.resetFormErrorMessages()
});

formElementProfile.addEventListener('submit', handleFormSubmitProfile);

formElementCard.addEventListener("submit", handleFormSubmitCards);

cardsFormValidation.enableValidation()
profileFormValidation.enableValidation()