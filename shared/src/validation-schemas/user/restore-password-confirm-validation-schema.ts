import * as Joi from 'joi';
import { UserValidationMessage } from '~/common/enums/enums';
import { restorePasswordConfirmBase } from './restore-password-confirm-base-validation-schema';

const restorePasswordConfirm = Joi.object({
  token: Joi.string().required().messages({
    'string.empty': UserValidationMessage.PASSWORD_RESET_TOKEN_REQUIRE,
    'any.required': UserValidationMessage.PASSWORD_RESET_TOKEN_REQUIRE,
  }),
}).concat(restorePasswordConfirmBase);

export { restorePasswordConfirm };
