import { PrismaClient, VideoComment } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { CommentRepository } from '~/core/comment/port/comment-repository';
import { CommentExpandedInfo } from '~/shared/types/types';

@injectable()
export class CommentRepositoryAdapter implements CommentRepository {
  constructor(@inject(CONTAINER_TYPES.PrismaClient) private prismaClient: PrismaClient) {}

  async getCommentById(id: string): Promise<(VideoComment & { repliesCount: number }) | null> {
    const comment = await this.prismaClient.videoComment.findFirst({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            childComments: true,
          },
        },
      },
    });

    if (comment === null) {
      return comment;
    }

    return { ...comment, repliesCount: comment._count.childComments };
  }

  async updateCommentById(id: string, text: string, remove: boolean): Promise<CommentExpandedInfo | null> {
    const comment = await this.prismaClient.videoComment.update({
      where: {
        id,
      },
      data: {
        text: text,
        ...(!remove && { isEdited: true }),
        ...(remove && { isDeleted: true }),
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        _count: {
          select: {
            childComments: true,
          },
        },
        commentReactions: true,
      },
    });

    if (comment === null) {
      return comment;
    }

    return { ...comment, repliesCount: comment._count.childComments };
  }

  async deleteCommentById(id: string): Promise<boolean> {
    await this.prismaClient.commentReaction.deleteMany({
      where: {
        commentId: id,
      },
    });
    return await this.prismaClient.videoComment
      .delete({
        where: {
          id,
        },
      })
      .then((comment) => !!comment);
  }
}
