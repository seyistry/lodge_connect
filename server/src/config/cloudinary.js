import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// setting up cloudinary configurations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_SECRET,
  api_key: process.env.CLOUDINARY_KEY,
});

// Instance of Cloudinary Storage
export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Lodge Connect',
    allowedFormats: ['jpeg', 'png', 'jpg', 'svg'],
  },
});

export default cloudinary;
