import {
  BaseHttpController,
  controller,
  httpPut,
  httpPost,
  requestBody,
  httpGet,
  requestParam,
  request,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import {
  CONTAINER_TYPES,
  ExtendedAuthenticatedRequest,
  ProfileUpdateRequestDto,
  ProfileUpdateResponseDto,
  UserUploadRequestDto,
} from '~/shared/types/types';
import { UserService } from '~/core/user/application/user-service';
import { ProfileService } from '~/core/profile/aplication/profile-service';
import { NotFound } from '~/shared/exceptions/not-found';
import { exceptionMessages } from '~/shared/enums/exceptions';
import { authenticationMiddleware } from '../middleware/authentication-middleware';
import { Forbidden } from '~/shared/exceptions/forbidden';

/* @swagger
 * tags:
 *   name: profile
 *   description: Profile management
 * components:
 *    schemas:
 *      ProfileUpdateResponseDto:
 *        type: object
 *        properties:
 *          userId:
 *            type: string
 *            format: uuid
 *          avatar:
 *            type: string
 *          profileId:
 *            type: string
 *            format: uuid
 *          username:
 *            type: string
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *      ProfileUpdateRequestDto:
 *        type: object
 *        properties:
 *          userId:
 *            type: string
 *            format: uuid
 *          username:
 *            type: string
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *       UserUploadRequestDto:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               format: uuid
 *             base64Str:
 *               type: string
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
   * /profile:
   *    post:
   *      tags:
   *      - profile
   *      operationId: update user profile
   *      description: update user profile
   *      security:
   *      - bearerAuth: []
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                items:
   *                  $ref: '#/components/schemas/ProfileUpdateResponseDto'
   *        404:
   *          $ref: '#/components/responses/NotFound'
   */
  @httpPut('/update', authenticationMiddleware)
  public async update(
    @requestBody() body: ProfileUpdateRequestDto,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<ProfileUpdateResponseDto> {
    const res = await this.profileService.update(body);

    const { id: clientUserId } = req.user;

    if (clientUserId !== body.userId) {
      throw new Forbidden();
    }

    if (!res) {
      throw new NotFound(exceptionMessages.auth.USER_NOT_FOUND);
    }

    return res;
  }
  /**
   * @swagger
   * /upload:
   *    post:
   *      tags:
   *      - profile
   *      operationId: uploadAvatar
   *      description: update user profile
   *      security:
   *      - bearerAuth: []
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                items:
   *                  $ref: '#/components/schemas/ProfileUpdateResponseDto'
   *        404:
   *          description: user not found
   */
  @httpPost('/upload', authenticationMiddleware)
  public async upload(@requestBody() body: UserUploadRequestDto): Promise<ProfileUpdateResponseDto> {
    const res = await this.profileService.uploadAvatar(body);

    if (!res) {
      throw new NotFound(exceptionMessages.auth.USER_NOT_FOUND);
    }

    return res;
  }
  /**
   * @swagger
   * /get/{id}:
   *    get:
   *      tags:
   *        - profile
   *      operationId: getProfileByUserId
   *      security:
   *      - bearerAuth: []
   *      consumes:
   *        - application/json
   *      produces:
   *        - application/json
   *      description: get profile by user id
   *      parameters:
   *        - in: path
   *          name: id
   *          description: user id
   *          required: true
   *          schema:
   *            type: string
   *      responses:
   *        '200':
   *          description: successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/ProfileUpdateResponseDto'
   *        '404':
   *          description: user not found
   */
  @httpGet('/get/:id', authenticationMiddleware)
  public async get(@requestParam('id') id: string): Promise<ProfileUpdateResponseDto> {
    const res = await this.profileService.getByUserId(id);

    if (!res) {
      throw new NotFound(exceptionMessages.auth.USER_NOT_FOUND);
    }

    return res;
  }
}
