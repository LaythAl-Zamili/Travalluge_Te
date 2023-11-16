import storageService from '../utils/localStorage';

// Reducer function for handling the theme (dark mode) state
const themeReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      // Toggles the dark mode state
      return !state;
    default:
      return state;
  }
};

// Action creator for toggling the dark mode
export const toggleDarkMode = (isDarkMode) => {
  return (dispatch) => {
    // Save the dark mode preference to local storage
    storageService.saveDarkMode(isDarkMode);

    // Dispatch an action to toggle the dark mode state
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };
};

// Action creator for setting the initial dark mode state
export const setDarkMode = () => {
  return (dispatch) => {
    // Load the dark mode preference from local storage
    const isDarkMode = storageService.loadDarkMode();

    // If the dark mode preference is 'true', dispatch an action to toggle the dark mode state
    if (isDarkMode === 'true') {
      dispatch({ type: 'TOGGLE_DARK_MODE' });
    }
  };
};

export default themeReducer;
