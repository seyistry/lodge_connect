import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../../utils/libs/response.js";

const errorFormatter = ({ msg }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return msg;
};

export const registerValidator = async (req, res, next) => {
  await Promise.all([
    body('first_name', 'First Name is required').trim().notEmpty().run(req),
    body('last_name', 'Last Name is required').trim().notEmpty().run(req),
    body('email', 'Invalid email format').trim().isEmail().run(req),
    body('password', 'Password must be at least 4 characters').trim().isLength({ min: 4 }).run(req),
    body('phone_number', 'Phone number is required').trim().notEmpty().run(req),
  ]);
  const errors = validationResult(req).formatWith(errorFormatter);
	if (!errors.isEmpty()) {
		return errorResponse(res, errors.array().join(", "), StatusCodes.BAD_REQUEST);
	}

  next();
};

export const loginValidator = async (req, res, next) => {
	const emailCheck = body("email", "Invalid email format")
		.isEmail()
		.notEmpty().withMessage("Email address is required")
		.normalizeEmail()
		.run(req);
	const passwordCheck = body("password", "Your password must be at least 4 characters")
		.trim()
		.isLength({ min: 4 })
		.run(req);
	await Promise.all([emailCheck, passwordCheck]);
	const errors = validationResult(req).formatWith(errorFormatter);
	if (!errors.isEmpty()) {
		return errorResponse(res, errors.array().join(", "), StatusCodes.BAD_REQUEST);
	}
	next();
};

export const emailValidator = async (req, res, next) => {
	await body("email")
		.notEmpty().withMessage("Email address is required")
		.isEmail().withMessage("Your email is not valid")
		.normalizeEmail()
		.run(req);
	const errors = validationResult(req).formatWith(errorFormatter);
	if (!errors.isEmpty()) {
		return errorResponse(res, errors.array().join(", "), StatusCodes.BAD_REQUEST);
	}
	next();
};

export const otpValidator = async (req, res, next) => {
	await body("otp")
		.trim()
		.notEmpty().withMessage("OTP is required")
		.isLength({ min: 4, max: 4 }).withMessage("Your OTP must be 4 characters")
		.run(req);
	const errors = validationResult(req).formatWith(errorFormatter);
	if (!errors.isEmpty()) {
		return errorResponse(res, errors.array().join(", "), StatusCodes.BAD_REQUEST);
	}
	next();
};

export const resetPasswordValidator =  async (req, res, next) => {
	await body("new_password")
		.notEmpty().withMessage("New Password is required")
		.isLength({ min: 4 }).withMessage("New Password must be at least 4 characters")
		.run(req);

	const errors = validationResult(req).formatWith(errorFormatter);
	if (!errors.isEmpty()) {
        return errorResponse(res, errors.array().join(", "), StatusCodes.BAD_REQUEST);
    };
	next();
};

export const changePasswordValidator = async (req, res, next) => {
	const oldPasswordCheck = body("old_password")
		.trim()
		.notEmpty().withMessage("Old password is required")
		.run(req);
	
	const newPasswordCheck = body("new_password")
		.trim()
		.notEmpty().withMessage("New password is required")
		.isLength({ min: 4 }).withMessage("New password must be at least 4 characters")
		.run(req);
	await Promise.all([oldPasswordCheck, newPasswordCheck]);

	const errors = validationResult(req).formatWith(errorFormatter);
	if (!errors.isEmpty()) {
		return errorResponse(res, errors.array().join(", "), StatusCodes.BAD_REQUEST)
	}
	next();
};