// Importing the dotenv module and loading the environment variables from the .env file
require('dotenv').config();

// Importing the cloudinary module
const cloudinary = require('cloudinary').v2;

// Extracting the PORT value from the environment variables
const PORT = process.env.PORT;

// Extracting the MONGODB_URI value from the environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Extracting the SECRET value from the environment variables
const SECRET = process.env.SECRET;

// Extracting the UPLOAD_PRESET value from the environment variables or using a default value
const UPLOAD_PRESET = process.env.UPLOAD_PRESET || 'ml_default';

// Configuring the cloudinary module with the cloud name, API key, and API secret from the environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Exporting the extracted values and the cloudinary module for use in other parts of the code
module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
  cloudinary,
  UPLOAD_PRESET,
};
