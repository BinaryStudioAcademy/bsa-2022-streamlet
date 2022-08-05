export class Forbidden extends Error {
  constructor(message = 'Action forbidden') {
    super(message);
    Object.setPrototypeOf(this, Forbidden.prototype);
  }
}
