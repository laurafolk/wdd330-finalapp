import { getItem, setItem } from './storageUtils.mjs';

export function login(username, password) {
  const users = getItem('users') || [];
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    setItem('currentUser', user);
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem('currentUser');
}

export function register(username, password) {
  const users = getItem('users') || [];
  if (users.find(u => u.username === username)) return false;

  const newUser = { username, password, profiles: [] };
  users.push(newUser);
  setItem('users', users);
  return true;
}