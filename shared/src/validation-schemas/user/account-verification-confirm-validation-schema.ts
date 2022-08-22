import * as Joi from 'joi';
import { AccountVerificationConfirmRequestDto } from '~/common/types/types';
import { UserValidationMessage } from '~/common/enums/enums';

const accountVerificationConfirm = Joi.object<AccountVerificationConfirmRequestDto, true>({
  token: Joi.string().required().messages({
    'string.empty': UserValidationMessage.ACCOUNT_VERIFICATION_TOKEN_REQUIRE,
    'any.required': UserValidationMessage.ACCOUNT_VERIFICATION_TOKEN_REQUIRE,
  }),
});

export { accountVerificationConfirm };
