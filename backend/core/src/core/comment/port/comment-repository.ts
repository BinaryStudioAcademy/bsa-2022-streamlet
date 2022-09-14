import { VideoComment } from '@prisma/client';
import { CommentExpandedInfo } from '~/shared/types/types';

export interface CommentRepository {
  getCommentById(id: string): Promise<(VideoComment & { repliesCount: number }) | null>;

  updateCommentById(id: string, text: string, remove: boolean): Promise<CommentExpandedInfo | null>;

  deleteCommentById(id: string): Promise<boolean>;
}
