import axios from 'axios';
import backendUrl from '../backendUrl';
import { token } from './auth';

const baseUrl = `${backendUrl}/api/users`;

// Set the configuration with the token for authenticated requests
const setConfig = () => {
  return {
    headers: { 'x-auth-token': token },
  };
};

// Get user information by username with pagination
const getUser = async (username, limit, page) => {
  const response = await axios.get(
    `${baseUrl}/${username}/?limit=${limit}&page=${page}`
  );
  return response.data;
};

// Upload avatar for the user
const uploadAvatar = async (avatarObj) => {
  const response = await axios.post(
    `${baseUrl}/avatar`,
    avatarObj,
    setConfig()
  );
  return response.data;
};

// Remove avatar for the user
const removeAvatar = async () => {
  const response = await axios.delete(`${baseUrl}/avatar`, setConfig());
  return response.data;
};

// Object containing user service functions
const userService = { getUser, uploadAvatar, removeAvatar };

export default userService;
