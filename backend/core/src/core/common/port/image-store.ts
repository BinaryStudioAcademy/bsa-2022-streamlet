import { ImageUploadRequestDto, ImageUploadResponseDto } from '~/shared/types/types';

export interface ImageStorePort {
  upload(uploadDto: ImageUploadRequestDto): Promise<ImageUploadResponseDto>;
}
