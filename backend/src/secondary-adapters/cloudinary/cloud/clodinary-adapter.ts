import { UploadApiResponse } from 'cloudinary';
import { inject, injectable } from 'inversify';
import { ImageStorePort } from '~/core/common/port/image-store';
import { CloudinaryApi, CloudinaryUploadDto, CONTAINER_TYPES } from '~/shared/types/types';

@injectable()
export class CloudinaryAdapter implements ImageStorePort {
  private cloudinary: CloudinaryApi;

  constructor(@inject(CONTAINER_TYPES.Cloudinary) cloudinary: CloudinaryApi) {
    this.cloudinary = cloudinary;
  }

  async upload({ base64Str, type }: CloudinaryUploadDto): Promise<UploadApiResponse> {
    return await this.cloudinary.uploader.upload(base64Str, {
      upload_preset: type,
    });
  }
}
