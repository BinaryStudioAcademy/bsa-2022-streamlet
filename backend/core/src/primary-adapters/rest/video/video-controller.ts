import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  queryParam,
  request,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import {
  ChannelSearch,
  CONTAINER_TYPES,
  ExtendedAuthenticatedRequest,
  ExtendedRequest,
  PopularVideoResponseDto,
  PopularVideosRequestDtoType,
  VideoSearch,
} from '~/shared/types/types';

import { VideoService } from '~/core/video/application/video-service';
import {
  ApiPath,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoApiPath,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
  VideoExpandedResponseDto,
  DateFilterId,
  DurationFilterId,
  SearchQueryParam,
  SortByFilterId,
  TypeFilterId,
  SearchDataResponseDto,
  Comment,
  BaseReplyRequestDto,
  VideoPaginationParams,
  AddVideoViewResponseDto,
  VideoApiPathParams,
  GetSimilarVideosResponseDto,
  VideoInfoDto,
  RecommendedVideosParams,
} from 'shared/build';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { NotFound } from '~/shared/exceptions/not-found';
import { ChannelSubscriptionRepository } from '~/core/channel-subscription/port/channel-subscription-repository';
import { optionalAuthenticationMiddleware } from '../middleware/optional-authentication-middleware';
import { VideoRepository } from '~/core/video/port/video-repository';

import {
  exceptionMessages,
  matchVideoFilterDate,
  matchVideoFilterDuration,
  matchVideoFilterSortBy,
  matchVideoFilterType,
} from '~/shared/enums/enums';
import { authenticationMiddleware, CreateVideoHistoryRecordMiddleware } from '../middleware';
import { normalizeCategoryFiltersPayload } from '~/primary-adapters/rest/category/helpers/normalize-category-filters-helper';
import { ChannelService } from '~/core/channel/application/channel-service';
import { matchChannelFilterSortBy } from '~/shared/enums/channel/channel-filters-data.config';
import { getSearchQuerySplit } from '~/shared/helpers/search/search';
import { Forbidden } from '~/shared/exceptions/forbidden';
import { stringToVideoPrivacyHelper } from './helpers/string-to-video-privacy-helper';
import { BadRequest } from '~/shared/exceptions/bad-request';

/**
 * @swagger
 * tags:
 *   name: videos
 *   description: Videos management
 * components:
 *    schemas:
 *      Channel:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          name:
 *            type: string
 *          avatar:
 *            type: string
 *      Video:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          name:
 *            type: string
 *          status:
 *            type: string
 *          publishedAt:
 *            type: string
 *            format: date-time
 *          scheduledStreamDate:
 *            type: string
 *            format: date-time
 *          poster:
 *            type: string
 *          duration:
 *            type: integer
 *            format: int32
 *            minimum: 0
 *          videoViews:
 *            type: integer
 *            format: int64
 *            minimum: 0
 *          liveViews:
 *            type: integer
 *            format: int64
 *            minimum: 0
 *          channel:
 *            $ref: '#/components/schemas/Channel'
 */

@controller(ApiPath.VIDEOS)
export class VideoController extends BaseHttpController {
  private videoService: VideoService;

  constructor(
    @inject(CONTAINER_TYPES.VideoService) videoService: VideoService,
    @inject(CONTAINER_TYPES.ChannelService) private channelService: ChannelService,
    @inject(CONTAINER_TYPES.VideoRepository) private videoRepository: VideoRepository,
    @inject(CONTAINER_TYPES.ChannelSubscriptionRepository)
    private channelSubscriptionRepository: ChannelSubscriptionRepository,
  ) {
    super();

    this.videoService = videoService;
  }

  /**
   * @swagger
   * /videos:
   *    get:
   *      tags:
   *      - videos
   *      operationId: getAllVideos
   *      description: Returns an array of videos
   *      security: []
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Video'
   */
  @httpGet(VideoApiPath.ROOT)
  public async getAllVideos(@queryParam() paginationParams: VideoPaginationParams): Promise<DataVideo> {
    return this.videoService.getAllVideos(paginationParams);
  }

  @httpGet(VideoApiPath.GENERAL_VIDEOS, authenticationMiddleware)
  public async getGeneralVideos(@request() req: ExtendedAuthenticatedRequest): Promise<DataVideo> {
    const { id } = req.user;
    return await this.videoService.getGeneralVideos(id);
  }

