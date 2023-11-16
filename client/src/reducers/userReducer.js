import authService from '../services/auth';
import userService from '../services/user';
import storageService from '../utils/localStorage';

// User reducer handles the state related to the user
const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'SIGNUP':
      return action.payload;
    case 'LOGOUT':
      return null;
    case 'SET_USER':
      return action.payload;
    case 'SET_AVATAR':
      return { ...state, ...action.payload };
    case 'REMOVE_AVATAR':
      return { ...state, avatar: { exists: false } };
    default:
      return state;
  }
};

// Action creator for user login
export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await authService.login(credentials);
    storageService.saveUser(user);
    authService.setToken(user.token);

    dispatch({
      type: 'LOGIN',
      payload: user,
    });
  };
};

// Action creator for user signup
export const signupUser = (credentials) => {
  return async (dispatch) => {
    const user = await authService.signup(credentials);
    storageService.saveUser(user);
    authService.setToken(user.token);

    dispatch({
      type: 'SIGNUP',
      payload: user,
    });
  };
};

// Action creator for user logout
export const logoutUser = () => {
  return (dispatch) => {
    storageService.logoutUser();
    authService.setToken(null);

    dispatch({
      type: 'LOGOUT',
    });
  };
};

// Action creator for setting the user in the state
export const setUser = () => {
  return (dispatch) => {
    const loggedUser = storageService.loadUser();

    if (loggedUser) {
      authService.setToken(loggedUser.token);

      dispatch({
        type: 'SET_USER',
        payload: loggedUser,
      });
    }
  };
};

// Action creator for setting the user's avatar
export const setAvatar = (avatarImage) => {
  return async (dispatch) => {
    const uploadedAvatar = await userService.uploadAvatar({ avatarImage });
    const prevUserData = storageService.loadUser();
    storageService.saveUser({ ...prevUserData, ...uploadedAvatar });

    dispatch({
      type: 'SET_AVATAR',
      payload: uploadedAvatar,
    });
  };
};

// Action creator for deleting the user's avatar
export const deleteAvatar = () => {
  return async (dispatch) => {
    await userService.removeAvatar();
    const prevUserData = storageService.loadUser();
    storageService.saveUser({ ...prevUserData, avatar: { exists: false } });

    dispatch({
      type: 'REMOVE_AVATAR',
    });
  };
};

export default userReducer;
