import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, requestBody } from 'inversify-express-utils';
import { ApiPath, AuthApiPath } from '~/shared/enums/api/api';
import {
  CONTAINER_TYPES,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  MailResponseDto,
  MailTestRequestDto,
} from '~/shared/types/types';
import { UserService } from '~/core/user/application/user-service';

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
  public signUp(@requestBody() userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.userService.createUser(userRequestDto);
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
