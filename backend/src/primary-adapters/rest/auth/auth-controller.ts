import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, requestBody } from 'inversify-express-utils';
import { ApiPath, AuthApiPath } from '~/shared/enums/api/api';
import {
  CONTAINER_TYPES,
  TokenPair,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  UserSignInRequestDto,
  UserSignInResponseDto,
} from '~/shared/types/types';
import { UserService } from '~/core/user/application/user-service';
import { compareHash, generateJwt } from './utils';
import { trimUser } from '~/shared/helpers';

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

  // TODO: edit docs
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

  // TODO: add docs
  @httpPost(AuthApiPath.SIGN_IN)
  public async signIn(
    @requestBody() userRequestDto: UserSignInRequestDto,
  ): Promise<{ user: UserSignInResponseDto; tokens: TokenPair }> {
    // TODO: add validation
    const user = await this.userService.getUserByEmail(userRequestDto.email);
    if (!user) {
      // TODO: throw correct error
      throw new Error('not found');
    }
    if (!(await compareHash(userRequestDto.password, user.password))) {
      // TODO: throw correct error
      throw new Error('incorrect password');
    }
    const accessToken = await generateJwt(user);
    return {
      user: trimUser(user),
      tokens: {
        accessToken,
        // TODO: add real token
        refreshToken: 'dummy',
      },
    };
  }
}
