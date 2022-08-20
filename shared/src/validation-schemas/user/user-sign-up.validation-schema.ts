import * as Joi from 'joi';
import { UserSignUpRequestDto } from '~/common/types/types';
import { UserValidationMessage } from '~/common/enums/enums';

const userSignUp = Joi.object<UserSignUpRequestDto, true>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .min(6)
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
      'string.min': UserValidationMessage.EMAIL_WRONG_LENGTH,
    }),
  password: Joi.string().trim().min(8).max(16).required().messages({
    'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
    'string.min': UserValidationMessage.PASSWORD_WRONG_LENGTH,
    'string.max': UserValidationMessage.PASSWORD_WRONG_LENGTH,
  }),
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': UserValidationMessage.PASSWORDS_NOT_MATCH,
  }),
  username: Joi.string().trim().min(3).max(25).required().messages({
    'string.empty': UserValidationMessage.USERNAME_REQUIRE,
    'string.min': UserValidationMessage.USERNAME_WRONG_LENGTH,
    'string.max': UserValidationMessage.USERNAME_WRONG_LENGTH,
  }),
});

export { userSignUp };
