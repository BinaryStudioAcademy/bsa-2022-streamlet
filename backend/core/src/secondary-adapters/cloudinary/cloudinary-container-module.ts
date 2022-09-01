import { ContainerModule, interfaces } from 'inversify';
import { CloudinaryApi, CONTAINER_TYPES } from '~/shared/types/types';
import { v2 as cloudinary } from 'cloudinary';
import { CONFIG } from '~/configuration/config';
import { ImageStorePort } from '~/core/common/port/image-store';
import { ImageStoreAdapter } from './cloud/cloudinary-adapter';
import { uploadPresets } from './config/presets';

const cloudinaryContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  const { IMAGE_CLOUD_STORAGE } = CONFIG;
  cloudinary.config({
    cloud_name: IMAGE_CLOUD_STORAGE.NAME,
    api_key: IMAGE_CLOUD_STORAGE.API_KEY,
    api_secret: IMAGE_CLOUD_STORAGE.API_SECRET,
    secure: true,
  });
  uploadPresets(cloudinary);

  bind<ImageStorePort>(CONTAINER_TYPES.ImageStoreAdapter).to(ImageStoreAdapter);
  bind<CloudinaryApi>(CONTAINER_TYPES.Cloudinary).toConstantValue(cloudinary);
});

export { cloudinaryContainerModule };
