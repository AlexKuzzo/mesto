import '../pages/index.css';
import Api from './Api.js';
import Card from './Card.js';
import {validationConfig, FormValidator} from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithDeleteCard from './PopupWithDeleteCard.js';
import UserInfo from './UserInfo.js';
import {initialCards} from './initialCards.js';
import {popupProfile, popupAddCard, popupPhoto, popupDelete, popupAvatar, cardsAll, popupEditButton, popupFormAddCard,
popupFormProfile, profileName, profileJob, popupAddButton, photoImage, photoName, nameInput, jobInput,
popupSubmitButtonProfile, popupSubmitButtonCards, popupSubmitButtonAvatar, avatarEditButton, cardsTemplate} from '../utils/constants.js'
import {waitLoading} from '../utils/utils.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '9fd6b558-8922-4eb3-a680-6293b0e020a6',
    'Content-Type': 'application/json'
  }
});

// Загрузка данных пользователя с сервера
api.getUserInfo()
  .then((data) => {
    api.userInfo = data
    user.setUserInfo({ name: data.name, about: data.about })
    user.setAvatar(data.avatar)
    // Загрузка карточек с сервера
    api.getInitialCards()
      .then((cards) => {
        renderCards(cards).renderItems()
      })
      .catch((err) => {
        console.log(err) 
      })
  })
  .catch((err) => {
    console.log(err) 
  })

// Изменение данных о пользователе
const handleUserInfo = function (userData) {
  waitLoading(true, popupSubmitButtonProfile)
  api.patchUserInfo(userData.name, userData.about)
    .then((info) => {
      user.setUserInfo(info);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      waitLoading(false, popupSubmitButtonProfile)
    })
}

// Изменение аватарки
const handleAvatar = function (linkObject) {
  waitLoading(true, popupSubmitButtonAvatar)
  api.patchAvatar(linkObject.avatar)
    .then((res) => {
      user.setAvatar(res.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      waitLoading(false, popupSubmitButtonAvatar)
    })
}

// Добавление новой карточки на сервер
const addNewCard = function (card) {
  waitLoading(true, popupSubmitButtonCards)
  api.postNewCard(card.name, card.link)
    .then((card) => {
      renderCards().addNewCard(newCreateCard(card))
      addCardPopup.close()
    })
    .catch((err) => {
      console.log(err) 
    })
    .finally(() => {
      waitLoading(false, popupSubmitButtonCards)
    })
}


function newCreateCard (card) {
  const newElementCard = new Card(card, '.cards-template', handleCardClick, handleClickDeleteCard, api.userInfo._id, api);
  
  return newElementCard.generateCard();
  
}

//удаление карты
const popupDeleteCard = new PopupWithDeleteCard(popupDelete ,api);


const handleClickDeleteCard = function(cardId) {
  popupDeleteCard.open();
  popupDeleteCard.setEventListeners(cardId);
}

const popupWithImage = new PopupWithImage(popupPhoto, photoImage, photoName);

const handleCardClick = function (photoImage, photoName) {
  popupWithImage.open(photoImage, photoName);
}

const renderCards = function(cards) {
  const cardsList = new Section({
    items: cards,
    renderer: (photo) => {
      cardsList.addItem(newCreateCard(photo));
    }
  }, cardsAll)
  return cardsList
}

// profile пользователя
const user = new UserInfo({
  name: profileName,
  job: profileJob
})

//попап добавления карточки
const addCardPopup = new PopupWithForm(popupAddCard, (photo) => {
  addNewCard(photo);
})

//попап аватар
const avatarPopup = new PopupWithForm(popupAvatar, handleAvatar);

// попап профиля
const profilePopup = new PopupWithForm(popupProfile, handleUserInfo);

popupWithImage.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopup.setEventListeners();

// валидация
const editProfileFormValidator = new FormValidator(validationConfig, popupFormProfile);
const addCardFormValidator = new FormValidator(validationConfig, popupFormAddCard);
const avatarFormValidator = new FormValidator(validationConfig, popupAvatar);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

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

//обработчик на аватар
avatarEditButton.addEventListener('click', () => {
  avatarPopup.open()
  avatarFormValidator.deleteErrors();
  avatarFormValidator.resetButtonSubmit();
})