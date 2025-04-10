export function getItem(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(`Error parsing localStorage item '${key}':`, e);
    return null;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving to localStorage key '${key}':`, e);
  }
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function clearStorage() {
  localStorage.clear();
}