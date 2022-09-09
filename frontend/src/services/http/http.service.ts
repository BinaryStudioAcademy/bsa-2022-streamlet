import { HttpError } from 'exceptions/exceptions';
import { HttpCode, HttpHeader, HttpMethod } from 'common/enums/enums';
import { HttpOptions } from 'common/types/types';
import { getStringifiedQuery } from 'helpers/helpers';
import { PostInterceptor, PreInterceptor } from './interceptors/interceptor';

class Http {
  constructor(private defaultPreInterceptors: PreInterceptor[], private defaultPostInterceptors: PostInterceptor[]) {}

  async load<T = unknown>({
    url,
    options = {},
    query,
    preInterceptors = this.defaultPreInterceptors,
    postInterceptors = this.defaultPostInterceptors,
    abortSignal,
  }: {
    url: string;
    query?: Record<string, unknown>;
    options?: Partial<HttpOptions>;
    abortSignal?: AbortSignal;
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
    if (abortSignal) {
      requestInit.signal = abortSignal;
    }

    // remember to add query params before running pre-interceptors, so that they have access to it
    url = this.getUrl(url, query);
    for (const preInterceptor of preInterceptors) {
      [url, requestInit] = await preInterceptor({ url, options: requestInit });
    }

    const makeRequest = (url: string, options: RequestInit): Promise<Response> => fetch(url, options);

    let response = await makeRequest(url, requestInit);

    for (const postInterceptor of postInterceptors) {
      response = await postInterceptor({
        initialRequest: { options: requestInit, url },
        makeRequestFn: makeRequest,
        response,
      });
    }

    if (response.status === HttpCode.NO_CONTENT) {
      return {} as T;
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
        errorCode: parsedException?.errorCode,
      });
    }

    return response;
  }

  private getUrl(url: string, query: Record<string, unknown> | undefined): string {
    return `${url}${query ? `?${getStringifiedQuery(query)}` : ''}`;
  }

  private parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  private throwError(err: Error): never {
    throw err;
  }
}

export { Http };
