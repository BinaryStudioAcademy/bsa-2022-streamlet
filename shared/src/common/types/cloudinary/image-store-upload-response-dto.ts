import { UploadApiResponse } from 'cloudinary';

type ImageUploadResponseDto = Pick<UploadApiResponse, 'url' | 'format' | 'width' | 'height'>;

export { type ImageUploadResponseDto };
