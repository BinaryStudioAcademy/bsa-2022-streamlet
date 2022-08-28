import { Http } from 'services/http/http.service';
import {
  ChatInfoRequestDto,
  ChatInfoResponseDto,
  ChatMessageRequestDto,
  ChatMessageResponseDto,
} from 'common/types/types';
import { ApiPath, ContentType, HttpMethod } from 'common/enums/enums';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class ChatApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  async getChatInfo(request: ChatInfoRequestDto): Promise<ChatInfoResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHAT}/${request.id}`,
    });
  }

  async sendMessage(request: { chatId: string; message: ChatMessageRequestDto }): Promise<ChatMessageResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHAT}/${request.chatId}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(request.message),
      },
    });
  }
}

export { ChatApi };
