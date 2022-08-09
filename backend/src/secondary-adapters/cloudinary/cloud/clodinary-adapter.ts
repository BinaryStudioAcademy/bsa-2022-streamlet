import { UploadApiResponse } from 'cloudinary';
import { inject, injectable } from 'inversify';
import { CloudinaryPort } from '~/core/common/cloudinary/port/cloudinary';
import { CloudinaryApi, CloudinaryGetImageDto, CloudinaryUploadDto, CONTAINER_TYPES } from '~/shared/types/types';

@injectable()
export class CloudinaryAdapter implements CloudinaryPort {
  private cloudinary: CloudinaryApi;

  constructor(@inject(CONTAINER_TYPES.Cloudinary) cloudinary: CloudinaryApi) {
    this.cloudinary = cloudinary;
  }

  async getImage({ imageId, type }: CloudinaryGetImageDto): Promise<string> {
    return await this.cloudinary.search.expression(`folder:${type}`).expression(`asset_id:${imageId}`).execute();
  }

  async upload({ base64Str, type }: CloudinaryUploadDto): Promise<UploadApiResponse> {
    return await this.cloudinary.uploader.upload(base64Str, {
      upload_preset: type,
    });
  }
}
