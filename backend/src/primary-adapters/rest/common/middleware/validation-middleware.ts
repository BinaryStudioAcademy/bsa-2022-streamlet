// import express from 'express';
// import { inject, injectable } from 'inversify';
// import { BaseMiddleware } from 'inversify-express-utils';

// @injectable()
// class LoggerMiddleware extends BaseMiddleware {
//   @inject(TYPES.Logger) private readonly _logger: Logger;
//   public handler(req: express.Request, res: express.Response, next: express.NextFunction) {
//     if (this.httpContext.user.isAuthenticated()) {
//       this._logger.info(`${this.httpContext.user.details.email} => ${req.url}`);
//     } else {
//       this._logger.info(`Anonymous => ${req.url}`);
//     }
//     next();
//   }
// }

// export { LoggerMiddleware };
