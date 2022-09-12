import {
  BaseHttpController,
  controller,
  httpDelete,
  httpPut,
  request,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES, ExtendedAuthenticatedRequest } from '~/shared/types/types';
import { exceptionMessages, ApiPath, CommentApiPath } from '~/shared/enums/enums';
import { BadRequest, Forbidden, NotFound } from '~/shared/exceptions/exceptions';
import { Comment, VideoCommentRequestDto } from 'shared/build';
import { authenticationMiddleware } from '../middleware';
import { CommentService } from '~/core/comment/application/comment-service';
import { trimComment } from '~/shared/helpers/trim-comment';

/**
 * @swagger
 * tags:
 *  name: comment
 */
@controller(ApiPath.COMMENT)
export class CommentController extends BaseHttpController {
  constructor(@inject(CONTAINER_TYPES.CommentService) private commentService: CommentService) {
    super();
  }

  /**
   * @swagger
   * /comment/{id}:
   *    put:
   *      tags:
   *      - comment
   *      security:
   *      - bearerAuth: []
   *      operationId: updateCommentById
   *      description: Update comment by comment id
   *      parameters:
   *        - name: id
   *          in: path
   *          description: id of comment to update
   *          required: true
   *          schema:
   *            type: string
   *            format: uuid
   *      requestBody:
   *        description: data that contain comment text and video id
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                videoId:
   *                  type: string
   *                  format: uuid
   *                text:
   *                  type: string
   *      responses:
   *        200:
   *          description: Successful operation
   *        400:
   *          description: Comment is empty
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   *        403:
   *          description: Comment with such id isn`t yours
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   *        404:
   *          description: Comment with id not found
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   */
  @httpPut(CommentApiPath.$ID, authenticationMiddleware)
  public async updateVideoCommentById(
    @request() req: ExtendedAuthenticatedRequest,
    @requestParam('commentId') id: string,
    @requestBody() commentReq: VideoCommentRequestDto,
  ): Promise<Comment> {
    if (!commentReq.text) {
      throw new BadRequest(exceptionMessages.comment.COMMENT_IS_EMPTY);
    }
    const user = req.user;
    const comment = await this.commentService.getCommentById(id);
    if (!comment) {
      throw new NotFound(exceptionMessages.comment.COMMENT_NOT_FOUND);
    }
    if (comment.authorId !== user.id) {
      throw new Forbidden(exceptionMessages.comment.COMMENT_FORBIDDEN);
    }
    if (comment.videoId !== commentReq.videoId) {
      throw new NotFound(exceptionMessages.comment.COMMENT_NOT_FOUND);
    }
    const videoComment = await this.commentService.updateCommentById(id, commentReq.text, false);
    if (!videoComment) {
      throw new NotFound(exceptionMessages.comment.COMMENT_NOT_FOUND);
    }
    return trimComment(videoComment);
  }

  /**
   * @swagger
   * /comment/{id}:
   *    delete:
   *      tags:
   *      - comment
   *      security:
   *      - bearerAuth: []
   *      operationId: deleteCommentById
   *      description: Delete comment by comment id
   *      parameters:
   *        - name: id
   *          in: path
   *          description: id of comment to delete
   *          required: true
   *          schema:
   *            type: string
   *            format: uuid
   *      responses:
   *        200:
   *          description: Successful operation
   *        404:
   *          description: Comment with id not found
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   */
  @httpDelete(CommentApiPath.$ID, authenticationMiddleware)
  public async deleteVideoCommentById(
    @request() req: ExtendedAuthenticatedRequest,
    @requestParam('commentId') id: string,
  ): Promise<Comment | boolean> {
    const user = req.user;
    const comment = await this.commentService.getCommentById(id);
    if (!comment) {
      throw new NotFound(exceptionMessages.comment.COMMENT_NOT_FOUND);
    }
    if (comment.authorId !== user.id) {
      throw new Forbidden(exceptionMessages.comment.COMMENT_FORBIDDEN);
    }

    if (comment.repliesCount > 0) {
      const videoComment = await this.commentService.updateCommentById(id, '', true);
      if (!videoComment) {
        throw new NotFound(exceptionMessages.comment.COMMENT_NOT_FOUND);
      }
      return trimComment(videoComment);
    }

    const isSuccess = await this.commentService.deleteCommentById(id);
    if (!isSuccess) {
      throw new NotFound(exceptionMessages.comment.COMMENT_NOT_FOUND);
    }

    return isSuccess;
  }
}
