import { UploadApiResponse } from 'cloudinary';

type UserUploadResponseDto = Pick<UploadApiResponse, 'url' | 'format' | 'width' | 'height'>;

export { type UserUploadResponseDto };
