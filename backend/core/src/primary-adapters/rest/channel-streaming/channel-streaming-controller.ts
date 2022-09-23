import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  httpPut,
  request,
  requestBody,
  requestParam,
  response,
} from 'inversify-express-utils';
import {
  CONTAINER_TYPES,
  ResetStreamingKeyRequestDto,
  StreamingKeyResponseDto,
  RtmpLiveRequestDto,
  CreateStreamRequestDto,
  OwnChannelResponseDto,
  StreamLiveStatusRequestDto,
  StreamPosterUploadRequestDto,
  StreamUpdateRequestDto,
  VideoStreamResponseDto,
  ExtendedAuthenticatedRequest,
  ChangeChatToggleRequestDto,
  ChangeChatToggleResponseDto,
  ExtendedRequest,
} from '~/shared/types/types';
import { ApiPath, ChannelStreamingApiPath } from '~/shared/enums/enums';
import { ChannelStreamingService } from '~/core/channel-streaming/application/channel-streaming-service';
import { inject } from 'inversify';
import { Forbidden } from '~/shared/exceptions/forbidden';
import { NotFound } from '~/shared/exceptions/not-found';
import { authenticationMiddleware } from '../middleware';
import { exceptionMessages } from '~/shared/enums/messages';
import { VideoService } from '~/core/video/application/video-service';
import { errorCodes, StreamingInfoResponseDto, StreamPosterUploadResponseDto } from 'shared/build';
import { ChannelCrudService } from '~/core/channel-crud/application/channel-crud-service';
import path from 'path';
import express from 'express';

/**
 * @swagger
 * tags:
 *   name: channel streaming
 *   description: Channel and streaming
 * components:
 *    schemas:
 *      RtmpLiveRequestDto:
 *        type: object
 *        properties:
 *          app:
 *            type: string
 *          flashver:
 *            type: string
 *          swfurl:
 *            type: string
 *          tcurl:
 *            type: string
 *          pageurl:
 *            type: string
 *          clientid:
 *            type: string
 *          name:
 *            type: string
 *          addr:
 *            type: string
 *          call:
 *            type: string
 *          type:
 *            type: string
 *        required:
 *          - app
 *          - flashver
 *          - swfurl
 *          - tcurl
 *          - pageurl
 *          - clientid
 *          - name
 *          - addr
 *          - call
 *      ResetStreamingKeyRequestDto:
 *        type: object
 *        properties:
 *          channelId:
 *            type: string
 *        required:
 *          - channelId
 *      StreamingKeyResponseDto:
 *        type: object
 *        properties:
 *          channelId:
 *            type: string
 *          streamingKey:
 *            type: string
 *        required:
 *          - channelId
 *          - streamingKey
 */
@controller(ApiPath.CHANNEL_STREAMING)
export class ChannelStreamingController extends BaseHttpController {
  private channelStreamingService: ChannelStreamingService;
  private channelCrudService: ChannelCrudService;
  private videoService: VideoService;

  constructor(
    @inject(CONTAINER_TYPES.ChannelStreamingService) channelStreamingService: ChannelStreamingService,
    @inject(CONTAINER_TYPES.ChannelCrudService) channelCrudService: ChannelCrudService,
    @inject(CONTAINER_TYPES.VideoService) videoService: VideoService,
  ) {
    super();
    this.channelStreamingService = channelStreamingService;
    this.channelCrudService = channelCrudService;
    this.videoService = videoService;
  }

  /**
   * @swagger
   * /channel-streaming/live:
   *    post:
   *      tags:
   *        - channel
   *      operationId: connectObs
   *      security: []
   *      consumes:
   *        - application/json
   *      produces:
   *        - application/json
   *      description: Checks stream key and sends notification to transcoder which then starts the stream
   *      parameters:
   *        - in: body
   *          name: body
   *          description: data sent by OBS
   *          required: true
   *          schema:
   *            $ref: '#/components/schemas/RtmpLiveRequestDto'
   *      responses:
   *        '200':
   *          description: successful operation
   *        '403':
   *          description: Streaming token is wrong or the channel doesn't have any pending streams
   */
  @httpPost(ChannelStreamingApiPath.CONNECT)
  public async connectObs(@requestBody() rtmpLiveRequestDto: RtmpLiveRequestDto): Promise<void> {
    const streamData = await this.channelStreamingService.checkStreamingKey(rtmpLiveRequestDto.name);
    if (streamData === null) {
      throw new Forbidden('Invalid streaming key or no video created to stream on');
    }
    const authorId = await this.channelCrudService.getAuthorByChannelId(streamData.channelId);
    if (!authorId) {
      throw new NotFound('Author of stream not found.');
    }
    await this.channelStreamingService.update({
      videoId: streamData.videoId,
      videoPath: `/segments/${streamData.videoId}/master.m3u8`,
    });
    this.channelStreamingService.notifyTranscoderAboutStreamStart({ authorId, streamData });
  }

