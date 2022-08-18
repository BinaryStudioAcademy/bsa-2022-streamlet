import {
  BaseHttpController,
  controller,
  httpPut,
  httpPost,
  requestBody,
  httpGet,
  requestParam,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import {
  CONTAINER_TYPES,
  ProfileUpdateRequestDto,
  ProfileUpdateResponseDto,
  UserUploadRequestDto,
} from '~/shared/types/types';
import { UserService } from '~/core/user/application/user-service';
import { ProfileService } from '~/core/profile/aplication/profile-service';
import { NotFound } from '~/shared/exceptions/not-found';
import { exceptionMessages } from '~/shared/enums/exceptions';
import { authenticationMiddleware } from '../middleware/authentication-middleware';

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

  @httpPut('/update', authenticationMiddleware)
  public async update(@requestBody() body: ProfileUpdateRequestDto): Promise<ProfileUpdateResponseDto> {
    const { userId } = body;
    const isUserExist = await this.userService.getUserById(userId);
    if (!isUserExist) {
      throw new NotFound(exceptionMessages.auth.USER_NOT_FOUND);
    }
    return this.profileService.update(body);
  }

  @httpPost('/upload', authenticationMiddleware)
  public upload(@requestBody() body: UserUploadRequestDto): Promise<ProfileUpdateResponseDto> {
    return this.profileService.uploadAvatar(body);
  }
  @httpGet('/get/:id', authenticationMiddleware)
  public async get(@requestParam('id') id: string): Promise<ProfileUpdateResponseDto> {
    const isUserExist = await this.userService.getUserById(id);
    if (!isUserExist) {
      throw new NotFound(exceptionMessages.auth.USER_NOT_FOUND);
    }
    const { username } = isUserExist;
    return this.profileService.getByUserId(id, username);
  }
}
