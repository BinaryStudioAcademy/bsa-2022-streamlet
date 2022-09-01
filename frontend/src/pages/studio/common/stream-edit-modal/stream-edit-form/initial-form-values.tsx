import { StreamEditFormValues } from './stream-edit-form-values';

export const getInitialFormValues: () => StreamEditFormValues = () => ({
  categories: [],
  description: '',
  name: '',
  scheduledStreamDate: new Date(),
  tags: [],
});
