let editbutton = document.querySelector('.profile__button-edit');
let closePopup = document.querySelector(".popup__button-close");
let inputName = document.getElementById("input-name");
let inputJob = document.getElementById("input-job");
let placeName = document.querySelector(".profile__person-name");
let placeJob = document.querySelector(".profile__person-job");
let popupForm = document.querySelector(".popup__form");
let popup = document.querySelector(".popup");

    function openPopUp() {
        popup.classList.add("popup_opened");
        inputJob.value[0].value="";
        inputJob.placeholder=`${inputJob.value}`;
        inputName.value[0].value="";
        inputName.placeholder=`${inputName.value}`;
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
popup_form.addEventListener('submit', inputNameAndJob);
