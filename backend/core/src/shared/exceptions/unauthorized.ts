import { ExtendedError } from './extended-error';

export class Unauthorized extends ExtendedError {
  constructor(message = 'Unauthorized', errorCode?: string) {
    super(message, errorCode);
    Object.setPrototypeOf(this, Unauthorized.prototype);
  }
}
