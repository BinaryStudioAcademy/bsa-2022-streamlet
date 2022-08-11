import { UploadApiResponse } from 'cloudinary';
import { ImageUploadResponseDto } from 'shared/build';

export const castToImageUploadResponseDto = ({
  url,
  format,
  width,
  height,
}: UploadApiResponse): ImageUploadResponseDto => {
  return {
    url,
    format,
    width,
    height,
  };
};
