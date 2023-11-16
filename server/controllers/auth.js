// Importing the required modules and models
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { SECRET } = require('../utils/config');

// Function for handling user login
const loginUser = async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Find the user in the database based on the provided username
  const user = await User.findOne({
    username: { $regex: new RegExp('^' + username + '$', 'i') },
  });

  // If no user is found, return an error response
  if (!user) {
    return res
      .status(400)
      .send({ message: 'No account with this username has been registered.' });
  }

  // Check if the provided password is valid by comparing it with the hashed password stored in the database
  const credentialsValid = await bcrypt.compare(password, user.passwordHash);

  // If the credentials are not valid, return an error response
  if (!credentialsValid) {
    return res.status(401).send({ message: 'Invalid username or password.' });
  }

  // Create a payload for the JWT token containing the user's ID
  const payloadForToken = {
    id: user._id,
  };

  // Generate a JWT token using the payload and the secret key
  const token = jwt.sign(payloadForToken, SECRET);

  // Return a success response with the token and user information
  res.status(200).json({
    token,
    username: user.username,
    id: user._id,
    avatar: user.avatar,
    karma: user.karmaPoints.postKarma + user.karmaPoints.commentKarma,
  });
};

// Function for handling user signup
const signupUser = async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Check if the password meets the length requirement
  if (!password || password.length < 6) {
    return res
      .status(400)
      .send({ message: 'Password needs to be at least 6 characters long.' });
  }

  // Check if the username length is within the allowed range
  if (!username || username.length > 20 || username.length < 3) {
    return res
      .status(400)
      .send({ message: 'Username character length must be in the range of 3-20.' });
  }

  // Check if the username is already taken
  const existingUser = await User.findOne({
    username: { $regex: new RegExp('^' + username + '$', 'i') },
  });

  // If the username is already taken, return an error response
  if (existingUser) {
    return res.status(400).send({
      message: `Username '${username}' is already taken. Choose another one.`,
    });
  }

  // Generate a salt and hash the password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Create a new user object with the username and hashed password
  const user = new User({
    username,
    passwordHash,
  });

  // Save the user to the database
  const savedUser = await user.save();

  // Create a payload for the JWT token containing the user's ID
  const payloadForToken = {
    id: savedUser._id,
  };

  // Generate a JWT token using the payload and the secret key
  const token = jwt.sign(payloadForToken, SECRET);

  // Return a success response with the token and user information
  res.status(200).json({
    token,
    username: savedUser.username,
    id: savedUser._id,
    avatar: savedUser.avatar,
    karma: 0,
  });
};

// Export the loginUser and signupUser functions
module.exports = { loginUser, signupUser };
