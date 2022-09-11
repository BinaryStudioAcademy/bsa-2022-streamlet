import { ErrorsType } from 'react-images-uploading';
import { ImageUploadErrorMessage } from '../../common/enums/enums';

export const getImageUploadError = (error: ErrorsType): string => {
  if (error?.acceptType) {
    return ImageUploadErrorMessage.FILE_EXTENSION;
  }
  if (error?.maxFileSize) {
    return ImageUploadErrorMessage.MAX_SIZE;
  }
  if (error?.resolution) {
    return ImageUploadErrorMessage.RESOLUTION_ERROR;
  }

  return ImageUploadErrorMessage.UNKNOWN_ERROR;
};
