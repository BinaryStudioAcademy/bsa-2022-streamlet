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
import { NotFound } from '~/shared/exceptions/exceptions';
import { ChatService } from '~/core/chat/application/chat-service';
import { trimChatMessage, trimVideoToChatInfo } from '~/shared/helpers';
import { ApiPath, ChatApiPath, ChatMessageResponseDto } from 'shared/build';
import { authenticationMiddleware } from '../middleware';

@controller(ApiPath.CHAT)
export class ChatController extends BaseHttpController {
  constructor(@inject(CONTAINER_TYPES.ChatService) private chatService: ChatService) {
    super();
  }

  @httpGet(ChatApiPath.$ID)
  public async getChatInfo(@requestParam() { id }: ChatInfoRequestDto): Promise<ChatInfoResponseDto> {
    const video = await this.chatService.getChatMessagesByVideoId(id);
    if (!video) {
      throw new NotFound(exceptionMessages.chat.CHAT_ID_NOT_FOUND);
    }
    return trimVideoToChatInfo(video);
  }

  @httpPost(ChatApiPath.$ID, authenticationMiddleware)
  public async createChatMessage(
    @request() req: ExtendedAuthenticatedRequest,
    @requestParam() { id }: ChatInfoRequestDto,
    @requestBody() message: ChatMessageRequestDto,
  ): Promise<ChatMessageResponseDto> {
    const user = req.user;
    const { id: messageId } = await this.chatService.createChatMessage({
      videoId: id,
      authorId: user.id,
      text: message.text,
    });
    const chatMessage = await this.chatService.getChatMessagesById(messageId);
    if (!chatMessage) {
      throw new NotFound(exceptionMessages.chat.CHAT_MESSAGE_NOT_FOUND);
    }
    this.chatService.notifyChatRoom({ data: { message: trimChatMessage(chatMessage) } });
    return trimChatMessage(chatMessage);
  }
}
