import '../pages/index.css';
import Card from './Card.js';
import {validationConfig, FormValidator} from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {initialCards} from './initialCards.js';

const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupPhoto = document.querySelector('.popup_type_photo');
const cards = document.querySelector('.elements');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupFormAddCard = document.querySelector('.popup__form_add-card');
const popupFormProfile = document.querySelector('.popup__form_profile');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popupAddButton = document.querySelector('.profile__add-button');
const photoImage = document.querySelector('.popup__photo');
const photoName = document.querySelector('.popup__photo-name');
const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_job');



function newCreateCard (photo, cardsTemplate) {
  const newElementCard = new Card(photo, cardsTemplate, handleCardClick);
  const templateElement = newElementCard.generateCard();

  cardsList.addItem(templateElement);
}

const popupWithImage = new PopupWithImage(popupPhoto, photoImage, photoName);

const handleCardClick = function (photoImage, photoName) {
  popupWithImage.open(photoImage, photoName);
  popupWithImage.setEventListeners();
}

const cardsList = new Section({
  items: initialCards,
  renderer: (photo) => {
    newCreateCard(photo, '.cards-template')
  }
}, cards)

// profile пользователя
const user = new UserInfo({
  name: profileName,
  job: profileJob
})

//попап добавления карточки
const addCardPopup = new PopupWithForm(popupAddCard, function(item) {
  newCreateCard(item, '.cards-template');
}) 

// попап профиля
const profilePopup = new PopupWithForm(popupProfile, function() {
  user.setUserInfo(nameInput, jobInput);
})

popupWithImage.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
cardsList.renderItems();



// валидация
const editProfileFormValidator = new FormValidator(validationConfig, popupFormProfile);
const addCardFormValidator = new FormValidator(validationConfig, popupFormAddCard);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// обработчик на профиль
popupEditButton.addEventListener('click', () => {
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
  profilePopup.open();
  editProfileFormValidator.deleteErrors();
  editProfileFormValidator.resetButtonSubmit();
})

// обработчик на добавление картинки
popupAddButton.addEventListener('click', () => {
  addCardPopup.open();
  addCardFormValidator.deleteErrors();
  addCardFormValidator.resetButtonSubmit();
})