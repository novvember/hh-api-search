export default class Results {
  constructor(listSelector) {
    this._list = document.querySelector(listSelector);
  }

  clear() {
    this._list.innerHTML = '';
  }

  renderCards(cards) {
    this.clear();

    cards.forEach((card) => {
      this._list.append(card);
    });
  }

  renderError() {
    this._list.innerHTML = '¯\\_(ツ)_/¯';
  }
}
