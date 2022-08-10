import { BaseHttpController, controller, httpGet, httpPost, requestBody } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES, UserUploadResponseDto, UserUploadRequestDto } from '~/shared/types/types';
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

  //NOTE: this route should be private and moved to user profile controller in future to set user avatar in db
  /**
   * @swagger
   * /upload:
   *    post:
   *      tags:
   *      - user
   *      operationId: upload
   *      consumes:
   *      - application/json
   *      produces:
   *      - application/json
   *      description: Returns Cloudinary Upload Response
   *      parameters:
   *        - in: body
   *          base64Str: body
   *          description: Image in base64 format
   *          required: true
   *          schema:
   *            $ref: '#/definitions/UserUploadRequestDto'
   *      responses:
   *        200:
   *          description: successful operation
   *          schema:
   *            type: object
   *            items:
   *              $ref: '#/definitions/UserUploadResponseDto'
   */
  @httpPost('/upload')
  public upload(@requestBody() body: UserUploadRequestDto): Promise<UserUploadResponseDto> {
    const { base64Str } = body;
    return this.userService.uploadAvatar(base64Str);
  }
}
