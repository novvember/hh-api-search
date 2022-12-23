import Card from '../components/Card.js';
import Results from '../components/Results.js';
import HhApi from '../utils/HhApi.js';

const searchForm = document.querySelector('.search__form');
const searchInput = document.querySelector('.search__input');

async function handleInputChange(evt) {
  const text = evt.target.value.trim();
  if (text.length < 2) return;

  const suggests = await api.getSuggests(text);
  console.log(suggests);
}

async function handleFormSubmit(evt) {
  evt.preventDefault();

  resultList.clear();

  const text = searchInput.value;
  if (text.trim() === '') return;

  let cardsData;

  try {
    cardsData = await api.getVacancies(text);
  } catch {
    resultList.renderError();
  }

  const cards = card.getCards(cardsData);
  resultList.renderCards(cards);
}

const api = new HhApi();
const resultList = new Results('.results__list');
const card = new Card('.card-template');

// searchInput.addEventListener('input', handleInputChange);
searchForm.addEventListener('submit', handleFormSubmit);
