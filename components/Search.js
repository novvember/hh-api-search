export default class Search {
  constructor({ formSelector, onSubmit }) {
    this._form = document.querySelector(formSelector);
    this._input = this._form.querySelector('.search__input');
    this._onSubmit = onSubmit;
  }

  getText() {
    return this._input.value.trim();
  }

  blur() {
    this._input.blur();
  }

  submit(text = this.getText()) {
    this._input.value = text;
    this._onSubmit();
  }
}