  @httpGet(VideoApiPath.RECOMMENDED_VIDEOS, optionalAuthenticationMiddleware)
  public async getRecommendedVideos(
    @request() req: ExtendedAuthenticatedRequest,
    @queryParam() paginationParams: Omit<RecommendedVideosParams, 'userId'>,
  ): Promise<DataVideo> {
    const id = req?.user?.id ?? undefined;

    const params: RecommendedVideosParams = {
      userId: id,
      ...paginationParams,
    };

    return await this.videoService.getRecommendedVideos(params);
  }

  @httpGet(VideoApiPath.GET_MY_VIDEO, authenticationMiddleware)
  public async getMyVideos(@request() req: ExtendedAuthenticatedRequest): Promise<VideoInfoDto[]> {
    const { id: authorId } = req.user;

    const videos = await this.videoService.getMyVideos(authorId);
    return videos;
  }

  @httpDelete(VideoApiPath.ROOT, authenticationMiddleware)
  public async deleteByIds(
    @request() req: ExtendedAuthenticatedRequest,
    @requestBody()
    {
      authorId,
      ids,
    }: {
      authorId: string;
      ids: string[];
    },
  ): Promise<VideoInfoDto[]> {
    const { id } = req.user;
    if (authorId !== id) {
      throw new Forbidden();
    }

    const deletedVideos = await this.videoService.deleteByIds(ids);
    if (!deletedVideos) {
      throw new NotFound('Videos with this ids doesnt exists');
    }

    return deletedVideos;
  }

