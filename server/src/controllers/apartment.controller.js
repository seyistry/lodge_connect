import Apartment from '../models/apartment.model.js';
import AppError from '../utils/libs/appError.js';
import tryCatch from '../utils/helpers/tryCatch.helper.js';
import { checkPermissions } from '../utils/helpers/utilFunctions.helper.js';
import { successResponse } from '../utils/libs/response.js';
import { StatusCodes } from 'http-status-codes';
import cloudinary from '../config/cloudinary.js';

// controller to fetch all the apartments in the database
export const getAllApartments = tryCatch(async (req, res) => {
  // search filter parameters
  const { query, numberFilters } = req.query;
  const queryObject = {};

  // Logic to find apartments based on search query
  if (query) {
    queryObject.location = { $regex: query, $options: 'i' };
  }

  // Logic for numeric filters
  if (numberFilters) {
    // mapping the operators to the mongoose operators
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };

    // setting up a regular expression and replacing the operators with the mongoose operators
    const regExp = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numberFilters.replace(regExp, (match) => `-${operatorMap[match]}-`); // output: price-$gt-30000 or price-$gt-30000,bedrooms-$lte-3
    const options = ['price', 'bedrooms', 'bathrooms']; //fields in the apartment schema that are numeric
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }; //output: { price: { '$gt': 30000 } } or { price: { '$gt': 30000 }, bedrooms: { '$lte': 3 } }
      }
    });
  }

  // implementing pagination to limit returned apartments to 5 per page
  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 5;
  // const skip = (page - 1) * limit;
  const apartments = await Apartment.find(queryObject).populate({
    path: "owner",
    select: "first_name last_name",
  });

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
  const apartment = await Apartment.findOne({ _id: apartmentId }).populate({
    path: 'reviews',
    populate: {
      path: 'user',
      select: 'first_name last_name',
    },
  });

  if (!apartment) {
    throw new AppError('This apartment does not exist.', StatusCodes.NOT_FOUND);
  }

  successResponse(res, 'Apartment found', { apartment }, StatusCodes.OK);
});

// controller to create a new apartment and save to the database
export const postApartment = tryCatch(async (req, res) => {
  const owner = req.userId;
  const { title, description, price, location, bedrooms, bathrooms } = req.body;

  // Upload Image to cloudinary
  const uploadImage = await cloudinary.uploader.upload(req.file.path);

  // create a new apartment object
  const apartment = new Apartment({
    title,
    description,
    image: uploadImage.secure_url,
    price,
    location,
    bedrooms,
    bathrooms,
    owner,
    cloudinary_id: uploadImage.public_id,
  });

  await apartment.save();

  successResponse(res, 'Apartment successfully created', { apartment }, StatusCodes.CREATED);
});

export const updateApartment = tryCatch(async (req, res) => {
  const { apartmentId } = req.params;
  const allowedProps = ['image', 'title', 'description', 'price', 'location', 'bedrooms', 'bathrooms'];

  // Find the apartment by ID from the database
  const apartment = await Apartment.findOne({ _id: apartmentId });

  // Check if the user id === the owner ID property in the apartment
  checkPermissions(req.userId, apartment.owner);

  // delete the existing image from cloudinary
  await cloudinary.uploader.destroy(apartment.cloudinary_id);

  if (req.file) {
    const uploadImage = await cloudinary.uploader.upload(req.file.path);
    apartment.image = uploadImage.secure_url || apartment.image;
    apartment.cloudinary_id = uploadImage.public_id || apartment.cloudinary_id;
  }

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

  // delete the image from cloudinary
  await cloudinary.uploader.destroy(apartment.cloudinary_id);

  await apartment.deleteOne();

  successResponse(res, 'Apartment has been deleted');
});
