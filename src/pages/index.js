import Card from "../components/Card.js";
import FormValidator from "../components/FormValidation.js";
import { validationClasses } from "../components/FormValidation.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';

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


const formProfileValidator = new FormValidator(validationClasses, formElementProfile);
formProfileValidator.enableValidation();


const formCardValidator = new FormValidator(validationClasses, formElementCard);
formCardValidator.enableValidation();
  
function openPopupPhoto (card) {
	scalePhoto.open(card.name, card.link);
}

function addNewCard (item) {
	const newCard = new Card(item, '#card-template', openPopupPhoto);
	const newCardEl = newCard.createCard();
	return newCardEl;
}

const cardContainer = new Section(
	{
		items: initialCards,
		renderer: (item) => {
			cardContainer.addItem(addNewCard(item));
		},
	}, ".elements"
)

  cardContainer.renderItems();

const userInfo = new UserInfo({
	nameSelector: '.profile__person-name', 
	jobSelector: '.profile__person-job'
});

const popupWithProfile = new PopupWithForm(".popup-profile",
	{handleFormSubmit: (data) => {
		userInfo.setUserInfo(data.name, data.job);
	}}
);

const popupWithCards = new PopupWithForm(".popup-cards", 
	{handleFormSubmit: (item) => {
		cardContainer.addItem(addNewCard(item));
	}}
);

popupWithProfile.setEventListeners();
popupWithCards.setEventListeners();
const scalePhoto = new PopupWithImage('.popup_type_view')
scalePhoto.setEventListeners();

editBtn.addEventListener("click", function () {
	popupWithProfile.open();

  	const dataUser = userInfo.getUserInfo();
	
  	nameInput.value = dataUser.name;
  	jobInput.value = dataUser.job;

	formProfileValidator.resetFormErrorMessages();
});

addBtn.addEventListener("click", () => {
  formCardValidator.resetFormErrorMessages();
  popupWithCards.open();
});