export default class Card {
  constructor(card, cardSelector, openPopupByPhoto, myId, openPopupDeleteCard, api) {
    this._name = card.name;
    this._link = card.link;
    this._id = card._id;
    this._likes = card.likes;
    this._owner = card.owner;
    this._cardSelector = cardSelector;
    this._openPopupByPhoto = openPopupByPhoto;
    this._openPopupDeleteCard = openPopupDeleteCard;
    this._myId = myId;
    this._api = api;
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
    const elementList = this._element.querySelector('.element__list');
    this._scoreLikes = this._element.querySelector('.element__like-score');

    elementImage.src = this._link;
    elementName.textContent = this._name;
    elementImage.alt = this._name;
    elementList.id = this._id;

    // счетчик лайков
    if (this._likes.length >=1 ) {
      this._scoreLikes.textContent = this._likes.length;
    }
    
    // если id автора карточки = id владельца страницы, то добавить карточке кнопку удаления и навесить на нее листенер
    if (this._owner._id === this._myId) {
      const cardDeleteButton = document.createElement('button');
      cardDeleteButton.classList.add('element__delete-button');
      cardDeleteButton.setAttribute('type', 'button');
      cardDeleteButton.setAttribute('aria-label', 'Удалить');
      this._element.querySelector('.element__list').appendChild(cardDeleteButton);
    
      // добавим листенер для открытия попапа по клику на иконку удаления
      cardDeleteButton.addEventListener('click', () => {
          this._openPopupDeleteCard(this._id);
        })
      }


    //перебор лайков, если лайк владельца то закрасим его
    this._likes.forEach((like) => {
      if(like._id === this._myId) {
        const likeButton = this._element.querySelector('.element__like-button');
        likeButton.classList.add('element__like-button_active');
      }
    })

    this._photoListeners(elementImage, elementName);

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
          evt.target.classList.add('element__like-button_active');
          // обновим цифру
          this._scoreLikes.textContent = res.likes.length;
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  //обработчики
  _photoListeners(elementImage, elementName) {
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._like(evt);
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopupByPhoto(elementImage, elementName);
    });
  }
}