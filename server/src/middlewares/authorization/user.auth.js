import { StatusCodes } from 'http-status-codes';
import tryCatch from '../../utils/helpers/tryCatch.helper.js';
import AppError from '../../utils/libs/appError.js';
import { verifyJwtToken } from '../../utils/helpers/jwt.helper.js';

export const userAuth = tryCatch(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new AppError('Authorization header is missing', StatusCodes.FORBIDDEN);
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new AppError('Authorization token is missing', StatusCodes.FORBIDDEN);
  }

  // decode the token
  const decodeToken = verifyJwtToken(token);

  // Get user from db and attach to the req object
  req.userId = decodeToken.userId;

  next();
});
