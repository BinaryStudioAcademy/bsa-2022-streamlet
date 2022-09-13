import { Http } from 'services/http/http.service';
import { ApiPath, HttpMethod } from 'common/enums/enums';
import { Comment, DeleteCommentResponseDto } from 'shared/build';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class CommentApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  async deleteComment(commentId: string): Promise<Comment | DeleteCommentResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.COMMENT}/${commentId}`,
      options: {
        method: HttpMethod.DELETE,
      },
    });
  }
}

export { CommentApi };
