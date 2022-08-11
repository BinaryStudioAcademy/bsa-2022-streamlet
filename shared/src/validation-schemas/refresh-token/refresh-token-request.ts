import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { RefreshTokenRequestDto } from '~/common/types/types';
import { RefreshTokenValidationMessage } from '~/common/enums/enums';

const refreshTokenRequest = Joi.object({
  [getNameOf<RefreshTokenRequestDto>('userId')]: Joi.string().trim().required().messages({
    'string.empty': RefreshTokenValidationMessage.USER_ID_REQUIRE,
  }),
  [getNameOf<RefreshTokenRequestDto>('refreshToken')]: Joi.string().trim().required().messages({
    'string.empty': RefreshTokenValidationMessage.TOKEN_REQUIRE,
  }),
});

export { refreshTokenRequest };
