import Apartment from '../models/apartment.model.js';
import AppError from '../utils/libs/appError.js';
import tryCatch from '../utils/helpers/tryCatch.helper.js';
import { checkPermissions } from '../utils/helpers/utilFunctions.helper.js';
import { successResponse } from '../utils/libs/response.js';
import { StatusCodes } from 'http-status-codes';

// controller to fetch all the apartments in the database
export const getAllApartments = tryCatch(async (req, res) => {
  // search filter by location and title
  const { location, title } = req.query;
  const queryObject = {};

  if (location) {
    queryObject.location = { $regex: location, $options: 'i' };
  }
  if (title) {
    queryObject.title = { $regex: title, $options: 'i' };
  }

  // implementing pagination to limit returned apartments to 5 per page
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const apartments = await Apartment.find(queryObject).skip(skip).limit(limit);

  successResponse(res, `Count: ${apartments.length} apartment(s)`, { apartments }, StatusCodes.OK);
});

// controller to fetch all apartments created by one user
export const ownerDashboard = tryCatch(async (req, res) => {
  const { userId } = req;
  const apartments = await Apartment.find({ owner: userId }).sort('createdAt');

  successResponse(res, `Count: ${apartments.length} apartment(s)`, { apartments }, StatusCodes.OK);
});

// controller to fetch a single apartment
export const getSingleApartment = tryCatch(async (req, res) => {
  const { apartmentId } = req.params;
  const apartment = await Apartment.findOne({ _id: apartmentId });

  if (!apartment) {
    throw new AppError('This apartment does not exist.', StatusCodes.NOT_FOUND);
  }

  successResponse(res, 'Apartment found', { apartment }, StatusCodes.OK);
});

// controller to create a new apartment and save to the database
export const postApartment = tryCatch(async (req, res) => {
  req.body.owner = req.userId;
  const { image, title, description, price, location, bedrooms, bathrooms, owner } = req.body;

  // create a new apartment object
  const apartment = new Apartment({
    image,
    title,
    description,
    price,
    location,
    bedrooms,
    bathrooms,
    owner,
  });

  // apartment.image = req.files.map((el) => ({
  //   url: el.path,
  //   filename: el.filename,
  // }));

  await apartment.save();

  successResponse(res, 'Apartment successfully created', { apartment }, StatusCodes.CREATED);
});

export const updateApartment = tryCatch(async (req, res) => {
  const { apartmentId } = req.params;
  const allowedProps = [ "image", "title", "description", "price", "location", "bedrooms", "bathrooms" ]

  // Find the apartment by ID from the database
  const apartment = await Apartment.findOne({ _id: apartmentId });

  // Check if the user id === the owner ID property in the apartment
  checkPermissions(req.userId, apartment.owner);

  // Update the data in the database
  for (const prop in req.body) {
    if (allowedProps.includes(prop)) {
      apartment[prop] = req.body[prop];
    }
  }
  await apartment.save();

  successResponse(res, 'Apartment has been updated', { apartment }, StatusCodes.OK);
});

// controller to delete an apartment
export const removeApartment = tryCatch(async (req, res) => {
  const { apartmentId } = req.params;

  const apartment = await Apartment.findOne({ _id: apartmentId });

  if (!apartment) {
    throw new AppError('This apartment does not exist', StatusCodes.NOT_FOUND);
  }

  // Check if the user id === the owner ID property in the apartment
  checkPermissions(req.userId, apartment.owner);

  await apartment.deleteOne();

  successResponse(res, 'Apartment has been deleted');
});
