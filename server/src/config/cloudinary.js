import { v2 as cloudinary } from 'cloudinary';

// setting up cloudinary configurations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_SECRET,
  api_key: process.env.CLOUDINARY_KEY,
});


export default cloudinary;
