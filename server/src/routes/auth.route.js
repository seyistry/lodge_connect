import express from "express";

const router = express.Router();

import {
	registerUser,
	userLogin,
	getUserProfile,
	updateUserProfile,
	deleteUserProfile,
	verifyEmail,
	resendOtp,
	forgotPassword,
	verifyResetPassword,
	resetPassword,
	changePassword,
} from "../controllers/auth.controller.js";
import {
	emailValidator,
	loginValidator,
	registerValidator,
	otpValidator,
	resetPasswordValidator,
	changePasswordValidator,
} from "../middlewares/validation/user.validation.js";
import { userAuth } from "../middlewares/authorization/user.auth.js";

router.post("/register", registerValidator, registerUser);
router.post("/verify-email", otpValidator, verifyEmail);
router.post("/resend-otp", emailValidator, resendOtp);
router.post("/forgot-password", emailValidator, forgotPassword);
router.post("/verify-password-otp", otpValidator, verifyResetPassword);
router.post("/reset-password", userAuth, resetPasswordValidator, resetPassword);
router.post("/login", loginValidator, userLogin);
router.get("/profile", userAuth, getUserProfile);
router.put("/profile", userAuth, updateUserProfile);
router.put("/change-password", userAuth, changePasswordValidator, changePassword);
router.delete("/profile", userAuth, deleteUserProfile);

export default router;
