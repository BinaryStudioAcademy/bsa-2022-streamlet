import { BaseHttpController, controller, httpPost, requestBody } from 'inversify-express-utils';
import {
  CONTAINER_TYPES,
  ResetStreamingKeyRequestDto,
  ResetStreamingKeyResponseDto,
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
 * definitions:
 *    RtmpLiveRequestDto:
 *      type: object
 *      properties:
 *        app:
 *          type: string
 *        flashver:
 *          type: string
 *        swfurl:
 *          type: string
 *        tcurl:
 *          type: string
 *        pageurl:
 *          type: string
 *        clientid:
 *          type: string
 *        name:
 *          type: string
 *        addr:
 *          type: string
 *        call:
 *          type: string
 *        type:
 *          type: string
 *      required:
 *        - app
 *        - flashver
 *        - swfurl
 *        - tcurl
 *        - pageurl
 *        - clientid
 *        - name
 *        - addr
 *        - call
 *    ResetStreamingKeyRequestDto:
 *      type: object
 *      properties:
 *        channelId:
 *          type: string
 *      required:
 *        - channelId
 *    ResetStreamingKeyResponseDto:
 *      type: object
 *      properties:
 *        channelId:
 *          type: string
 *        streamingKey:
 *          type: string
 *      required:
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
   *      - channel
   *      operationId: goLive
   *      consumes:
   *      - application/json
   *      produces:
   *      - application/json
   *      description: Checks stream key and sends notification to transcoder which then starts the stream
   *      parameters:
   *        - in: body
   *          name: body
   *          description: data sent by OBS
   *          required: true
   *          schema:
   *            $ref: '#/definitions/RtmpLiveRequestDto'
   *      responses:
   *        200:
   *          description: successful operation
   *        403:
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
   *      - channel
   *      operationId: prepareStreamEnd
   *      consumes:
   *      - application/json
   *      produces:
   *      - application/json
   *      description: Sends notification to transcoder that the stream has stopped
   *      parameters:
   *        - in: body
   *          name: body
   *          description: data sent by OBS
   *          required: true
   *          schema:
   *            $ref: '#/definitions/RtmpLiveRequestDto'
   *      responses:
   *        200:
   *          description: new streaming key is given
   */
  @httpPost(ChannelApiPath.LIVE_DONE)
  public async prepareStreamEnd(@requestBody() rtmpLiveRequestDto: RtmpLiveRequestDto): Promise<void> {
    this.channelService.prepareStreamEnd(rtmpLiveRequestDto.name);
    return;
  }

  /**
   * @swagger
   * /reset_streaming_token:
   *    post:
   *      tags:
   *      - channel
   *      operationId: resetStreamingKey
   *      consumes:
   *      - application/json
   *      produces:
   *      - application/json
   *      description: Resets the streaming key for the specified channel
   *      parameters:
   *        - in: body
   *          name: body
   *          description: channel ID the key should be reset for
   *          required: true
   *          schema:
   *            $ref: '#/definitions/ResetStreamingKeyRequestDto'
   *      responses:
   *        200:
   *          description: successful operation
   *          schema:
   *            $ref: '#/definitions/ResetStreamingKeyResponseDto'
   *        404:
   *          description: channel not found
   */
  @httpPost(ChannelApiPath.RESET_STREAMING_TOKEN)
  public async resetStreamingKey(
    @requestBody() resetStreamingKeyRequestDto: ResetStreamingKeyRequestDto,
  ): Promise<ResetStreamingKeyResponseDto> {
    const keyData = await this.channelService.resetStreamingKey(resetStreamingKeyRequestDto.channelId);
    if (keyData === null) {
      throw new NotFound('Invalid channel id');
    }
    return keyData;
  }
}
