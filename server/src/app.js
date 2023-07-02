// importing npm modules
import express from 'express';
import cors from 'cors';
import { errorResponse, successResponse } from './utils/libs/response.js';
import { StatusCodes } from 'http-status-codes';

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount routes

// index route
app.get('/', (req, res) => {
	return successResponse(res, 'Welcome to Lodge Connect backend service 🚀');
});

// handle 404 routes
app.all('*', async(req, res, next) => {
    return errorResponse(res, `Resource ${req.originalUrl} does not exist`, StatusCodes.NOT_FOUND);
});

// handle global error
app.use((error, req, res, next) => {
    console.log('error handler');
    const message = (process.env.NODE_ENV === 'development') ? error.message : 'Something went wrong';
    const statusCode = (error.name === 'Error') ? StatusCodes.INTERNAL_SERVER_ERROR : (error.statusCode ?? StatusCodes.BAD_REQUEST);
    return errorResponse(res, message, statusCode);
});



export default app;
