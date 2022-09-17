import { Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES, CreateManyVideoStatsDto } from '~/shared/types/types';
import { VideoStatsRepository } from '../port/video-stats-repository';

@injectable()
export class VideoStatsService {
  constructor(@inject(CONTAINER_TYPES.VideoStatsRepository) private videoStatsRepository: VideoStatsRepository) {}

  async createManyVideoStats({
    videoId,
    userId,
    isLive,
    wasSubscribed,
    source,
    stats,
  }: CreateManyVideoStatsDto): Promise<boolean> {
    const videoStats = await this.videoStatsRepository.createManyVideoStats({
      data: stats.map(
        (vs) =>
          ({
            videoId,
            ...(userId && { userId }),
            watchTime: vs.watchTime,
            device: vs.device,
            language: vs.language,
            isLive,
            ...(vs.reaction && { reaction: vs.reaction }),
            ...(vs.subscription && { subscription: vs.subscription }),
            wasSubscribed,
            ...(vs.commentsActivity && { commentsActivity: vs.commentsActivity }),
            ...(vs.chatsActivity && { chatsActivity: vs.chatsActivity }),
            source,
            createdAt: vs.createdAt,
          } as Prisma.VideoStatsCreateManyInput),
      ),
    });

    return videoStats;
  }
}
