import http from 'http';
import dotenv from 'dotenv';

import app from './app.js';
import { connectDB } from './config/db.js';
dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

const startServer = async () => {
  try {
    // connection to mongoDB
    await connectDB();

    // listening to incoming requests
    server.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
startServer();
