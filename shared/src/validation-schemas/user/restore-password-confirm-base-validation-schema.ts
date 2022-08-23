import * as Joi from 'joi';
import { RestorePasswordConfirmRequestDto } from '~/common/types/types';
import { passwordCreationSchema } from './password-creation-schema';

const restorePasswordConfirmBase = Joi.object<Omit<RestorePasswordConfirmRequestDto, 'token'>, true>({
  password: passwordCreationSchema,
});

export { restorePasswordConfirmBase };
