import express from "express";

const router = express.Router();

import {
	registerUser,
	userLogin,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	deleteUserProfile,
} from "../controllers/auth.controller.js";
import {
	loginValidator,
	registerValidator,
} from "../middlewares/validation/user.validation.js";
import { userAuth } from "../middlewares/authorization/user.auth.js";

router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, userLogin);
router.post("/logout", logoutUser);
router.get("/profile", userAuth, getUserProfile);
router.put("/profile", userAuth, updateUserProfile);
router.delete("/profile", userAuth, deleteUserProfile);	

export default router;
