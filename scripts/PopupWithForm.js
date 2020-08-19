import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, submitHandler) {
    super(popup);
    this._form = popup.querySelector('.popup__form');
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__field');
    this._formValue = {};

    this._inputList.forEach(input => {
      this._formValue[input.name] = input.value;
    });
    return this._formValue;
  }

  setEventListeners() {
    super.setEventListeners();

    // закрываем попап при сабмите
    const popupSubmitButton = this._form.querySelector('.popup__submit-button');
    this._form.addEventListener('submit', (evt) => {
      if (popupSubmitButton.classList.contains('popup__submit-button_disabled'))
        {return false}
        else {
          evt.preventDefault();
          this._submitHandler(this._getInputValues());
          this.close();
        }
    })
  }

  close() {
    super.close();
    //сброс формы при закрытии
    this._form.reset();
  }
}