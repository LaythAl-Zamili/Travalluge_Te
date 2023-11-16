const express = require('express');
const { auth } = require('../utils/middleware');
const {
  getPosts,
  getSubscribedPosts,
  getSearchedPosts,
  getPostAndComments,
  createNewPost,
  updatePost,
  deletePost,
} = require('../controllers/post');
const { upvotePost, downvotePost } = require('../controllers/postVote');
const {
  postComment,
  deleteComment,
  updateComment,
  postReply,
  deleteReply,
  updateReply,
} = require('../controllers/postComment');
const {
  upvoteComment,
  downvoteComment,
  upvoteReply,
  downvoteReply,
} = require('../controllers/commentVote');

const router = express.Router();

// CRUD posts routes

// Route to get all posts
router.get('/', getPosts);

// Route to search posts
router.get('/search', getSearchedPosts);

// Route to get a post and its comments
router.get('/:id/comments', getPostAndComments);

// Route to get posts from subscribed subreddits (requires authentication)
router.get('/subscribed', auth, getSubscribedPosts);

// Route to create a new post (requires authentication)
router.post('/', auth, createNewPost);

// Route to update a post (requires authentication)
router.patch('/:id', auth, updatePost);

// Route to delete a post (requires authentication)
router.delete('/:id', auth, deletePost);

// Posts vote routes

// Route to upvote a post (requires authentication)
router.post('/:id/upvote', auth, upvotePost);

// Route to downvote a post (requires authentication)
router.post('/:id/downvote', auth, downvotePost);

// Post comments routes

// Route to post a comment on a post (requires authentication)
router.post('/:id/comment', auth, postComment);

// Route to delete a comment on a post (requires authentication)
router.delete('/:id/comment/:commentId', auth, deleteComment);

// Route to update a comment on a post (requires authentication)
router.patch('/:id/comment/:commentId', auth, updateComment);

// Route to post a reply to a comment (requires authentication)
router.post('/:id/comment/:commentId/reply', auth, postReply);

// Route to delete a reply to a comment (requires authentication)
router.delete('/:id/comment/:commentId/reply/:replyId', auth, deleteReply);

// Route to update a reply to a comment (requires authentication)
router.patch('/:id/comment/:commentId/reply/:replyId', auth, updateReply);

// Comment vote routes

// Route to upvote a comment (requires authentication)
router.post('/:id/comment/:commentId/upvote', auth, upvoteComment);

// Route to downvote a comment (requires authentication)
router.post('/:id/comment/:commentId/downvote', auth, downvoteComment);

// Route to upvote a reply to a comment (requires authentication)
router.post('/:id/comment/:commentId/reply/:replyId/upvote', auth, upvoteReply);

// Route to downvote a reply to a comment (requires authentication)
router.post(
  '/:id/comment/:commentId/reply/:replyId/downvote',
  auth,
  downvoteReply
);

module.exports = router;
