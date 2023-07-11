import User from '../models/user.model.js';
import UserAuth from '../models/userAuth.model.js';
import { sendEmail } from '../services/email.service.js';
import { comparePassword, hashPassword } from '../utils/helpers/bcrypt.helper.js';
import dateHelper from '../utils/helpers/date.helper.js';
import { generateJwtToken } from '../utils/helpers/jwt.helper.js';
import tryCatch from '../utils/helpers/tryCatch.helper.js';
import AppError from '../utils/libs/appError.js';
import { otpGenerator } from '../utils/libs/keyGenerator.js';
import { successResponse } from '../utils/libs/response.js';
import { StatusCodes } from 'http-status-codes';

export const registerUser = tryCatch(async (req, res) => {
  const { first_name, last_name, email, password, phone_number, confirm_password } = req.body;
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw new AppError('Email already exists', StatusCodes.CONFLICT);
  }

  if (password !== confirm_password) {
    throw new AppError('Password does not match', StatusCodes.BAD_REQUEST);
  }

  const hashedPassword = await hashPassword(password);

  const user = new User({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    phone_number,
  });

  await user.save();

  // Generate OTP
  const otp = otpGenerator()

  // set the expiration time to 5minutes for the OTP
  const otpExpiration = dateHelper.addMinutes(5);

  // save the OTP and expiration time in the database
  await UserAuth.create({
    userId: user._id,
    otp,
    expiredAt: otpExpiration
  })

  // send the OTP to the user's email address
  await sendEmail(
      user.email,
      "Verify Your Email Address",
      `<h1>Welcome to Lodge Connect!!!</h1>
      <p>Please use the following OTP to verify your email address: ${otp}</p>`
    )

  return successResponse(
    res,
    'User created successfully',
    { user: { fullName: `${user.first_name} ${user.last_name}`, email: user.email, userId: user._id } },
    StatusCodes.CREATED
  );
});

export const verifyEmail = tryCatch(async(req, res) => {
  const { otp } = req.body
  const userOtp = await UserAuth.findOne({otp});

  if (!userOtp) {
    throw new AppError("Invalid OTP, please try again", StatusCodes.BAD_REQUEST)
  }
  if (userOtp && dateHelper.expiredDate(userOtp.expiredAt)) {
    userOtp.status = "expired";
    await userOtp.save();
    throw new AppError("OTP has expired, please request for a new one", StatusCodes.BAD_REQUEST)
  }
  userOtp.status = "validated";
  await userOtp.save();
  await User.findByIdAndUpdate(userOtp.userId, { verified: true });

  // Generate token for created user
  const token = generateJwtToken({ userId: userOtp._id }, '24h');

  return successResponse(res, "Your Email has been verified successfully", { data: { token } });
})

export const resendOtp = tryCatch(async(req, res) =>{
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new AppError("User not found", StatusCodes.NOT_FOUND)

  // check if the user is already verified
  if(user.verified) throw new AppError("User is already verified", StatusCodes.CONFLICT)

  const otp = otpGenerator();
  const otpExpiration = dateHelper.addMinutes(5)

  await UserAuth.findOneAndUpdate({ userId: user._id }, { otp, expiredAt: otpExpiration})

  sendEmail(
    user.email,
    "Email Verification - Resend OTP",
    `<h1>Your new OTP for email verification is: ${otp}</h1>`
  )

  return successResponse(res, "A new OTP has been sent to your email address", {})
})

export const userLogin = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  //   Find user by email
  const user = await User.findOne({ email });

  // check if email exists in the database
  if (!user) {
    throw new AppError('Invalid Email or Password. Please try again.', StatusCodes.UNAUTHORIZED);
  }

  // retrieve password from the database and compare with entered password
  const validatePassword = await comparePassword(password, user.password)
  if (!validatePassword) {
    throw new AppError('Invalid Email or Password. Please try again.', StatusCodes.UNAUTHORIZED);
  }

  if (!user.verified) {
		// Generate a new OTP
		const otp = otpGenerator();
		const otpExpiration = dateHelper.addMinutes(5); // Set OTP expiration time to 5 minutes

		// Save the new OTP in the database
		await UserAuth.findOneAndUpdate(
			{ userId: user._id },
			{
				otp,
				expiredAt: otpExpiration,
			}
		);

		// Send the new OTP to the user's email
		sendEmail(
			user.email,
			"Email Verification - Resend OTP",
			`<h1>Kindly verify your email with this OTP: ${otp}</h1>`
		);
		throw new AppError("Kindly verify your email with the OTP sent to your email address", StatusCodes.BAD_REQUEST)
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

export const forgotPassword = tryCatch(async (req, res, next) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) throw new AppError("User not found", StatusCodes.NOT_FOUND);

	const resetOtp = otpGenerator(); // Generate OTP code
	const otpExpiration = dateHelper.addMinutes(2); // Set OTP expiration time to 2 minutes

	// Save to the User Auth
	await UserAuth.create({
		userId: user._id,
		otp: resetOtp,
		expiredAt: otpExpiration,
	});

	// Prepare email content
	const emailSubject = "Password Reset";
	const emailBody = `<h1>Password Reset</h1>
    <p>Your password reset OTP: ${resetOtp}</p>`
	await sendEmail(user.email, emailSubject, emailBody); // Send email
	return successResponse(
		res,
		"Password reset email sent successfully",
	);
});

