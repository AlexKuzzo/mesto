export default class Popup {
  constructor(popup) {
  this._popup = popup;
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this._popupCloseButton.addEventListener('mousedown', (evt) => {
      this.close();
    });
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target !== evt.currentTarget)
      {return}
      this.close();
    });
  }
}