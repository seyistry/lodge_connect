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

router.get('/all', getAllApartments);
router.get('/', userAuth, ownerDashboard);
router.post('/', userAuth, /*upload.array('image'),*/ postApartment);
router.get('/:apartmentId', getSingleApartment);
router.put('/:apartmentId', userAuth, /*upload.array('image'),*/ updateApartment);
router.delete('/:apartmentId', userAuth, removeApartment);

export default router;
