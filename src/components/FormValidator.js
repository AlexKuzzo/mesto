export {validationConfig, FormValidator};

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__input-error_visible',
    errorSelector: '.popup__input-error'
};

class FormValidator {
  constructor (valConfig, formElement) {
    this._inputSelector = valConfig.inputSelector;
    this._submitButtonSelector = valConfig.submitButtonSelector;
    this._inactiveButtonClass = valConfig.inactiveButtonClass;
    this._inputErrorClass = valConfig.inputErrorClass;
    this._errorClass = valConfig.errorClass;
    this._formElement = formElement; //форма
    this._errorSelector = valConfig.errorSelector;
  }

  // добавления класса с ошибкой
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    //показать ошибку
    errorElement.classList.add(this._errorClass);
    };

  // удаления класса с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // проверка на валидность поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // проверка всех полей на валидность
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // откл и вкл кнопку при вводе данных в форму
  _toggleButtonState (inputList) {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    if(this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'true');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    };
  };

  // добавим слушатели всем полям формы
  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  
    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState(inputList);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      // чтобы проверять его при изменении любого из полей
      this._toggleButtonState(inputList);
      });
    });
  };

  //добавим всем формам слушатели
  enableValidation () {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  //удалить ошибки при повторном открытии попапа
  deleteErrors() { 
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)) 
    const errorElement = Array.from(this._formElement.querySelectorAll(this._errorSelector)) 
    inputList.forEach(input => { 
      input.classList.remove(this._inputErrorClass);
    });
    errorElement.forEach(error => { 
      error.classList.remove(this._errorClass);
      error.textContent = '';
    });
  };

  // кнопка submit активна
  _enableSubmit() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  //кнопка submit неактивна
  _desableSubmit() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }
  
  // сброс кнопки submit при повторе уже заполненого поля в попапе profile
  resetButtonSubmit() {
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    if (this._buttonElement.classList.contains('popup__submit-button_profile')) {
      this._enableSubmit();
    }
    else { 
      this._desableSubmit();
    };
  };
}