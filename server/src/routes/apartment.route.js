import express from "express";
const router = express.Router();

import { userAuth } from "../middlewares/authorization/user.auth.js";

import {
	getAllApartments,
	getSingleApartment,
	postApartment,
	removeApartment,
	updateApartment,
	ownerDashboard,
} from "../controllers/apartment.controller.js";
import { upload } from "../utils/helpers/imageUpload.helper.js";

router.get("/all", getAllApartments);
router.get("/", userAuth, ownerDashboard);
router.post("/", userAuth, upload.single("image"), postApartment);
router.get("/:apartmentId", getSingleApartment);
router.put(
	"/:apartmentId",
	userAuth,
	/*upload.array('image'),*/ updateApartment
);
router.delete("/:apartmentId", userAuth, removeApartment);

export default router;
