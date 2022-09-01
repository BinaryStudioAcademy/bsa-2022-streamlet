import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES, VideoSearch } from '~/shared/types/types';
import { VideoRepository } from '~/core/video/port/video-repository';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import {
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
} from 'shared/build';
import { VideoExpandedInfo } from '~/shared/types/video/video-expanded-dto-before-trimming';

@injectable()
export class VideoService {
  private videoRepository: VideoRepository;

  constructor(@inject(CONTAINER_TYPES.VideoRepository) videoRepository: VideoRepository) {
    this.videoRepository = videoRepository;
  }

  getAllVideos(): Promise<DataVideo> {
    return this.videoRepository.getAll();
  }

  getById(id: string): Promise<VideoExpandedInfo | null> {
    return this.videoRepository.getById(id);
  }

  addComment(request: VideoCommentRequestDto, userId: string): Promise<VideoCommentResponseDto | null> {
    return this.videoRepository.addComment(request, userId);
  }

  async addReaction(
    request: CreateReactionRequestDto,
    videoId: string,
    userId: string,
  ): Promise<CreateReactionResponseDto | null> {
    const userReaction = await this.videoRepository.reactionByUser(videoId, userId);

    if (userReaction !== null) {
      return this.videoRepository.removeReactionAndAddNew(videoId, userId, request.isLike);
    }
    return this.videoRepository.addReaction(request, videoId, userId);
  }

  getVideosBySearch(queryParams: VideoSearch): Promise<DataVideo> {
    return this.videoRepository.getVideosBySearch(queryParams);
  }
}
