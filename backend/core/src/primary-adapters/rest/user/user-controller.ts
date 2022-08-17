import { BaseHttpController, controller, httpGet, httpPost, requestBody } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { UserService } from '~/core/user/application/user-service';
import { User } from '@prisma/client';

/**
 * @swagger
 * tags:
 *   name: user
 *   description: User management
 * definitions:
 *    UserUploadRequestDto:
 *      type: object
 *      properties:
 *        base64Str:
 *          type: string
 *          format: base64
 *    ImageUploadResponseDto:
 *      type: object
 *      properties:
 *        url:
 *          type: string
 *          format: uri
 *        format:
 *          type: string
 *        width:
 *          type: number
 *        height:
 *          type: number
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *        email:
 *          type: string
 *          format: email
 *        password:
 *          type: string
 *        isActivated:
 *          type: boolean
 *        createdAt:
 *          type: string
 *          format: date-time
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
   *      consumes:
   *      - application/json
   *      produces:
   *      - application/json
   *      description: Returns an array of users
   *      parameters: []
   *      responses:
   *        200:
   *          description: successful operation
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
  @httpGet('/')
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