export const verifyResetPassword = tryCatch(async (req, res, next) => {
	const { otp } = req.body;
	const resetOtp = await UserAuth.findOne({ otp });
	if (!resetOtp) {
    throw new AppError("Invalid Otp, please try again", StatusCodes.BAD_REQUEST)
	}
	if (resetOtp && dateHelper.expiredDate(resetOtp.expiredAt)) {
		resetOtp.status = "expired";
		await resetOtp.save();
		throw new AppError("Your Otp is expired, please request a new one")
	}
	resetOtp.status = "validated";
	await resetOtp.save();
	const token = generateJwtToken({ userId: resetOtp.userId }, "30m"); // Generate JWT token to validate the user

	return successResponse(res, "Reset OTP verified successfully", { token });
});

export const resetPassword = tryCatch(async(req, res) => {
  const { new_password, confirm_password } = req.body;
  const { userId } = req;
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }
  const passwordCheck = await comparePassword(new_password, user.password);
  if (passwordCheck) throw new AppError("New password cannot be the same as the old one", StatusCodes.BAD_REQUEST)

  if (new_password !== confirm_password) throw new AppError("Passwords do not match", StatusCodes.BAD_REQUEST)

  const hashedPassword = await hashPassword(new_password);

  user.password = hashedPassword
  user.save();

  sendEmail(
    user.email,
    "Password Reset Successful",
    `<h1>Password Reset Successful</h1>
    <p>Your password has been reset successfully. Please use your new password to log in.</p>
    `
  )

  return successResponse(res, "Password Reset Successful", {})
})

export const getUserProfile = tryCatch(async (req, res) => {
  const { userId } = req;
  // find the user by id
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }
  
  return successResponse(res, "User profile retrieved", { user: { fullName: `${user.first_name} ${user.last_name}`, email: user.email }} );
})

export const updateUserProfile = tryCatch(async(req, res) => {
	const { userId } = req;
	// find the user by id
	const user = await User.findById(userId);
  
	if (!user) {
		throw new AppError("User not found", StatusCodes.NOT_FOUND);
	}

  const update = {};
  const allowedProps = ['first_name', 'last_name', 'email', 'phone_number']
  for (const prop in req.body) {
    if(Object.prototype.hasOwnProperty.call(req.body, prop) && allowedProps.includes(prop) && req.body[prop]) {
      update[prop] = req.body[prop]
    }
  }
  await User.findByIdAndUpdate(userId, update)
  return successResponse(res, "User updated successfully", {});
})

export const changePassword = tryCatch(async(req, res) => {
  const { old_password, new_password, confirm_password } = req.body
  const { userId } = req;
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }
  const passwordCheck = await comparePassword(old_password, user.password);
  if (!passwordCheck) throw new AppError("Old Password is incorrect", StatusCodes.BAD_REQUEST)

  if (old_password === new_password) throw new AppError("New password cannot be the same as the old one", StatusCodes.BAD_REQUEST)

  if (new_password !== confirm_password) throw new AppError("Passwords do not match", StatusCodes.BAD_REQUEST)

  const hashedPassword = await hashPassword(new_password);

  user.password = hashedPassword
  user.save();
  return successResponse(res, "Password changed successfully", {})
})

export const deleteUserProfile = tryCatch(async(req, res) => {
  const { userId } = req;
  // find the user by id
  const user = await User.findById(userId);
  
  if (!user) {
		throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }
  await User.findByIdAndDelete(userId)
  return successResponse(res, "User deleted successfully", {});
  
})
