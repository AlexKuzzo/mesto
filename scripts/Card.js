
import {popupOpen, popupClose} from './utils.js';

export class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenImage();
    });

    document.querySelector('.popup__close-button').addEventListener('click', () => {
      this._handleCloseImage();
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeButton();
    });
  }

  _handleOpenImage(name, link) {
    const photoImage = document.querySelector('.popup__photo');
    const photoName = document.querySelector('.popup__photo-name');
    const popupPhoto = document.querySelector('.popup_type_photo');

    photoImage.src = this._link;
    photoName.textContent = this._name;
    photoImage.alt = this._name;
    
    popupOpen(popupPhoto);
  }

  _handleCloseImage() {
    const popupPhoto = document.querySelector('.popup_type_photo');
    popupClose(popupPhoto);
  }

  _handleLikeButton() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;
    
    return this._element;
  }
}
