import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { RefreshTokenRequestDto } from '~/common/types/types';
import { RefreshTokenValidationMessage } from '~/common/enums/enums';

const refreshTokenRequest = Joi.object({
  [getNameOf<RefreshTokenRequestDto>('refreshToken')]: Joi.string().trim().required().messages({
    'string.empty': RefreshTokenValidationMessage.TOKEN_REQUIRE,
    'any.required': RefreshTokenValidationMessage.TOKEN_REQUIRE,
  }),
});

export { refreshTokenRequest };
