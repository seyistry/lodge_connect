import User from '../models/user.model.js';
import tryCatchHelper from '../utils/helpers/tryCatch.helper.js';
import { addCookiesToResponse, createTokenUser } from '../utils/session/jwt.js';
import { StatusCodes } from 'http-status-codes';

export const registerUser = tryCatchHelper(async (req, res) => {
  const { first_name, last_name, email, password, phone_number } = req.body;
  const emailExists = await User.findOne({ email: email });

  if (emailExists) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Email exists already.' });
  }

  const user = new User({
    first_name,
    last_name,
    email,
    password,
    phone_number,
  });

  await user.save();

  const tokenUser = createTokenUser(user);
  addCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
});

export const userLogin = tryCatchHelper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Provide a valid email and password' });
  }

  //   Find user by email
  const user = await User.findOne({ email: email });

  // check if email exists in the database
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User does not exist' });
  }

  // retrieve password from the database and compare with entered password
  const validatePassword = await user.comparePassword(password);
  if (!validatePassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Invalid Email or Password. Please try again.' });
  }

  //   create token to validate the user
  const tokenUser = { email: user.email, userId: user._id };
  addCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ msg: 'Login successful' });
});

export const logoutUser = (req, res) => {
  req.session.destroy();
  res.status(StatusCodes.OK).json({ msg: 'Logged out successfully' });
};
