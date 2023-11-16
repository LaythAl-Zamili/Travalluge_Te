const express = require('express');
const { loginUser, signupUser } = require('../controllers/auth');

const router = express.Router();

// Route for user signup
router.post('/signup', signupUser);

// Route for user login
router.post('/login', loginUser);

module.exports = router;
