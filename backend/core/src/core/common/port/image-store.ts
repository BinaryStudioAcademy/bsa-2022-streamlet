import { ImageUploadRequestDto, ImageUploadResponseDto } from '~/shared/types/types';

export interface ImageStorePort {
  upload(uploadDto: ImageUploadRequestDto & { userId: string }): Promise<ImageUploadResponseDto>;
}
