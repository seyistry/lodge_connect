const http = require('http');
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

const startServer = async () => {
  try {
    // connection to mongoDB

    // listening to incoming requests
    server.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
startServer();
