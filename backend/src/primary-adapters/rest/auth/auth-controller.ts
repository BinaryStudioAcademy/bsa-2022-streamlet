import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, requestBody } from 'inversify-express-utils';
import { ApiPath, AuthApiPath } from '~/shared/enums/api/api';
import { CONTAINER_TYPES, UserSignUpRequestDto, UserSignUpResponseDto } from '~/shared/types/types';
import { UserService } from '~/core/user/application/user-service';

@controller(ApiPath.AUTH)
export class AuthController extends BaseHttpController {
  private userService: UserService;

  constructor(@inject(CONTAINER_TYPES.UserService) userService: UserService) {
    super();

    this.userService = userService;
  }

  @httpPost(AuthApiPath.SIGN_UP)
  public signUp(@requestBody() userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.userService.createUser(userRequestDto);
  }
}
