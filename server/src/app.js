// importing npm modules
import express from 'express';
import cors from 'cors';

import errorHandlerMiddleware from './middleware/errorHandler';
import notFound from './middleware/notFound';

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// using the router

// implementing the error middlewares
app.use(errorHandlerMiddleware);
app.use(notFound);

export default app;
