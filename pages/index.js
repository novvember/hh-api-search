import Card from '../components/Card.js';
import Results from '../components/Results.js';
import Search from '../components/Search.js';
import HhApi from '../utils/HhApi.js';

const searchForm = document.querySelector('.search__form');

const api = new HhApi();
const resultList = new Results('.results__list');
const card = new Card('.card-template');
const search = new Search('.search__form');

async function handleInputChange(evt) {
  const text = evt.target.value.trim();
  if (text.length < 2) return;

  const suggests = await api.getSuggests(text);
  console.log(suggests);
}

async function handleFormSubmit(evt) {
  evt.preventDefault();
  resultList.clear();
  const text = search.getText();
  if (text.trim() === '') return;

  let cardsData;

  try {
    cardsData = await api.getVacancies(text);
    const cards = card.generateCards(cardsData);
    resultList.renderCards(cards);
  } catch {
    resultList.renderError();
  }

  search.blur();
}

// searchInput.addEventListener('input', handleInputChange);
searchForm.addEventListener('submit', handleFormSubmit);
