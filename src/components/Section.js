export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._renderedItems.forEach(photo => this._renderer(photo));
  }

  addItem(card) {
    this._container.prepend(card);
  }

  addNewCard(card) {
    this._container.prepend(card);
  }
}