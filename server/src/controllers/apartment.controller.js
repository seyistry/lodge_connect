import Apartment from '../models/apartment.model.js';
import AppError from '../utils/libs/appError.js';
import tryCatch from '../utils/helpers/tryCatch.helper.js';
import { checkPermissions } from '../utils/helpers/checkPermissions.helper.js';
import { successResponse } from '../utils/libs/response.js';
import { StatusCodes } from 'http-status-codes';

// controller to fetch all the apartments in the database
export const getAllApartments = tryCatch(async (req, res) => {
  const apartments = await Apartment.find({});

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

// controller to create a new aparment and save to the database
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

  await apartment.save();

  successResponse(res, 'Apartment successfully created', { apartment }, StatusCodes.CREATED);
});

export const updateApartment = tryCatch(async (req, res) => {
  const { apartmentId } = req.params;
  const { image, title, description, price, location, bedrooms, bathrooms } = req.body;

  // Find the apartment by ID from the database
  const apartment = await Apartment.findOne({ _id: apartmentId });

  // Check if the user id === the owner ID property in the apartment
  checkPermissions(req.userId, apartment.owner);

  // Update the data in the database
  apartment.image = image;
  apartment.title = title;
  apartment.description = description;
  apartment.price = price;
  apartment.location = location;
  apartment.bedrooms = bedrooms;
  apartment.bathrooms = bathrooms;

  await apartment.save();

  successResponse(res, 'Apartment has been updated', { apartment }, StatusCodes.OK);
});

// controller to delete an apartment
export const removeApartment = tryCatch(async (req, res) => {
  const { apartmentId } = req.params;

  const apartment = await Apartment.findOne({ _id: apartmentId });

  // Check if the user id === the owner ID property in the apartment
  checkPermissions(req.userId, apartment.owner);

  await apartment.deleteOne();

  successResponse(res, 'Apartment has been deleted');
});
