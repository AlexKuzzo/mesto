import '../pages/index.css';
import Card from './Card.js';
import {validationConfig, FormValidator} from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {initialCards} from './initialCards.js';
import {popup, popupProfile, popupAddCard, popupPhoto, cards, popupEditButton, popupFormAddCard,
  popupFormProfile, profileName, profileJob, popupAddButton, photoImage, photoName, nameInput, jobInput} from '../utils/constants.js'


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