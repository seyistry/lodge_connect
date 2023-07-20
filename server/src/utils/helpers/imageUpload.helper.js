import multer, { diskStorage } from "multer";
import path from "path";
import AppError from "../libs/appError.js";
import { StatusCodes } from "http-status-codes";

// Multer configuration
export const upload = multer({
	storage: diskStorage({}),
	fileFilter: (req, file, cb) => {
		let ext = path.extname(file.originalname);
		if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
			cb(new AppError("File type is not supported", StatusCodes.BAD_REQUEST), false);
		}
		cb(null, true);
	},
});
