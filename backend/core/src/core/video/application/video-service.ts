import { inject, injectable } from 'inversify';
import {
  CONTAINER_TYPES,
  PopularVideoResponseDto,
  PopularVideosRequestDtoType,
  VideoSearch,
} from '~/shared/types/types';
import { VideoRepository } from '~/core/video/port/video-repository';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import {
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
} from 'shared/build';
import { VideoExpandedInfo } from '~/shared/types/video/video-expanded-dto-before-trimming';
import { POPULAR_VIDEO_CARD_IN_ONE_PAGE } from '~/shared/constants/constants';

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

  getAuthorByVideoId(id: string): Promise<string | undefined> {
    return this.videoRepository.getAuthorById(id);
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

  async addCommentReaction(
    request: CreateReactionRequestDto,
    commentId: string,
    userId: string,
  ): Promise<CreateReactionResponseDto | null> {
    const userReaction = await this.videoRepository.commentReactionByUser(commentId, userId);

    if (userReaction !== null) {
      return this.videoRepository.removeCommentReactionAndAddNew(commentId, userId, request.isLike);
    }
    return this.videoRepository.addCommentReaction(request, commentId, userId);
  }

  getVideosBySearch(queryParams: VideoSearch): Promise<DataVideo> {
    return this.videoRepository.getVideosBySearch(queryParams);
  }

  async getPopular(request: PopularVideosRequestDtoType): Promise<PopularVideoResponseDto> {
    const pageNumber = request.page;
    const lastPage = Math.ceil(
      (await this.videoRepository.getPopularVideoLength(request.category)) / POPULAR_VIDEO_CARD_IN_ONE_PAGE,
    );
    if (pageNumber <= 0) {
      return this.videoRepository.getPopular(request, POPULAR_VIDEO_CARD_IN_ONE_PAGE, 0, lastPage);
    }
    const skip = (pageNumber - 1) * POPULAR_VIDEO_CARD_IN_ONE_PAGE;

    if (request.category === 'live') {
      return this.videoRepository.getPopularLive(request, POPULAR_VIDEO_CARD_IN_ONE_PAGE, skip, lastPage);
    }

    return this.videoRepository.getPopular(request, POPULAR_VIDEO_CARD_IN_ONE_PAGE, skip, lastPage);
  }
}
