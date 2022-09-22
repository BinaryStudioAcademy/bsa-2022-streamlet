import { ApiRequest } from '../request';
import { CONFIG } from '../../../config/config';

let baseUrl: string = CONFIG.BASE_URL;

export class AuthController {
  async signUpUser(newUser: object) {
    const response = await new ApiRequest().prefixUrl(baseUrl).method('POST').url(`auth/sign-up`).body(newUser).send();
    return response;
  }

  async signInUser(emailVal: string, passwordVal: string) {
    const response = await new ApiRequest()
      .prefixUrl(baseUrl)
      .method('POST')
      .url(`auth/sign-in`)
      .body({
        email: emailVal,
        password: passwordVal,
      })
      .send();
    return response;
  }

  async refreshTokens(refreshTokenVal: string) {
    const response = await new ApiRequest()
      .prefixUrl(baseUrl)
      .method('POST')
      .url(`auth/refresh-tokens`)
      .body({
        refreshToken: refreshTokenVal,
      })
      .send();
    return response;
  }

  async signOut(accessToken: string) {
    const response = await new ApiRequest()
      .prefixUrl(baseUrl)
      .method('POST')
      .url(`auth/sign-out`)
      .bearerToken(accessToken)
      .send();
    return response;
  }

  async restorePasswordConfirm(tokenVal: string, passwordVal: string) {
    const response = await new ApiRequest()
      .prefixUrl(baseUrl)
      .method('POST')
      .url(`auth/restore-password-confirm`)
      .body({
        token: tokenVal,
        password: passwordVal,
      })
      .send();
    return response;
  }

  async restorePasswordInit(emailVal: string) {
    const response = await new ApiRequest()
      .prefixUrl(baseUrl)
      .method('POST')
      .url(`auth/restore-password-init`)
      .body({
        email: emailVal,
      })
      .send();
    return response;
  }

  async accountVerificationConfirm(tokenVal: string) {
    const response = await new ApiRequest()
      .prefixUrl(baseUrl)
      .method('POST')
      .url(`auth/account-verification-confirm`)
      .body({
        token: tokenVal,
      })
      .send();
    return response;
  }

  async accountVerificationInit(emailVal: string) {
    const response = await new ApiRequest()
      .prefixUrl(baseUrl)
      .method('POST')
      .url(`auth/account-verification-init`)
      .body({
        email: emailVal,
      })
      .send();
    return response;
  }

  async userInfo(accessToken: string) {
    const response = await new ApiRequest()
      .prefixUrl(baseUrl)
      .method('GET')
      .url(`auth/user`)
      .bearerToken(accessToken)
      .send();
    return response;
  }

  async mailTest(emailVal: string, nameVal: string) {
    const response = await new ApiRequest()
      .prefixUrl(baseUrl)
      .method('POST')
      .url(`auth/mail-test`)
      .body({
        email: emailVal,
        name: nameVal,
      })
      .send();
    return response;
  }
}
