// Constants for storage keys
const storageKeyToken = 'readifyUserKey';
const storageKeyDarkMode = 'readifyDarkMode';

// Function to save user data to local storage
const saveUser = (user) =>
  localStorage.setItem(storageKeyToken, JSON.stringify(user));

// Function to load user data from local storage
const loadUser = () => JSON.parse(localStorage.getItem(storageKeyToken));

// Function to logout user by removing user data from local storage
const logoutUser = () => localStorage.removeItem(storageKeyToken);

// Function to save dark mode preference to local storage
const saveDarkMode = (boolean) =>
  localStorage.setItem(storageKeyDarkMode, boolean);

// Function to load dark mode preference from local storage
const loadDarkMode = () => localStorage.getItem(storageKeyDarkMode);

// Object containing storage functions
const storage = {
  saveUser,
  loadUser,
  logoutUser,
  saveDarkMode,
  loadDarkMode,
};

export default storage;
