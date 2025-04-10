import { generateShoppingList } from './shoppingList.mjs';

export function initRouter() {
  window.addEventListener('hashchange', routeChange);
  routeChange();
}

function routeChange() {
  const hash = window.location.hash.slice(1) || 'auth';
  const sections = document.querySelectorAll('main > section');

  sections.forEach(section => {
    section.style.display = section.id === hash ? 'block' : 'none';
  });

  if (hash === 'shopping') {
    generateShoppingList();
  }
}
