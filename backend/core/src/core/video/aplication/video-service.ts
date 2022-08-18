import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES, VideoBaseResponseDto } from '~/shared/types/types';
import { VideoRepository } from '~/core/video/port/video-repository';
import { Video } from '@prisma/client';

@injectable()
export class VideoService {
  private videoRepository: VideoRepository;

  constructor(@inject(CONTAINER_TYPES.VideoRepository) videoRepository: VideoRepository) {
    this.videoRepository = videoRepository;
  }

  getById(id: string): Promise<VideoBaseResponseDto | null> {
    return this.videoRepository.getById(id);
  }
  getAll(): Promise<Video[]> {
    return this.videoRepository.getAll();
  }
}
