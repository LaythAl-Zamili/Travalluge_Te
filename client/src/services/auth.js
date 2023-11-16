import axios from 'axios';
import backendUrl from '../backendUrl';

export let token = null;

// Set the token value
const setToken = (newToken) => {
  token = newToken;
};

// Perform a login request
const login = async (credentials) => {
  const response = await axios.post(`${backendUrl}/api/login`, credentials);
  return response.data;
};

// Perform a signup request
const signup = async (enteredData) => {
  const response = await axios.post(`${backendUrl}/api/signup`, enteredData);
  return response.data;
};

// Object containing authentication service functions
const authService = { setToken, login, signup };

export default authService;
