import jwt from 'jsonwebtoken';

// generating token for users
export const generateJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.DURATION });
  return token;
};

// check for validity of the jwt
export const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// attach cookies to the response
export const addCookiesToResponse = ({ res, user }) => {
  const token = generateJWT({ payload: user });

  const duration = 1000 * 60 * 60 * 24; //set to 24 hours

  // adding jwt token to the response of a registered user
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + duration),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

// creating user with token
export const createTokenUser = (user) => {
  return {
    userId: user._id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phoneNumber: user.phone_number,
  };
};
