import { UploadApiResponse } from 'cloudinary';
import { CloudinaryUploadDto } from '~/shared/types/types';

export interface CloudinaryPort {
  upload(uploadDto: CloudinaryUploadDto): Promise<UploadApiResponse>;
}
