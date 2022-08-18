import { BaseHttpController, controller, httpGet, httpPost, requestBody, requestParam } from 'inversify-express-utils';
import {
  CONTAINER_TYPES,
  DefaultRequestParam,
  ResetStreamingKeyRequestDto,
  StreamingKeyResponseDto,
  RtmpLiveRequestDto,
} from '~/shared/types/types';
import { ApiPath, ChannelApiPath } from '~/shared/enums/api/api';
import { ChannelService } from '~/core/channel/application/channel-service';
import { inject } from 'inversify';
import { Forbidden } from '~/shared/exceptions/forbidden';
import { NotFound } from '~/shared/exceptions/not-found';

/**
 * @swagger
 * tags:
 *   name: channel
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
@controller(ApiPath.CHANNEL)
export class ChannelController extends BaseHttpController {
  private channelService: ChannelService;

  constructor(@inject(CONTAINER_TYPES.ChannelService) channelService: ChannelService) {
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
  @httpPost(ChannelApiPath.LIVE)
  public async goLive(@requestBody() rtmpLiveRequestDto: RtmpLiveRequestDto): Promise<void> {
    const streamData = await this.channelService.checkStreamingKey(rtmpLiveRequestDto.name);
    if (streamData === null) {
      throw new Forbidden('Invalid streaming key or no video created to stream on');
    }
    this.channelService.notifyTranscoderAboutStreamStart(streamData);
    return;
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
  @httpPost(ChannelApiPath.LIVE_DONE)
  public async prepareStreamEnd(@requestBody() rtmpLiveRequestDto: RtmpLiveRequestDto): Promise<void> {
    this.channelService.prepareStreamEnd(rtmpLiveRequestDto.name);
    return;
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
  @httpGet(`${ChannelApiPath.STREAMING_KEY}${ChannelApiPath.$ID}`)
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
  @httpPost(ChannelApiPath.RESET_STREAMING_KEY)
  public async resetStreamingKey(
    @requestBody() resetStreamingKeyRequestDto: ResetStreamingKeyRequestDto,
  ): Promise<StreamingKeyResponseDto> {
    const keyData = await this.channelService.resetStreamingKey(resetStreamingKeyRequestDto.channelId);
    if (keyData === null) {
      throw new NotFound('Invalid channel id');
    }
    return keyData;
  }
}
