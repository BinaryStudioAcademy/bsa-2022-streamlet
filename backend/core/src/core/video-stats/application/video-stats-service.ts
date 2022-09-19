import { Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES, CreateManyVideoStatsDto } from '~/shared/types/types';
import { VideoStatsRepository } from '../port/video-stats-repository';

@injectable()
export class VideoStatsService {
  constructor(@inject(CONTAINER_TYPES.VideoStatsRepository) private videoStatsRepository: VideoStatsRepository) {}

  async createManyVideoStats({ userId, data }: CreateManyVideoStatsDto): Promise<boolean> {
    const videoIds = Object.keys(data);

    const videoStats = await this.videoStatsRepository.createManyVideoStats({
      data: videoIds
        .map((vId) =>
          data[vId].stats
            .filter((vs) => vs.videoId === vId)
            .map(
              (vs) =>
                ({
                  videoId: vId,
                  ...(userId && {
                    userId,
                    wasSubscribed: vs.wasSubscribed,
                  }),
                  watchTime: vs.watchTime,
                  device: vs.device,
                  language: vs.language,
                  isLive: vs.isLive,
                  ...(vs.reaction && { reaction: vs.reaction }),
                  ...(vs.subscription && { subscription: vs.subscription }),
                  ...(vs.commentsActivity && { commentsActivity: vs.commentsActivity }),
                  ...(vs.chatsActivity && { chatsActivity: vs.chatsActivity }),
                  source: vs.source,
                  createdAt: vs.createdAt,
                } as Prisma.VideoStatsCreateManyInput),
            ),
        )
        .flat(),
    });

    return videoStats;
  }
}
