// ---------------------- AUTH ----------------------
function signupUser() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    if (username && password) {
      const userProfile = { username, password, savedRecipes: [], groceryList: [] };
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      alert('Sign-up successful! You can now log in.');
    } else {
      alert('Please enter both username and password.');
    }
  }
  
  function loginUser() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const storedUser = JSON.parse(localStorage.getItem('userProfile'));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      alert('Login successful!');
      document.getElementById('auth-section').style.display = 'none';
      document.getElementById('recipe-section').style.display = 'block';
      document.getElementById('saved-recipes-section').style.display = 'block';
      document.getElementById('grocery-list-section').style.display = 'block';
      document.getElementById('logout-btn').style.display = 'inline-block';
      renderSavedRecipes();
      renderGroceryList();
    } else {
      alert('Invalid login credentials. Please try again.');
    }
  }
  
  document.getElementById('logout-btn').addEventListener('click', function () {
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('recipe-section').style.display = 'none';
    document.getElementById('saved-recipes-section').style.display = 'none';
    document.getElementById('grocery-list-section').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'none';
  });
  
  // ---------------------- FETCH RECIPES ----------------------
  
  document.getElementById('search-bar').addEventListener('input', fetchRecipes);
  
  function fetchRecipes() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const url = 'data.json'; // fallback; can be changed to the real API
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const results = data.recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchQuery)
        );
        displayRecipes(results);
      })
      .catch((err) => {
        console.error('Error loading recipes:', err);
      });
  }
  
  // ---------------------- DISPLAY RECIPE CARDS ----------------------
  
  function displayRecipes(recipes) {
    const container = document.getElementById('recipe-results');
    container.innerHTML = '';
  
    recipes.forEach((recipe) => {
      const card = document.createElement('div');
      card.className = 'card';
  
      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" />
        <h3>${recipe.title}</h3>
        <span class="badge">${recipe.category}</span>
        <button onclick="saveRecipe(${recipe.id})">Save</button>
      `;
  
      container.appendChild(card);
    });
  }
  
  // ---------------------- SAVE & DELETE RECIPES ----------------------
  
  function saveRecipe(id) {
    fetch('data.json')
      .then((response) => response.json())
      .then((data) => {
        const recipe = data.recipes.find((r) => r.id === id);
        let user = JSON.parse(localStorage.getItem('userProfile'));
  
        if (!user.savedRecipes.find((r) => r.id === recipe.id)) {
          user.savedRecipes.push(recipe);
          user.groceryList.push(...recipe.ingredients);
          localStorage.setItem('userProfile', JSON.stringify(user));
          renderSavedRecipes();
          renderGroceryList();
        }
      });
  }
  
  function renderSavedRecipes() {
    const container = document.getElementById('saved-recipes');
    container.innerHTML = '';
    const user = JSON.parse(localStorage.getItem('userProfile'));
  
    user.savedRecipes.forEach((recipe, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" />
        <h3>${recipe.title}</h3>
        <span class="badge">${recipe.category}</span>
        <button onclick="deleteRecipe(${index})">Delete</button>
      `;
      container.appendChild(card);
    });
  }
  
  function deleteRecipe(index) {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    user.savedRecipes.splice(index, 1);
    localStorage.setItem('userProfile', JSON.stringify(user));
    renderSavedRecipes();
  }
  
  // ---------------------- GROCERY LIST ----------------------
  
  function renderGroceryList() {
    const list = document.getElementById('grocery-list');
    list.innerHTML = '';
    const user = JSON.parse(localStorage.getItem('userProfile'));
  
    user.groceryList.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = item;
      const delBtn = document.createElement('button');
      delBtn.textContent = '❌';
      delBtn.onclick = () => {
        user.groceryList.splice(index, 1);
        localStorage.setItem('userProfile', JSON.stringify(user));
        renderGroceryList();
      };
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }
  