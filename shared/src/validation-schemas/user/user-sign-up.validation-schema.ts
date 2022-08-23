import * as Joi from 'joi';
import { UserSignUpRequestDto } from '~/common/types/types';
import { UserValidationMessage } from '~/common/enums/enums';
import { passwordCreationSchema } from './password-creation-schema';

const userSignUp = Joi.object<UserSignUpRequestDto, true>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .lowercase()
    .min(6)
    .pattern(/[а-яА-ЯЁё]/, { invert: true })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
      'any.required': UserValidationMessage.EMAIL_REQUIRE,
      'string.min': UserValidationMessage.EMAIL_WRONG_LENGTH,
      'string.pattern.invert.base': UserValidationMessage.EMAIL_WRONG_REGEX,
    }),
  password: passwordCreationSchema,
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': UserValidationMessage.PASSWORDS_NOT_MATCH,
    'any.required': UserValidationMessage.PASSWORD_CONFIRM_REQUIRE,
  }),
  username: Joi.string()
    .trim()
    .min(3)
    .max(25)
    .pattern(/[а-яА-ЯЁё]/, { invert: true })
    .required()
    .messages({
      'string.empty': UserValidationMessage.USERNAME_REQUIRE,
      'string.min': UserValidationMessage.USERNAME_WRONG_LENGTH,
      'string.max': UserValidationMessage.USERNAME_WRONG_LENGTH,
      'string.pattern.invert.base': UserValidationMessage.USERNAME_WRONG_REGEX,
      'any.required': UserValidationMessage.USERNAME_REQUIRE,
    }),
});

export { userSignUp };
