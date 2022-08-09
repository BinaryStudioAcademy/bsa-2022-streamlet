import { AsyncContainerModule, interfaces } from 'inversify';
import { CONTAINER_TYPES } from '../../shared/types/types';
import { v2 as cloudinary } from 'cloudinary';
import { CONFIG } from '~/configuration/config';

const cloudinaryContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  const { CLOUD } = CONFIG;
  cloudinary.config({
    cloud_name: CLOUD.NAME,
    api_key: CLOUD.API_KEY,
    api_secret: CLOUD.API_SECRET,
  });
  cloudinary.api.create_upload_preset({
    name: 'avatar',
    folder: 'avatars',
    allowed_formats: 'jpg, png',
  });

  bind<typeof cloudinary>(CONTAINER_TYPES.Cloudinary).toConstantValue(cloudinary);
});

export { cloudinaryContainerModule };
