export default class Card {
  constructor(photo, cardSelector, myId, openPopupByPhoto, openPopupByDeleteCard, api) {
    this._name = photo.name;
    this._link = photo.link;
    this._id = photo._id;
    this._like = photo.like;
    this._owner = photo.owner;
    this._cardSelector = cardSelector;
    this._openPopupByPhoto = openPopupByPhoto;
    this._openPopupByDeleteCard = openPopupByDeleteCard;
    this._myId = myId;
    this._api = api;
  }

  _getTemplate() {
    // const cardElement = document
    //   .querySelector(this._cardSelector)
    //   .content
    //   .querySelector('.element')
    //   .cloneNode(true);
    
    //   return cardElement;
    return  this._cardSelector.cloneNode(true)
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
    elementCard.id = this._id;

    // счетчик лайков
    if (this._like.length >=1 ) {
      this._scoreLikes.textContent = this._like.length;
    }
    
    //перебор лайков для поиска владельца сайта
    this._like.forEach((likes) => {
      if(likes._id === this._myId) {
        const likeButton = this._element.querySelector('.place__button-like');
        likeButton.classList.add('element__like-button_active');
      }
    })

    //если автор карточки и он же владелец сайта, то добавляем кнопку удалить
    if (this._owner._id === this._myId) {
      const buttonDeleteCard = document.createElement('button');

      buttonDeleteCard.classList.add('.element__delete-button');
      buttonDeleteCard.setAttribute('type', 'button');
      buttonDeleteCard.setAttribute('aria-label', 'Удалить');
      this._element.querySelector('.element').appendChild(buttonDeleteCard);
      
      buttonDeleteCard.addEventListener('click', () => {
        this._openPopupByDeleteCard(this._id);
      })
    }

    this._placeListeners(elementImage, elementName)

    return this._element;
 }

  _likes(evt) {
    // если лайк был проставлен
    if(evt.target.classList.contains('element__like-button_active')) {
      // убрать лайк
      this._api.deleteLike(this._id)
        .then(res => {
          // убрать активацию
          evt.target.classList.remove('element__like-button_active');

          // если количество лайков больше 0
          if (res.like.length >=1 ) {
            //вывести количество лайков
            this._scoreLikes.textContent = res.like.length;
          }
          else {
            // если количество лайков 0 то убрать цифру
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
          this._scoreLikes.textContent = res.like.length
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  // _handleLikeButton(evt) {
  //   evt.target.classList.toggle('element__like-button_active');
  // }

  // _handleDeleteCard() {
  //   this._element.remove()
  // }

  //обработчики
  _setEventListeners(elementImage, elementName) {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopupByPhoto(elementImage, elementName);
    });
    
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._likes(evt)
    });
  }
}