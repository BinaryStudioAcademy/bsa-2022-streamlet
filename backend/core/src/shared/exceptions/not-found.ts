import { ExtendedError } from './extended-error';

export class NotFound extends ExtendedError {
  constructor(message = 'Not found', errorCode?: string) {
    super(message, errorCode);
    Object.setPrototypeOf(this, NotFound.prototype);
  }
}
