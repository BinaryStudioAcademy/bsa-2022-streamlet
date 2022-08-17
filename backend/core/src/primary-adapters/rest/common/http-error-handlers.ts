import { ApiError } from './data/api-error';
import { Request, Response, NextFunction } from 'express';
import { Unauthorized, BadRequest, Forbidden, NotFound } from '~/shared/exceptions/exceptions';
import { logger } from '~/configuration/logger';

interface HandlerResult {
  errors: ApiError[];
  code: number;
}

interface ErrorHandler {
  handle(error: Error, request: Request): HandlerResult;
}

class NotFoundErrorHandler implements ErrorHandler {
  handle(error: Error): HandlerResult {
    logger.error(error, 'Not Found');
    return {
      errors: [new ApiError(error.message)],
      code: 404,
    };
  }
}

class BadRequestErrorHandler implements ErrorHandler {
  handle(error: Error): HandlerResult {
    logger.error(error, 'Bad request');
    return {
      errors: [new ApiError(error.message)],
      code: 400,
    };
  }
}

class UnauthorizedErrorHandler implements ErrorHandler {
  handle(error: Error): HandlerResult {
    logger.error(error, 'Bad request');
    return {
      errors: [new ApiError(error.message)],
      code: 401,
    };
  }
}

class ForbiddenErrorHandler implements ErrorHandler {
  handle(error: Error): HandlerResult {
    logger.error(error, 'Forbidden');
    return {
      errors: [new ApiError(error.message)],
      code: 403,
    };
  }
}

class UnhandledErrorHandler implements ErrorHandler {
  handle(error: Error): HandlerResult {
    logger.error(error, 'Unhandled exception');
    return {
      errors: [new ApiError(error.message)],
      code: 500,
    };
  }
}

const getErrorHandler = (error: Error): ErrorHandler => {
  if (error instanceof NotFound) {
    return new NotFoundErrorHandler();
  }
  if (error instanceof Unauthorized) {
    return new UnauthorizedErrorHandler();
  }
  if (error instanceof BadRequest) {
    return new BadRequestErrorHandler();
  }
  if (error instanceof Forbidden) {
    return new ForbiddenErrorHandler();
  }
  return new UnhandledErrorHandler();
};

const handleHttpError = (error: Error, request: Request, response: Response, next: NextFunction): void => {
  const handler = getErrorHandler(error);

  const { code, errors } = handler.handle(error, request);
  response.status(code).json(errors);
  next();
};

export { handleHttpError };
