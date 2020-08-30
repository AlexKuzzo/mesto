const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupPhoto = document.querySelector('.popup_type_photo');
const popupDelete = document.querySelector('.popup_type_delete-card');
const popupAvatar = document.querySelector('.popup_type_avatar');
const cardsAll = document.querySelector('.elements');
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
const popupSubmitButtonProfile = document.querySelector('.popup__submit-button_profile');
const popupSubmitButtonCards = document.querySelector('.popup__submit-button_card');
const popupSubmitButtonAvatar = document.querySelector('.popup__submit-button_avatar');
const avatarEditButton = document.querySelector('.profile__avatar-button');
const cardsTemplate = document.querySelector('.cards-template').content;


export {popup, popupProfile, popupAddCard, popupPhoto, popupDelete, popupAvatar, cardsAll, popupEditButton, popupFormAddCard,
popupFormProfile, profileName, profileJob, popupAddButton, photoImage, photoName, nameInput, jobInput,
popupSubmitButtonProfile, popupSubmitButtonCards, popupSubmitButtonAvatar, avatarEditButton, cardsTemplate}