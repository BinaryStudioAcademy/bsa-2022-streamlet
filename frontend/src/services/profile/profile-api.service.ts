import { ApiPath, ProfileApiPath, ContentType, HttpMethod } from 'common/enums/enums';
import { UserUploadRequestDto } from 'common/types/user/user';
import { Http } from '../http/http.service';
import {
  ProfileUpdateRequestDto,
  ProfileUpdateResponseDto,
  type getProfileByUserIdRequestDto,
} from 'common/types/types';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class ProfileApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public uploadAvatar(payload: UserUploadRequestDto): Promise<ProfileUpdateResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.PROFILE}${ProfileApiPath.UPLOAD}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    });
  }

  public getProfileByUserId(payload: getProfileByUserIdRequestDto): Promise<ProfileUpdateResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.PROFILE}${ProfileApiPath.ROOT}${payload.userId}`,
      options: {
        method: HttpMethod.GET,
      },
    });
  }

  public updateProfile(payload: ProfileUpdateRequestDto): Promise<ProfileUpdateResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.PROFILE}${ProfileApiPath.UPDATE}`,
      options: {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    });
  }
}

export { ProfileApi };
