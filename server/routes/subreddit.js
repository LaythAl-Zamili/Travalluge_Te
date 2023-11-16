const express = require('express');
const { auth } = require('../utils/middleware');
const {
  getSubreddits,
  getSubredditPosts,
  getTopSubreddits,
  createNewSubreddit,
  editSubDescription,
  subscribeToSubreddit,
} = require('../controllers/subreddit');

const router = express.Router();

// Route to get all subreddits
router.get('/', getSubreddits);

// Route to get posts from a specific subreddit
router.get('/r/:subredditName', getSubredditPosts);

// Route to get the top 10 subreddits
router.get('/top10', getTopSubreddits);

// Route to create a new subreddit (requires authentication)
router.post('/', auth, createNewSubreddit);

// Route to edit the description of a subreddit (requires authentication)
router.patch('/:id', auth, editSubDescription);

// Route to subscribe to a subreddit (requires authentication)
router.post('/:id/subscribe', auth, subscribeToSubreddit);

module.exports = router;
