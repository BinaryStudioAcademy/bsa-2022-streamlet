import { ImageStorePresetType } from '~/common/enums/cloudinary/image-store-preset.enum';

type ImageUploadRequestDto = {
  base64Str: string;
  type: ImageStorePresetType;
};

export { type ImageUploadRequestDto };
