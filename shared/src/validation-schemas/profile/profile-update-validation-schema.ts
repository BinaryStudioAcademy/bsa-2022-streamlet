import * as Joi from 'joi';
import { ProfileValidationMessage } from '~/common/enums/enums';
import { UpdateProfileValue } from '~/common/types/types';

const profileUpdateValidationSchema = Joi.object<UpdateProfileValue, true>({
  username: Joi.string().required().trim().messages({
    'string.empty': ProfileValidationMessage.USER_NAME_NOT_EMPTY,
  }),
  firstName: Joi.string().trim().allow(''),
  lastName: Joi.string().trim().allow(''),
});

export { profileUpdateValidationSchema };
