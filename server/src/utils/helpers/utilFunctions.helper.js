import AppError from '../libs/appError.js';
import { StatusCodes } from 'http-status-codes';

export const checkPermissions = (requestUser, requestUserId) => {
  if (requestUser === requestUserId.toString()) return;
  throw new AppError("You're not authorized to modify this resource.", StatusCodes.UNAUTHORIZED);
};

// export const pagination = (skip, limit) => {
//   const page = Number(req.query.page) || 1;
//   limit = Number(req.query.limit) || 5;
//   skip = (page - 1) * limit;
//   return skip;
// };
