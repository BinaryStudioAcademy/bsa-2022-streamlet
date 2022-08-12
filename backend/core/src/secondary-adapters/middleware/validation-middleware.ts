import express from 'express';
import * as Joi from 'joi';
import { BadRequest } from '~/shared/exceptions/bad-request';

const validationMiddleware = (schema: Joi.AnySchema) => {
  return (req: express.Request, _res: express.Response, next: express.NextFunction): void => {
    const result = schema.validate(req.body);
    if (result.error) {
      throw new BadRequest(result.error.message);
    }
    req.body = result.value;
    next();
  };
};

export { validationMiddleware };
