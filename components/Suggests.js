export default class Suggests {
  constructor({
    elementSelector,
    templateSelector,
    getLocalSuggests,
    getApiSuggests,
    onClick,
  }) {
    this._suggests = document.querySelector(elementSelector);
    this._template = document.querySelector(templateSelector);
    this._ITEM_SELECTOR = '.search__suggest';

    this._getLocalSuggests = getLocalSuggests;
    this._getApiSuggests = getApiSuggests;
    this._onClick = onClick;

    this._TOTAL_MAX = 10;
    this._LOCAL_MAX = 5;
  }

  _clear() {
    this._suggests.innerHTML = '';
  }

  _generateElement(text, isLocal = false) {
    const element = this._template.content
      .querySelector(this._ITEM_SELECTOR)
      .cloneNode(true);

    const link = element.querySelector('.search__suggest-link');
    link.textContent = text;

    if (isLocal) {
      link.classList.add('search__suggest-link_type_local');
    }

    link.addEventListener('click', () => this._onClick(text));

    return element;
  }

  async update() {
    this._clear();

    const localSuggests = await this._getLocalSuggests(this._LOCAL_MAX);

    localSuggests.forEach((text) => {
      this._suggests.append(this._generateElement(text, true));
    });

    const apiSuggests = await this._getApiSuggests();

    apiSuggests.slice(0, this._TOTAL_MAX - localSuggests.length).forEach((text) => {
      this._suggests.append(this._generateElement(text));
    });
  }
}
