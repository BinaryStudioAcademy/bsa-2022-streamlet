import { ApiPath, ProfileApiPath, ContentType, HttpMethod } from 'common/enums/enums';
import { UserUploadRequestDto, UserUploadResponseDto } from 'common/types/user/user';
import { Http } from '../http/http.service';
import { ProfileUpdateRequestDto, ProfileUpdateResponseDto } from 'common/types/types';

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

  public uploadAvatar(payload: UserUploadRequestDto): Promise<UserUploadResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.PROFILE}${ProfileApiPath.UPLOAD}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
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
