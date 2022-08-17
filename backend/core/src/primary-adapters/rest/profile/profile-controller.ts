import { BaseHttpController, controller, httpPut, httpPost, requestBody } from 'inversify-express-utils';
import { inject } from 'inversify';
import {
  CONTAINER_TYPES,
  ImageUploadResponseDto,
  ProfileUpdateRequestDto,
  ProfileUpdateResponseDto,
  UserUploadRequestDto,
} from '~/shared/types/types';
import { UserService } from '~/core/user/application/user-service';
import { ProfileService } from '~/core/profile/aplication/profile-service';
import { NotFound } from '~/shared/exceptions/not-found';
import { exceptionMessages } from '~/shared/enums/exceptions';
import { authenticationMiddleware } from '../middleware/authentication-middleware';
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
@controller('/profile')
export class ProfileController extends BaseHttpController {
  private profileService: ProfileService;
  private userService: UserService;
  constructor(
    @inject(CONTAINER_TYPES.ProfileService) profileService: ProfileService,
    @inject(CONTAINER_TYPES.UserService) userService: UserService,
  ) {
    super();
    this.userService = userService;
    this.profileService = profileService;
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
  @httpPut('/update', authenticationMiddleware)
  public async update(@requestBody() body: ProfileUpdateRequestDto): Promise<ProfileUpdateResponseDto> {
    const { userId } = body;
    const isUserExist = await this.userService.getUserById(userId);
    if (!isUserExist) {
      throw new NotFound(exceptionMessages.auth.USER_NOT_FOUND);
    }
    return this.profileService.update(body);
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
  @httpPost('/upload', authenticationMiddleware)
  public upload(@requestBody() body: UserUploadRequestDto): Promise<ImageUploadResponseDto> {
    return this.profileService.uploadAvatar(body);
  }
}
