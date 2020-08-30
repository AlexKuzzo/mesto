import Popup from './Popup.js'

export default class PopupWithDeleteCard extends Popup {
  constructor(popup, api) {
    super(popup);
    this._api = api;
  }

  _handleDeleteCard(cardId) {
    this._api.deleteCard(cardId)
      .then(res => {
        const card = document.getElementById(cardId);
        card.remove();
        this.close();
        console.log(res)
      })
      .catch(err => {
        console.log(err)
    })
  }

  setEventListeners(cardId) {
    super.setEventListeners()
    const buttonYes = this._popup.querySelector('.popup__submit-button')
    buttonYes.addEventListener('click', () => {
      this._handleDeleteCard(cardId)
    })
  }
}