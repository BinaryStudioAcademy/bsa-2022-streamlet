import { Resolver } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { ValidationSchema } from 'common/types/types';

const getFormValidationResolver = (validationSchema: ValidationSchema): Resolver => {
  return joiResolver(validationSchema);
};

export { getFormValidationResolver };
