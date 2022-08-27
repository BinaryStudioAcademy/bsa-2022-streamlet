import { BaseHttpController, controller, httpGet, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import { ChatInfoRequestDto, ChatInfoResponseDto, CONTAINER_TYPES } from '~/shared/types/types';
import { exceptionMessages } from '~/shared/enums/enums';
import { NotFound } from '~/shared/exceptions/exceptions';
import { ChatService } from '~/core/chat/application/chat-service';
import { trimVideoToChatInfo } from '~/shared/helpers/trim-video-to-chat-info';
import { ApiPath, ChatApiPath } from 'shared/build';

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
}
