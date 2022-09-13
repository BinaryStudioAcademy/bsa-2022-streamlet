import { VideoComment } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { Comment } from 'shared/build';
import { trimComment } from '~/shared/helpers/trim-comment';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { CommentRepository } from '../port/comment-repository';

@injectable()
export class CommentService {
  constructor(@inject(CONTAINER_TYPES.CommentRepository) private commentRepository: CommentRepository) {}

  getCommentById(id: string): Promise<(VideoComment & { repliesCount: number }) | null> {
    return this.commentRepository.getCommentById(id);
  }

  async updateCommentById(id: string, text: string, remove: boolean): Promise<Comment | undefined> {
    const videoComment = await this.commentRepository.updateCommentById(id, text, remove);
    if (!videoComment) {
      return;
    }
    return trimComment(videoComment);
  }

  deleteCommentById(id: string): Promise<boolean> {
    return this.commentRepository.deleteCommentById(id);
  }
}
