const express = require('express');
const { auth } = require('../utils/middleware');
const {
  getUser,
  setUserAvatar,
  removeUserAvatar,
} = require('../controllers/user');

const router = express.Router();

// Route to get user information by username
router.get('/:username', getUser);

// Route to set user avatar (requires authentication)
router.post('/avatar', auth, setUserAvatar);

// Route to remove user avatar (requires authentication)
router.delete('/avatar', auth, removeUserAvatar);

module.exports = router;
