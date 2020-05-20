import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'todo-images',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  filename: (_, res, callback) => callback(null, res.originalName),
});

const Uploader = multer({ storage });

export default Uploader;
