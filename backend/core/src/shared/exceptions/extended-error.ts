export class ExtendedError extends Error {
  constructor(message: string, private errorCode?: string) {
    super(message);
  }
}
