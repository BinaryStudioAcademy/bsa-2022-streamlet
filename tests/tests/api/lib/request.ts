import type { Options, Method, Response, GotRequestFunction } from 'got';
import got from 'got';
import { allure } from 'allure-mocha/dist/MochaAllureReporter';
type ElementOf<T> = T extends (infer E)[] ? E : T;

export abstract class BaseHttpRequest {
  protected options: ElementOf<Parameters<GotRequestFunction>> = {
    http2: true,
  };

  public prefixUrl(url: any): this {
    this.options.prefixUrl = url;
    return this;
  }

  public url(url: any): this {
    this.options.url = url;
    return this;
  }

  public method(method: Method): this {
    this.options.method = method;
    return this;
  }

  public headers(headers: Record<string, string | undefined>): this {
    this.options.headers = this.options.headers ?? {};
    this.options.headers = {
      ...this.options.headers,
      ...headers,
    };
    return this;
  }

  public bearerToken(bearerToken?: string): this {
    return this.headers({
      Authorization: `Bearer ${bearerToken}`,
    });
  }

  public searchParams(searchParams: Options['searchParams']): this {
    this.options.searchParams = searchParams;
    return this;
  }

  public abstract body(body: any): this;

  public async send<T = any>(): Promise<Response<T>> {
    let response;
    await got<T>(this.options as any)
      .then((res) => {
        response = res;
      })
      .catch((error) => {
        if (error.response) {
          console.error('RESPONSE ERR', error.response.body);
          response = error.response;
        } else if (error.request) {
          // console.error('REQUEST ERR', error.request);
          response = error.request;
        } else {
          // console.error('Error', error.message);
          response = error.message;
        }
        //response = error;
      });
    return response;
  }
}

export class ApiRequest extends BaseHttpRequest {
  constructor() {
    super();
    this.options = {
      ...this.options,
      responseType: 'json',
      hooks: {
        afterResponse: [
          (response, retryWithMergedOptions) => {
            const stepName = `${response.statusCode} | ${this?.options?.method ?? 'GET'} ${this?.options?.url} | ${
              response?.timings?.phases?.total
            }ms`;
            allure.createStep(stepName, () => {
              if (this?.options?.json) {
                allure.createAttachment(
                  `Request BODY`,
                  JSON.stringify(this?.options?.json, null, 2),
                  'application/json' as any,
                );
              }
              if (response.body) {
                allure.createAttachment(
                  `Response BODY`,
                  JSON.stringify(response.body, null, 2),
                  'application/json' as any,
                );
              }
            })();
            return response;
          },
        ],
      },
    };
    this.options.headers = {
      Accept: 'application/json',
    };
  }
  public body(body: any): this {
    this.options.json = body;
    return this;
  }
}
