import axios from 'axios';
import backendUrl from '../backendUrl';
import { token } from './auth';

const baseUrl = `${backendUrl}/api/posts`;

// Set the configuration with the token for authenticated requests
const setConfig = () => {
  return {
    headers: { 'x-auth-token': token },
  };
};

// Get all posts with sorting, limit, and pagination
const getPosts = async (sortBy, limit, page) => {
  const response = await axios.get(
    `${baseUrl}/?sortby=${sortBy}&limit=${limit}&page=${page}`
  );
  return response.data;
};

// Get subscribed posts for the user with limit and pagination
const getSubPosts = async (limit, page) => {
  const response = await axios.get(
    `${baseUrl}/subscribed/?limit=${limit}&page=${page}`,
    setConfig()
  );
  return response.data;
};

// Get search results for posts with query, limit, and pagination
const getSearchResults = async (query, limit, page) => {
  const response = await axios.get(
    `${baseUrl}/search/?query=${query}&limit=${limit}&page=${page}`
  );
  return response.data;
};

// Add a new post
const addNew = async (postObj) => {
  const response = await axios.post(`${baseUrl}`, postObj, setConfig());
  return response.data;
};

// Edit a post by ID
const editPost = async (id, postObj) => {
  const response = await axios.patch(`${baseUrl}/${id}`, postObj, setConfig());
  return response.data;
};

// Get comments for a post by ID
const getPostComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`);
  return response.data;
};

// Upvote a post by ID
const upvotePost = async (id) => {
  const response = await axios.post(
    `${baseUrl}/${id}/upvote`,
    null,
    setConfig()
  );
  return response.data;
};

// Downvote a post by ID
const downvotePost = async (id) => {
  const response = await axios.post(
    `${baseUrl}/${id}/downvote`,
    null,
    setConfig()
  );
  return response.data;
};

// Delete a post by ID
const deletePost = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, setConfig());
  return response.data;
};

// Upvote a comment by comment ID and post ID
const upvoteComment = async (postId, commentId) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comment/${commentId}/upvote`,
    null,
    setConfig()
  );
  return response.data;
};

// Downvote a comment by comment ID and post ID
const downvoteComment = async (postId, commentId) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comment/${commentId}/downvote`,
    null,
    setConfig()
  );
  return response.data;
};

// Upvote a reply by reply ID, comment ID, and post ID
const upvoteReply = async (postId, commentId, replyId) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comment/${commentId}/reply/${replyId}/upvote`,
    null,
    setConfig()
  );
  return response.data;
};

// Downvote a reply by reply ID, comment ID, and post ID
const downvoteReply = async (postId, commentId, replyId) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comment/${commentId}/reply/${replyId}/downvote`,
    null,
    setConfig()
  );
  return response.data;
};

// Post a comment for a post by ID
const postComment = async (postId, commentObj) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comment`,
    commentObj,
    setConfig()
  );
  return response.data;
};

// Post a reply for a comment by comment ID and post ID
const postReply = async (postId, commentId, replyObj) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comment/${commentId}/reply`,
    replyObj,
    setConfig()
  );
  return response.data;
};

// Update a comment by comment ID and post ID
const updateComment = async (postId, commentId, commentObj) => {
  const response = await axios.patch(
    `${baseUrl}/${postId}/comment/${commentId}`,
    commentObj,
    setConfig()
  );
  return response.data;
};

// Remove a comment by comment ID and post ID
const removeComment = async (postId, commentId) => {
  const response = await axios.delete(
    `${baseUrl}/${postId}/comment/${commentId}`,
    setConfig()
  );
  return response.data;
};

// Update a reply by reply ID, comment ID, and post ID
const updateReply = async (postId, commentId, replyId, replyObj) => {
  const response = await axios.patch(
    `${baseUrl}/${postId}/comment/${commentId}/reply/${replyId}`,
    replyObj,
    setConfig()
  );
  return response.data;
};

// Remove a reply by reply ID, comment ID, and post ID
const removeReply = async (postId, commentId, replyId) => {
  const response = await axios.delete(
    `${baseUrl}/${postId}/comment/${commentId}/reply/${replyId}`,
    setConfig()
  );
  return response.data;
};

// Object containing post service functions
const postService = {
  getPosts,
  getSubPosts,
  getSearchResults,
  addNew,
  editPost,
  getPostComments,
  upvotePost,
  downvotePost,
  deletePost,
  upvoteComment,
  downvoteComment,
  upvoteReply,
  downvoteReply,
  postComment,
  postReply,
  updateComment,
  removeComment,
  updateReply,
  removeReply,
};

export default postService;
