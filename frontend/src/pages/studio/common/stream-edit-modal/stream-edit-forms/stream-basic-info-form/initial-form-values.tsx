import { StreamBasicInfoFormValues } from './stream-basic-info-form-values';

export const getInitialFormValues: () => StreamBasicInfoFormValues = () => ({
  categories: [],
  description: '',
  name: '',
  scheduledStreamDate: new Date(),
  tags: [],
});
