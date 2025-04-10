import { getItem } from './storageUtils.mjs';

export function generateShoppingList() {
  const section = document.querySelector('#shopping-list');
  section.innerHTML = '<h2>Shopping List</h2>';
  const currentUser = getItem('currentUser');
  if (!currentUser || !currentUser.profiles?.length) {
    section.innerHTML += '<p>No user or profiles found.</p>';
    return;
  }

  const saved = currentUser.profiles[0].savedRecipes || [];
  const ingredients = saved.flatMap(recipe => recipe.ingredients);
  const uniqueIngredients = [...new Set(ingredients)];

  const ul = document.createElement('ul');
  uniqueIngredients.forEach(ing => {
    const li = document.createElement('li');
    li.textContent = ing;
    ul.appendChild(li);
  });
  section.appendChild(ul);
}
