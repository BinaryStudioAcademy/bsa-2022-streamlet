import * as Joi from 'joi';
import { RefreshPasswordRequestDto } from '~/common/types/types';
import { UserValidationMessage } from '~/common/enums/enums';

const refreshPassword = Joi.object<RefreshPasswordRequestDto, true>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
});

export { refreshPassword };
