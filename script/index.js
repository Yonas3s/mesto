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
const createBtn = document.querySelector('.popup__btn-form');

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

	cardElementPhoto.addEventListener('click', openImgPopup);
	
	return cardElement;
}

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

// Функция закрытия попапа нажатием на кнопку Esc
function closePopupByEsc(evt) {
	if (evt.key === 'Escape') {
		const openPopup = document.querySelector('.popup_opened');
		closePopup(openPopup);
	} 
}

// закрытие попапа кликом на оверлей
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

function renderCard(data, conteyner){
    conteyner.prepend(fillCard(data))
}

initialCards.forEach(function(el) {
    renderCard(el, cardContainer);
} );

function createCard(evt) {
    evt.preventDefault(); 
    const newCard = {
        name: titleInputCard.value,
        link: linkInput.value
    };
    renderCard(newCard, cardContainer)
    titleInputCard.value = '';
    linkInput.value = '';
    closePopup(popupAdd);
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
		popupScalePhotoDescription.textContent = cardTitle;
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