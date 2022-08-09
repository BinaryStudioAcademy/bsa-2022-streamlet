import { UploadApiResponse, v2 } from 'cloudinary';
import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';

@injectable()
export class CloudinaryAdapter {
  private cloudinary: typeof v2;

  constructor(@inject(CONTAINER_TYPES.Cloudinary) cloudinary: typeof v2) {
    // TODO: add cloudinary api type
    this.cloudinary = cloudinary;
  }

  async getImage({ imageId, type }: { imageId: string; type: string }): Promise<string> {
    return await this.cloudinary.search.expression(`folder:${type}`).expression(`asset_id:${imageId}`).execute();
  }

  async upload({
    base64Str,
    type,
  }: {
    base64Str: string;
    type: string; //TODO: create enum for image type
  }): Promise<UploadApiResponse> {
    return await this.cloudinary.uploader.upload(base64Str, {
      upload_preset: type,
    });
  }
}
