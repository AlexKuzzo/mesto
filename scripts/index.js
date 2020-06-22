const popup = document.querySelector('.popup');
const popupOverlay = popup.querySelector('.popup__overlay');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupOpenButton = document.querySelector('.profile__edit-button');


const popupForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');

let nameInput = document.querySelector('.popup__field_type_name');
let jobInput = document.querySelector('.popup__field_type_description');


const popupToggle = function () {
  popup.classList.toggle('popup_opened')
  
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
  }
}
popupToggle();

  popupOpenButton.addEventListener('click', popupToggle);
  popupCloseButton.addEventListener('click', popupToggle);
  popupOverlay.addEventListener('click', popupToggle);

function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupToggle();
    
}
    
    popupForm.addEventListener('submit', formSubmitHandler);
    
    










































