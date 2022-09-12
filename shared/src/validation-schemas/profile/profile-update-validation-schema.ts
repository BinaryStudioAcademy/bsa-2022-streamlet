import * as Joi from 'joi';
import { ProfileValidationMessage, UserValidationMessage } from '~/common/enums/enums';
import { UpdateProfileValue } from '~/common/types/types';

const profileUpdateValidationSchema = Joi.object<UpdateProfileValue, true>({
  username: Joi.string()
    .trim()
    .min(3)
    .max(25)
    .pattern(/[а-яА-ЯЁёІіЄєЇї]]/, { invert: true })
    .required()
    .messages({
      'string.empty': UserValidationMessage.USERNAME_REQUIRE,
      'string.min': UserValidationMessage.USERNAME_WRONG_LENGTH,
      'string.max': UserValidationMessage.USERNAME_WRONG_LENGTH,
      'string.pattern.invert.base': UserValidationMessage.USERNAME_WRONG_REGEX,
      'any.required': UserValidationMessage.USERNAME_REQUIRE,
    }),
  firstName: Joi.string()
    .trim()
    .allow('')
    .max(25)
    .pattern(/^[a-zA-Z-]*$/)
    .messages({
      'string.max': ProfileValidationMessage.FIRSTNAME_TO_LONG,
      'string.pattern.base': ProfileValidationMessage.FIRSTNAME_WRONG_REGEXP,
    }),
  lastName: Joi.string()
    .trim()
    .max(20)
    .allow('')
    .pattern(/^[a-zA-Z-]*$/)
    .messages({
      'string.max': ProfileValidationMessage.LASTNAME_TO_LONG,
      'string.pattern.base': ProfileValidationMessage.FIRSTNAME_TO_LONG,
    }),
});

export { profileUpdateValidationSchema };
