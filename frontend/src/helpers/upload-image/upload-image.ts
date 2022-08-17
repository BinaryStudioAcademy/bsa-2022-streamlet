import { ErrorsType } from 'react-images-uploading';

export const getImageUploadError = (error: ErrorsType): string => {
  if (error?.acceptType) {
    return '';
  }
  if (error?.maxFileSize) {
    return '';
  }
  return '';
};
