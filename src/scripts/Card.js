// const photoImage = document.querySelector('.popup__photo');
// const photoName = document.querySelector('.popup__photo-name');
// const popupPhoto = document.querySelector('.popup_type_photo');

export default class Card {
  constructor(photo, cardSelector, openPopup) {
    this._name = photo.name;
    this._link = photo.link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    return this._cardSelector.cloneNode(true);
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

  generateCard() {
    this._element = this._getTemplate();
    const elementImage = this._element.querySelector('.element__image');
    const elementName = this._element.querySelector('.element__title');
    this._setEventListeners(elementImage, elementName);

    elementImage.src = this._link;
    elementName.textContent = this._name;
    elementImage.alt = this._name;
    
    return this._element;
  }

  _handleDeleteCard() {
    this._element.remove()
  }

  _setEventListeners(elementImage, elementName) {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopup(elementImage, elementName);
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._handleLikeButton(evt);
    });
  }
}