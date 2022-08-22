import { inject, injectable } from 'inversify';
import {
  CONTAINER_TYPES,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoBaseResponseDto,
  VideoCommentResponseDto,
} from '~/shared/types/types';
import { VideoRepository } from '~/core/video/port/video-repository';
import { Video } from '@prisma/client';
import { ChannelRepository } from '~/core/channel/port/channel-repository';
import { VideoCommentRequestDto } from 'shared/build';

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

  addComment(request: VideoCommentRequestDto, userId: string): Promise<VideoCommentResponseDto | null> {
    return this.videoRepository.addComment(request, userId);
  }

  getAll(): Promise<Video[]> {
    return this.videoRepository.getAll();
  }

  async addReaction(
    request: CreateReactionRequestDto,
    videoId: string,
    userId: string,
  ): Promise<CreateReactionResponseDto | null> {
    const userReaction = await this.videoRepository.hasUserReacted(userId, videoId);
    if (userReaction && userReaction.length) {
      return this.videoRepository.removeReactionAndAddNew(videoId, userId, request.isLike, userReaction[0]);
    }
    return this.videoRepository.addReaction(request, videoId, userId);
  }
}
