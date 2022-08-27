import { BaseVideoResponseDto } from 'shared/build';
import { Comment } from 'shared/build/common/types/comment';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';

export interface VideoRepository {
  getAll(): Promise<DataVideo>;
  getById(id: string): Promise<(BaseVideoResponseDto & { comments: Comment[]; description: string }) | null>;
}
