// src/main.js
import { setupSearchForm, displayRecipes } from './modules/search.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setupSearchForm();
  displayRecipes('healthy'); // load default results on page load
});
