import { HttpCode } from '~/common/enums/enums';

const DEFAULT_SERVER_ERROR = 'Network Error';

class HttpError extends Error {
  status: HttpCode;

  constructor({ message = DEFAULT_SERVER_ERROR, status = HttpCode.INTERNAL_SERVER_ERROR } = {}) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export { HttpError };
