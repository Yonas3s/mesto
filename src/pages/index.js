import Card from "../components/Card.js";
import FormValidator from "../components/FormValidation.js";
import { validationClasses } from "../components/FormValidation.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import './index.css';


const formElementProfile = document.querySelector('#popup_form-profile');
const formElementCard = document.querySelector('#popup_form-card');
const formElementAvatar = document.querySelector('#popup__form-avatar');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');

const editBtn = document.querySelector('.profile__button-edit');
const addBtn = document.querySelector('.profile__button-add');
const avatarBtn = document.querySelector('.profile__button-avatar');

let userId;

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
	headers: {
		authorization: '919f496e-ef10-4df2-8f38-489395a8fc65',
		'Content-Type': 'application/json'
	}
  })

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
	userInfo.setUserInfo(userData);
	userInfo.setUserAvatar(userData.avatar);
	userId = userData._id;
	cardContainer.renderItems(cards);
}).catch((err) => {
	console.log(err);
})

function openPopupImg(data) {
	popupView.open(data.name, data.link);
}

function handleDelete(card) {
	const submitConfirm = () => {
		api.deleteCard(card.cardId)
		.then((res) => {
			card.deleteCard(res);
			popupDelete.close();
		}).catch((err) => {
			console.log(err);
		})
	}

	popupDelete.open(card);
	popupDelete.setSubmitAction(submitConfirm);
}

function addNewCard (dataCard) {
	const newCard = new Card(dataCard, '#card-template', userId, openPopupImg, 
		(cardId) => {
			api.sendLike(cardId)
			.then((res) => {
				newCard.renderLikes(res)
			}).catch((err) => {
				console.log(err);
			})
		}, (cardId) => {
			api.removeLike(cardId)
			.then((res) => {
				newCard.renderLikes(res)
			}).catch((err) => {
				console.log(err);
			})
		}, handleDelete);

	const newCardElement = newCard.createCard();
	return newCardElement;
}

const cardContainer = new Section (
	{	
		renderer: (item) => {
			cardContainer.addItem(addNewCard(item));
		}
	}, '.elements'
)

const userInfo = new UserInfo({
	nameSelector:'.profile__person-name', 
	jobSelector: '.profile__person-job',
	avatarSelector: '.profile__avatar'
});

const popupView = new PopupWithImage('.popup-view');

const popupDelete = new PopupWithSubmit('.popup-delete');

const popupAvatar = new PopupWithForm('.popup-avatar', {
	submitForm: (data) => {
		popupAvatar.renderLoading(true);
		api.sendNewAvatar(data.link)
		.then((data) => {
			userInfo.setUserAvatar(data.avatar);
			popupAvatar.close();
		}).catch((err) => {
			console.log(err);
		}).finally(() => {
			popupAvatar.renderLoading(false);
		})
	}
});

const popupProfile = new PopupWithForm('.popup-profile', {
	submitForm: (data) => {
		popupProfile.renderLoading(true);
		api.sendUserData(data)
		.then((data) => {
			userInfo.setUserInfo(data);
			popupProfile.close();
		}).catch((err) => {
			console.log(err);
		}).finally(() => {
			popupProfile.renderLoading(false);
		})
	}
});

const popupNewCard = new PopupWithForm('.popup-cards', {
	submitForm: (item) => {
		popupNewCard.renderLoading(true);
		api.sendNewCard(item)
		.then((item) => {
			cardContainer.addItem(addNewCard(item));
			popupNewCard.close();
		}).catch((err) => {
			console.log(err);
		}).finally(() => {
			popupNewCard.renderLoading(false);
		})
	}
});

const formProfileValidator = new FormValidator(validationClasses, formElementProfile);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationClasses, formElementCard);
formCardValidator.enableValidation();

const formAvatarValidator = new FormValidator(validationClasses, formElementAvatar);
formAvatarValidator.enableValidation();

avatarBtn.addEventListener('click', function() {
	popupAvatar.open();
	formAvatarValidator.cleanupValidation();
})

editBtn.addEventListener('click', function() {
	popupProfile.open();
	
	const dataUser = userInfo.getUserInfo();
	nameInput.value = dataUser.name;
	jobInput.value = dataUser.about;

	formProfileValidator.cleanupValidation();
});

addBtn.addEventListener('click', function() {
	popupNewCard.open();
	formCardValidator.cleanupValidation();
});

popupAvatar.setEventListeners();
popupProfile.setEventListeners();
popupNewCard.setEventListeners();
popupView.setEventListeners();
popupDelete.setEventListeners();