  /**
   * @swagger
   * /channel-streaming/live_done:
   *    post:
   *      tags:
   *        - channel
   *      operationId: disconnectObs
   *      security: []
   *      consumes:
   *        - application/json
   *      produces:
   *        - application/json
   *      description: Sends notification to transcoder that the stream has stopped
   *      parameters:
   *        - in: body
   *          name: body
   *          description: data sent by OBS
   *          required: true
   *          schema:
   *            $ref: '#/components/schemas/RtmpLiveRequestDto'
   *      responses:
   *        '200':
   *          description: new streaming key is given
   */
  @httpPost(ChannelStreamingApiPath.DISCONNECT)
  public async disconnectObs(@requestBody() rtmpLiveRequestDto: RtmpLiveRequestDto): Promise<void> {
    const streamData = await this.channelStreamingService.getAuthorIdByStreamingKey(rtmpLiveRequestDto.name);
    if (streamData === null) {
      throw new Forbidden('Invalid streaming key or no channel with this key.');
    }
    this.channelStreamingService.notifyTranscoderAboutStreamEnd({
      authorId: streamData.authorId,
      streamingKey: streamData.streamingKey,
    });
  }

  /**
   * @swagger
   * /channel-streaming/streaming_key/{id}:
   *    get:
   *      tags:
   *        - channel
   *      operationId: getStreamingKey
   *      security: []
   *      consumes:
   *        - application/json
   *      produces:
   *        - application/json
   *      description: Gets the streaming key for the specified channel
   *      parameters:
   *        - in: path
   *          name: id
   *          description: channel ID to get the key
   *          required: true
   *          schema:
   *            type: string
   *      responses:
   *        '200':
   *          description: successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/StreamingKeyResponseDto'
   *        '404':
   *          description: channel not found
   */
  @httpGet(`${ChannelStreamingApiPath.STREAMING_KEY}${ChannelStreamingApiPath.$CHANNEL_ID}`, authenticationMiddleware)
  public async getStreamingKey(@requestParam('channelId') id: string): Promise<StreamingKeyResponseDto> {
    const keyData = await this.channelStreamingService.getStreamingKey(id);
    if (keyData === null) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
    }
    return keyData;
  }

  /**
   * @swagger
   * /channel-streaming/reset_streaming_key:
   *    post:
   *      tags:
   *        - channel
   *      operationId: resetStreamingKey
   *      security: []
   *      consumes:
   *        - application/json
   *      produces:
   *        - application/json
   *      description: Resets the streaming key for the specified channel
   *      parameters:
   *        - in: body
   *          name: body
   *          description: channel ID the key should be reset for
   *          required: true
   *          schema:
   *            $ref: '#/components/schemas/ResetStreamingKeyRequestDto'
   *      responses:
   *        '200':
   *          description: successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/StreamingKeyResponseDto'
   *        '404':
   *          description: channel not found
   */
  @httpPost(
    ChannelStreamingApiPath.RESET_STREAMING_KEY,
    authenticationMiddleware,
    CONTAINER_TYPES.ChannelActionMiddleware,
  )
  public async resetStreamingKey(
    @requestBody() { channelId }: ResetStreamingKeyRequestDto,
  ): Promise<StreamingKeyResponseDto> {
    const keyData = await this.channelStreamingService.resetStreamingKey(channelId);
    if (keyData === null) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
    }
    return keyData;
  }

  @httpPost(ChannelStreamingApiPath.ROOT, authenticationMiddleware, CONTAINER_TYPES.ChannelActionMiddleware)
  public async createStream(@requestBody() { channelId }: CreateStreamRequestDto): Promise<VideoStreamResponseDto> {
    const newStream = await this.channelStreamingService.createStream(channelId);
    if (!newStream) {
      throw new Forbidden(exceptionMessages.channelCrud.ACTIVE_STREAM_EXISTS, errorCodes.stream.ACTIVE_STREAM_EXISTS);
    }
    return newStream;
  }

  @httpPost(ChannelStreamingApiPath.UPLOAD_POSTER, authenticationMiddleware, CONTAINER_TYPES.ChannelActionMiddleware)
  public async uploadPoster(
    @requestBody() payload: StreamPosterUploadRequestDto,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<StreamPosterUploadResponseDto> {
    const { id: userId } = req.user;
    const poster = await this.channelStreamingService.uploadStreamPoster(payload, userId);
    if (!poster) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
    }
    return poster;
  }

  @httpPut(ChannelStreamingApiPath.EDIT_STREAM, authenticationMiddleware, CONTAINER_TYPES.ChannelActionMiddleware)
  public async updateStream(@requestBody() payload: StreamUpdateRequestDto): Promise<VideoStreamResponseDto> {
    const update = await this.channelStreamingService.update(payload);
    if (!update) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
    }
    if (payload.isChatEnabled !== undefined) {
      this.channelStreamingService.notifyViewersAboutChatToggleChanged({
        roomId: update.id,
        isChatEnabled: update.isChatEnabled,
      });
    }
    return update;
  }

  @httpGet(
    `${ChannelStreamingApiPath.LIVE}${ChannelStreamingApiPath.$CHANNEL_ID}`,
    authenticationMiddleware,
    CONTAINER_TYPES.ChannelActionMiddleware,
  )
  public async getActiveStream(@requestParam('channelId') id: string): Promise<VideoStreamResponseDto> {
    const currentStream = await this.channelStreamingService.getActiveStream(id);
    if (!currentStream) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
    }
    return currentStream;
  }

  @httpGet(ChannelStreamingApiPath.ROOT, authenticationMiddleware, CONTAINER_TYPES.ChannelActionMiddleware)
  public async getOwnChannel(@request() req: ExtendedAuthenticatedRequest): Promise<OwnChannelResponseDto> {
    const { id } = req.user;
    const channel = await this.channelStreamingService.getOwnChannel(id);
    if (!channel) {
      throw new NotFound(exceptionMessages.channelCrud.NO_CHANNELS, errorCodes.stream.NO_CHANNELS);
    }
    return channel;
  }

  @httpGet(ChannelStreamingApiPath.STREAMING_INFO, authenticationMiddleware)
  public async getStreamingInfo(@request() req: ExtendedAuthenticatedRequest): Promise<StreamingInfoResponseDto> {
    const { id } = req.user;
    const channel = await this.channelStreamingService.getOwnChannel(id);
    if (!channel) {
      throw new NotFound(exceptionMessages.channelCrud.NO_CHANNELS, errorCodes.stream.NO_CHANNELS);
    }
    const keyData = await this.channelStreamingService.getStreamingKey(channel.id);
    if (keyData === null) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
    }
    const stream = await this.channelStreamingService.getActiveStream(channel.id);
    return {
      channel,
      streamingKey: keyData.streamingKey,
      stream,
    };
  }

  @httpPost(ChannelStreamingApiPath.LIVE, authenticationMiddleware, CONTAINER_TYPES.ChannelActionMiddleware)
  public async liveControl(@requestBody() payload: StreamLiveStatusRequestDto): Promise<VideoStreamResponseDto> {
    const update = await this.channelStreamingService.liveControl(payload);
    if (!update) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
    }
    return update;
  }

  /**
   * @swagger
   * /channel-streaming/change_chat_toggle:
   *    post:
   *      tags:
   *      - channel
   *      operationId: changeVideoChatToggle
   *      description: Changes isChatEnabled in video
   *      security:
   *      - bearerAuth: []
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                videoId:
   *                  type: string
   *                  format: uuid
   *                isChatEnabled:
   *                  type: boolean
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  videoId:
   *                    type: string
   *                    format: uuid
   *                  isChatEnabled:
   *                    type: boolean
   *        403:
   *          description: Video does not belong to this user.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   *        404:
   *          description: Video with such id is not found.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   */
  @httpPost(ChannelStreamingApiPath.CHANGE_CHAT_TOGGLE, authenticationMiddleware)
  public async changeChatToggle(
    @requestBody() changeChatToggleRequestDto: ChangeChatToggleRequestDto,
    @request() req: ExtendedRequest,
  ): Promise<ChangeChatToggleResponseDto> {
    const video = await this.channelStreamingService.getVideoById(changeChatToggleRequestDto.videoId);
    if (!video) {
      throw new NotFound('Invalid video id');
    }
    if (video.channel.authorId !== req.user?.id) {
      throw new Forbidden('This video does not belong to you.');
    }

    const videoData = await this.channelStreamingService.changeChatToggle(
      changeChatToggleRequestDto.videoId,
      changeChatToggleRequestDto.isChatEnabled,
    );
    if (!videoData) {
      throw new NotFound('Invalid video id');
    }

    this.channelStreamingService.notifyViewersAboutChatToggleChanged({
      roomId: videoData.videoId,
      isChatEnabled: videoData.isChatEnabled,
    });
    return videoData;
  }

  @httpGet('/segments/:videoId/master.m3u8')
  public async getPlaylist(@requestParam('videoId') videoId: string, @response() res: express.Response): Promise<void> {
    console.warn(videoId);
    const masterPath = path
      .resolve(__dirname, '../../../../../../playback', videoId, 'master.m3u8')
      .replaceAll('\\', '/');
    console.warn(masterPath);
    res.sendFile(masterPath);
  }

  @httpGet('/segments/:videoId/:segment')
  public async getFile(
    @requestParam('videoId') videoId: string,
    @requestParam('segment') segment: string,
    @response() res: express.Response,
  ): Promise<void> {
    console.warn(videoId);
    console.warn(segment);
    const segmentPath = path.resolve(__dirname, '../../../../../../playback', videoId, segment).replaceAll('\\', '/');
    console.warn(segmentPath);
    res.sendFile(segmentPath);
  }
}
