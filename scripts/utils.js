export  {formReset};



// // открытие попапа
// const popupOpen = function(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', popupEscClose);
//   };

// //закрытие попапа
// const popupClose = function(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', popupEscClose);
//   };

// // закрытие попапа по клавише Esc
// const popupEscClose = function (evt) {
//     if (evt.key === 'Escape') {
//       const popupActive = document.querySelector('.popup_opened')
//       popupClose(popupActive);
//     };
//   };

//очистка формы
const formReset = function (form) {
  form.reset();
};