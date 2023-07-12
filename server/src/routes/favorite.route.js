import express from "express";
const router = express.Router();

import { userAuth } from "../middlewares/authorization/user.auth.js";
import {
	addFavorite,
	getFavorites,
	removeFavorite,
} from "../controllers/favorite.controller.js";

router.post("/:apartmentId", userAuth, addFavorite);
router.get("/", userAuth, getFavorites);
router.delete("/:favoriteId", userAuth, removeFavorite);

export default router;