export {popupOpen, popupClose, resetButtonSubmit};

// открытие попапа
const popupOpen = function(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', popupEscClose);
  };

//закрытие попапа
const popupClose = function(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', popupEscClose);
  };

// закрытие попапа по клавише Esc
const popupEscClose = function (evt) {
    if (evt.key === 'Escape') {
      const popupActive = document.querySelector('.popup_opened')
      popupClose(popupActive);
    };
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