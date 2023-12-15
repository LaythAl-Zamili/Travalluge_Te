// Importing the mongoose library
const mongoose = require('mongoose');

// Importing the MongoDB URI from the config file
const { MONGODB_URI: url } = require('./utils/config');

// Function to connect to the MongoDB database
const connectToDB = async () => {
  try {
    // Connecting to the MongoDB using the provided URI and options
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    // Logging a success message if the connection is successful
    console.log('Connected to MongoDB❤️!');
  } catch (error) {
    // Handling any errors that occur during the connection process
    console.error(`Error while connecting to MongoDB: `, error.message);
  }
};

// Exporting the connectToDB function to be used in other parts of the code
module.exports = connectToDB;
