import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popup) {
    super(popup);
  }

  setSubmitAction(submitAction) {
    this._submitAction = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitAction();
    })
  }
}