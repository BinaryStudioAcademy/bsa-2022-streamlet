import * as Joi from 'joi';
import { RestorePasswordInitRequestDto } from '~/common/types/types';
import { UserValidationMessage } from '~/common/enums/enums';

const restorePasswordInit = Joi.object<RestorePasswordInitRequestDto, true>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
      'any.required': UserValidationMessage.EMAIL_REQUIRE,
    }),
});

export { restorePasswordInit };
