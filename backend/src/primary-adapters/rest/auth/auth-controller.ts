import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, requestBody } from 'inversify-express-utils';
import { ApiPath, AuthApiPath } from '~/shared/enums/api/api';
import { CONTAINER_TYPES, TokenPair, UserSignUpRequestDto, UserSignUpResponseDto } from '~/shared/types/types';
import { UserService } from '~/core/user/application/user-service';
import { generateJwt } from './utils';

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: Authorization
 * definitions:
 *    UserSignUpRequest:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *        password:
 *          type: string
 *    UserSignUpResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *        email:
 *          type: string
 *          format: email
 */
@controller(ApiPath.AUTH)
export class AuthController extends BaseHttpController {
  private userService: UserService;

  constructor(@inject(CONTAINER_TYPES.UserService) userService: UserService) {
    super();

    this.userService = userService;
  }

  /**
   * @swagger
   * /auth/sign-up:
   *    post:
   *      tags:
   *      - auth
   *      security: []
   *      operationId: signUpUser
   *      consumes:
   *      - application/json
   *      produces:
   *      - application/json
   *      description: Sign up user into the system
   *      parameters:
   *      - in: body
   *        name: body
   *        description: User auth data
   *        required: true
   *        schema:
   *          $ref: '#/definitions/UserSignUpRequest'
   *      responses:
   *        200:
   *          description: successful operation
   *          schema:
   *            $ref: '#/definitions/UserSignUpResponse'
   *        400:
   *          description: Email is already taken.
   */
  @httpPost(AuthApiPath.SIGN_UP)
  public async signUp(
    @requestBody() userRequestDto: UserSignUpRequestDto,
  ): Promise<{ user: UserSignUpResponseDto; tokens: TokenPair }> {
    // TODO: add validation
    const user = await this.userService.createUser(userRequestDto);
    const accessToken = await generateJwt(user);
    return {
      user,
      tokens: {
        accessToken,
        // TODO: add real token
        refreshToken: 'dummy',
      },
    };
  }
}
