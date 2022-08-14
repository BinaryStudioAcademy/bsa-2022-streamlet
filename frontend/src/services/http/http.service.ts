import { HttpError } from 'exceptions/exceptions';
import { HttpHeader, HttpMethod } from 'common/enums/enums';
import { HttpOptions } from 'common/types/types';
import { PostInterceptor, PreInterceptor } from './interceptors/interceptor';
import { refreshTokenInterceptor } from './interceptors/refresh-token-interceptor';
import { attachAuthTokenInterceptor } from './interceptors/attach-auth-token-interceptor';

class Http {
  async load<T = unknown>({
    url,
    options = {},
    preInterceptors = [attachAuthTokenInterceptor],
    postInterceptors = [refreshTokenInterceptor],
  }: {
    url: string;
    options?: Partial<HttpOptions>;
    preInterceptors?: PreInterceptor[];
    postInterceptors?: PostInterceptor[];
  }): Promise<T> {
    const { method = HttpMethod.GET, payload = null } = options;
    const headers = this.getHeaders();
    let requestInit: RequestInit = {
      method,
      headers,
      body: payload,
    };
    for (const preInterceptor of preInterceptors) {
      [url, requestInit] = await preInterceptor(url, options);
    }

    const makeRequest = (): Promise<Response> => fetch(url, requestInit);

    let response = await makeRequest();
    for (const postInterceptor of postInterceptors) {
      response = await postInterceptor({ initialRequestFn: makeRequest, response });
    }

    return this.checkStatus(response)
      .then((res) => this.parseJSON<T>(res))
      .catch(this.throwError);
  }

  private getHeaders(): Headers {
    const headers = new Headers();

    headers.append(HttpHeader.CONTENT_TYPE, 'application/json');

    return headers;
  }

  private async checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      const parsedException = await response
        .json()
        .then((parsed) => {
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed[0];
          }
          return parsed;
        })
        .catch(() => ({
          message: response.statusText,
        }));

      throw new HttpError({
        status: response.status,
        message: parsedException?.message,
      });
    }

    return response;
  }

  private parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  private throwError(err: Error): never {
    throw err;
  }
}

export { Http };
