import Card from './Card.js';
import {validationConfig, FormValidator, resetButtonSubmit} from './FormValidator.js'
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {formReset} from './utils.js';
import {initialCards} from './initialCards.js';

const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupPhoto = document.querySelector('.popup_type_photo');
const cards = document.querySelector('.elements');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupCloseAddCardButton = document.querySelector('.popup__close-button_card')
const popupEditButton = document.querySelector('.profile__edit-button');
const popupForm = document.querySelector('.popup__form');
const popupFormAddCard = document.querySelector('.popup__form_add-card');
const popupFormProfile = document.querySelector('.popup__form_profile');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popupAddButton = document.querySelector('.profile__add-button');
const elementDeleteCard = document.querySelector('.element__delete-button');
const photoImage = document.querySelector('.popup__photo');
const photoName = document.querySelector('.popup__photo-name');
const popupPhotoCloseButton = document.querySelector('.popup__close-button_photo');
const cardsTemplate = document.querySelector('.cards-template').content;
const elementImage = document.querySelector('.element__image');
const elementTitle = document.querySelector('.element__title');
const elementLikeButton = document.querySelector('.element__like-button');

const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_job');
const newElementNameInput = document.querySelector('.popup__field_type_name-card');
const newelementLinkInput = document.querySelector('.popup__field_type_link');


// profile пользователя
const user = new UserInfo({
  name: profileName,
  job: profileJob
})

// попап профиля
const profilePopup = new PopupWithForm(popupProfile, () => {
  user.setUserInfo(nameInput, jobInput);
})

// попап добавления карточек
const addCardPopup = new PopupWithForm(popupAddCard, (item) => {
  //Экземпляр класса Card
  const newElementCard = new Card (item, cardsTemplate, handleCardClick);
  const templateElement = newElementCard.generateCard();

  cardsList.addItem(templateElement);
})

profilePopup.setEventListeners();
addCardPopup.setEventListeners();

// попап фото
const popupWithImage = new PopupWithImage(popupPhoto, photoImage, photoName);
const handleCardClick = function (photoImage, photoName) {
  popupWithImage.open(photoImage, photoName);
  popupWithImage.setEventListeners();
}



//отрисовка элементов на странице
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newElementCard = new Card (item, cardsTemplate, handleCardClick);
    const templateElement = newElementCard.generateCard();

    cardsList.addItem(templateElement);
  },
  cards
});

cardsList.renderItems();

// карточки
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '.cards-template');
  const cardElement = card.generateCard();
  cards.append(cardElement);
});

// валидация
const editProfileFormValidator = new FormValidator(validationConfig, popupFormProfile);
const addCardFormValidator = new FormValidator(validationConfig, popupFormAddCard);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();


// // popupProfile handlers
//   function profileToggleHandler () {
//     popupOpen(popupProfile);
//     formReset(popupFormProfile);
//     deleteErrors(popupProfile);
//     resetButtonSubmit(popupProfile);
    
//     if (popupProfile.classList.contains('popup_opened')) {
//      nameInput.value = profileName.textContent;
//      jobInput.value = profileJob.textContent;
//     };
//   };

//   const profileFormSubmitHandler = function(evt) {
//     evt.preventDefault();

//     profileName.textContent = nameInput.value;
//     profileJob.textContent = jobInput.value;

//     popupClose(popupProfile); 
//   };

// //слушатели popupProfile
//   popupEditButton.addEventListener('click', profileToggleHandler);
//   popupCloseButton.addEventListener('click', () => popupClose(popupProfile));
//   popupForm.addEventListener('submit', profileFormSubmitHandler);

// // закрытие попапа по фону 
// const popupBackgroundClose = function(event) {
//   if (event.target !== event.currentTarget) {
//     return
//   };
//     popupClose(event.target);
// };

// // слушатели для закрытия по фону
//   popupProfile.addEventListener('click', popupBackgroundClose);
//   popupAddCard.addEventListener('click', popupBackgroundClose);
//   popupPhoto.addEventListener('click', popupBackgroundClose);

// обработчики 
popupEditButton.addEventListener('click', () => {
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
  profilePopup.open();
  editProfileFormValidator.deleteErrors();
  editProfileFormValidator

})

// popupAddButton.addEventListener('click', () => {
//   popupOpen(popupAddCard);
//   formReset(popupFormAddCard);
//   deleteErrors(popupFormAddCard);
//   resetButtonSubmit(popupAddCard);
// });


// // закрытие popupAddCard
// popupCloseAddCardButton.addEventListener('click', () => popupClose(popupAddCard));

// // закрытие popupPhoto
// popupPhotoCloseButton.addEventListener('click', () => popupClose(popupPhoto));

// // добавить новую карточку
// const elementSubmitHandler = (evt, cardName, cardImage) => {
//   evt.preventDefault();
//   const card = new Card (cardName.value, cardImage.value, '.cards-template');
//   const cardElement = card.generateCard()
  
//   cards.prepend(cardElement);
//   popupClose(popupAddCard);
// };

// // слушатель на submit card
// popupFormAddCard.addEventListener('submit', (evt) => elementSubmitHandler(evt, newElementNameInput, newelementLinkInput));