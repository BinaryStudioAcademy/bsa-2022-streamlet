import * as Joi from 'joi';
import { ProfileValidationMessage } from '~/common/enums/enums';
import { UpdateProfileValue } from '~/common/types/types';

const profileUpdateValidationSchema = Joi.object<UpdateProfileValue, true>({
  username: Joi.string().required().trim().messages({
    'string.empty': ProfileValidationMessage.USER_NAME_NOT_EMPTY,
  }),
  firstName: Joi.string().required().trim().messages({
    'string.empty': ProfileValidationMessage.FIRST_NAME_NOT_EMPTY,
  }),
  lastName: Joi.string().required().trim().messages({
    'string.empty': ProfileValidationMessage.LAST_NAME_NOT_EMPTY,
  }),
});

export { profileUpdateValidationSchema };
