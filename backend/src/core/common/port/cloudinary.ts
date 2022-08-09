import { UploadApiResponse } from 'cloudinary';
import { CloudinaryGetImageDto, CloudinaryUploadDto } from '~/shared/types/types';

export interface CloudinaryPort {
  getImage(getImageDto: CloudinaryGetImageDto): Promise<string>;
  upload(uploadDto: CloudinaryUploadDto): Promise<UploadApiResponse>;
}
