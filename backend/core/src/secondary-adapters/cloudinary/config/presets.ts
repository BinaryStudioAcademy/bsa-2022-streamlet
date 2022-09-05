import { CloudinaryApi, ImageStorePresetType } from 'shared/build';

export const uploadPresets = (cloudinary: CloudinaryApi): void => {
  cloudinary.api.create_upload_preset({
    name: ImageStorePresetType.AVATAR,
    folder: 'avatar',
    allowed_formats: 'jpg, png, jpeg',
  });
  cloudinary.api.create_upload_preset({
    name: ImageStorePresetType.CATEGORY_POSTER,
    folder: 'category-poster',
    allowed_formats: 'jpg, png, jpeg',
  });
  cloudinary.api.create_upload_preset({
    name: ImageStorePresetType.CHANNEL_AVATAR,
    folder: 'channel/avatar',
    allowed_formats: 'jpg, png, jpeg',
  });
  cloudinary.api.create_upload_preset({
    name: ImageStorePresetType.CHANNEL_BANNER,
    folder: 'channel/banner',
    allowed_formats: 'jpg, png, jpeg',
  });
  cloudinary.api.create_upload_preset({
    name: ImageStorePresetType.STREAM_POSTER,
    folder: 'stream/poster',
    allowed_formats: 'jpg, png, jpeg',
  });
};
