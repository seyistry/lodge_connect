import User from '../models/user.model.js';
import tryCatchHelper from '../utils/helpers/tryCatch.helper.js';
import AppError from '../utils/libs/appError.js';
import { successResponse } from '../utils/libs/response.js';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const registerUser = tryCatchHelper(async (req, res) => {
  const { first_name, last_name, email, password, phone_number } = req.body;
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw new AppError('Email already exists', StatusCodes.CONFLICT);
  }

  const user = new User({
    first_name,
    last_name,
    email,
    password,
    phone_number,
  });

  await user.save();

  // Generate token for created user
  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.DURATION,
  });

  res.status(StatusCodes.CREATED).json({ user, token });
  return successResponse(res, 'User created successfully', { user: tokenUser }, StatusCodes.CREATED);
});

export const userLogin = tryCatchHelper(async (req, res) => {
  const { email, password } = req.body;

  //   Find user by email
  const user = await User.findOne({ email });

  // check if email exists in the database
  if (!user) {
    throw new AppError('Invalid Email or Password. Please try again.', StatusCodes.BAD_REQUEST);
  }

  // retrieve password from the database and compare with entered password
  const validatePassword = await user.comparePassword(password);
  if (!validatePassword) {
    throw new AppError('Invalid Email or Password. Please try again.', StatusCodes.BAD_REQUEST);
  }

  //   create token to validate the user
  const tokenUser = { email: user.email, userId: user._id };
  addCookiesToResponse({ res, user: tokenUser });

  return successResponse(res, 'Login successful', {});
});

export const logoutUser = (req, res) => {
  req.session.destroy();
  return successResponse(res, 'Logout successful', {});
};
