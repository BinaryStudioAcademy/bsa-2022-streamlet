import { BaseHttpController, controller, httpGet, httpPost, requestBody } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { UserService } from '~/core/user/application/user-service';
import { User } from '@prisma/client';
import { authenticationMiddleware } from '../middleware';

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          email:
 *            type: string
 *            format: email
 *          password:
 *            type: string
 *          isActivated:
 *            type: boolean
 *          createdAt:
 *            type: string
 *            format: date-time
 */
@controller('/users')
export class UserController extends BaseHttpController {
  private userService: UserService;

  constructor(@inject(CONTAINER_TYPES.UserService) userService: UserService) {
    super();

    this.userService = userService;
  }

  /**
   * @swagger
   * /users:
   *    get:
   *      tags:
   *      - users
   *      operationId: getAllUsers
   *      description: Returns an array of users
   *      security:
   *      - bearerAuth: []
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/User'
   *        401:
   *          $ref: '#/components/responses/Unauthorized'
   */
  @httpGet('/', authenticationMiddleware)
  public getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  //NOTE: this routes only for testing and in future should removed or modified
  @httpPost('/notify')
  public notify(@requestBody() body: { data: { message: string } }): Promise<boolean> {
    return this.userService.notify(body);
  }

  @httpPost('/notify-broadcast')
  public notifyBroadcast(@requestBody() body: { data: { message: string } }): Promise<boolean> {
    return this.userService.notifyBroadcast(body);
  }
}
