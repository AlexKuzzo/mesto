export {waitLoading}

const waitLoading = function (waitLoading, submitButton) {
    if (waitLoading === true) {
      submitButton.textContent = 'Сохранение...';
    }
    else {
      if(submitButton.classList.contains('popup__submit-button_card')) {
        submitButton.textContent = 'Создать';
      }
      else  {
        submitButton.textContent = 'Сохранить';
      }
    }
}
  
