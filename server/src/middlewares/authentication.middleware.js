import { errorResponse } from '../utils/libs/response';
import { isTokenValid } from '../utils/session/jwt';
import { StatusCodes } from 'http-status-codes';

export const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    return errorResponse(res, "Authentication failed", StatusCodes.UNAUTHORIZED);
  }

  try {
    const { email, userId } = isTokenValid({ token });
    req.user = { email, userId };
    next();
  } catch (error) {
    return errorResponse(res, "Authentication failed", StatusCodes.UNAUTHORIZED);
  }
};
