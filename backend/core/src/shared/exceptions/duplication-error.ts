import { BadRequest } from './bad-request';

export class DuplicationError extends BadRequest {
  constructor(message = 'Already exists', errorCode?: string) {
    super(message, errorCode);
    Object.setPrototypeOf(this, DuplicationError.prototype);
  }
}
