import { Resolver } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { ValidationSchema } from 'common/types/types';

const getFormValidationResolver = <SchemaObjectType>(
  validationSchema: ValidationSchema<SchemaObjectType>,
): Resolver<SchemaObjectType> => {
  return joiResolver(validationSchema);
};

export { getFormValidationResolver };
