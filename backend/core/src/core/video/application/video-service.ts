import { inject, injectable } from 'inversify';
import {
  CONTAINER_TYPES,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoBaseResponseDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
} from '~/shared/types/types';
import { VideoRepository } from '~/core/video/port/video-repository';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { ChannelCrudRepository } from '~/core/channel-crud/port/channel-crud-repository';

@injectable()
export class VideoService {
  private videoRepository: VideoRepository;
  private channelCrudRepository: ChannelCrudRepository;
  constructor(
    @inject(CONTAINER_TYPES.VideoRepository) videoRepository: VideoRepository,
    @inject(CONTAINER_TYPES.ChannelCrudRepository) channelCrudRepository: ChannelCrudRepository,
  ) {
    this.videoRepository = videoRepository;
    this.channelCrudRepository = channelCrudRepository;
  }

  getAllVideos(): Promise<DataVideo> {
    return this.videoRepository.getAll();
  }
  addComment(request: VideoCommentRequestDto, userId: string): Promise<VideoCommentResponseDto | null> {
    return this.videoRepository.addComment(request, userId);
  }

  async getById(id: string, userId: string | null = null): Promise<VideoBaseResponseDto | null> {
    if (!userId) {
      return this.videoRepository.getById(id, undefined, false);
    }
    const isUserSubscribeOnVideoChannel = await this.channelCrudRepository.isUserSubscribeByVideoId(id, userId);

    return this.videoRepository.getById(id, userId, isUserSubscribeOnVideoChannel);
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
