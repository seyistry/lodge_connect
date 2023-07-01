// importing npm modules
import express from 'express';
import cors from 'cors';

const app = express();

// setting up the modules object
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
