const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popupAddButton = document.querySelector('.profile__add-button');
const elementDeleteCard = document.querySelector('.element__delete-button');
const photoImage = document.querySelector('.popup__photo');
const photoName = document.querySelector('.popup__photo-name');
const popupPhotoCloseButton = document.querySelector('.popup__close-button_photo');
const elementImage = document.querySelector('.element__image');
const elementTitle = document.querySelector('.element__title');
const elementLikeButton = document.querySelector('.element__like-button');

const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_description');
const newElementNameInput = document.querySelector('.popup__field_type_name-card');
const newelementLinkInput = document.querySelector('.popup__field_type_link');

// переключатель всех попапов 
const popupToggle = function(popup) {
  popup.classList.toggle('popup_opened');
}

// popupProfile handlers
  function profileToggleHandler () {
    popupToggle(popupProfile);

    if (popupProfile.classList.contains('popup_opened')) {
     nameInput.value = profileName.textContent;
     jobInput.value = profileJob.textContent;
    }
  };

  const profileFormSubmitHandler = function(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupToggle(popupProfile); 
  }

//слушатели popupProfile
  popupEditButton.addEventListener('click', profileToggleHandler);
  popupCloseButton.addEventListener('click', profileToggleHandler);
  popupForm.addEventListener('submit', profileFormSubmitHandler);

// создать лайки
const like = function(evt) {
  evt.currentTarget.classList.toggle('element__like-button_active');
}

// открытие и закрытие popupAddCard
popupAddButton.addEventListener('click', () => popupToggle(popupAddCard));
popupCloseAddCardButton.addEventListener('click', () => popupToggle(popupAddCard));

// удаление карточки
const cardDelete = function(evt) {
  evt.target.closest('.element').remove()
}

// popupPhoto
const openPopupPhoto = function(evt) {
  photoImage.src = evt.currentTarget.src;
  photoName.textContent = evt.currentTarget.alt;
  photoImage.alt = evt.currentTarget.alt;

  popupToggle(popupPhoto)
}

// закрытие popupPhoto
popupPhotoCloseButton.addEventListener('click', () => popupToggle(popupPhoto));

// создание и рендеринг массива карточек
function createdCard (card) {
  const cardsTemplate = document.querySelector('.cards-template').content;
  const cardsElement = cardsTemplate.cloneNode(true);
  const cardsElementImage = cardsElement.querySelector('.element__image');
  const cardsElementTitle = cardsElement.querySelector('.element__title');
  const cardsElementLikeButton = cardsElement.querySelector('.element__like-button');
  const cardsElementDeleteButton = cardsElement.querySelector('.element__delete-button');
  // наполняем из массива
  cardsElementImage.src = card.link; 
  cardsElementImage.alt = card.name; 
  cardsElementTitle.textContent = card.name; 
  cardsElementLikeButton.addEventListener('click', like); 
  cardsElementDeleteButton.addEventListener('click', cardDelete); 
  cardsElementImage.addEventListener('click', openPopupPhoto);
  return cardsElement;
};

//перебор массива
function rendCards(newCards) {
  newCards.forEach(card => {
    cards.prepend(createdCard(card))
  });
}
rendCards(initialCards);

// добавить новую карточку
const elementSubmitHandler = function(evt) {
  evt.preventDefault();

  const elementFormName = {
    name: newElementNameInput.value,
    link: newelementLinkInput.value
  }
  cards.prepend(createdCard(elementFormName));
  popupToggle(popupAddCard);

  //обнулить поля
  newElementNameInput.value = '';
  newelementLinkInput.value = '';
} 
// слушатель на submit card
popupFormAddCard.addEventListener('submit', elementSubmitHandler);