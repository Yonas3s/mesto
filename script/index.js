const titleInputCard = document.querySelector('#input-title');
const linkInput = document.querySelector('#input-link');
const formElementProfile = document.querySelector('#popup_form-profile');
const formElementCard = document.querySelector('#popup_form-card');
const nameInput = document.querySelector('#input-name');
const jobInput = document.querySelector('#input-job');

const editBtn = document.querySelector('.profile__button-edit');
const addBtn = document.querySelector('.profile__button-add');
const nameProfile = document.querySelector('.profile__person-name');
const jobProfile = document.querySelector('.profile__person-job');

const popups = document.querySelectorAll('.popup');   
const popupEdit = document.querySelector('#profile');
const popupAdd = document.querySelector('#card');
const popupIncreaseCard = document.querySelector('#view-card');
const popupScalePhoto = document.querySelector('.popup__photo');
const popupDescription = document.querySelector('.popup__description');

const closeBtns = document.querySelectorAll('.popup__button-close');
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
	
	const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

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

function closePopupBtn(el) {
	el.classList.remove('popup_opened');
}

closeBtns.forEach(closePopup);

function closePopup(el) {
	const openPopup = el.closest('.popup');
	el.addEventListener('click', () => {
		closePopupBtn(openPopup);
	});
}

function handleFormSubmitProfile (evt) {
    evt.preventDefault(); 

	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;

	closePopupBtn(popupEdit);
}

// убрать весь код, которой манипулирует с массивами
function createCard(evt) {
	evt.preventDefault(); 

	const newCard = {
		name: titleInputCard.value,
		link: linkInput.value
	};
	initialCards.splice(0, 0, newCard);

	titleInputCard.value = '';
	linkInput.value = '';
	fillCard(initialCards[0]);
	closePopupBtn(popupAdd);
}

function clickDeleteBtn(evt) {
	const button = evt.target;
	const card = button.closest('.card');
	card.remove();
} 

function openImgPopup(evt) {
	openPopup(popupIncreaseCard);

		const openCard = evt.target.closest('.card');
		const cardImg = evt.target.getAttribute('src');
		const cardAltImg = evt.target.getAttribute('alt');
		const cardTitle = openCard.querySelector('.card__caption-title').textContent;

		popupScalePhoto.src = cardImg;
		popupScalePhoto.alt = `${cardAltImg}`;
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

formElementProfile.addEventListener('submit', handleFormSubmitProfile);

formElementCard.addEventListener('submit', createCard);