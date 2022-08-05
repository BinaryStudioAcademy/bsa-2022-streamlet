export class NotFound extends Error {
  constructor(message = 'Not found') {
    super(message);
    Object.setPrototypeOf(this, NotFound.prototype);
  }
}
