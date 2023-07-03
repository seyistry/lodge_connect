import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../../utils/libs/response.js";

const errorFormatter = ({ msg }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return msg;
};

export const loginValidator = async (req, res, next) => {
	const emailCheck = body("email", "Your email is not valid")
		.isEmail()
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
