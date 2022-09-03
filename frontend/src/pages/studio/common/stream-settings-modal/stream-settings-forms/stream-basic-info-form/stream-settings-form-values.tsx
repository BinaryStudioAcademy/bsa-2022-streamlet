import { SelectOptions } from 'common/types/types';
import { StreamPrivacy } from 'common/enums/enums';

export type StreamSettingsFormValues = {
  name: string;
  tags: SelectOptions[];
  categories: SelectOptions[];
  description: string;
  privacy: StreamPrivacy;
  scheduledStreamDate: Date;
  poster: string;
};
