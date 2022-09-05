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
  BaseReplyRequestDto,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
  Comment,
} from 'shared/build';
import { VideoExpandedInfo } from '~/shared/types/video/video-expanded-dto-before-trimming';
import { POPULAR_VIDEO_CARD_IN_ONE_PAGE } from '~/shared/constants/constants';
import { usePagination } from '~/shared/helpers';

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
    const { page: pageNumber, category } = request;
    const allDataLength = await this.videoRepository.getPopularVideoLength(category);
    const paginationParam = usePagination({ allDataLength, pageNumber, itemInOnePage: POPULAR_VIDEO_CARD_IN_ONE_PAGE });

    if (request.category === 'live') {
      return this.videoRepository.getPopularLive(paginationParam);
    }

    return this.videoRepository.getPopular({ category, ...paginationParam });
  }

  async getRepliesForComment(commentId: string): Promise<Comment[]> {
    return await this.videoRepository.getRepliesForComment(commentId);
  }

  async addVideoCommentReply(request: BaseReplyRequestDto, userId: string): Promise<Comment[]> {
    return this.videoRepository.addVideoCommentReply(request, userId);
  }
}
