import { Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES, CreateManyVideoStatsDto, CreateOneVideoStatDto } from '~/shared/types/types';
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
                  durationStamp: vs.durationStamp,
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

  async createVideoStat({ userId, stat }: CreateOneVideoStatDto): Promise<boolean> {
    const videoStats = await this.videoStatsRepository.createManyVideoStats({
      data: [
        {
          videoId: stat.videoId,
          ...(userId && {
            userId,
            wasSubscribed: stat.wasSubscribed,
          }),
          watchTime: stat.watchTime,
          device: stat.device,
          language: stat.language,
          isLive: stat.isLive,
          durationStamp: stat.durationStamp,
          view: stat.view,
          ...(stat.reaction && { reaction: stat.reaction }),
          ...(stat.subscription && { subscription: stat.subscription }),
          ...(stat.commentsActivity && { commentsActivity: stat.commentsActivity }),
          ...(stat.chatsActivity && { chatsActivity: stat.chatsActivity }),
          source: stat.source,
          createdAt: stat.createdAt,
        } as Prisma.VideoStatsCreateManyInput,
      ],
    });

    return videoStats;
  }
}
