const photoImage = document.querySelector('.popup__photo');
const photoName = document.querySelector('.popup__photo-name');
const popupPhoto = document.querySelector('.popup_type_photo');

export default class Card {
  constructor(photo, cardSelector, openPopup) {
    this._name = photo.name;
    this._link = photo.link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    // const cardElement = document
    // .querySelector(this._cardSelector)
    // .content
    // .querySelector('.element')
    // .cloneNode(true);

    // return cardElement;
    return this._cardSelector.cloneNode(true);
  }

  _setEventListeners(elementImage, elementName) {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopup(elementImage, elementName);
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeButton();
    });
  }

  // _handleOpenImage(name, link) {
  //   photoImage.src = this._link;
  //   photoName.textContent = this._name;
  //   photoImage.alt = this._name;
    
  //   popupOpen(popupPhoto);
  // }

  _handleLikeButton() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleDeleteCard() {
    this._element.remove();
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
}