import Apartment from '../models/apartment.model.js';
import Review from '../models/reviews.model.js';
import { successResponse } from '../utils/libs/response.js';
import tryCatch from '../utils/helpers/tryCatch.helper.js';
import { StatusCodes } from 'http-status-codes';
import AppError from '../utils/libs/appError.js';
import { checkPermissions } from '../utils/helpers/utilFunctions.helper.js';

// Create a review and associate with an apartment
export const createReview = tryCatch(async (req, res) => {
  const { apartmentId } = req.params;
  const apartment = await Apartment.findById({ _id: apartmentId });

  req.body.user = req.userId;
  const { comment, rating, user } = req.body;

  if (!comment || !rating) {
    throw new AppError('This field cannot be empty', StatusCodes.BAD_REQUEST);
  }

  const review = new Review({
    comment,
    rating,
    user,
  });

  apartment.reviews.push(review);

  await review.save();
  await apartment.save();

  successResponse(res, 'Apartment has been successfully reviewed!', { review }, StatusCodes.OK);
});

// controller to delete a review
export const removeReview = tryCatch(async (req, res) => {
  const { apartmentId, reviewId } = req.params;

  const review = await Review.findById(reviewId);

  checkPermissions(req.userId, review.user._id);

  await Apartment.findByIdAndUpdate(apartmentId, { $pull: { reviews: reviewId } });

  await review.deleteOne();

  successResponse(res, 'Review has been deleted', {}, StatusCodes.OK);
});

// controller to update a review
export const updateReview = tryCatch(async (req, res) => {
  const { apartmentId, reviewId } = req.params;
  const allowedProps = ['comment', 'rating'];

  const review = await Review.findOne({ _id: reviewId });

  checkPermissions(req.userId, review.user);

  await Apartment.findByIdAndUpdate(apartmentId);

  for (const prop in req.body) {
    if (allowedProps.includes(prop)) {
      review[prop] = req.body[prop];
    }
  }

  review.save();

  successResponse(res, 'Review has been updated', { review }, StatusCodes.OK);
});
