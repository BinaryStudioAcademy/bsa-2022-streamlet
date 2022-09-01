import { StreamStatus } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { BaseVideoResponseDto } from 'shared/build';
import { VideoRepository } from '~/core/video/port/video-repository';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';

@injectable()
export class FollowingService {
  constructor(@inject(CONTAINER_TYPES.VideoRepository) private videoRepository: VideoRepository) {}

  async getOfflineVideos(userId: string): Promise<BaseVideoResponseDto[]> {
    const videos = await this.videoRepository.getAll({
      filters: { streamStatus: StreamStatus.FINISHED, fromChannelSubscribedByUserWithId: userId },
    });
    return videos.list;
  }

  async getLiveVideos(userId: string): Promise<BaseVideoResponseDto[]> {
    const videos = await this.videoRepository.getAll({
      filters: { streamStatus: StreamStatus.LIVE, fromChannelSubscribedByUserWithId: userId },
    });
    return videos.list;
  }
}
