import { inject, injectable } from 'inversify';
import {
  CONTAINER_TYPES,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoBaseResponseDto,
} from '~/shared/types/types';
import { VideoRepository } from '~/core/video/port/video-repository';
import { Video } from '@prisma/client';
import { ChannelRepository } from '~/core/channel/port/channel-repository';

@injectable()
export class VideoService {
  private videoRepository: VideoRepository;
  private channelRepository: ChannelRepository;
  constructor(
    @inject(CONTAINER_TYPES.VideoRepository) videoRepository: VideoRepository,
    @inject(CONTAINER_TYPES.ChannelRepository) channelRepository: ChannelRepository,
  ) {
    this.videoRepository = videoRepository;
    this.channelRepository = channelRepository;
  }

  async getById(id: string, userId: string | null = null): Promise<VideoBaseResponseDto | null> {
    if (!userId) {
      return this.videoRepository.getById(id, undefined, false);
    }
    const isUserSubscribeOnVideoChannel = await this.channelRepository.isUserSubscribeByVideoId(id, userId);
    return this.videoRepository.getById(id, userId, isUserSubscribeOnVideoChannel);
  }

  getAll(): Promise<Video[]> {
    return this.videoRepository.getAll();
  }

  addReaction(request: CreateReactionRequestDto, videoId: string): Promise<CreateReactionResponseDto | null> {
    return this.videoRepository.addReaction(request, videoId);
  }
}
