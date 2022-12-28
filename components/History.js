export default class History {
  constructor({ elementSelector, templateSelector, getRequests, onClick }) {
    this._element = document.querySelector(elementSelector);
    this._template = document.querySelector(templateSelector);
    this._ITEM_SELECTOR = '.history__item';
    this._MAX_COUNT = 3;
    this._getRequests = getRequests;
    this._onClick = onClick;
  }

  _generateElement(text) {
    const element = this._template.content
      .querySelector(this._ITEM_SELECTOR)
      .cloneNode(true);

    const link = element.querySelector('.history__link');
    link.textContent = text;

    link.addEventListener('click', () => this._onClick(text));

    return element;
  }

  _clear() {
    this._element.innerHTML = '';
  }

  update() {
    this._clear();

    const requests = this._getRequests();

    requests.slice(0, this._MAX_COUNT).forEach((text) => {
      this._element.append(this._generateElement(text));
    });
  }
}
