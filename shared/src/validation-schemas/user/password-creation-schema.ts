import Joi from 'joi';
import { UserValidationMessage } from '~/common/enums/enums';

export const passwordCreationSchema = Joi.string().trim().min(8).max(16).required().messages({
  'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
  'any.required': UserValidationMessage.PASSWORD_REQUIRE,
  'string.min': UserValidationMessage.PASSWORD_WRONG_LENGTH,
  'string.max': UserValidationMessage.PASSWORD_WRONG_LENGTH,
});
