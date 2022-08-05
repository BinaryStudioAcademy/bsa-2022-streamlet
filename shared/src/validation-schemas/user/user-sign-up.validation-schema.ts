import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { UserSignUpRequestDto } from '~/common/types/types';
import { UserValidationMessage } from '~/common/enums/enums';

const userSignUp = Joi.object({
  [getNameOf<UserSignUpRequestDto>('email')]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
  [getNameOf<UserSignUpRequestDto>('password')]: Joi.string().trim().required(),
});

export { userSignUp };
