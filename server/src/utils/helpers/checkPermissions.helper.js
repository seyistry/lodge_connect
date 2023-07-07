import AppError from '../libs/appError.js';
import { StatusCodes } from 'http-status-codes';

export const checkPermissions = (requestUser, requestUserId) => {
  if (requestUser === requestUserId.toString()) return;
  throw new AppError("You're not authorized to modify this resource.", StatusCodes.UNAUTHORIZED);
};
