import { HttpCode } from '~/common/enums/enums';

const DEFAULT_SERVER_ERROR = 'Network Error';

type CosntructorParams = {
  message?: string;
  status?: number;
  errorCode?: string;
};

class HttpError extends Error {
  status: HttpCode;
  errorCode?: string;

  constructor({
    message = DEFAULT_SERVER_ERROR,
    status = HttpCode.INTERNAL_SERVER_ERROR,
    errorCode,
  }: CosntructorParams = {}) {
    super(message);
    this.status = status;
    this.message = message;
    this.errorCode = errorCode;
  }
}

export { HttpError };
