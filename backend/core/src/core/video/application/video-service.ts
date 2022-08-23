import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { VideoRepository } from '~/core/video/port/video-repository';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';

@injectable()
export class VideoService {
  private videoRepository: VideoRepository;

  constructor(@inject(CONTAINER_TYPES.VideoRepository) videoRepository: VideoRepository) {
    this.videoRepository = videoRepository;
  }

  getAllVideos(): Promise<DataVideo> {
    return this.videoRepository.getAll();
  }
}
