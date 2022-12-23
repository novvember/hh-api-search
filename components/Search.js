export default class Search {
  constructor(formSelector) {
    this._form = document.querySelector(formSelector);
    this._input = this._form.querySelector('.search__input');
  }

  getText() {
    return this._input.value.trim();
  }

  blur() {
    this._input.blur();
  }
}
