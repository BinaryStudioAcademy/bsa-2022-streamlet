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
  RefreshTokenRequestDto,
} from '~/shared/types/types';
import { UserService } from '~/core/user/application/user-service';
import { compareHash, generateJwt } from './utils';
import { trimUser } from '~/shared/helpers';
import { RefreshTokenService } from '~/core/refresh-token/application/refresh-token-service';
import { validationMiddleware } from '../common/middleware';
import { userSignIn, userSignUp } from '~/validation-schemas/user/user';
import { refreshTokenRequest } from '~/validation-schemas/refresh-token/refresh-token';
import { NotFound } from '~/shared/exceptions/not-found';
import { Unauthorized } from '~/shared/exceptions/unauthorized';
import { exceptionMessages } from '~/shared/enums/exceptions';
import { DuplicationError } from '~/shared/exceptions/duplication-error';

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: Authorization
 * definitions:
 *    UserBaseResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *        email:
 *          type: string
 *          format: email
 *    TokenPair:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 *        refreshToken:
 *          type: string
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
 *        user:
 *          $ref: '#/definitions/UserBaseResponse'
 *        tokens:
 *          $ref: '#/definitions/TokenPair'
 *    UserSignInRequest:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *        password:
 *          type: string
 *    UserSignInResponse:
 *      type: object
 *      properties:
 *        user:
 *          $ref: '#/definitions/UserBaseResponse'
 *        tokens:
 *          $ref: '#/definitions/TokenPair'
 */
@controller(ApiPath.AUTH)
export class AuthController extends BaseHttpController {
  private userService: UserService;
  private refreshTokenService: RefreshTokenService;

  constructor(
    @inject(CONTAINER_TYPES.UserService) userService: UserService,
    @inject(CONTAINER_TYPES.RefreshTokenService) refreshTokenService: RefreshTokenService,
  ) {
    super();

    this.userService = userService;
    this.refreshTokenService = refreshTokenService;
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
  @httpPost(AuthApiPath.SIGN_UP, validationMiddleware(userSignUp))
  public async signUp(
    @requestBody() userRequestDto: UserSignUpRequestDto,
  ): Promise<{ user: UserSignUpResponseDto; tokens: TokenPair }> {
    const userAlreadyExists = (await this.userService.getUserByEmail(userRequestDto.email)) !== null;
    if (userAlreadyExists) {
      throw new DuplicationError(exceptionMessages.auth.USER_EMAIL_ALREADY_EXISTS);
    }
    const user = await this.userService.createUser(userRequestDto);
    const accessToken = await generateJwt(user);
    return {
      user,
      tokens: {
        accessToken,
        refreshToken: await this.userService.createRefreshToken(user.id),
      },
    };
  }

  /**
   * @swagger
   * /auth/sign-in:
   *    post:
   *      tags:
   *      - auth
   *      security: []
   *      operationId: signInUser
   *      consumes:
   *      - application/json
   *      produces:
   *      - application/json
   *      description: Sign in user into the system
   *      parameters:
   *      - in: body
   *        name: body
   *        description: User auth data
   *        required: true
   *        schema:
   *          $ref: '#/definitions/UserSignInRequest'
   *      responses:
   *        200:
   *          description: successful operation
   *          schema:
   *            $ref: '#/definitions/UserSignInResponse'
   *        401:
   *          description: Incorrect credentials.
   *        400:
   *          description: Invalid request format.
   */
  @httpPost(AuthApiPath.SIGN_IN, validationMiddleware(userSignIn))
  public async signIn(
    @requestBody() userRequestDto: UserSignInRequestDto,
  ): Promise<{ user: UserSignInResponseDto; tokens: TokenPair }> {
    const user = await this.userService.getUserByEmail(userRequestDto.email);
    if (!user) {
      throw new Unauthorized(exceptionMessages.auth.INCORRECT_CREDENTIALS);
    }
    if (!(await compareHash(userRequestDto.password, user.password))) {
      throw new Unauthorized(exceptionMessages.auth.INCORRECT_CREDENTIALS);
    }
    const accessToken = await generateJwt(trimUser(user));
    return {
      user: trimUser(user),
      tokens: {
        accessToken,
        refreshToken: await this.userService.createRefreshToken(user.id),
      },
    };
  }

  /**
   * @swagger
   * /auth/refresh-tokens:
   *    post:
   *      tags:
   *      - auth
   *      security: []
   *      operationId: refreshTokens
   *      consumes:
   *      - application/json
   *      produces:
   *      - application/json
   *      description: Refresh user's access token
   *      parameters:
   *      - in: body
   *        name: body
   *        description: User's id and refresh token
   *        required: true
   *        schema:
   *          type: object
   *          properties:
   *            userId:
   *              type: string
   *              format: uuid
   *            refreshToken:
   *              type: string
   *      responses:
   *        200:
   *          description: successful operation
   *          schema:
   *            type: object
   *            properties:
   *              tokens:
   *                $ref: '#/definitions/TokenPair'
   *        404:
   *          description: Such user-token pair was not found
   */
  @httpPost(AuthApiPath.REFRESH_TOKENS, validationMiddleware(refreshTokenRequest))
  public async refreshTokens(
    @requestBody() refreshTokenRequestDto: RefreshTokenRequestDto,
  ): Promise<{ tokens: TokenPair }> {
    const user = await this.userService.getUserById(refreshTokenRequestDto.userId);
    if (!user) {
      throw new NotFound(exceptionMessages.auth.USER_NOT_FOUND);
    }
    const hasToken = await this.refreshTokenService.checkForExistence(
      refreshTokenRequestDto.userId,
      refreshTokenRequestDto.refreshToken,
    );
    if (!hasToken) {
      throw new NotFound(exceptionMessages.auth.TOKEN_NOT_FOUND);
    }
    const newRefreshToken = await this.userService.createRefreshToken(refreshTokenRequestDto.userId);
    const newAccessToken = await generateJwt(trimUser(user));
    return {
      tokens: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    };
  }
}
