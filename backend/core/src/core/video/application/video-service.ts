import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES, PopularVideoResponseDto, PopularVideosRequestDtoType } from '~/shared/types/types';
import { VideoRepository } from '~/core/video/port/video-repository';
import { BaseVideoResponseDto, DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { Comment } from 'shared/build/common/types/comment';
import {
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
} from 'shared/build';

@injectable()
export class VideoService {
  private videoRepository: VideoRepository;

  constructor(@inject(CONTAINER_TYPES.VideoRepository) videoRepository: VideoRepository) {
    this.videoRepository = videoRepository;
  }

  getAllVideos(): Promise<DataVideo> {
    return this.videoRepository.getAll();
  }

  getById(id: string): Promise<
    | (BaseVideoResponseDto & {
        comments: Comment[];
        description: string;
        likeNum: number;
        videoPath: string;
        dislikeNum: number;
      })
    | null
  > {
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

  async getPopular(request: PopularVideosRequestDtoType): Promise<PopularVideoResponseDto> {
    const pageNumber = request.page;
    const lastPage = Math.ceil((await this.videoRepository.getPopularVideoLength(request.category)) / 10);
    if (pageNumber <= 0) {
      return this.videoRepository.getPopular(request, 10, 0, lastPage);
    }
    const skip = (pageNumber - 1) * 10;
    return this.videoRepository.getPopular(request, 10, skip, lastPage);
  }
}
