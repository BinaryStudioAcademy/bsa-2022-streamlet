import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
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
  ChangeChatToggleRequestDto,
  ExtendedRequest,
  ChangeChatToggleResponseDto,
} from '~/shared/types/types';
import { ApiPath, ChannelStreamingApiPath } from '~/shared/enums/api/api';
import { ChannelStreamingService } from '~/core/channel-streaming/application/channel-streaming-service';
import { inject } from 'inversify';
import { Forbidden } from '~/shared/exceptions/forbidden';
import { NotFound } from '~/shared/exceptions/not-found';
import { authenticationMiddleware } from '../middleware';

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
  private channelService: ChannelStreamingService;

  constructor(@inject(CONTAINER_TYPES.ChannelStreamingService) channelService: ChannelStreamingService) {
    super();
    this.channelService = channelService;
  }

  /**
   * @swagger
   * /live:
   *    post:
   *      tags:
   *        - channel
   *      operationId: goLive
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
  @httpPost(ChannelStreamingApiPath.LIVE)
  public async goLive(@requestBody() rtmpLiveRequestDto: RtmpLiveRequestDto): Promise<void> {
    const streamData = await this.channelService.checkStreamingKey(rtmpLiveRequestDto.name);
    if (streamData === null) {
      throw new Forbidden('Invalid streaming key or no video created to stream on');
    }
    this.channelService.notifyTranscoderAboutStreamStart(streamData);
  }

  /**
   * @swagger
   * /live_done:
   *    post:
   *      tags:
   *        - channel
   *      operationId: prepareStreamEnd
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
  @httpPost(ChannelStreamingApiPath.LIVE_DONE)
  public async prepareStreamEnd(@requestBody() rtmpLiveRequestDto: RtmpLiveRequestDto): Promise<void> {
    this.channelService.notifyTranscoderAboutStreamEnd(rtmpLiveRequestDto.name);
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
  @httpGet(`${ChannelStreamingApiPath.STREAMING_KEY}${ChannelStreamingApiPath.$ID}`)
  public async getStreamingKey(@requestParam() { id }: DefaultRequestParam): Promise<StreamingKeyResponseDto> {
    const keyData = await this.channelService.getStreamingKey(id);
    if (keyData === null) {
      throw new NotFound('Invalid channel id');
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
  @httpPost(ChannelStreamingApiPath.RESET_STREAMING_KEY)
  public async resetStreamingKey(
    @requestBody() resetStreamingKeyRequestDto: ResetStreamingKeyRequestDto,
  ): Promise<StreamingKeyResponseDto> {
    const keyData = await this.channelService.resetStreamingKey(resetStreamingKeyRequestDto.channelId);
    if (keyData === null) {
      throw new NotFound('Invalid channel id');
    }
    return keyData;
  }

  /**
   * @swagger
   * /change_chat_toggle:
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
    const video = await this.channelService.getVideoById(changeChatToggleRequestDto.videoId);
    if (!video) {
      throw new NotFound('Invalid video id');
    }
    if (video.channel.authorId !== req.user?.id) {
      throw new Forbidden('This video does not belong to you.');
    }
    const videoData = await this.channelService.changeChatToggle(
      changeChatToggleRequestDto.videoId,
      changeChatToggleRequestDto.isChatEnabled,
    );
    if (!videoData) {
      throw new NotFound('Invalid video id');
    }
    return videoData;
  }
}
