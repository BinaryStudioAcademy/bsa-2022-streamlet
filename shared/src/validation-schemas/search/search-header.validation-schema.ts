import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { SearchRequestDto } from '~/common/types/types';

const searchHeader = Joi.object({
  [getNameOf<SearchRequestDto>('search')]: Joi.string().trim().required(),
});

export { searchHeader };
