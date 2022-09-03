import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  request,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import {
  ChatInfoRequestDto,
  ChatInfoResponseDto,
  ChatMessageRequestDto,
  CONTAINER_TYPES,
  ExtendedAuthenticatedRequest,
} from '~/shared/types/types';
import { exceptionMessages } from '~/shared/enums/enums';
import { BadRequest, Forbidden, NotFound } from '~/shared/exceptions/exceptions';
import { ChatService } from '~/core/chat/application/chat-service';
import { trimChatMessage, trimVideoToChatInfo } from '~/shared/helpers';
import { ApiPath, ChatApiPath, ChatMessageResponseDto } from 'shared/build';
import { authenticationMiddleware } from '../middleware';

/**
 * @swagger
 * tags:
 *  name: chat
 * components:
 *  schemas:
 *    ChatMessage:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *        text:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        author:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *              format: uuid
 *            username:
 *              type: string
 *            profile:
 *              type: object
 *              properties:
 *                avatar:
 *                  type: string
 *    ChatInfoResponseDto:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *        isChatEnabled:
 *          type: boolean
 *        initialMessages:
 *          type: object
 *          properties:
 *            list:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ChatMessage'
 *              total:
 *                type: integer
 *                format: int32
 *                minimum: 0
 */
@controller(ApiPath.CHAT)
export class ChatController extends BaseHttpController {
  constructor(@inject(CONTAINER_TYPES.ChatService) private chatService: ChatService) {
    super();
  }

  /**
   * @swagger
   * /chats/{id}:
   *    get:
   *      tags:
   *      - chat
   *      security: []
   *      operationId: getChatById
   *      description: Get chat initial messages by video id
   *      parameters:
   *        - name: id
   *          in: path
   *          description: id of chat to return
   *          required: true
   *          schema:
   *            type: string
   *            format: uuid
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/ChatInfoResponseDto'
   *        403:
   *          description: Chat with id disabled
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   *        404:
   *          description: Chat with id not found
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   */
  @httpGet(ChatApiPath.$ID)
  public async getChatInfo(@requestParam() { id }: ChatInfoRequestDto): Promise<ChatInfoResponseDto> {
    const video = await this.chatService.getChatMessagesByVideoId(id);
    if (!video) {
      throw new NotFound(exceptionMessages.chat.CHAT_ID_NOT_FOUND);
    }
    if (!video.isChatEnabled) {
      throw new Forbidden(exceptionMessages.chat.CHAT_IS_DISABLED);
    }
    return trimVideoToChatInfo(video);
  }

  /**
   * @swagger
   * /chats/{id}:
   *    post:
   *      tags:
   *      - chat
   *      security:
   *      - bearerAuth: []
   *      operationId: sendChatMessageToChatId
   *      description: Send a message to cht by id
   *      parameters:
   *        - name: id
   *          in: path
   *          description: id of chat to send a message
   *          required: true
   *          schema:
   *            type: string
   *            format: uuid
   *      requestBody:
   *        description: Chat message to send
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                text:
   *                  type: string
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/ChatMessage'
   *        400:
   *          description: Chat message is empty
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   *        403:
   *          description: Chat with id disabled
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   *        404:
   *          description: Chat with id not found
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   */
  @httpPost(ChatApiPath.$ID, authenticationMiddleware)
  public async createChatMessage(
    @request() req: ExtendedAuthenticatedRequest,
    @requestParam() { id }: ChatInfoRequestDto,
    @requestBody() message: ChatMessageRequestDto,
  ): Promise<ChatMessageResponseDto> {
    if (!message.text) {
      throw new BadRequest(exceptionMessages.chat.CHAT_MESSAGE_IS_EMPTY);
    }
    const user = req.user;
    const video = await this.chatService.getVideoById(id);
    if (!video) {
      throw new NotFound(exceptionMessages.chat.CHAT_ID_NOT_FOUND);
    }
    if (!video.isChatEnabled) {
      throw new Forbidden(exceptionMessages.chat.CHAT_IS_DISABLED);
    }
    const { id: messageId } = await this.chatService.createChatMessage({
      videoId: id,
      authorId: user.id,
      text: message.text,
    });
    const chatMessage = await this.chatService.getChatMessageById(messageId);
    if (!chatMessage) {
      throw new NotFound(exceptionMessages.chat.CHAT_MESSAGE_NOT_FOUND);
    }
    this.chatService.sendMessageToChatRoom({ data: { roomId: id, message: trimChatMessage(chatMessage) } });
    return trimChatMessage(chatMessage);
  }
}
