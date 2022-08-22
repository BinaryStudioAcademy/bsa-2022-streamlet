import * as Joi from 'joi';
import { AccountVerificationInitRequestDto } from '~/common/types/types';
import { UserValidationMessage } from '~/common/enums/enums';

const accountVerificationInit = Joi.object<AccountVerificationInitRequestDto, true>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .min(6)
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
      'any.required': UserValidationMessage.EMAIL_REQUIRE,
      'string.min': UserValidationMessage.EMAIL_WRONG_LENGTH,
    }),
});

export { accountVerificationInit };
