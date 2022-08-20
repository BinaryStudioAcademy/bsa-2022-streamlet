import * as Joi from 'joi';
import { UserSignUpRequestDto } from '~/common/types/types';
import { UserValidationMessage } from '~/common/enums/enums';

const userSignUp = Joi.object<UserSignUpRequestDto, true>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
  password: Joi.string().trim().required().messages({
    'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
  }),
  password_confirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'string.empty': UserValidationMessage.PASSWORD_CONFIRM_REQUIRE,
    'any.only': UserValidationMessage.PASSWORDS_NOT_MATCH,
  }),
  username: Joi.string().trim().required().messages({
    'string.empty': UserValidationMessage.USERNAME_REQUIRE,
  }),
});

export { userSignUp };
