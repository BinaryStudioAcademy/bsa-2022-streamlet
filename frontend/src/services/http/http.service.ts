import { HttpError } from 'exceptions/exceptions';
import { HttpHeader, HttpMethod } from 'common/enums/enums';
import { HttpOptions } from 'common/types/types';

class Http {
  async load<T = unknown>(url: string, options: Partial<HttpOptions> = {}): Promise<T> {
    const { method = HttpMethod.GET, payload = null } = options;
    const headers = this.getHeaders();

    return fetch(url, {
      method,
      headers,
      body: payload,
    })
      .then(this.checkStatus)
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
