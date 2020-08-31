export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._renderedItems.forEach(card => this._renderer(card));
  }

  addItem(card) {
    this._container.append(card);
  }

  addNewCard(card) {
    this._container.prepend(card);
  }
}