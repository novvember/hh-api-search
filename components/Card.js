export default class Card {
  constructor(templateSelector) {
    this._template = document.querySelector(templateSelector);
    this._DEFAULT_ICON = './images/employer-icon.svg';
  }

  _generateCard(card) {
    const element = this._template.content
      .querySelector('.card')
      .cloneNode(true);

    const link = element;
    link.href = card.link;

    const logo = element.querySelector('.card__logo');
    logo.src = card.logo ?? this._DEFAULT_ICON;

    const company = element.querySelector('.card__company');
    company.textContent = card.company;

    const name = element.querySelector('.card__name');
    name.textContent = card.name;

    const city = element.querySelector('.card__city');
    if (card.city) {
      city.textContent = card.city;
    } else {
      city.remove();
    }

    return element;
  }

  generateCards(cards) {
    const elements = [];
    cards.forEach((card) => elements.push(this._generateCard(card)));
    return elements;
  }
}