  @httpPut(VideoApiPath.PRIVACY, authenticationMiddleware)
  public async updatePrivacy(
    @requestBody()
    {
      videoIds,
      authorId,
      visibility,
    }: {
      videoIds: string[];
      authorId: string;
      visibility: string;
    },
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<VideoInfoDto[]> {
    const { id } = req.user;
    if (authorId !== id) {
      throw new Forbidden();
    }

    const privacyStatus = stringToVideoPrivacyHelper(visibility);
    if (!privacyStatus) {
      throw new BadRequest('Invalid video visibility parameter');
    }

    const updatedVideos = await this.videoService.updateVisibility({
      videoIds,
      visibility: privacyStatus,
    });
    if (!updatedVideos) {
      throw new NotFound('Video not found');
    }

    return updatedVideos;
  }

  @httpPut(VideoApiPath.$ID, authenticationMiddleware)
  public async updateInfo(
    @requestBody()
    {
      authorId,
      title,
      description,
    }: {
      authorId: string;
      title?: string;
      description?: string;
    },
    @requestParam('videoId') videoId: string,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<VideoInfoDto> {
    const { id } = req.user;
    if (authorId !== id) {
      throw new Forbidden();
    }

    const updatedVideo = await this.videoService.updateInfo({
      videoId,
      title,
      description,
    });
    if (!updatedVideo) {
      throw new NotFound('Video not found');
    }

    return updatedVideo;
  }

  /**
   * @swagger
   * /videos/search:
   *    get:
   *      tags:
   *      - videos
   *      operationId: getVideosBySearch
   *      description: Returns videos
   *      security: []
   *      parameters:
   *        - in: query
   *          name: search_query
   *          description: search videos by text value
   *          required: true
   *          schema:
   *            type: string
   *        - in: query
   *          name: date
   *          description: filtered videos by date
   *          required: false
   *          schema:
   *            type: string
   *        - in: query
   *          name: type
   *          description: filtered videos by type
   *          required: false
   *          schema:
   *            type: string
   *        - in: query
   *          name: duration
   *          description: filtered videos by duration
   *          required: false
   *          schema:
   *            type: string
   *        - in: query
   *          name: sortBy
   *          description: sorted videos by parameters
   *          required: false
   *          schema:
   *            type: string
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  videos:
   *                    type: object
   *                    properties:
   *                      list:
   *                        type: array
   *                        items:
   *                          $ref: '#/components/schemas/Video'
   *                      total:
   *                        type: integer
   *                        format: int32
   *                        minimum: 0
   *                  channels:
   *                    type: object
   *                    properties:
   *                      list:
   *                        type: array
   *                        items:
   *                          type: object
   *                          properties:
   *                            id:
   *                              type: string
   *                              format: uuid
   *                            name:
   *                              type: string
   *                            description:
   *                              type: string
   *                            avatar:
   *                              type: string
   *                            subscribersCount:
   *                              type: integer
   *                              format: int64
   *                              minimum: 0
   *                            videosCount:
   *                              type: integer
   *                              format: int64
   *                              minimum: 0
   *                            createdAt:
   *                              type: string
   *                              format: date-time
   *                      total:
   *                        type: integer
   *                        format: int32
   *                        minimum: 0
   */
  @httpGet(VideoApiPath.SEARCH)
  public async getVideosBySearch(
    @queryParam(SearchQueryParam.SEARCH_TEXT) search: string | undefined,
    @queryParam(SearchQueryParam.DURATION) duration: DurationFilterId,
    @queryParam(SearchQueryParam.DATE) date: DateFilterId,
    @queryParam(SearchQueryParam.TYPE) type: TypeFilterId,
    @queryParam(SearchQueryParam.SORT_BY) sortBy: SortByFilterId,
  ): Promise<SearchDataResponseDto> {
    if (!search) {
      return {
        channels: { list: [], total: 0 },
        videos: { list: [], total: 0 },
      };
    }

    const queryParams: VideoSearch = {
      searchText: getSearchQuerySplit(search).join(' & '),
      duration: matchVideoFilterDuration[duration] || matchVideoFilterDuration[DurationFilterId.ANY],
      date: matchVideoFilterDate[date] || matchVideoFilterDate[DateFilterId.ANYTIME],
      type: matchVideoFilterType[type] || matchVideoFilterType[TypeFilterId.ALL],
      sortBy: matchVideoFilterSortBy[sortBy] || matchVideoFilterSortBy[SortByFilterId.DEFAULT],
    };

    const channelQueryParams: ChannelSearch = {
      searchText: queryParams.searchText,
      date: queryParams.date,
      sortBy: matchChannelFilterSortBy[sortBy] || matchChannelFilterSortBy[SortByFilterId.DEFAULT],
    };

    if (type === TypeFilterId.CHANNEL) {
      return {
        channels: await this.channelService.getChannelsBySearch(channelQueryParams),
        videos: { list: [], total: 0 },
      };
    }
    if (
      (duration && duration !== DurationFilterId.ANY) ||
      (type && (type === TypeFilterId.VIDEO || type === TypeFilterId.STREAM))
    ) {
      return {
        channels: { list: [], total: 0 },
        videos: await this.videoService.getVideosBySearch(queryParams),
      };
    }
    return {
      channels: await this.channelService.getFirstChannelBySearch(channelQueryParams),
      videos: await this.videoService.getVideosBySearch(queryParams),
    };
  }

  @httpGet(VideoApiPath.POPULAR, optionalAuthenticationMiddleware)
  public async getPopular(
    @queryParam() { page, category }: PopularVideosRequestDtoType,
  ): Promise<PopularVideoResponseDto> {
    const preparedCategory = normalizeCategoryFiltersPayload(category)[0];
    return this.videoService.getPopular({ category: preparedCategory, page });
  }

  /**
   * @swagger
   * /videos/:videoId/similar:
   *    get:
   *      tags:
   *      - videos
   *      operationId: getSimilarVideos
   *      description: Returns an array of videos
   *      security: []
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Video'
   */
  @httpGet(`${VideoApiPath.$ID}${VideoApiPath.SIMILAR_VIDEOS}`)
  public async getSimilarVideos(@requestParam(VideoApiPathParams.ID) id: string): Promise<GetSimilarVideosResponseDto> {
    const similarVideos = await this.videoService.getSimilarVideos(id);
    return { videos: similarVideos };
  }

  @httpGet(`${VideoApiPath.$ID}`, optionalAuthenticationMiddleware, CreateVideoHistoryRecordMiddleware)
  public async get(
    @requestParam('videoId') videoId: string,
    @request() req: ExtendedRequest,
  ): Promise<VideoExpandedResponseDto> {
    const video = await this.videoService.getById(videoId);

    if (!video) {
      throw new NotFound('Such video doesn`t exist');
    }
    const { user } = req;
    let isSubscribed = false;
    let userReaction: boolean | null = null;
    if (user) {
      isSubscribed = await this.channelSubscriptionRepository.isUserSubscribed(video.channel.id, user.id);
      userReaction = await this.videoRepository.reactionByUser(video.id, user.id);
    }
    return {
      ...video,
      isUserSubscribedOnChannel: isSubscribed,
      userReaction: userReaction !== null ? { isLike: userReaction } : null,
    };
  }

  @httpGet(`${VideoApiPath.REPLIES_COMMENT}${VideoApiPath.$ID}`)
  public async getRepliesForComment(@requestParam('videoId') id: string): Promise<Comment[]> {
    const result = await this.videoService.getRepliesForComment(id);

    return result;
  }

  /**
   * @swagger
   * /videos/{id}/view:
   *    post:
   *      tags:
   *        - video
   *      operationId: addVideoView
   *      consumes:
   *        - application/json
   *      produces:
   *        - application/json
   *      description: Add view to video
   *      parameters:
   *        - in: path
   *          name: id
   *          description: video ID
   *          required: true
   *          schema:
   *            type: string
   *      responses:
   *        '200':
   *          description: view added
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  videoId:
   *                    type: string
   *                  currentViews:
   *                    type: number
   *        '404':
   *          description: video does not exist
   */
  @httpPost(`${VideoApiPath.$ID}${VideoApiPath.VIEW}`)
  public async addView(@requestParam('videoId') id: string): Promise<AddVideoViewResponseDto> {
    const newViewsCount = await this.videoService.addVideoView(id);
    if (!newViewsCount) {
      throw new NotFound(exceptionMessages.video.VIDEO_ID_NOT_FOUND);
    }
    return {
      currentViews: newViewsCount.currentViews,
      videoId: id,
    };
  }

  /**
   * @swagger
   * /videos/react/{id}:
   *    post:
   *      tags:
   *        - video
   *      operationId: addVideoReaction
   *      security:
   *      - bearerAuth: []
   *      consumes:
   *        - application/json
   *      produces:
   *        - application/json
   *      description: Add reaction to video
   *      parameters:
   *        - in: body
   *          name: body
   *          description: data that contain isLike filed
   *          required: true
   *          schema:
   *            $ref: '#/components/schemas/CreateReactionRequestDto'
   *        - in: path
   *          name: id
   *          description: video ID
   *          required: true
   *          schema:
   *            type: string
   *      responses:
   *        '200':
   *          description: reaction added
   *        '404':
   *          description: video does not exist
   */

  @httpPost(`${VideoApiPath.REACTION}${VideoApiPath.$ID}`, authenticationMiddleware)
  public async addReaction(
    @requestParam('videoId') id: string,
    @requestBody() body: CreateReactionRequestDto,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<CreateReactionResponseDto> {
    const { id: userId } = req.user;

    const reactionResponse = await this.videoService.addReaction(body, id, userId);

    if (!reactionResponse) {
      throw new NotFound('video does not exist');
    }

    return reactionResponse;
  }

  /**
   * @swagger
   * /videos/comment:
   *    post:
   *      tags:
   *        - video
   *      operationId: addVideoComment
   *      security:
   *      - bearerAuth: []
   *      consumes:
   *        - application/json
   *      produces:
   *        - application/json
   *      description: Add comment to video
   *      parameters:
   *        - in: body
   *          name: body
   *          description: data that contain comment text and video id
   *          required: true
   *          schema:
   *            $ref: '#/components/schemas/VideoCommentRequestDto'
   *      responses:
   *        '200':
   *          description: comment added
   *        '404':
   *          description: video does not exist
   */

  @httpPost(VideoApiPath.COMMENT, authenticationMiddleware)
  public async addComment(
    @requestBody() body: VideoCommentRequestDto,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<VideoCommentResponseDto> {
    const { id: userId } = req.user;

    const res = await this.videoService.addComment(body, userId);

    if (!res) {
      throw new NotFound('Video does not exist');
    }

    return res;
  }

  /**
   * @swagger
   * /videos/comment/react/{id}:
   *    post:
   *      tags:
   *        - comment
   *      operationId: addCommentReaction
   *      security:
   *      - bearerAuth: []
   *      consumes:
   *        - application/json
   *      produces:
   *        - application/json
   *      description: Add reaction to comment
   *      parameters:
   *        - in: body
   *          name: body
   *          description: data that contain isLike filed
   *          required: true
   *          schema:
   *            $ref: '#/components/schemas/CreateReactionRequestDto'
   *        - in: path
   *          name: id
   *          description: comment ID
   *          required: true
   *          schema:
   *            type: string
   *      responses:
   *        '200':
   *          description: reaction added
   *        '404':
   *          description: Such a comment does not exists!
   */

  @httpPost(`${VideoApiPath.COMMENT}${VideoApiPath.REACTION}${VideoApiPath.$ID}`, authenticationMiddleware)
  public async addCommentReaction(
    @requestParam('videoId') id: string,
    @requestBody() body: CreateReactionRequestDto,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<CreateReactionResponseDto> {
    const { id: userId } = req.user;

    const reactionResponse = await this.videoService.addCommentReaction(body, id, userId);

    if (!reactionResponse) {
      throw new NotFound('Such a comment does not exist!');
    }

    return reactionResponse;
  }

  @httpPost(VideoApiPath.REPLIES_COMMENT, authenticationMiddleware)
  public async addVideoCommentReply(
    @requestBody() body: BaseReplyRequestDto,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<Comment[]> {
    const { id: userId } = req.user;

    const result = await this.videoService.addVideoCommentReply(body, userId);

    if (!result) {
      throw new NotFound('Unexpected error');
    }

    return result;
  }
}
