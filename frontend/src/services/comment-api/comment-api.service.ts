import { Http } from 'services/http/http.service';
import { ApiPath, HttpMethod } from 'common/enums/enums';
import { Comment, ContentType, DeleteCommentResponseDto, VideoCommentRequestDto } from 'shared/build';

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

  async updateComment(request: { commentId: string; comment: VideoCommentRequestDto }): Promise<Comment> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.COMMENT}/${request.commentId}`,
      options: {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(request.comment),
      },
    });
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
