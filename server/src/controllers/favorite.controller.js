import { StatusCodes } from "http-status-codes";
import Favorite from "../models/favorite.model.js";
import tryCatch from "../utils/helpers/tryCatch.helper.js";
import AppError from "../utils/libs/appError.js";
import { successResponse } from "../utils/libs/response.js";

export const addFavorite = tryCatch(async (req, res) => {
	const { userId } = req;
	const { apartmentId } = req.params

	// check if the favorite already exists for this user and apartment
	const existingFavorite = await Favorite.findOne({ user: userId, apartment: apartmentId})

	if (existingFavorite) throw new AppError("Favorite already exists", StatusCodes.CONFLICT)

	// create a new favorite
	const newFavorite = await Favorite.create({
		user: userId,
		apartment: apartmentId
	})

	return successResponse(res, "New favorite added successfully", { favorite: newFavorite });
});

export const getFavorites = tryCatch(async(req, res) => {
	const { userId } = req;

	// Fetch the user's favorite apartments
	const favorites = await Favorite.find({ user: userId }).populate("apartment");

	return successResponse(res, "Favorites fetched successfully", { favorites });
})

export const removeFavorite = tryCatch(async(req, res) => {
	const { userId } = req;
	const { favoriteId } = req.params;

	// check if the favorite exists for this user
	const favorite = await Favorite.findOne({ _id: favoriteId, user: userId });
	if (!favorite) throw new AppError("Favorites not found", StatusCodes.NOT_FOUND)

	// remove the favorite from the database
	await favorite.deleteOne();

	return successResponse(res, "Favorite removed successfully", {});
})