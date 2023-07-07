import express from 'express';
const router = express.Router();

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
router.post('/apartment', userAuth, postApartment);
router.get('/apartment/:apartmentId', getSingleApartment);
router.patch('/apartment/:apartmentId', userAuth, updateApartment);
router.delete('/apartment/:apartmentId', userAuth, removeApartment);

export default router;
