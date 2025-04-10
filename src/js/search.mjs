// search.mjs - Recipe Search Module
import { getItem, setItem } from './storageUtils.mjs';

export async function fetchRecipes(query = 'healthy') {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data.meals || [];
  } catch (err) {
    console.error('Error fetching recipes:', err);
    return [];
  }
}

export async function displayRecipes(query) {
  const section = document.querySelector('#search');
  section.innerHTML = `<h2>Search Results for "${query}"</h2>`;
  const recipes = await fetchRecipes(query);

  if (recipes.length === 0) {
    section.innerHTML += '<p>No recipes found.</p>';
    return;
  }

  recipes.forEach(recipe => {
    const div = document.createElement('div');
    div.classList.add('recipe-card');
    div.innerHTML = `
      <h3>${recipe.strMeal}</h3>
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" width="200" />
      <p>${recipe.strInstructions.substring(0, 150)}...</p>
      <button class="save-btn" data-id="${recipe.idMeal}">Save</button>
    `;
    div.querySelector('button').addEventListener('click', () => saveRecipe(recipe));
    section.appendChild(div);
  });
}

function saveRecipe(recipe) {
  const user = getItem('currentUser');
  if (!user) return alert('Please log in.');

  const profile = user.profiles[0];
  if (!profile.savedRecipes) profile.savedRecipes = [];
  if (!profile.savedRecipes.some(r => r.idMeal === recipe.idMeal)) {
    profile.savedRecipes.push({
      idMeal: recipe.idMeal,
      strMeal: recipe.strMeal,
      ingredients: collectIngredients(recipe)
    });
    setItem('currentUser', user);
    alert('Recipe saved!');
  } else {
    alert('Recipe already saved.');
  }
}

function collectIngredients(recipe) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    if (ingredient) ingredients.push(ingredient);
  }
  return ingredients;
}

// Optional: Set up a basic search form handler
export function setupSearchForm() {
  const form = document.querySelector('#searchForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const query = form.querySelector('input').value.trim();
    if (query) {
      displayRecipes(query);
    }
  });
}