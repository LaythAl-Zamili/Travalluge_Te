import axios from 'axios';
import backendUrl from '../backendUrl';
import { token } from './auth';

const baseUrl = `${backendUrl}/api/subreddits`;

// Set the configuration with the token for authenticated requests
const setConfig = () => {
  return {
    headers: { 'x-auth-token': token },
  };
};

// Get all subreddits
const getAllSubreddits = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// Get a specific subreddit by name, sorted by a specific criteria, with pagination
const getSubreddit = async (subredditName, sortBy, limit, page) => {
  const response = await axios.get(
    `${baseUrl}/r/${subredditName}/?sortby=${sortBy}&limit=${limit}&page=${page}`
  );
  return response.data;
};

// Create a new subreddit
const createSubreddit = async (subredditObj) => {
  const response = await axios.post(`${baseUrl}`, subredditObj, setConfig());
  return response.data;
};

// Subscribe to a subreddit
const subscribeSub = async (id) => {
  const response = await axios.post(
    `${baseUrl}/${id}/subscribe`,
    null,
    setConfig()
  );
  return response.data;
};

// Update the description of a subreddit
const updateDescription = async (id, descriptionObj) => {
  const response = await axios.patch(
    `${baseUrl}/${id}`,
    descriptionObj,
    setConfig()
  );
  return response.data;
};

// Get the top 10 subreddits
const getTopSubreddits = async () => {
  const response = await axios.get(`${baseUrl}/top10`);
  return response.data;
};

// Object containing subreddit service functions
const subService = {
  getAllSubreddits,
  createSubreddit,
  getSubreddit,
  subscribeSub,
  updateDescription,
  getTopSubreddits,
};

export default subService;
