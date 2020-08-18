import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popup, photoInPopup, namePhotoInPopup) {
    super(popup);
    this._photoInPopup = photoInPopup;
    this._namePhotoInPopup = namePhotoInPopup;
  }

  open(elementImage, elementName) {
    super.open();
    
    this._photoInPopup.src = elementImage.src;
    this._photoInPopup.alt = elementImage.alt;
    this._namePhotoInPopup.textContent = elementName.textContent;
  }
}