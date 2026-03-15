import { v2 as cloudinary } from 'cloudinary';

export const configureCloudinary = ({ cloudName, apiKey, apiSecret }) => {
  if (!cloudName || !apiKey || !apiSecret) {
    console.warn('Cloudinary credentials missing. Upload endpoints will not work.');
    return;
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  });
};

export default cloudinary;
