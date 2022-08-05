import { BadRequest } from './bad-request';

export class DuplicationError extends BadRequest {
  constructor(message = 'Already exists') {
    super(message);
    Object.setPrototypeOf(this, DuplicationError.prototype);
  }
}
