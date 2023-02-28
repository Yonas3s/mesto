let editbutton = document.querySelector('.profile__button-edit');
let closePopup = document.querySelector(".popup__button-close");
let inputName = document.getElementById("input-name");
let inputJob = document.getElementById("input-job");
let placeName = document.querySelector(".profile__person-name");
let placeJob = document.querySelector(".profile__person-job");
let popupForm = document.getElementById("popup_form");
let popup = document.querySelector(".popup");

    function openPopUp() {
        popup.classList.add("popup_opened");
        inputJob.value = placeJob.textContent;
        inputName.value = placeName.textContent;
    }

    function closePopUp() {
        popup.classList.remove("popup_opened");
    }

    function inputNameAndJob(evt) {
        evt.preventDefault();
        placeName.textContent = `${inputName.value}`;
        placeJob.textContent = `${inputJob.value}`;
        closePopUp();
    }

editbutton.addEventListener('click', openPopUp);
closePopup.addEventListener('click', closePopUp);
popupForm.addEventListener('submit', inputNameAndJob);
