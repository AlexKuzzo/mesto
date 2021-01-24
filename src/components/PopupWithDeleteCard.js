import Popup from './Popup.js'

export default class PopupWithDeleteCard extends Popup {
  constructor(popup) {
    super(popup);
    this._buttonYes = this._popup.querySelector('.popup__submit-button');
  }

  setSubmitAction(action) {
    this._action = action;
  }

  setEventListeners() {
    super.setEventListeners()
      this._buttonYes.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._action();
    })
  }
}