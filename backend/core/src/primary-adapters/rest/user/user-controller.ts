import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  httpPut,
  request,
  requestBody,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES, ExtendedAuthenticatedRequest } from '~/shared/types/types';
import { UserService } from '~/core/user/application/user-service';
import { User } from '@prisma/client';
import { authenticationMiddleware } from '../middleware';
import { ApiPath, CategoryResponseDto, UserApiPath, UserBindCategoriesDto, StreamPermission } from 'shared/build';

/**
 * @swagger
 * components:
 *    schemas:
 *      CategoryDto:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             format: uuid
 *           name:
 *             type: string
 *           posterPath:
 *             type: string
 *             format: uri
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
@controller(ApiPath.USER)
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
  @httpGet(UserApiPath.ROOT, authenticationMiddleware)
  public getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  /**
   * @swagger
   * /users/bind/:
   *    post:
   *        tags:
   *          - users
   *        summary: Bind user preferences
   *        security:
   *          - bearerAuth: []
   *        requestBody:
   *          description: Categories
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  categories:
   *                    type: array
   *                    items:
   *                      type: string
   */
  @httpPost(UserApiPath.$BIND, authenticationMiddleware)
  public bindCategories(
    @requestBody() payload: Omit<UserBindCategoriesDto, 'id'>,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<CategoryResponseDto[]> {
    const { id } = req.user;

    return this.userService.bindCategories({
      id,
      ...payload,
    });
  }

  /**
   * @swagger
   * /users/preferences/:
   *    get:
   *      tags:
   *        - users
   *      summary: Get user preferences
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        '200':
   *          description: OK
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/CategoryDto'
   */
  @httpGet(UserApiPath.$PREFERENCES, authenticationMiddleware)
  public async getPreferences(@request() req: ExtendedAuthenticatedRequest): Promise<CategoryResponseDto[]> {
    const { id } = req.user;

    const preferences = await this.userService.getPreferedCategories({
      id,
    });
    if (!preferences) {
      return [] as CategoryResponseDto[];
    }

    return preferences;
  }

  /**
   * @swagger
   * /users/permission/requested:
   *    post:
   *        tags:
   *          - users
   *        summary: Update user stream permission
   *        security:
   *          - bearerAuth: []
   */
  @httpPut(`${UserApiPath.$PERMISSION}${UserApiPath.$REQUESTED}`, authenticationMiddleware)
  public changeStreamPermission(@request() req: ExtendedAuthenticatedRequest): Promise<User> {
    const { id } = req.user;

    return this.userService.updateStreamPermission(id, StreamPermission.REQUESTED);
  }
}
