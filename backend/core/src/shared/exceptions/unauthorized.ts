export class Unauthorized extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    Object.setPrototypeOf(this, Unauthorized.prototype);
  }
}
