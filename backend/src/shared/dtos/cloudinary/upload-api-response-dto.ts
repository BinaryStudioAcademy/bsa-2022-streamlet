import { UploadApiResponse } from 'cloudinary';
import { UserUploadResponseDto } from 'shared/build';

export const UploadApiResponseDto = ({ url, format, width, height }: UploadApiResponse): UserUploadResponseDto => {
  return {
    url,
    format,
    width,
    height,
  };
};
