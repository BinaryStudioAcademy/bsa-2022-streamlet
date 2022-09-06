import { inject, injectable } from 'inversify';
import { ImageStorePort } from '~/core/common/port/image-store';
import { castToImageUploadResponseDto } from '../common/dtos/upload-api-response-dto';
import { CloudinaryApi, ImageUploadRequestDto, ImageUploadResponseDto, CONTAINER_TYPES } from '~/shared/types/types';

@injectable()
export class ImageStoreAdapter implements ImageStorePort {
  private cloudinary: CloudinaryApi;

  constructor(@inject(CONTAINER_TYPES.Cloudinary) cloudinary: CloudinaryApi) {
    this.cloudinary = cloudinary;
  }

  async upload({
    base64Str,
    type,
    userId,
  }: ImageUploadRequestDto & { userId: string }): Promise<ImageUploadResponseDto> {
    await this.cloudinary.uploader.destroy(`${userId}${type}`);

    const apiResponse = await this.cloudinary.uploader.upload(base64Str, {
      upload_preset: type,
      public_id: `${userId}${type}`,
    });
    return castToImageUploadResponseDto(apiResponse);
  }
}
