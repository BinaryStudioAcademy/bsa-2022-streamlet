import { ApiPath, AuthApiPath, ContentType, HttpMethod } from 'common/enums/enums';
import { CancellableRequest } from 'common/types/http/http';
import {
  AccountVerificationConfirmRequestDto,
  AccountVerificationConfirmResponseDto,
  AccountVerificationInitRequestDto,
  AccountVerificationInitResponseDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from 'common/types/types';
import {
  RestorePasswordConfirmRequestDto,
  RestorePasswordInitRequestDto,
  RestorePasswordInitResponseDto,
} from 'shared/build/common/types/types';
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
      preInterceptors: [],
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
      preInterceptors: [],
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
      preInterceptors: [],
      postInterceptors: [],
    });
  }

  public logout(): Promise<void> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.LOG_OUT}`,
      options: {
        method: HttpMethod.POST,
      },
    });
  }

  public getCurrentUser(): Promise<UserSignInResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.USER}`,
      options: {
        method: HttpMethod.GET,
      },
    });
  }

  public confirmAccountVerification(
    payload: AccountVerificationConfirmRequestDto,
  ): CancellableRequest<AccountVerificationConfirmResponseDto> {
    const controller = new AbortController();
    const signal = controller.signal;
    return {
      response: this.#http.load<AccountVerificationConfirmResponseDto>({
        url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.ACCOUNT_VERIFICATION_CONFIRM}`,
        options: {
          method: HttpMethod.POST,
          payload: JSON.stringify(payload),
        },
        preInterceptors: [],
        postInterceptors: [],
        abortSignal: signal,
      }),
      cancelRequest: () => controller.abort(),
    };
  }

  public sendAccountVerificationLetter(
    payload: AccountVerificationInitRequestDto,
  ): Promise<AccountVerificationInitResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.ACCOUNT_VERIFICATION_INIT}`,
      options: {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
      },
      preInterceptors: [],
      postInterceptors: [],
    });
  }

  public sendPasswordResetLetter(payload: RestorePasswordInitRequestDto): Promise<RestorePasswordInitResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.RESTORE_PASSWORD_INIT}`,
      options: {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
      },
      preInterceptors: [],
      postInterceptors: [],
    });
  }

  public confirmPasswordReset(payload: RestorePasswordConfirmRequestDto): Promise<void> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.RESTORE_PASSWORD_CONFIRM}`,
      options: {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
      },
      preInterceptors: [],
      postInterceptors: [],
    });
  }
}

export { AuthApi };
