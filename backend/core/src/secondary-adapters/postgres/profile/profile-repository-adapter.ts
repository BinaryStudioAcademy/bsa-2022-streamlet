import { inject, injectable } from 'inversify';
import { PrismaClient, Video } from '@prisma/client';
import { CONTAINER_TYPES, VideoBaseResponseDto } from '~/shared/types/types';
import { createVideoBaseResponse } from '~/shared/helpers';
import { VideoRepository } from '~/core/video/port/video-repository';

type reactionCountReturn = { likeNum: number; disLikeNum: number };
@injectable()
export class VideoRepositoryAdapter implements VideoRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getAll(): Promise<Video[]> {
    return this.prismaClient.video.findMany();
  }

  async getById(id: string): Promise<VideoBaseResponseDto | null> {
    const video = await this.prismaClient.video.findUnique({
      where: {
        id,
      },
    });
    if (video === null) {
      return video;
    }
    const reactionCount = await this.calculateReaction(video);
    return createVideoBaseResponse(video, reactionCount.likeNum, reactionCount.disLikeNum);
  }

  async calculateReaction(video: Video): Promise<reactionCountReturn> {
    const likes = await this.prismaClient.reaction.findMany({
      where: {
        videoId: video.id,
        isLike: true,
      },
    });
    const dislikes = await this.prismaClient.reaction.findMany({
      where: {
        videoId: video.id,
        isLike: false,
      },
    });
    return {
      likeNum: likes.length,
      disLikeNum: dislikes.length,
    };
  }
}
