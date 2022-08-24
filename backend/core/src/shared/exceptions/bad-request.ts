import { ExtendedError } from './extended-error';

export class BadRequest extends ExtendedError {
  constructor(message: string, errorCode?: string) {
    super(message, errorCode);
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
}
