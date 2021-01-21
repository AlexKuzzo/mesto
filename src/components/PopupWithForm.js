import Popup  from './Popup.js';

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

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      //исправил ошибку по ревью
      //вызовем функцию _submitHandler и передадим ей _getInputValues c ее выполненной работой
      this._submitHandler(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    //сброс формы при закрытии
    this._form.reset();
  }
}