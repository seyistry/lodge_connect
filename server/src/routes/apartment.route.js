import express from 'express';
const router = express.Router();

// import cloudinary and configure multer
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
const upload = multer({ storage });

import { userAuth } from '../middlewares/authorization/user.auth.js';

import {
  getAllApartments,
  getSingleApartment,
  postApartment,
  removeApartment,
  updateApartment,
  ownerDashboard,
} from '../controllers/apartment.controller.js';

router.get('/apartments', getAllApartments);
router.get('/my-apartments', userAuth, ownerDashboard);
router.post('/apartment', userAuth, /*upload.array('image'),*/ postApartment);
router.get('/apartment/:apartmentId', getSingleApartment);
router.patch('/apartment/:apartmentId', /*userAuth, upload.array('image'),*/ updateApartment);
router.delete('/apartment/:apartmentId', userAuth, removeApartment);

export default router;
