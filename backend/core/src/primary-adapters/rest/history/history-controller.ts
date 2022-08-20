import { BaseHttpController, controller, httpGet, httpPost, requestBody, request } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES, HistoryResponseDto, ExtendedAuthenticatedRequest } from '~/shared/types/types';
import { HistoryService } from '~/core/history/application/history-service';
import { History } from '@prisma/client';
import { authenticationMiddleware } from '../middleware';

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
@controller('/history')
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
  @httpGet('/', authenticationMiddleware)
  public getAllUserHistory(@request() req: ExtendedAuthenticatedRequest): Promise<History[]> {
    const { id: userId } = req.user;
    return this.historyService.getAllUserHistory(userId);
  }

  /**
   * @swagger
   * /history:
   *    post:
   *      tags:
   *        - history
   *      security:
   *        - bearerAuth: []
   *      operationId: createHistoryItem
   *      description: create a video history item in the system
   *      requestBody:
   *        description: History data
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *        properties:
   *          userId:
   *            type: string
   *            format: uuid
   *          videoId:
   *            type: string
   *            format: uuid
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  user:
   *                    $ref: '#/components/schemas/HistoryResponse'
   */
  @httpPost('/', authenticationMiddleware)
  public async createHistoryItem(
    @requestBody() { videoId }: { videoId: string },
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<HistoryResponseDto> {
    const { id: userId } = req.user;
    return this.historyService.createHistoryItem({ userId, videoId });
  }
}
