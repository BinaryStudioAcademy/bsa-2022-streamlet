import { Http } from 'services/http/http.service';
import { ChatInfoRequestDto, ChatInfoResponseDto } from 'common/types/types';
import { ApiPath } from 'common/enums/enums';

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
}

export { ChatApi };
