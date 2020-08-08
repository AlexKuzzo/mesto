export default class Card {
  constructor(title, imgLink, cardSelector) {
    this._title = title;
    this._imgLink = imgLink;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _handleOpenImage () {
    
  }
}