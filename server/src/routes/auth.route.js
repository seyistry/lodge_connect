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
	loginValidator,
	registerValidator,
} from "../middlewares/validation/user.validation.js";
import { userAuth } from "../middlewares/authorization/user.auth.js";

router.post("/register", registerValidator, registerUser);
router.post("/verify-email", verifyEmail);
router.post("resend-otp", resendOtp);
router.post("/forgot-password", forgotPassword);
router.post("/verify-password-otp", verifyResetPassword);
router.post("reset-password", resetPassword);
router.post("/login", loginValidator, userLogin);
router.get("/profile", userAuth, getUserProfile);
router.put("/profile", userAuth, updateUserProfile);
router.post("change-password", changePassword);
router.delete("/profile", userAuth, deleteUserProfile);

export default router;
