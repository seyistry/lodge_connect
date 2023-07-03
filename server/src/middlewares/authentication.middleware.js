import { isTokenValid } from '../utils/session/jwt';
import { StatusCodes } from 'http-status-codes';

export const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Authentication failed' });
  }

  try {
    const { email, userId } = isTokenValid({ token });
    req.user = { email, userId };
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Authentication failed' });
  }
};
