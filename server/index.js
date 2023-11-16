// Importing the app module
const app = require('./app');

// Importing the http module
const http = require('http');

// Importing the PORT from the config file
const { PORT } = require('./utils/config');

// Importing the connectToDB function from the db module
const connectToDB = require('./db');

// Calling the connectToDB function to connect to the MongoDB database
connectToDB();

// Creating an HTTP server using the app module
const server = http.createServer(app);

// Starting the server and listening on the specified port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
