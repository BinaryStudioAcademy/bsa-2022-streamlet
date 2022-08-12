import { BaseHttpController, controller, httpGet, httpPost, requestBody } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES, ImageUploadResponseDto, UserUploadRequestDto } from '~/shared/types/types';
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
   *      description: Returns Image Store API Upload Response
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
   *            $ref: '#/definitions/ImageUploadResponseDto'
   */
  @httpPost('/upload')
  public upload(@requestBody() body: UserUploadRequestDto): Promise<ImageUploadResponseDto> {
    return this.userService.uploadAvatar(body);
  }

  @httpGet('/sayHello')
  public sayHello(): Promise<boolean> {
    return this.userService.sayHello();
  }

  @httpGet('/sayHelloAll')
  public sayHelloAll(): Promise<boolean> {
    return this.userService.sayHelloAll();
  }
}
