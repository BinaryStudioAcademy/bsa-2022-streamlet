import { BaseHttpController, controller, httpGet } from 'inversify-express-utils';
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
@controller('/user')
export class UserController extends BaseHttpController {
  private userService: UserService;

  constructor(@inject(CONTAINER_TYPES.UserService) userService: UserService) {
    super();

    this.userService = userService;
  }

  /**
   * @swagger
   * /user:
   *    get:
   *      tags:
   *      - user
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
  public register(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
