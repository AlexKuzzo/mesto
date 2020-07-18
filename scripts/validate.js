const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__input-error_visible'
};

// добавления класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  };

// удаления класса с ошибкой
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// проверка на валидность поля
const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// проверка всех полей на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// откл и вкл кнопку при вводе данных в форму
const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// добавим слушатели всем полям формы
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  
  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
    checkInputValidity(formElement, inputElement, {inputErrorClass, errorClass});
    // чтобы проверять его при изменении любого из полей
    toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
    });
  });
};

//очистить ошибки при повторном открытии попапа
const hideError = (form) => { 
  const inputList = Array.from(form.querySelectorAll('.popup__field')) 
  const errorElement = Array.from(form.querySelectorAll('.popup__field-error')) 

  inputList.forEach(input => { 
    input.classList.remove('popup__field_type_error');
  }) 

  errorElement.forEach(error => { 
    error.classList.remove('popup__input-error_visable');
    error.textContent = '' 
  }) 
};

// сброс кнопки submit на попапах при повторе
 const resetButtonSubmit = (popup) => { 
  if (popup === popupProfile) { 
  const submitButton = document.querySelector('.popup__submit-button_profile');
  submitButton.classList.remove('popup__submit-button_disabled'); 
  } 
  else { 
  const submitButton = document.querySelector('.popup__submit-button_card'); 
  submitButton.classList.add('popup__submit-button_disabled'); 
  };
 };

 //добавим всем формам слушатели
 const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
};

//вызываем ее
 enableValidation(validationConfig);