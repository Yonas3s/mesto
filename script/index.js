let editbutton = document.querySelector('.profile__button-edit');
let closePopup = document.querySelector(".popup__button-close");
let inputName = document.querySelector(".popup__input-name");
let inputJob = document.querySelector(".popup__input-job");
let placeName = document.querySelector(".profile__person-name");
let placeJob = document.querySelector(".profile__person-job");
let popupOpened = document.querySelector(".popup_opened");
let popupContainer = document.querySelector(".popup__container");
let saveForm = document.querySelector(".popup__button-save");

    function openPopUp() {
        popupContainer.classList.add("popup_opened");  
    }

    function closePopUp() {
        popupContainer.classList.remove("popup_opened");
    }

    function inputNameAndJob(evt) {
        evt.preventDefault();
        placeName.textContent = `${inputName.value}`;
        placeJob.textContent = `${inputJob.value}`;
        closePopUp();
    }

editbutton.addEventListener('click', openPopUp);
closePopup.addEventListener('click', closePopUp);
popup_form.addEventListener('submit', inputNameAndJob);
