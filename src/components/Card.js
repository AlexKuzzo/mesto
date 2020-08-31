export default class Card {
  constructor(photo, cardSelector, myId, openPopupByPhoto, openPopupByDeleteCard, handleDeleteClick, api) {
    this._name = photo.name;
    this._link = photo.link;
    this._id = photo._id;
    this._likes = photo.likes;
    this._owner = photo.owner;
    this._cardSelector = cardSelector;
    this._openPopupByPhoto = openPopupByPhoto;
    this._openPopupByDeleteCard = openPopupByDeleteCard;
    this._myId = myId;
    this._api = api;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
    
  }

  generateCard() {
    this._element = this._getTemplate();
    const elementImage = this._element.querySelector('.element__image');
    const elementName = this._element.querySelector('.element__title');
    const elementCard = this._element.querySelector('.element');
    this._scoreLikes = this._element.querySelector('.element__like-score');

    elementImage.src = this._link;
    elementName.textContent = this._name;
    elementImage.alt = this._name;
    // elementCard.id = this._myId;

    // счетчик лайков
    if (this._likes.length >=1 ) {
      this._scoreLikes.textContent = this._likes.length;
    }
    
    //перебор лайков для поиска владельца сайта
    this._likes.forEach((like) => {
      if(like._id === this._myId) {
        const likeButton = this._element.querySelector('.element__like-button');
        likeButton.classList.add('element__like-button_active');
      }
    })

    if (this._owner && this._owner._id !== this._myId) {
      this._element.querySelector('.element__delete-button').remove();
    }

    this._setEventListeners(elementImage, elementName);

    return this._element;
 }

  _like(evt) {
    // если лайк был проставлен
    if(evt.target.classList.contains('element__like-button_active')) {
      // убрать лайк
      this._api.deleteLike(this._id)
        .then(res => {
          // убрать активацию
          evt.target.classList.remove('element__like-button_active');

          // если количество лайков больше 0
          if (res.likes.length >=1 ) {
            //вывести количество лайков
            this._scoreLikes.textContent = res.likes.length;
          }
          else {
            // убрать цифру 0
            this._scoreLikes.textContent = '';
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      // поставить лайк
      this._api.putLike(this._id)
        .then(res => {
          // добавить активацию
          evt.target.classList.add('element__like-button_active')
          // обновим цифру
          this._scoreLikes.textContent = res.likes.length
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  //обработчики
  _setEventListeners(elementImage, elementName) {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopupByPhoto(elementImage, elementName);
    });

    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._like(evt)
    });
  }
}