import { UploadApiResponse } from 'cloudinary';
import { CloudinaryUploadDto } from '~/shared/types/types';

export interface ImageStorePort {
  upload(uploadDto: CloudinaryUploadDto): Promise<UploadApiResponse>;
}
