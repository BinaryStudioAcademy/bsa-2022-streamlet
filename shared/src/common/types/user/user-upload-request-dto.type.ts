import { ImageUploadRequestDto } from '../cloudinary/image-store-upload-dto-request.type';

type UserUploadRequestDto = Pick<ImageUploadRequestDto, 'base64Str'>;

export { type UserUploadRequestDto };
