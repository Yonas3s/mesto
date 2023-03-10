const titleInput = document.getElementById('input-title');
const linkInput = document.getElementById('input-link');
const formElementProfile = document.getElementById('popup_form-profile');
const formElementCard = document.getElementById('popup_form-card');
const nameInput = document.getElementById('input-name');
const jobInput = document.getElementById('input-job');

const editBtn = document.querySelector('.profile__button-edit');
const addBtn = document.querySelector('.profile__button-add');
const nameProfile = document.querySelector('.profile__person-name');
const jobProfile = document.querySelector('.profile__person-job');

const popup = document.querySelectorAll('.popup');   
const popupEdit = document.getElementById('profile');
const popupAdd = document.getElementById('card');
const popupView = document.getElementById('view-card');
const popupPhoto = document.querySelector('.popup__photo');
const popupDescription = document.querySelector('.popup__description');

const closeBtn = document.querySelectorAll('.popup__button-close');
const saveBtn = document.querySelector('.popup__bytton-save');
const createBtn = document.querySelector('.popup__button-submit');

const cardContainer = document.querySelector('.elements');
const imageCard = document.querySelector('.card__photo');
const titleCard = document.querySelector('.card__caption-title');
const cardTemplate = document.querySelector('#card-temlate').content;

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
}

initialCards.forEach(function(el) {
	cardContainer.prepend(fillCard(el));
} );

function fillCard(element) {
	
	const cardElement = cardTemplate.cloneNode(true);
	
	const cardElementPhoto = cardElement.querySelector('.card__photo');

	cardElementPhoto.src = element.link;
	
	cardElementPhoto.alt = `${element.name}`;
	
	cardElement.querySelector('.card__caption-title').textContent = element.name;

	cardElement.querySelector('.card__caption-like').addEventListener('click', function(evt) {
		evt.target.classList.toggle('card__caption-like_active');
	});

	const deleteBtn = cardElement.querySelector('.card__trash');
	deleteBtn.addEventListener('click', clickDeleteBtn); 
	
	cardContainer.prepend(cardElement);

	cardElementPhoto.addEventListener('click', openImgPopup);
	
	return cardElement;
}

function closePopupFormBtn(el) {
	el.classList.remove('popup_opened');
}

closeBtn.forEach(closePopup);

function closePopup(el) {
	const openPopup = el.closest('.popup');
	el.addEventListener('click', () => {
		openPopup.classList.remove('popup_opened');
	});
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 

	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;

	closePopupFormBtn(popupEdit);
}

function createCard(evt) {
	evt.preventDefault(); 

	const newCard = {
		name: titleInput.value,
		link: linkInput.value
	};
	initialCards.splice(0, 0, newCard);

	titleInput.value = '';
	linkInput.value = '';
	fillCard(initialCards[0]);
	closePopupFormBtn(popupAdd);
}

function clickDeleteBtn(evt) {
	const button = evt.target;
	const card = button.closest('.card');
	card.remove();
} 

function openImgPopup(evt) {
	openPopup(popupView);

		const openCard = evt.target.closest('.card');
		const cardImg = evt.target.getAttribute('src');
		const cardAltImg = evt.target.getAttribute('alt');
		const cardTitle = openCard.querySelector('.card__caption-title').textContent;

		popupPhoto.src = cardImg;
		popupPhoto.alt = `${cardAltImg}`;
		popupDescription.textContent = cardTitle;
	};

editBtn.addEventListener('click', function() {
	openPopup(popupEdit);
	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;
});

addBtn.addEventListener('click', function() {
	openPopup(popupAdd);
});

formElementProfile.addEventListener('submit', handleFormSubmit);

formElementCard.addEventListener('submit', createCard);