import { ApiPath, AuthApiPath, ContentType, HttpMethod } from 'common/enums/enums';
import {
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from 'common/types/types';
import { Http } from '../http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class AuthApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public signUp(payload: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
      postInterceptors: [],
    });
  }

  public signIn(payload: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
      postInterceptors: [],
    });
  }

  public refreshTokens(payload: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.REFRESH_TOKENS}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
      postInterceptors: [],
    });
  }
}

export { AuthApi };
