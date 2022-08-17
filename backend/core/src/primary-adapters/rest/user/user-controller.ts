import { BaseHttpController, controller, httpGet, httpPost, requestBody } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES, ImageUploadResponseDto, UserUploadRequestDto } from '~/shared/types/types';
import { UserService } from '~/core/user/application/user-service';
import { User } from '@prisma/client';
import { authenticationMiddleware } from '../middleware';

/**
 * @swagger
 * tags:
 *   name: user
 *   description: User management
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
   *          $ref: '#/components/responses/NotFound'
   */
  @httpGet('/', authenticationMiddleware)
  public getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  //NOTE: this route should be private and moved to user profile controller in future to set user avatar in db
  /**
   * @swagger
   * /users/upload:
   *    post:
   *      tags:
   *      - users
   *      operationId: upload
   *      description: Returns Image Store API Upload Response
   *      security:
   *      - bearerAuth: []
   *      requestBody:
   *        description: Image in base64 format
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                base64Str:
   *                  type: string
   *                  format: base64
   *      responses:
   *        200:
   *          content:
   *            application/json:
   *              description: Successful operation
   *              schema:
   *                type: object
   *                properties:
   *                  url:
   *                    type: string
   *                    format: uri
   *                  format:
   *                    type: string
   *                  width:
   *                    type: number
   *                  height:
   *                    type: number
   */
  @httpPost('/upload')
  public upload(@requestBody() body: UserUploadRequestDto): Promise<ImageUploadResponseDto> {
    return this.userService.uploadAvatar(body);
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
