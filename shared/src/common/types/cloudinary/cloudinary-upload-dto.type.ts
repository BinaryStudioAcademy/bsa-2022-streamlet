import { CloudinaryPresetType } from '~/common/enums/cloudinary/cloudinary-preset.enum';

type CloudinaryUploadDto = {
  base64Str: string;
  type: CloudinaryPresetType;
};

export { type CloudinaryUploadDto };
