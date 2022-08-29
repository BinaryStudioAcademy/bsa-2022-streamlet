import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  httpPut,
  request,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import {
  CONTAINER_TYPES,
  DefaultRequestParam,
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
} from '~/shared/types/types';
import { ApiPath, ChannelStreamingApiPath } from '~/shared/enums/enums';
import { ChannelStreamingService } from '~/core/channel-streaming/application/channel-streaming-service';
import { inject } from 'inversify';
import { Forbidden } from '~/shared/exceptions/forbidden';
import { NotFound } from '~/shared/exceptions/not-found';
import { authenticationMiddleware } from '../middleware';
import { exceptionMessages } from '~/shared/enums/messages';
import { VideoService } from '~/core/video/application/video-service';
import { errorCodes } from 'shared/build';

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
  private videoService: VideoService;

  constructor(
    @inject(CONTAINER_TYPES.ChannelStreamingService) channelStreamingService: ChannelStreamingService,
    @inject(CONTAINER_TYPES.VideoService) videoService: VideoService,
  ) {
    super();
    this.channelStreamingService = channelStreamingService;
    this.videoService = videoService;
  }

  /**
   * @swagger
   * /live:
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
    this.channelStreamingService.notifyTranscoderAboutStreamStart(streamData);
  }

  /**
   * @swagger
   * /live_done:
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
    this.channelStreamingService.notifyTranscoderAboutStreamEnd(rtmpLiveRequestDto.name);
  }

  /**
   * @swagger
   * /streaming_key/{id}:
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
  public async getStreamingKey(@requestParam() { id }: DefaultRequestParam): Promise<StreamingKeyResponseDto> {
    const keyData = await this.channelStreamingService.getStreamingKey(id);
    if (keyData === null) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
    }
    return keyData;
  }

  /**
   * @swagger
   * /reset_streaming_key:
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
  public async uploadPoster(@requestBody() payload: StreamPosterUploadRequestDto): Promise<VideoStreamResponseDto> {
    const update = await this.channelStreamingService.uploadStreamPoster(payload);
    if (!update) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
    }
    return update;
  }

  @httpPut(ChannelStreamingApiPath.EDIT_STREAM, authenticationMiddleware, CONTAINER_TYPES.ChannelActionMiddleware)
  public async updateStream(@requestBody() payload: StreamUpdateRequestDto): Promise<VideoStreamResponseDto> {
    const update = await this.channelStreamingService.update(payload);
    if (!update) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
    }
    return update;
  }

  @httpGet(
    `${ChannelStreamingApiPath.LIVE}${ChannelStreamingApiPath.$CHANNEL_ID}`,
    authenticationMiddleware,
    CONTAINER_TYPES.ChannelActionMiddleware,
  )
  public async getCurrentStream(@requestParam() { id }: DefaultRequestParam): Promise<VideoStreamResponseDto> {
    const keyData = await this.channelStreamingService.getCurrentStream(id);
    if (!keyData) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
    }
    return keyData;
  }

  @httpGet(ChannelStreamingApiPath.ROOT, authenticationMiddleware, CONTAINER_TYPES.ChannelActionMiddleware)
  public async getOwnChannel(@request() req: ExtendedAuthenticatedRequest): Promise<OwnChannelResponseDto | null> {
    const { id } = req.user;
    const channel = await this.channelStreamingService.getOwnChannel(id);
    if (!channel) {
      throw new NotFound(exceptionMessages.channelCrud.NO_CHANNELS, errorCodes.stream.NO_CHANNELS);
    }
    return channel;
  }

  @httpPost(ChannelStreamingApiPath.LIVE, authenticationMiddleware, CONTAINER_TYPES.ChannelActionMiddleware)
  public async liveControl(@requestBody() payload: StreamLiveStatusRequestDto): Promise<VideoStreamResponseDto> {
    const update = await this.channelStreamingService.liveControl(payload);
    if (!update) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
    }
    return update;
  }
}
