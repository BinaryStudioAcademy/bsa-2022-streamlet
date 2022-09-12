import { VideoComment } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { CommentExpandedInfo, CONTAINER_TYPES } from '~/shared/types/types';
import { CommentRepository } from '../port/comment-repository';

@injectable()
export class CommentService {
  constructor(@inject(CONTAINER_TYPES.CommentRepository) private commentRepository: CommentRepository) {}

  getCommentById(id: string): Promise<(VideoComment & { repliesCount: number }) | null> {
    return this.commentRepository.getCommentById(id);
  }

  updateCommentById(id: string, text: string, remove: boolean): Promise<CommentExpandedInfo | null> {
    return this.commentRepository.updateCommentById(id, text, remove);
  }

  deleteCommentById(id: string): Promise<boolean> {
    return this.commentRepository.deleteCommentById(id);
  }
}
