import Card from '../components/Card.js';
import Results from '../components/Results.js';
import Search from '../components/Search.js';
import Suggests from '../components/Suggests.js';
import HhApi from '../utils/HhApi.js';

const searchForm = document.querySelector('.search__form');
const searchInput = searchForm.querySelector('.search__input');

async function getApiSuggests() {
  const text = search.getText();
  if (text.length < 2) return [];
  return await api.getSuggests(text);
}

async function getLocalSuggests() {
  return [];
}

function handleSuggestClick(text) {
  search.submit(text);
}

async function handleFormSubmit(evt) {
  evt?.preventDefault();
  resultList.clear();
  const text = search.getText();
  if (text.trim() === '') return;

  let prevRequests = [];

  try {
    prevRequests = JSON.parse(localStorage.getItem('requests')) ?? [];
  } catch {
    console.warn("Can't read local storage");
  }

  localStorage.setItem('requests', JSON.stringify([text, ...prevRequests]));

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

const api = new HhApi();
const resultList = new Results('.results__list');
const card = new Card('.card-template');

const search = new Search({
  formSelector: '.search__form',
  onSubmit: handleFormSubmit,
});

const suggests = new Suggests({
  elementSelector: '.search__suggests',
  templateSelector: '.suggest-template',
  getLocalSuggests,
  getApiSuggests,
  onClick: handleSuggestClick,
});

searchInput.addEventListener('input', suggests.update.bind(suggests));
searchForm.addEventListener('submit', handleFormSubmit);
