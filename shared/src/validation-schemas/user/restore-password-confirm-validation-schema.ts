import * as Joi from 'joi';
import { RestorePasswordConfirmRequestDto } from '~/common/types/types';
import { UserValidationMessage } from '~/common/enums/enums';

const restorePasswordConfirm = Joi.object<RestorePasswordConfirmRequestDto, true>({
  token: Joi.string().required().messages({
    'string.empty': UserValidationMessage.PASSWORD_RESET_TOKEN_REQUIRE,
    'any.required': UserValidationMessage.PASSWORD_RESET_TOKEN_REQUIRE,
  }),
  password: Joi.string().trim().required().messages({
    'string.empty': UserValidationMessage.PASSWORD_RESET_PASSWORD_REQUIRE,
    'any.required': UserValidationMessage.PASSWORD_RESET_PASSWORD_REQUIRE,
  }),
});

export { restorePasswordConfirm };
