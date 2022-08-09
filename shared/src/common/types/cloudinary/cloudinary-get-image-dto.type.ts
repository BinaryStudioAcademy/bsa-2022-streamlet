import { CloudinaryPresetType } from '~/common/enums/cloudinary/cloudinary-preset.enum';

type CloudinaryGetImageDto = {
  imageId: string;
  type: CloudinaryPresetType;
};

export { type CloudinaryGetImageDto };
