import { BaseHttpController, controller, httpDelete, httpGet, request, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES, HistoryResponseDto, ExtendedAuthenticatedRequest, BatchPayload } from '~/shared/types/types';
import { HistoryService } from '~/core/history/application/history-service';
import { authenticationMiddleware } from '../middleware';
import { ApiPath, HistoryApiPath } from '~/shared/enums/api/api';

/**
 * @swagger
 * tags:
 *   name: history
 *   description: History management
 * components:
 *    schemas:
 *      History:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          userId:
 *            type: string
 *            format: uuid
 *          videoId:
 *            type: string
 *            format: uuid
 *          createdAt:
 *            type: string
 *            format: date-time
 */
@controller(ApiPath.HISTORY)
export class HistoryController extends BaseHttpController {
  private historyService: HistoryService;

  constructor(@inject(CONTAINER_TYPES.HistoryService) historyService: HistoryService) {
    super();

    this.historyService = historyService;
  }

  /**
   * @swagger
   * /history:
   *    get:
   *      tags:
   *      - history
   *      operationId: getAllUserHistory
   *      description: Returns an array of user history
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/History'
   *        401:
   *          $ref: '#/components/responses/NotFound'
   */
  @httpGet(HistoryApiPath.$ID, authenticationMiddleware)
  public getAllUserHistory(
    @request() req: ExtendedAuthenticatedRequest,
    @requestParam('pageId') page: string,
  ): Promise<HistoryResponseDto> {
    const { id: userId } = req.user;
    return this.historyService.getUserHistory(userId, page);
  }
  @httpDelete(`${HistoryApiPath.DELETE}`, authenticationMiddleware)
  public deleteAllUserHistory(@request() req: ExtendedAuthenticatedRequest): Promise<BatchPayload> {
    const { id: userId } = req.user;
    return this.historyService.deleteAllUserHistory(userId);
  }
}
