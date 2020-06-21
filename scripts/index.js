const popup = document.querySelector('.popup');
const popupOverlay = popup.querySelector('.popup__overlay');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupOpenButton = document.querySelector('.profile__edit-button');


const popupForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');

let nameInput = document.querySelector('.popup__field_type_name');
let descriptionInput = document.querySelector('.popup__field_type_description');


const popupToggle = function () {
  popup.classList.toggle('popup_opened')
  
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
  }
}

function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    popupToggle();
}
    popupOpenButton.addEventListener('click', popupToggle);
    popupCloseButton.addEventListener('click', popupToggle);
    popupForm.addEventListener('submit', formSubmitHandler);
    popupOverlay.addEventListener('click', popupToggle);
    










































