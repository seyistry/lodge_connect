import express from 'express';
const router = express.Router();

import { userAuth } from '../middlewares/authorization/user.auth.js';

import { createReview, removeReview, updateReview } from '../controllers/reviews.controller.js';

router.post('/', userAuth, createReview);
router.delete('/:reviewId', userAuth, removeReview);
router.put('/:reviewId', userAuth, updateReview);

export default router;
