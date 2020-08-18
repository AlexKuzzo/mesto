class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = containerSelector;
  }

  renderItems() {
    this._renderedItems.forEach(place => this._renderer(place));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}