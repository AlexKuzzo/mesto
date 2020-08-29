import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup, photoInPopup, namePhotoInPopup) {
    super(popup);
    this._photoInPopup = photoInPopup;
    this._namePhotoInPopup = namePhotoInPopup;
  }

  open(photoImage, photoName) {
    super.open();
    
    this._photoInPopup.src = photoImage.src;
    this._photoInPopup.alt = photoImage.alt;
    this._namePhotoInPopup.textContent = photoName.textContent;
  }
}