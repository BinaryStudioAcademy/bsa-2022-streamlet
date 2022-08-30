import { StreamingStatus } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { BaseVideoResponseDto } from 'shared/build';
import { VideoRepository } from '~/core/video/port/video-repository';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';

@injectable()
export class FollowingService {
  constructor(@inject(CONTAINER_TYPES.VideoRepository) private videoRepository: VideoRepository) {}

  async getOfflineVideos(userId: string): Promise<BaseVideoResponseDto[]> {
    const videos = await this.videoRepository.getAll({
      filters: { streamingStatus: StreamingStatus.finished, fromChannelSubscribedByUserWithId: userId },
    });
    return videos.list;
  }

  async getLiveideos(userId: string): Promise<BaseVideoResponseDto[]> {
    const videos = await this.videoRepository.getAll({
      filters: { streamingStatus: StreamingStatus.live, fromChannelSubscribedByUserWithId: userId },
    });
    return videos.list;
  }
}
