import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, request, requestBody } from 'inversify-express-utils';
import { ApiPath, AuthApiPath } from '~/shared/enums/api/api';
import {
  CONTAINER_TYPES,
  TokenPair,
  UserSignInRequestDto,
  UserSignInResponseDto,
  RefreshTokenRequestDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  MailResponseDto,
  MailTestRequestDto,
  ExtendedAuthenticatedRequest,
} from '~/shared/types/types';
import { UserService } from '~/core/user/application/user-service';
import { compareHash, generateJwt, trimUser } from '~/shared/helpers';
import { RefreshTokenService } from '~/core/refresh-token/application/refresh-token-service';
import { authenticationMiddleware, validationMiddleware } from '../middleware';
import { userSignIn, userSignUp } from '~/validation-schemas/user/user';
import { refreshTokenRequest } from '~/validation-schemas/refresh-token/refresh-token';
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
 *    MailTestRequest:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *        name:
 *          type: string
 *    MailTestResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
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
  public async signUp(@requestBody() userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    const duplicateUser = await this.userService.getUserByUsernameOrEmail(
      userRequestDto.email,
      userRequestDto.username,
    );

    if (duplicateUser) {
      if (duplicateUser.username === userRequestDto.username) {
        throw new DuplicationError(exceptionMessages.auth.USER_USERNAME_ALREADY_EXISTS);
      }
      if (duplicateUser.email === userRequestDto.email) {
        throw new DuplicationError(exceptionMessages.auth.USER_EMAIL_ALREADY_EXISTS);
      }
    }
    const user = await this.userService.createUser(userRequestDto);
    const accessToken = await generateJwt({ payload: user });
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
  public async signIn(@requestBody() userRequestDto: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    const user = await this.userService.getUserByEmail(userRequestDto.email);
    if (!user) {
      throw new Unauthorized(exceptionMessages.auth.INCORRECT_CREDENTIALS);
    }
    const isSameHash = await compareHash(userRequestDto.password, user.password);
    if (!isSameHash) {
      throw new Unauthorized(exceptionMessages.auth.INCORRECT_CREDENTIALS);
    }
    const accessToken = await generateJwt({ payload: trimUser(user) });
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
   *        description: refresh token
   *        required: true
   *        schema:
   *          type: object
   *          properties:
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
   *        401:
   *          description: Such user-token pair was not found or inspired
   */
  @httpPost(AuthApiPath.REFRESH_TOKENS, validationMiddleware(refreshTokenRequest))
  public async refreshTokens(
    @requestBody() refreshTokenRequestDto: RefreshTokenRequestDto,
  ): Promise<{ tokens: TokenPair }> {
    const tokenUser = await this.refreshTokenService.getRefreshTokenUser(refreshTokenRequestDto.refreshToken);

    if (!tokenUser) {
      throw new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_INCORRECT_TOKEN);
    }
    const newRefreshToken = await this.userService.createRefreshToken(tokenUser.id);
    const newAccessToken = await generateJwt({ payload: trimUser(tokenUser) });
    return {
      tokens: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    };
  }

  /**
   * @swagger
   * /auth/log-out:
   *    post:
   *      tags:
   *      - auth
   *      security: []
   *      operationId: logOut
   *      description: Logout the user (will delete all refresh tokens)
   *      responses:
   *        200:
   *          description: successful operation
   */
  @httpPost(AuthApiPath.LOG_OUT, authenticationMiddleware)
  public async logout(@request() req: ExtendedAuthenticatedRequest): Promise<void> {
    const user = req.user;
    return this.refreshTokenService.removeForUser(user.id);
  }

  /**
   * @swagger
   * /auth/mail-test:
   *   post:
   *     tags:
   *       - auth
   *     summary: Test the mail service
   *     security: []
   *     operationId: testMailService
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: Email and name for test
   *         required: true
   *         schema:
   *           $ref: '#/definitions/MailTestRequest'
   *     responses:
   *       default:
   *         description: Confirmation that email was sent successfully or error message
   *         schema:
   *           $ref: '#/definitions/MailTestResponse'
   */
  // This route is created only for testing purposes.
  @httpPost('/mail-test')
  public testMail(@requestBody() mailTestRequestDto: MailTestRequestDto): Promise<MailResponseDto> {
    return this.userService.testSendingEmail(mailTestRequestDto);
  }
}
