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
const cards = document.querySelector('.elements');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupCloseAddCardButton = document.querySelector('.popup__close-button_card')
const popupEditButton = document.querySelector('.profile__edit-button');
const popupForm = document.querySelector('.popup__form');
const popupFormAddCard =document.querySelector('.popup__form_add-card');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popupAddButton = document.querySelector('.profile__add-button');
const elementDeleteCard = document.querySelector('.element__delete-button');

let nameInput = document.querySelector('.popup__field_type_name');
let jobInput = document.querySelector('.popup__field_type_description');

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



//popup.addEventListener('click', profileToggleHandler)

// лайк 
const like = function(evt) {
  evt.currentTarget.classList.toggle('element__like-button_active');
}
// слушатель для лайка
//const likeButton = cardsElement.querySelector('.element__like-button').addEventListener('click',like);


// popupAddCard
const placeSubmitHandler = function(evt) {
  evt.preventDefault();

  popupToggle(popupAddCard);
}

const addCardToggleHandler = function() {
  popupToggle(popupAddCard);
}

// удаление картинки
const cardDelete = function(evt) {
  evt.target.closest('.element').remove()
}



// открытие попапа add-card 
popupAddButton.addEventListener('click',() => {
  popupAddCard.classList.toggle('popup_opened')
});
popupCloseAddCardButton.addEventListener('click', addCardToggleHandler);



// закрытие попапа по фону 
const popupBackgroundClose = function(event) {
  if (event.target !== event.currentTarget) 
  { return }
    popupToggle(event.target)
  }
  // слушатели для закрытия по фону
  popupProfile.addEventListener('click', popupBackgroundClose);
  popupAddCard.addEventListener('click', popupBackgroundClose);


// создание и рендеринг массива карточек
function createdCard (card) {
  const cardsTemplate = document.querySelector('.cards-template').content;
  const cardsElement = cardsTemplate.cloneNode(true);
  const elementsAllCards = document.querySelector('.elements')

  cardsElement.querySelector('.element__image').src = card.link;
  cardsElement.querySelector('.element__image').alt = card.name;
  cardsElement.querySelector('.element__title').textContent = card.name;
  cardsElement.querySelector('.element__like-button').addEventListener('click', like);
  cardsElement.querySelector('.element__delete-button').addEventListener('click', cardDelete);
  return cardsElement;
};


//перебор массива
initialCards.forEach(card => {
  createdCard(card)
});

function rendCards(newCards) {
  newCards.forEach(card => {
    cards.prepend(createdCard(card))
  });
}
rendCards(initialCards);


// добавить новую карточку
const elementSubmitHandler = function(evt) {
  evt.preventDefault();

  let newElementNameInput = document.querySelector('.popup__field_type_name-card');
  let newelementLinkInput = document.querySelector('.popup__field_type_link');

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







































