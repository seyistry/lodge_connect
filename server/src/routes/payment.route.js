import express from "express";
const router = express.Router();

import { userAuth } from "../middlewares/authorization/user.auth.js";
import { processPayment } from "../controllers/payment.controller.js";

router.post("/:apartmentId", userAuth, processPayment);

export default router;
