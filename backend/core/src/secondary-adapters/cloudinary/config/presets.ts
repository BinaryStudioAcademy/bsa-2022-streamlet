import { CloudinaryApi } from 'shared/build';

export const uploadPresets = (cloudinary: CloudinaryApi): void => {
  cloudinary.api.create_upload_preset({
    name: 'avatar',
    folder: 'avatar',
    allowed_formats: 'jpg, png, jpeg',
  });
  cloudinary.api.create_upload_preset({
    name: 'category-poster',
    folder: 'category-poster',
    allowed_formats: 'jpg, png, jpeg',
  });
  cloudinary.api.create_upload_preset({
    name: 'channel-avatar',
    folder: 'channel/avatar',
    allowed_formats: 'jpg, png, jpeg',
  });
  cloudinary.api.create_upload_preset({
    name: 'channel-banner',
    folder: 'channel/banner',
    allowed_formats: 'jpg, png, jpeg',
  });
};
