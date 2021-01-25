import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import {validationConfig, FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteCard from '../components/PopupWithDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import {popupProfile, popupAddCard, popupPhoto, popupDelete, popupAvatar, cardsAll, popupEditButton, popupFormAddCard,
popupFormProfile, profileName, profileJob, popupAddButton, photoImage, photoName, nameInput, jobInput,
popupSubmitButtonProfile, popupSubmitButtonCards, popupSubmitButtonAvatar, avatarEditButton, cardsTemplate, initialCards} from '../utils/constants.js'
import {waitLoading} from '../utils/utils.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '6af0716c-c3e9-4822-a150-9ccc6645330e',
    'Content-Type': 'application/json'
  }
});

// Загрузка данных пользователя с сервера
api.getUserInfo()
  .then((data) => {
    api.userInfo = data
    user.setUserInfo({ name: data.name, about: data.about })
    user.setAvatar(data.avatar)
  })
  .catch((err) => {
    console.log(err) 
  })

// Загрузка карточек с сервера
  api.getInitialCards()
    .then((cards) => {
    cardsList.renderItems(cards)
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
      cardsList.addNewCard(newCreateCard(card))
      addCardPopup.close()
    })
    .catch((err) => {
      console.log(err) 
    })
    .finally(() => {
      waitLoading(false, popupSubmitButtonCards)
    })
}

//создание новой карточки
function newCreateCard (card) {
  const newElementCard = new Card(card, '.cards-template', handleCardClick, api.userInfo._id, handleClickDeleteCard, api);
  
  return newElementCard.generateCard();
}

//удаление карты
const popupDeleteCard = new PopupWithDeleteCard(popupDelete);

function handleClickDeleteCard (cardId, card) {
  popupDeleteCard.setSubmitAction(() => {
    api.deleteCard(cardId)
    .then((res) => {
    // const card = document.querySelector('.element')
    card.remove()
    popupDeleteCard.close();
    console.log(res)
    })
    .catch((err) => {
      console.log(err);
    });
  });
  popupDeleteCard.open();
};

popupDeleteCard.setEventListeners();

//функция клика по фото
const popupWithImage = new PopupWithImage(popupPhoto, photoImage, photoName);
popupWithImage.setEventListeners()

const handleCardClick = function (photoImage, photoName) {
  popupWithImage.open(photoImage, photoName);
}

const cardsList = new Section({
  renderer: (photo) => {
    cardsList.addItem(newCreateCard(photo));
  }
}, cardsAll)

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
});

// обработчик на добавление картинки
popupAddButton.addEventListener('click', () => {
  addCardPopup.open();
  addCardFormValidator.deleteErrors();
  addCardFormValidator.resetButtonSubmit();
});

//обработчик на аватар
avatarEditButton.addEventListener('click', () => {
  avatarPopup.open()
  avatarFormValidator.deleteErrors();
  avatarFormValidator.resetButtonSubmit();
});