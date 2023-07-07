import User from '../models/user.model.js';
import { generateJwtToken } from '../utils/helpers/jwt.helper.js';
import tryCatch from '../utils/helpers/tryCatch.helper.js';
import AppError from '../utils/libs/appError.js';
import { successResponse } from '../utils/libs/response.js';
import { StatusCodes } from 'http-status-codes';

export const registerUser = tryCatch(async (req, res) => {
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
  const token = generateJwtToken({ userId: user._id }, '24h');

  return successResponse(
    res,
    'User created successfully',
    { user: { fullName: `${user.first_name} ${user.last_name}`, email: user.email, userId: user._id }, token },
    StatusCodes.CREATED
  );
});

export const userLogin = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  //   Find user by email
  const user = await User.findOne({ email });

  // check if email exists in the database
  if (!user) {
    throw new AppError('Invalid Email or Password. Please try again.', StatusCodes.UNAUTHORIZED);
  }

  // retrieve password from the database and compare with entered password
  const validatePassword = await user.comparePassword(password);
  if (!validatePassword) {
    throw new AppError('Invalid Email or Password. Please try again.', StatusCodes.UNAUTHORIZED);
  }

  //   create token to validate the user if the user exists
  const token = generateJwtToken({ userId: user._id }, '24h');

  return successResponse(
    res,
    'Login successful',
    { user: { fullName: `${user.first_name} ${user.last_name}`, email: user.email, userId: user._id }, token },
    StatusCodes.OK
  );
});

export const logoutUser = (req, res) => {
  req.session.destroy();
  return successResponse(res, 'Logout successful', {});
};

export const getUserProfile = tryCatch(async (req, res) => {
  const { userId } = req;
  // find the user by id
  const user = await User.findById(userId);

  return successResponse(res, 'User profile retrieved', {
    user: { fullName: `${user.first_name} ${user.last_name}`, email: user.email },
  });
});
