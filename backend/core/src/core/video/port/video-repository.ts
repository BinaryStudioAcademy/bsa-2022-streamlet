import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';

export interface VideoRepository {
  getAll(): Promise<DataVideo>;
}
