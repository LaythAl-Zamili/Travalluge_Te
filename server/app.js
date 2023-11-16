// Importing the express module
const express = require('express');

// Importing the express-async-errors module to handle asynchronous errors
require('express-async-errors');

// Importing the cors module to enable Cross-Origin Resource Sharing
const cors = require('cors');

// Importing the middleware module for custom middleware functions
const middleware = require('./utils/middleware');

// Importing the authentication routes module
const authRoutes = require('./routes/auth');

// Importing the post routes module
const postRoutes = require('./routes/post');

// Importing the subreddit routes module
const subredditRoutes = require('./routes/subreddit');

// Importing the user routes module
const userRoutes = require('./routes/user');

// Creating an instance of the express application
const app = express();

// Enabling CORS for all routes
app.use(cors());

// Parsing request bodies as JSON with a limit of 10mb
app.use(express.json({ limit: '10mb' }));

// Parsing URL-encoded request bodies with a limit of 10mb and extended mode
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Mounting the authentication routes at the '/api' endpoint
app.use('/api', authRoutes);

// Mounting the post routes at the '/api/posts' endpoint
app.use('/api/posts', postRoutes);

// Mounting the subreddit routes at the '/api/subreddits' endpoint
app.use('/api/subreddits', subredditRoutes);

// Mounting the user routes at the '/api/users' endpoint
app.use('/api/users', userRoutes);

// Adding custom middleware to handle unknown endpoints
app.use(middleware.unknownEndpointHandler);

// Adding custom middleware to handle errors
app.use(middleware.errorHandler);

// Exporting the app instance to be used in other parts of the code
module.exports = app;
